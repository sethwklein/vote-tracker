module.exports = {
  method: 'GET',
  path: '/{param*}',
  handler: function(req, reply) {
    return reply.file('../build/index.html');
  },
};
