var bucket = 'voting-record-pwm';

module.exports = {
  method: 'GET',
  path: '/s3/{param*}',
  handler: {
    proxy: {
      uri: 'http://localhost:9000/'+bucket+'/{param}',
      timeout: 30000, // 30s
    },
  },
};
