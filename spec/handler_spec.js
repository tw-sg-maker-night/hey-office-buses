const nock = require('nock')
const util = require('util')
const handler = require('../handler')

const stopNumber = 83111
const serviceNumber = 15

describe('request the next bus time', () => {

  beforeEach(function() {
    process.env.DEFAULT_BUS_STOP = stopNumber
    nock('http://datamall2.mytransport.sg')
      .get('/ltaodataservice/BusArrival?BusStopID=' + stopNumber + '&ServiceNo=' + serviceNumber)
      .replyWithFile(200, __dirname + '/../samples/responseForBus')
  })

  it('should return how many minutes until the next bus', function(done) {
    var event = {
      currentIntent: {
        slots: {
          BusNumber: serviceNumber
        }
      }
    }

    handler.nextBus(event, {}, (err, response) => {
      expect(response.dialogAction.message.content).toBe("The next bus arrives at Tue Jul 05 2016 15:01:50 GMT+0800 (SGT)")
      done()
    })
  })

})
