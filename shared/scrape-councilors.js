const async = require('async');
const cheerio = require('cheerio');
const request = require('request');

const cityUrl = 'http://www.portlandmaine.gov';
const directoryUrl = cityUrl + '/Directory.aspx?did=11';
const councilorUrl = cityUrl + '/directory.aspx?EID=';

const titleLabel = 'Title: ';

var scrapeCouncilor = function(id, callback) {
  var start = function() {
    get();
  };

  var get = function() {
    request(councilorUrl+id, extract);
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

    var imgUrl = $('.BioText > img').attr('src');

    callback(null, {name: name, role: role, img: cityUrl + imgUrl});
  };

  start();
};

module.exports = function(callback) {
  var start = function() {
    getDirectory();
  };

  var getDirectory = function() {
    request(directoryUrl, extractIds);
  };

  var extractIds = function(err, response, body) {
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

    // for testing, just 1:
    // async.map([ids[0]], scrapeCouncilor, replyCouncilors);
    async.map(ids, scrapeCouncilor, replyCouncilors);
  };

  var replyCouncilors = function(err, councilors) {
    if (err) {
      // annotate with error source?
      // console.log('sending councilor request error');
      return callback(err);
    }

    return callback(null, councilors);
  };

  start();
};
