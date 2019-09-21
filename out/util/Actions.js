'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParsedActions = require('./ParsedActions');

var BuiltAsyncTreeByParsedActions = require('./BuiltAsyncTreeByParsedActions');

var Actions =
/*#__PURE__*/
function () {
  function Actions(tagName, actions) {
    _classCallCheck(this, Actions);

    this.tagName = tagName;
    this.actions = actions;
  }

  _createClass(Actions, [{
    key: "asAsyncTree",
    value: function asAsyncTree(obj) {
      return new BuiltAsyncTreeByParsedActions(new ParsedActions(this.actions, this.tagName, obj).value()).value();
    }
  }]);

  return Actions;
}();

module.exports = Actions;
