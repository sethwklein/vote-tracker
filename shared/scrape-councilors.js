const async = require('async');
const cheerio = require('cheerio');
const request = require('request');

const cityURL = 'http://www.portlandmaine.gov';
const directoryURL = cityURL + '/Directory.aspx?did=11';
const councilorURL = cityURL + '/directory.aspx?EID=';

const titleLabel = 'Title: ';

var scrapeCouncilor = function(id, callback) {
  var start = function() {
    get();
  };

  var get = function() {
    request(councilorURL+id, extract);
  };

  var extract = function(err, response, body) {
    if (err) {
      // improve
      console.log('councilor request error');
      return callback({error: err});
    }

    if (response.statusCode != 200) {
      // improve
      console.log('councilor request bad status');
      return callback({code: response.statusCode});
    }

    var $ = cheerio.load(response.body);

    var name = $('.BioName').text().trim();

    var role;
    var es = $('.BioLink').parent().contents();
    for (var i = 0; i < es.length; i++) {
      var e = es[i];
      if (e.type !== 'text') {
        continue;
      }
      var s = $(e).text();
      if (!s.startsWith(titleLabel)) {
        continue;
      }
      role = s.slice(titleLabel.length);
    }

    var imgURL = $('.BioText > img').attr('src');

    callback(null, {
      name: name,
      role: role,
      img: cityURL + imgURL,
      cityCMSID: id,
    });
  };

  start();
};

var scrapeCouncilorList = function(callback) {
  var start = function() {
    getDirectory();
  };

  var getDirectory = function() {
    request(directoryURL, extractIDS);
  };

  var extractIDS = function(err, response, body) {
    if (err) {
      // annotate with error source?
      // console.log('ids request error');
      return callback(err);
    }

    if (response.statusCode != 200) {
      // this throws out information. i'd like to see it return the code in
      // machine readable state. maybe make a custom error type.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
      // i feel like i shouldn't have to do this. why can't i get a function
      // like request that considers any non-200 a failure?
      // --sk
      // console.log('ids request bad status');
      return callback(new Error("unsuccessful response from server: "+response.statusCode));
    }

    var $ = cheerio.load(response.body);

    var ids = $('[summary="City Directory"] tr > td:first-child > span > a')
      .map(function(){return $(this).attr('href').split('=')[1]})
      .get();

    callback(null, ids);
  };

  start();
};

module.exports = {
  scrapeCouncilor: scrapeCouncilor,
  scrapeCouncilorList: scrapeCouncilorList,
};
