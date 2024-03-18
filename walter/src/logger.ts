import { createLogger, format, transports } from 'winston'
// const WinstonCloudWatch = require('winston-cloudwatch');
// const AWS = require('aws-sdk');

// AWS.config.update({
//   region: 'us-east-1',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

export const LoggerServiceName = "logger"

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    // new WinstonCloudWatch({
    //   cloudWatchLogs: new AWS.CloudWatchLogs(),
    //   logGroupName: 'fullstack-chat',
    //   logStreamName: 'walter'
    // }),
    new transports.Console({
      format: format.simple(),
    })
  ],
});
