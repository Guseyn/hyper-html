'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('@page-libs/cutie'),
    browserified = _require.browserified,
    as = _require.as;

var _browserified = browserified(require('@cuties/object')),
    CreatedOptions = _browserified.CreatedOptions,
    TheSameObjectWithValue = _browserified.TheSameObjectWithValue;

var _browserified2 = browserified(require('@cuties/json')),
    ParsedJSON = _browserified2.ParsedJSON;

var _browserified3 = browserified(require('@cuties/buffer')),
    StringFromBuffer = _browserified3.StringFromBuffer;

var _require2 = require('@page-libs/ajax'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var _require3 = require('@page-libs/dom'),
    UnwrappedChildrenOfParent = _require3.UnwrappedChildrenOfParent;

var ElementWithAppliedDataTextAndValueAttributesForChildNodes = require('./../async/ElementWithAppliedDataTextAndValueAttributesForChildNodes');

var HTMLTunedElement = require('./../objects/HTMLTunedElement');

var EJSON =
/*#__PURE__*/
function (_HTMLTunedElement) {
  _inherits(EJSON, _HTMLTunedElement);

  function EJSON() {
    var _this;

    _classCallCheck(this, EJSON);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EJSON).call(this));
    _this.cache = {};
    return _this;
  }

  _createClass(EJSON, [{
    key: "render",
    value: function render() {
      new ParsedJSON(new StringFromBuffer(new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', this.attributeWithAppliedLocalStorageVariables(this.attributeWithAppliedMemoryStorageVariables(this.getAttribute('data-src'))), 'method', this.getAttribute('data-method') || 'GET', 'headers', new ParsedJSON(this.attributeWithAppliedLocalStorageVariables(this.attributeWithAppliedMemoryStorageVariables(this.getAttribute('data-headers') || '{}')))), this.attributeWithAppliedLocalStorageVariables(this.attributeWithAppliedMemoryStorageVariables(this.getAttribute('data-request-body'))))))).as('RESPONSE').after(new TheSameObjectWithValue(this.cache, this.getAttribute('data-object'), as('RESPONSE')).after(new UnwrappedChildrenOfParent(new ElementWithAppliedDataTextAndValueAttributesForChildNodes(this, this.cache)))).call();
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-src', 'data-method', 'data-headers', 'data-request-body', 'data-object'];
    }
  }]);

  return EJSON;
}(HTMLTunedElement);

module.exports = EJSON;
