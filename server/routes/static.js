module.exports = {
  method: 'GET',
  path: '/static/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true,
    },
  },
};
