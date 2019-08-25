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

var HTMLTunedElement = require('./../objects/HTMLTunedElement');

var EForm =
/*#__PURE__*/
function (_HTMLTunedElement) {
  _inherits(EForm, _HTMLTunedElement);

  function EForm() {
    _classCallCheck(this, EForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(EForm).call(this));
  }

  _createClass(EForm, [{
    key: "render",
    value: function render() {
      var _this = this;

      var form = this; // .replacedWith(document.createElement('form'))

      var inputs = form.getElementsByTagName('input');
      var fieldsets = form.getElementsByTagName('fieldset'); // const selects = form.getElementsByTagName('select')
      // const textareas = form.getElementsByTagName('textarea')
      // const localStorageValues = form.getElementsByTagName('e-local-storage-value')
      // const memoryStorageValues = form.getElementsByTagName('e-memory-storage-value')

      var requestButton = document.getElementById(form.getAttribute('data-request-button').split('#')[1]);
      requestButton.addEventListener('click', function () {
        var requestBody = {};

        _this.retrievedValuesFromElmsForRequestBody(fieldsets, requestBody);

        _this.retrievedValuesFromElmsForRequestBody(inputs, requestBody);
      });
    }
  }, {
    key: "retrievedValuesFromElmsForRequestBody",
    value: function retrievedValuesFromElmsForRequestBody(elms, requestBody) {
      console.log(requestBody);
      Object.keys(elms).forEach(function (index) {
        console.log(elms[index].value);
      });
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-request-url', 'data-request-headers', 'data-request-button'];
    }
  }]);

  return EForm;
}(HTMLTunedElement);

module.exports = EForm;
