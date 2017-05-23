module.exports = {
  method: 'GET',
  path: '/{param*}',
  handler: function(req, reply) {
    // use react-router routes
    reply({message: "unimplemented"});
  },
};
