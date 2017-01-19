'use strict'

class NextBus {
  constructor(options) {
    this.estimatedArrival = new Date(options.EstimatedArrival)
    this.load = options.Load
    this.feature = options.Feature
  }

  _convertMillisecondsToMinutes(milliseconds) {
    return milliseconds / 1000 / 60
  }

  arrivalInMinutes(precision) {
    return (this._convertMillisecondsToMinutes(this.estimatedArrival - Date.now())).toFixed()
  }

  getLoadMessage() {
    if(this.load === 'Seats Available') {
      return 'The bus has seats available.'
    } else if (this.load === 'Standing Available') {
      return 'The bus has standing space available.'
    } else {
      return 'The bus is crowded.'
    }
  }
}

module.exports = NextBus
