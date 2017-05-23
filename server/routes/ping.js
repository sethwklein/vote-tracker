module.exports = {
  method: 'GET',
  path: '/ping',
  handler: function(req, reply) {
    return reply({version: require('../../package.json').version});
  },
};
