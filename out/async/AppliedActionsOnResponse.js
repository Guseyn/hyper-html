'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('@cuties/object'),
    TheSameObjectWithValue = _require.TheSameObjectWithValue;

var Actions = require('./../util/Actions');

var AppliedActionsOnResponse = function AppliedActionsOnResponse(tagName, objName, actions, obj) {
  _classCallCheck(this, AppliedActionsOnResponse);

  var OBJ = {};
  return new TheSameObjectWithValue(OBJ, objName, obj).after(new Actions(tagName, actions).asAsyncTree(OBJ));
};

module.exports = AppliedActionsOnResponse;
