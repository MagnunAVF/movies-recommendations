// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-1'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// Create message body
const message = {
      test: "Ximira",
      x: "gelo"
};
const params = {
  // DelaySeconds: 1,
  // MessageAttributes: {},
  MessageBody: JSON.stringify(message),
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageId: "Group1",  // Required for FIFO queues
  QueueUrl: "http://0.0.0.0:9324/queue/TestQueue"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});