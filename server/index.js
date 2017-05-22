if (!require('semver').satisfies(process.version, ">=6")) {
  console.error("Error: please use Node 6+");
  process.exit(1);
}

const Boom = require('boom');
const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const async = require('async');
const pg = require('hapi-node-postgres');

const councilorScraper = require('../shared/scrape-councilors');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../build'),
      },
    },
  },
  debug: {
    request: ['error']
  },
});

var port = process.env.PORT;
if (!port) {
  port = 3000
}
server.connection({
  port: port,
});

var start = function() {
  plugins();
};

var plugins = function() {
  server.register([
    // inert
    Inert,
    // postgres
    {
      register: pg,
      options: {
        connectionString: 'postgres://postgres@localhost/postgres',
        native: process.env.NODE_ENV == "production",
      },
    },
  ], routes);
};

var routes = function(err) {
  if (err) {
    throw err;
  }

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function(req, reply) {
        return reply.file('../build/index.html');
      },
    },
    {
      method: 'GET',
      path: '/static/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true,
        },
      },
    },
    {
      method: 'GET',
      path: '/ping',
      handler: function(req, reply) {
        return reply({version: require('../package.json').version});
      },
    },
    {
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

            req.pg.client.query('UPDATE councilors SET name = $1, role = $2, imgURL = $3 WHERE cityCMSID = $4', [councilor.name, councilor.role, councilor.img, councilor.cityCMSID], insertCouncilor);
          };

          var insertCouncilor = function(err, result) {
            if (err) {
              return callback(Boom.serverUnavailable(err));
            }

            if (result.rowCount > 0) {
              return finishDatabase(null, result);
            }

            req.pg.client.query('INSERT INTO councilors (name, role, imgURL, cityCMSID) VALUES ($1, $2, $3, $4)', [councilor.name, councilor.role, councilor.img, councilor.cityCMSID], finishDatabase);
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
    },
  ]);
  server.start(report);
};

var report = function(err) {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
};

start();
