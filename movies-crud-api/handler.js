'use strict';

const uuid = require('uuid');
const dynamoDbClient = require('./utils/dynamodb/client').dynamodbClient;

module.exports.hello = async (event, context, callback) => {
  event.Records.forEach(async element => {
      const data = JSON.parse(element.body);
      const timestamp = new Date().getTime();
      const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuid.v1(),
          data: data,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };

      var dynamoDbError;
      dynamoDbClient.put(params, (error) => {
        // handle potential errors
        if (error) {
          console.log(`Error in dynamodb put: ${JSON.stringify(error)}`);
          dynamoDbError = true;
        } else {
          console.log(`Data saved in dynamodb = ${JSON.stringify(data)}`);
          dynamoDbError = false;
        }
      });

      const response = {
        data: JSON.stringify(params.Item),
      };

      dynamoDbError ? callback(error, null) : callback(null, response);
  });
};