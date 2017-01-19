const busClient = require('../../lib/bus_client');
const nock = require('nock');
const util = require('util');

const stopNumber = 83111;
const serviceNumber = 15;

describe('get next bus for specific stop and service number', () => {

  beforeEach(function() {
    nock('http://datamall2.mytransport.sg')
      .get('/ltaodataservice/BusArrival?BusStopID=' + stopNumber + '&ServiceNo=' + serviceNumber)
      .replyWithFile(200, __dirname + '/../../samples/responseForBus');
  });

  it('should return a single service', (done) => {
    busClient.getServices(stopNumber, serviceNumber).then(services => {
      expect(services.length).toBe(1);
      done();
    });
  });

  it('should return the correct estimated arrival time', (done) => {
    busClient.getServices(stopNumber, serviceNumber).then(services => {
      var nextBus = services[0].getNextAvailableBus();
      expect(nextBus.estimatedArrival).toEqual(new Date("2016-07-05T07:01:50+00:00"));
      done();
    });
  });

  it('should return the correct load', (done) => {
    busClient.getServices(stopNumber, serviceNumber).then(services => {
      var nextBus = services[0].getNextAvailableBus();
      expect(nextBus.load).toEqual("Standing Available");
      done();
    });
  });

  it('should return the feature', (done) => {
    busClient.getServices(stopNumber, serviceNumber).then(services => {
      var nextBus = services[0].getNextAvailableBus();
      expect(nextBus.feature).toBe("WAB");
      done();
    });
  });

});
