'use strict';

const NextBus = require("./nextBus");

class Service {
  constructor(options) {
    this.serviceNo = options.ServiceNo;
    this.status = options.Status;
    this._arrivingBuses = [new NextBus(options.NextBus), new NextBus(options.SubsequentBus), new NextBus(options.SubsequentBus3)];
  }

  getNextAvailableBus(feature) {
    if (feature === '' || feature === undefined) return this._arrivingBuses[0];
    else if(feature === 'wheelchair accessible') {
      return this._arrivingBuses.find((bus) => {
        return bus.feature === "WAB";
      })
    }
    else throw(feature + ' is currently an unavailable bus feature for the next 3 buses.');
  }
}

module.exports = Service;
