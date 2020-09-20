'use strict';

const AWS = require('aws-sdk');

var options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

module.exports.dynamodbClient = new AWS.DynamoDB.DocumentClient(options);