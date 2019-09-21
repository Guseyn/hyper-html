'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SessionStorage =
/*#__PURE__*/
function () {
  function SessionStorage() {
    _classCallCheck(this, SessionStorage);
  }

  _createClass(SessionStorage, [{
    key: "getItem",
    value: function getItem(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (error) {
        return sessionStorage.getItem(key);
      }
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      if (value instanceof Object) {
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(value);
      }
    }
  }]);

  return SessionStorage;
}();

window.sessionStorageWrapper = new SessionStorage();
module.exports = SessionStorage;
