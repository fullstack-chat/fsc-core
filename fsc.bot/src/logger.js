const winston = require('winston');
// const WinstonCloudWatch = require('winston-cloudwatch');
// const AWS = require('aws-sdk');

// AWS.config.update({
//   region: 'us-east-1',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // new WinstonCloudWatch({
    //   cloudWatchLogs: new AWS.CloudWatchLogs(),
    //   logGroupName: 'fullstack-chat', 
    //   logStreamName: 'walter'
    // }),
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

module.exports = logger