const nock = require('nock')
const util = require('util')
const moment = require('moment-timezone')
const handler = require('../handler')

const stopNumber = 83111
const serviceNumber = 15

describe('request the next bus time', () => {

  beforeEach(() => {
    process.env.DEFAULT_BUS_STOP = stopNumber
    var arrivalTime = moment().tz('UTC').add(5, 'minutes')
    nock('http://datamall2.mytransport.sg')
      .get('/ltaodataservice/BusArrival?BusStopID=' + stopNumber + '&ServiceNo=' + serviceNumber)
      .reply(200, mockBusResponse(arrivalTime))
  })

  it('should return how many minutes until the next bus', (done) => {
    var event = request({ BusNumber: serviceNumber });
    handler.nextBus(event, {}, (err, response) => {
      expect(response.dialogAction.message.content).toBe("The next bus arrives in 5 minutes")
      done()
    })
  })

})

function mockBusResponse(date) {
  return {
    "BusStopID": "83111",
    "Services": [
      {
        "ServiceNo": "15",
        "NextBus": {
          "EstimatedArrival": date.format("YYYY-MM-DDTHH:mm:ssZ"),
          "Load": "Standing Available",
          "Feature": "WAB"
        }
      }
    ]
  }
}

function request(slots) {
  return {
    currentIntent: {
      slots: slots
    }
  };
}
