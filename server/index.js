const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const pg = require('hapi-node-postgres');
const semver = require('semver');

if (!semver.satisfies(process.version, ">=6")) {
  console.error("Error: please use Node 6+");
  process.exit(1);
}

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
      path: '/{param*}',
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
        reply({version: require('../package.json').version});
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
