'use strict'

const { TheSameObjectWithValue } = require('@cuties/object')
const Actions = require('./../util/Actions')

class AppliedActionsOnResponse {
  constructor (tagName, objName, actions, obj) {
    const OBJ = {}
    return new TheSameObjectWithValue(OBJ, objName, obj).after(
      new Actions(
        tagName,
        actions
      ).asAsyncTree(OBJ)
    )
  }
}

module.exports = AppliedActionsOnResponse
