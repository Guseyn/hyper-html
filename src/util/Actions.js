'use strict'

const ParsedActions = require('./ParsedActions')
const BuiltAsyncTreeByParsedActions = require('./BuiltAsyncTreeByParsedActions')

class Actions {
  constructor (tagName, actions) {
    this.tagName = tagName
    this.actions = actions
  }

  asAsyncTree (obj) {
    return new BuiltAsyncTreeByParsedActions(
      new ParsedActions(
        this.actions,
        this.tagName,
        obj
      ).value()
    ).value()
  }
}

module.exports = Actions
