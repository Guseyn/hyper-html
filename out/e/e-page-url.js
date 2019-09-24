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

var E = require('./../E');

var EPageUrl =
/*#__PURE__*/
function (_E) {
  _inherits(EPageUrl, _E);

  function EPageUrl() {
    _classCallCheck(this, EPageUrl);

    return _possibleConstructorReturn(this, _getPrototypeOf(EPageUrl).call(this, true));
  }

  _createClass(EPageUrl, [{
    key: "onRender",
    value: function onRender() {
      // /user/{id}/to/{anotherId}/send?message={message}&token={token}
      var urlParams = {};
      var urlPattern = this.getAttribute('data-url-pattern');
      var locationUrl = window.location.pathname + window.location.search;
      var parsedUrlPattern = this.parsedUrl(urlPattern);
      var parsedLocationUrl = this.parsedUrl(locationUrl);
      parsedUrlPattern.forEach(function (part, index) {
        if (/^\{([^{}\s.]+)}$/g.test(part)) {
          urlParams[/^\{([^{}\s.]+)}$/g.exec(part)[1]] = parsedLocationUrl[index];
        }
      });
      window.urlParams = urlParams;
    }
  }, {
    key: "parsedUrl",
    value: function parsedUrl(url) {
      var urlParts = url.split(/\?/g);
      var beforeQuery = urlParts[0] || '';
      var afterQuery = urlParts[1] || '';
      return beforeQuery.split(/\//g).concat(afterQuery.split(/&?[^&{}\s.]+=/g)).filter(function (part) {
        return part !== '';
      });
    }
  }]);

  return EPageUrl;
}(E);

window.customElements.define('e-page-url', EPageUrl);
module.exports = EPageUrl;