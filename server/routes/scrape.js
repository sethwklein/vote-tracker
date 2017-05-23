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
      var start = function() {
        scrapeCouncilor();
      };

      var scrapeCouncilor = function() {
        councilorScraper.scrapeCouncilor(cityCMSID, updateCouncilor);
      };

      var councilor;

      // Try an update, then an insert. It's less robust against
      // parallelism, but fewer database requests in the common case.

      var updateCouncilor = function(err, councilorArgument) {
        if (err) {
          return callback(Boom.wrap(err));
        }

        councilor = councilorArgument;

        req.pg.client.query('UPDATE councilors SET name = $1, role = $2, cityPage = $3 WHERE cityCMSID = $4', [councilor.name, councilor.role, councilor.cityPage, councilor.cityCMSID], insertCouncilor);
      };

      var insertCouncilor = function(err, result) {
        if (err) {
          return callback(Boom.serverUnavailable(err));
        }

        if (result.rowCount > 0) {
          return finishDatabase(null, result);
        }

        req.pg.client.query('INSERT INTO councilors (name, cityCMSID, role, cityPage) VALUES ($1, $2, $3, $4)', [councilor.name, councilor.cityCMSID, councilor.role, councilor.cityPage], finishDatabase);
      };

      var finishDatabase = function(err, result) {
        if (err) {
          return callback(Boom.serverUnavailable(err));
        }

        return callback(null, {
            command: result.command,
            rowCount: result.rowCount,
            name: councilor.name,
            cityCMSID: councilor.cityCMSID,
          });
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
