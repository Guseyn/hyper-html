
'use strict'

const { AsyncObject } = require('./../cutie/exports')

class ReplacedElementWithAnotherOne extends AsyncObject {
  constructor (oldElement, newElement) {
    super(oldElement, newElement)
  }

  syncCall () {
    return (oldElement, newElement) => {
      oldElement.parentNode.replaceChild(newElement, oldElement)
      return newElement
    }
  }
}

module.exports = ReplacedElementWithAnotherOne
