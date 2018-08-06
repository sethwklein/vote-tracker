const Boom = require("boom");

module.exports = {
  method: 'GET',
  path: '/{param*}',
  handler: function(req, reply) {
    // use react-router routes
    reply(Boom.notFound("unimplemented"));
    // reply({message: "unimplemented"});
  },
};
