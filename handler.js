'use strict';

const util = require('util');
const busClient = require('./lib/bus_client');

function responseWithContent(content) {
    return {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: content
        }
      }
    };
}

module.exports.nextBus = (event, context, callback) => {
  console.log("event = " + util.inspect(event, false, null));

  var busNumber = event.currentIntent.slots.BusNumber || process.env.DEFAULT_BUS_NUMBER;
  busClient.getServices(process.env.DEFAULT_BUS_STOP, busNumber).then(service => {
    var nextBus = service[0].getNextAvailableBus();
    callback(null, responseWithContent("The next bus arrives at " + nextBus.estimatedArrival));
  }).catch(err => {
    callback(null, responseWithContent("Sorry I couldn't get the next bus time. Please try again later."));
  });

};
