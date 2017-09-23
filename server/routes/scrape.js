const AWS = require('aws-sdk');
const Boom = require('boom');
const async = require('async');
const crypto = require('crypto');
const fileType = require('file-type');
const request = require('request');

const councilorScraper = require('../../shared/scrape-councilors');

const s3 = new AWS.S3({
  // we'll need to pull these from runtime secrets management for production
  accessKeyId: 'local',
  secretAccessKey: 'access_only',

  endpoint: 'http://localhost:9000', // minio

  s3ForcePathStyle: true, // minio sample code says to use this
  signatureVersion: 'v4', // minio needs this
});

module.exports = {
  method: 'GET',
  path: '/scrape',
  handler: function(req, reply) {
    var start = function() {
      getCouncilorList();
    };

    var getCouncilorList = function() {
      councilorScraper.scrapeCouncilorList(getAndStoreCouncilors);
    };

    // Try every councilor, reporting the ones that fail, but not
    // aborting other councilor attempts if one fails.

    var getAndStoreCouncilors = function(err, cityCMSIDS) {
      if (err) {
        return reply(Boom.wrap(err));
      }

      async.map(cityCMSIDS, async.reflect(getAndStoreCouncilor), sendReport);
    };

    var getAndStoreCouncilor = function(cityCMSID, callback) {
      // status is used accumulate information about what this process did
      var status = {};

      var start = function() {
        scrapeCouncilor();
      };

      var scrapeCouncilor = function() {
        councilorScraper.scrapeCouncilor(cityCMSID, fetchImage);
      };

      var councilor;

      // fetch and store image
      // if that succeeds, sub in the url to the image in s3

      var fetchImage = function(err, councilorArgument) {
        if (err) {
          return callback(Boom.wrap(err));
        }

        councilor = councilorArgument;

        request(
          {
            url: councilor.img,
            encoding: null,
          },
          storeImage
        );
      };

      var storeImage = function(err, response, body) {
        if (err) {
          status.img = err;
          return updateCouncilor();
        }

        if (response.statusCode !== 200) {
          status.img = Boom.create(response.statusCode, "councilor image fetch failed");
          return updateCouncilor();
        }

        var hash = crypto.createHash('sha256');
        hash.update(body);
        // base64 would be shorter but is likely to contain '/'
        var name = hash.digest('hex');

        var typ = fileType(body);
        if (typ) {
          name += "." + typ.ext;
        }

        s3.upload(
          {
            Bucket: "voting-record-pwm",
            Key: name,
            Body: body,
          },
          updateCouncilor
        );
      };

      // Try an update, then an insert. It's less robust against
      // parallelism, but fewer database requests in the common case.

      var updateCouncilor = function(err, data) {
        if (err) {
          // console.log("s3 err");
          status.img = err;
        } else {
          // console.log("s3 success");
          status.img = data.Key;

          councilor.img = data.Key
        }

        req.pg.client.query('UPDATE councilors SET name = $1, role = $2, cityPage = $3, img = $4 WHERE cityCMSID = $5', [councilor.name, councilor.role, councilor.cityPage, councilor.img, councilor.cityCMSID], insertCouncilor);
      };

      var insertCouncilor = function(err, result) {
        if (err) {
          return callback(Boom.serverUnavailable(err));
        }

        if (result.rowCount > 0) {
          return finishDatabase(null, result);
        }

        req.pg.client.query('INSERT INTO councilors (name, cityCMSID, role, cityPage, img) VALUES ($1, $2, $3, $4, $5)', [councilor.name, councilor.cityCMSID, councilor.role, councilor.cityPage, councilor.img], finishDatabase);
      };

      var finishDatabase = function(err, result) {
        if (err) {
          return callback(Boom.serverUnavailable(err));
        }

        status.db = {
          command: result.command,
          rowCount: result.rowCount,
          name: councilor.name,
          cityCMSID: councilor.cityCMSID,
        };

        return callback(null, status);
      };

      start();
    };

    var sendReport = function(err, report) {
      if (err) {
        return reply({error: err});
      }

      return reply(report);
    };

    start();
  },
};
