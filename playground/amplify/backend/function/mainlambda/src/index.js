const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

// create server from our Express REST API SERVER
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
