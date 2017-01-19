'use strict';

const http = require("http");
const Service = require("./models/service");

function createNewServices(body) {
  return JSON.parse(body).Services.map((service) => {
    return new Service(service);
  })
}

function createOptions(busStopID, serviceNumber) {
  return {
    host: 'datamall2.mytransport.sg',
    path: '/ltaodataservice/BusArrival?BusStopID='+ busStopID + '&ServiceNo=' + serviceNumber,
    headers: {
      "accept": "application/json",
      "UniqueUserID": process.env.USER_ID,
      "AccountKey": process.env.ACCOUNT_KEY
    }
  }
}

function makeHTTPCall(options) {
  return new Promise((resolve, reject) => {
    var body = '';

    var req = http.get(options, (resp) => {
      resp.on('data', (chunk) => {
        body += chunk;
      })
      resp.on('end', () => {
        resolve(body);
      })
    }).on('error', (e) => {
      reject("HTTP Call to LTA failed");
    })
  })
}

module.exports = {

  getServices: (busStopID, serviceNumber) => {
    var options = createOptions(busStopID, serviceNumber);
    return makeHTTPCall(options).then(
      (res) => {
        return createNewServices(res);
      }
    )
  }

};
