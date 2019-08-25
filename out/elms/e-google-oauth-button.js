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
    browserified = _require.browserified;

var _require2 = require('@page-libs/ajax'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var _browserified = browserified(require('@cuties/object')),
    Value = _browserified.Value;

var _browserified2 = browserified(require('@cuties/json')),
    ParsedJSON = _browserified2.ParsedJSON;

var LocalStorageWithSetValue = require('./../async/LocalStorageWithSetValue');

var HTMLTunedElement = require('./../objects/HTMLTunedElement');

var GOOGLE_API_SRC = 'https://apis.google.com/js/api:client.js';

var EGoogleOauthButton =
/*#__PURE__*/
function (_HTMLTunedElement) {
  _inherits(EGoogleOauthButton, _HTMLTunedElement);

  function EGoogleOauthButton() {
    _classCallCheck(this, EGoogleOauthButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(EGoogleOauthButton).call(this));
  }

  _createClass(EGoogleOauthButton, [{
    key: "render",
    value: function render() {
      var instance = this;
      var googleSignInMetaElm = this.googleSignInMetaElm();
      var googleApiScriptElm = this.googleApiScriptElm();
      document.head.prepend(googleSignInMetaElm, googleApiScriptElm);
      var googleOauthButtonElm = this.googleOauthButtonElm();

      googleApiScriptElm.onload = function () {
        instance.initGoogleOauth(googleOauthButtonElm);
      };

      this.replacedWith(googleOauthButtonElm);
      this.rendered = true;
    }
  }, {
    key: "initGoogleOauth",
    value: function initGoogleOauth(googleOauthButtonElm) {
      var instance = this;
      googleOauthButtonElm.style['display'] = ''; // eslint-disable-next-line no-undef

      gapi.load('auth2', function () {
        // eslint-disable-next-line no-undef
        var auth2 = gapi.auth2.init({
          client_id: instance.getAttribute('data-client-id'),
          cookiepolicy: instance.getAttribute('data-cookiepolicy') || 'single_host_origin',
          scope: instance.getAttribute('data-scope') || 'profile'
        });
        auth2.attachClickHandler(googleOauthButtonElm, {}, function (googleUser) {
          var body = {};
          body[instance.getAttribute('data-request-token-key') || 'googleToken'] = googleUser.getAuthResponse().id_token;
          new LocalStorageWithSetValue(localStorage, instance.getAttribute('data-local-storage-jwt-key') || 'jwt', new Value(new ParsedJSON(new ResponseBody(new ResponseFromAjaxRequest({
            url: instance.getAttribute('data-redirect-url') || '/',
            method: 'POST'
          }, JSON.stringify(body)))), instance.getAttribute('data-response-jwt-key') || 'jwt')).call();
        }, function (error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
      });
    }
  }, {
    key: "googleSignInMetaElm",
    value: function googleSignInMetaElm() {
      var googleSignInMetaElm = document.createElement('meta');
      googleSignInMetaElm.setAttribute('name', 'google-signin-client_id');
      googleSignInMetaElm.setAttribute('content', this.getAttribute('data-client-id'));
      return googleSignInMetaElm;
    }
  }, {
    key: "googleApiScriptElm",
    value: function googleApiScriptElm() {
      var googleApiScriptElm = document.createElement('script');
      googleApiScriptElm.setAttribute('src', GOOGLE_API_SRC);
      return googleApiScriptElm;
    }
  }, {
    key: "googleOauthButtonElm",
    value: function googleOauthButtonElm() {
      var button = document.createElement('button');
      button.style['display'] = 'none';
      return button;
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-client-id', 'data-cookiepolicy', 'data-scope', 'data-redirect-url', 'data-local-storage-jwt-key', 'data-response-jwt-key', 'data-request-token-key'];
    }
  }]);

  return EGoogleOauthButton;
}(HTMLTunedElement);

module.exports = EGoogleOauthButton;
