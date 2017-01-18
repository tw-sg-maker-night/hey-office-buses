'use strict';

const util = require('util');
const getServices = require('./httpClient');

module.exports.nextBus = (event, context, callback) => {

  console.log("event = " + util.inspect(event, false, null));
  console.log("context = " + util.inspect(context, false, null));

  getServices('03041', '186').then(service => {
    var nextBus = service[0].getNextAvailableBus();
    console.log("nextBus = " + nextBus);

    const response = {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: "The next bus arrives at " + nextBus.estimatedArrival
        }
      }
    };

    callback(null, response);
  }).catch(err => {

    const response = {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: "Face palm!"
        }
      }
    };

    callback(null, response);
  });

};
