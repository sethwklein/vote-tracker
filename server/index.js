if (!semver.satisfies(process.version, ">=6")) {
  console.error("Error: please use Node 6+");
  process.exit(1);
}

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const semver = require('semver');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../build'),
      },
    },
  },
});

var port = process.env.PORT;
if (!port) {
  port = 3000
}
server.connection({port: port});

server.register(Inert, () => {});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true,
    },
  },
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
