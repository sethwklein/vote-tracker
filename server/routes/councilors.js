const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/v1/councilors/{name?}',
  handler: function(req, reply) {
    var name = req.params.name;
    if (name === "") {
      name = undefined;
    }

    var start = function() {
      return get();
    };

    var get = function() {
      if (typeof name === 'undefined') {
        return req.pg.client.query('SELECT name, role, cityPage, img FROM councilors', send);
      } else {
        return req.pg.client.query('SELECT name, role, cityPage, img FROM councilors WHERE name = $1', [name], send);
      }
    };

    var send = function(err, result) {
      if (err) {
        return reply(Boom.serverUnavailable(err));
      }

      if (typeof name === 'undefined') {
        return reply(result.rows);
      }

      if (result.rows.length < 1) {
        return reply(Boom.notFound());
      }

      return reply(result.rows[0]);
    };

    return start();
  },
};
