'use strict';

module.exports.hello = async (event, context, callback) => {
  event.Records.forEach(async element => {
      const data = JSON.parse(element.body);

      try {
          console.log(`Data received = ${JSON.stringify(data)}`);
          callback(null, data);
      } catch (error) {
          callback(error, null);
      }
  });
};