'use strict'

const { AsyncObject } = require('@page-libs/cutie')

class BodyOfDocument extends AsyncObject {
  constructor (doc) {
    super(doc)
  }

  syncCall () {
    return (doc) => {
      if (doc.body) {
        return doc.body
      }
      throw new Error('body element is missing in the html resource')
    }
  }
}

module.exports = BodyOfDocument
