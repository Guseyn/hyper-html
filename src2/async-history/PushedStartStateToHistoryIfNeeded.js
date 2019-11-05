'use strict'

const { AsyncObject } = require('./../cutie/exports')

class PushedStartStateToHistoryIfNeeded extends AsyncObject {
  constructor (state, href) {
    super(state, href)
  }

  syncCall () {
    return (state, href) => {
      if (sessionStorage.getItem('isFirstStatePushedToHistory') === 'false') {
        history.replaceState(state, null, href)
        sessionStorage.setItem('isFirstStatePushedToHistory', 'true')
      }
      return state
    }
  }
}

module.exports = PushedStartStateToHistoryIfNeeded
