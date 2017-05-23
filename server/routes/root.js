module.exports = {
  method: 'GET',
  path: '/',
  handler: function(req, reply) {
    return reply.file('../build/index.html');
  },
};
