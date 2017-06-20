if (!require('semver').satisfies(process.version, ">=6")) {
  console.error("Error: please use Node 6+");
  process.exit(1);
}

const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const path = require('path');
const pg = require('hapi-node-postgres');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, '../build'),
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

  // Changing routes should not involve changing code here to lessen
  // merge conflicts.
  var routes = [];
  var routesDir = path.join(__dirname, 'routes');
  fs.readdirSync(routesDir).forEach(function(fn) {
    if (!fn.endsWith(".js")) {
      return;
    }
    routes.push(require(path.join(routesDir, fn)));
  });
  server.route(routes);

  server.start(report);
};

var report = function(err) {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
};

start();
