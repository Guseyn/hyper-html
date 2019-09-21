'use strict'

const EmptyAsyncObject = require('./../async/EmptyAsyncObject')
const StringWithAppliedStorageVariables = require('./../async/StringWithAppliedStorageVariables')
const StringWithMappedObject = require('./../async/StringWithMappedObject')
const ParsedJSONOrString = require('./../async/ParsedJSONOrString')
const ActionByNameWithParams = require('./ActionByNameWithParams')

class ParsedActions {
  constructor (actions, tagName, obj) {
    // act1(p1, p2); act(q1, q2); ...
    this.actions = actions
    this.tagName = tagName
    this.obj = obj
  }

  value () {
    const parsedActions = [ ]
    if (!this.actions) {
      return new EmptyAsyncObject()
    }
    const splitedActions = this.actions
      .split(';')
      .map(action => action.trim())
      .filter(action => action.length !== 0)
    splitedActions.forEach(action => {
      const actionName = action.split('(')[0].trim()
      const actionParams = this.actionParams(action, actionName)
      parsedActions.push(
        new ActionByNameWithParams(
          actionName, ...actionParams
        ).value()
      )
    })
    return parsedActions
  }

  actionParams (action, actionName) {
    const params = action.split(actionName)[1]
    // eslint-disable-next-line no-eval
    return eval(`this.funcWithParams${params}`)
  }

  funcWithParams (...params) {
    return params.map(param => {
      if (typeof param === 'object') {
        param = JSON.stringify(param)
      }
      return new ParsedJSONOrString(
        new StringWithMappedObject(
          new StringWithAppliedStorageVariables(
            param
          ), this.obj
        )
      )
    })
  }
}

module.exports = ParsedActions
