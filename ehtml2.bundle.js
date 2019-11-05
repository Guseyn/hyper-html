(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {

  AsyncObject: require('./src/AsyncObject'),
  Event: require('./src/Event'),
  as: require('./src/As')

}

},{"./src/As":2,"./src/AsyncObject":3,"./src/Event":6}],2:[function(require,module,exports){
'use strict'

const AsyncObject = require('./AsyncObject')

class As extends AsyncObject {
  constructor (key) {
    super(key)
  }

  syncCall () {
    return (key) => {
      let result = this.cache[key]
      if (result === undefined) {
        throw new Error(`There is no value that is cached with key ${key}`)
      }
      return result
    }
  }
}

module.exports = (key) => {
  return new As(key)
}

},{"./AsyncObject":3}],3:[function(require,module,exports){
'use strict'

const AsyncTree = require('./AsyncTree')

/* abstract class */

class AsyncObject {
  /*
    args: any type (including AsyncObject)
  */
  constructor (...args) {
    this.args = args
    this.cache = {}
    this.next = undefined
    this.asKey = undefined
  }

  // TO BE OVERRIDDEN

  asyncCall () {
    throw new Error('asyncCall or syncCall must be defined')
  }

  syncCall () {
    throw new Error('asyncCall or syncCall must be defined')
  }

  onError (error) {
    throw error
  }

  onResult (result) {
    return result
  }

  /*
    Works only if this.continueAfterFail returns true
      (in that case this.onError and this.onResult will be ignored),
  */
  onErrorAndResult (error, result) {
    return error || result
  }

  /*
    If it returns true, then this.onError and this.onResult will be ignored,
    and the represented result of this object
    will be returned by this.onErrorAndResult.
  */
  continueAfterFail () {
    return false
  }

  callbackWithError () {
    return true
  }

  // PUBLIC API

  call () {
    this.propagateCache(this)
    new AsyncTree(this).create().call()
  }

  after (asyncObject) {
    this.next = asyncObject
    return this
  }

  as (key) {
    this.asKey = key
    return this
  }

  // NOT ALLOWED TO BE OVERRIDDEN

  iterateArgs (func) {
    this.args.forEach((arg, index) => {
      func(arg, index, this.isAsyncObject(arg), this.isEvent(arg))
    })
  }

  hasNoArgs () {
    return this.args.length === 0
  }

  readyToBeInvoked (readyResultsNum) {
    return this.args.length === readyResultsNum
  }

  callNextTreeIfExists () {
    if (this.next) {
      this.propagateCache(this.next)
      new AsyncTree(this.next).create().call()
    }
  }

  propagateCache (arg) {
    if (this.isAsyncObject(arg)) {
      arg.withCache(this.cache)
      arg.iterateArgs(arg => this.propagateCache(arg))
    }
  }

  withCache (cache) {
    this.cache = cache
    return this
  }

  saveValueIntoCacheIfNeeded (value) {
    if (this.asKey) {
      if (this.cache[this.asKey]) {
        throw new Error(`There is already value that is cached with key ${this.asKey}`)
      }
      this.cache[this.asKey] = value
    }
    return this
  }

  isAsyncObject (arg) {
    return this.classChain(arg).indexOf('AsyncObject') !== -1
  }

  isEvent (arg) {
    return this.classChain(arg).indexOf('Event') !== -1
  }

  classChain (obj, chain) {
    if (!chain) {
      chain = []
    }
    if (typeof obj === 'function') {
      if (!obj.name || obj === Object) {
        return chain
      }
      return this.classChain(Object.getPrototypeOf(obj), chain.concat(obj.name))
    }
    if (typeof obj === 'object' && obj !== null) {
      return this.classChain(obj.constructor, chain)
    }
    return chain
  }
}

module.exports = AsyncObject

},{"./AsyncTree":4}],4:[function(require,module,exports){
'use strict'

const SimpleTreeNode = require('./SimpleTreeNode')
const AsyncTreeNode = require('./AsyncTreeNode')
const NotDefinedAsyncTreeNode = require('./NotDefinedAsyncTreeNode')

class AsyncTree {
  /*
    rootField: AsyncObject
  */
  constructor (rootField) {
    this.rootField = rootField
    this.nodes = []
  }

  // PUBLIC

  create () {
    this.createAsyncTreeNode(this.rootField, new NotDefinedAsyncTreeNode(), 0)
    return this
  }

  call () {
    let leaves = this.nodes.filter(node => {
      return node.isLeaf()
    })
    leaves.forEach(leaf => {
      leaf.call()
    })
  }

  // PRIVATE

  createChildNodes (field, parent) {
    field.iterateArgs((argAsField, index, isAsyncObject, isEvent) => {
      if (isAsyncObject) {
        this.createAsyncTreeNode(argAsField, parent, index)
      } else if (isEvent) {
        this.createSimpleTreeNode((...eventArgs) => {
          argAsField.body(...eventArgs)
        }, parent, index)
      } else {
        this.createSimpleTreeNode(argAsField, parent, index)
      }
    })
  }

  createAsyncTreeNode (field, parent, index) {
    let asyncTreeNode = new AsyncTreeNode(field, parent, index)
    this.nodes.push(asyncTreeNode)
    this.createChildNodes(field, asyncTreeNode)
  }

  createSimpleTreeNode (field, parent, index) {
    let treeNode = new SimpleTreeNode(field, parent, index)
    this.nodes.push(treeNode)
  }
}

module.exports = AsyncTree

},{"./AsyncTreeNode":5,"./NotDefinedAsyncTreeNode":7,"./SimpleTreeNode":8}],5:[function(require,module,exports){
'use strict'

const TreeNode = require('./TreeNode')

class AsyncTreeNode extends TreeNode {
  /*
    field: AsyncObject
    parent: AsyncTreeNode or NotDefinedAsyncTree
    position: int
  */
  constructor (field, parent, position) {
    super(field, parent, position)
    this.argResults = []
    this.readyResultsNum = 0
  }

  // PUBLIC

  call () {
    let args = this.argResults
    try {
      let asyncCall = this.field.asyncCall()
      if (this.field.callbackWithError()) {
        this.invokeAsyncCallWithError(asyncCall, ...args)
      } else {
        this.invokeAsyncCallWithoutError(asyncCall, ...args)
      }
    } catch (error) {
      if (error.message !== 'asyncCall or syncCall must be defined') {
        if (this.field.continueAfterFail()) {
          this.field.onErrorAndResult(error)
        } else {
          this.field.onError(error)
        }
      } else {
        let syncCall = this.field.syncCall()
        this.invokeSyncCall(syncCall, ...args)
      }
    }
  }

  isLeaf () {
    return this.field.hasNoArgs()
  }

  readyToBeInvoked () {
    return this.field.readyToBeInvoked(this.readyResultsNum)
  }

  hasParent () {
    return this.parent instanceof AsyncTreeNode
  }

  insertArgumentResult (position, result) {
    this.argResults[position] = result
    this.readyResultsNum += 1
  }

  // PRIVATE

  invokeAsyncCallWithError (asyncCall, ...args) {
    asyncCall(...args, (error, ...results) => {
      if (!this.processedError(error, ...results)) {
        this.processedResult(...results)
      }
    })
  }

  invokeAsyncCallWithoutError (asyncCall, ...args) {
    asyncCall(...args, (...results) => {
      this.processedResult(...results)
    })
  }

  invokeSyncCall (syncCall, ...args) {
    try {
      let syncCallResult = syncCall(...args)
      this.processedResult(syncCallResult)
    } catch (error) {
      this.processedError(error)
    }
  }

  processedError (error, ...results) {
    let isProcessed = false
    // It's not possible to get rid of null here :(
    if (error != null) {
      if (this.field.continueAfterFail()) {
        let totalResult = this.field.onErrorAndResult(error, ...results)
        this.field.saveValueIntoCacheIfNeeded(totalResult)
        if (this.hasParent()) {
          super.callParent(totalResult)
        } else {
          this.field.callNextTreeIfExists()
        }
      } else {
        this.field.onError(error)
      }
      isProcessed = true
    }
    return isProcessed
  }

  processedResult (...results) {
    let totalResult
    if (this.field.continueAfterFail()) {
      totalResult = this.field.onErrorAndResult(null, ...results)
    } else {
      totalResult = this.field.onResult(...results)
    }
    this.field.saveValueIntoCacheIfNeeded(totalResult)
    if (this.hasParent()) {
      super.callParent(totalResult)
    } else {
      this.field.callNextTreeIfExists()
    }
    return true
  }
}

module.exports = AsyncTreeNode

},{"./TreeNode":9}],6:[function(require,module,exports){
'use strict'

class Event {
  constructor () {}

  // TO BE OVERRIDDEN

  body (...args) {
    throw new Error(`Method body must be overriden with arguments ${args} of the event/eventListener you call`)
  }
}

module.exports = Event

},{}],7:[function(require,module,exports){
'use strict'

class NotDefinedAsyncTreeNode {
  constructor () {}
}

module.exports = NotDefinedAsyncTreeNode

},{}],8:[function(require,module,exports){
'use strict'

const TreeNode = require('./TreeNode')

class SimpleTreeNode extends TreeNode {
  /*
    field: simple argument (not AsyncObject, can be Event)
    parent: AsyncTreeNode or NotDefinedAsyncTree
    position: int
  */
  constructor (field, parent, position) {
    super(field, parent, position)
  }

  // PUBLIC

  call () {
    super.callParent(this.field)
  }

  isLeaf () {
    return true
  }
}

module.exports = SimpleTreeNode

},{"./TreeNode":9}],9:[function(require,module,exports){
'use strict'

/* abstract class */

class TreeNode {
  /*
    field: just some value (argument), also can be Event
    parent: AsyncTreeNode
    position: int
  */
  constructor (field, parent, position) {
    this.field = field
    this.parent = parent
    this.position = position
  }

  // TO BE OVERRIDEN

  call (result) {
    result = result || ''
    throw new Error(`call must be overridden and insert result ${result} into parent node`)
  }

  isLeaf () {
    throw new Error('isLeaf must be overridden')
  }

  // NOT ALLOWED TO BE OVERRIDDEN

  callParent (result) {
    this.parent.insertArgumentResult(this.position, result)
    if (this.parent.readyToBeInvoked()) {
      this.parent.call()
    }
  }
}

module.exports = TreeNode

},{}],10:[function(require,module,exports){
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

var AsyncObject = require('./AsyncObject');

var As =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(As, _AsyncObject);

  function As(key) {
    _classCallCheck(this, As);

    return _possibleConstructorReturn(this, _getPrototypeOf(As).call(this, key));
  }

  _createClass(As, [{
    key: "syncCall",
    value: function syncCall() {
      var _this = this;

      return function (key) {
        var result = _this.cache[key];

        if (result === undefined) {
          throw new Error("There is no value that is cached with key: ".concat(key));
        }

        return result;
      };
    }
  }]);

  return As;
}(AsyncObject);

module.exports = function (key) {
  return new As(key);
};

},{"./AsyncObject":11}],11:[function(require,module,exports){
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AsyncTree = require('./AsyncTree');
/* abstract class */


var AsyncObject =
/*#__PURE__*/
function () {
  /*
    args: any type (including AsyncObject)
  */
  function AsyncObject() {
    _classCallCheck(this, AsyncObject);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.args = args;
    this.cache = {};
    this.next = undefined;
    this.asKey = undefined;
  } // TO BE OVERRIDDEN


  _createClass(AsyncObject, [{
    key: "asyncCall",
    value: function asyncCall() {
      throw new Error('asyncCall or syncCall must be defined');
    }
  }, {
    key: "syncCall",
    value: function syncCall() {
      throw new Error('asyncCall or syncCall must be defined');
    }
  }, {
    key: "onError",
    value: function onError(error) {
      throw error;
    }
  }, {
    key: "onResult",
    value: function onResult(result) {
      return result;
    }
    /*
      Works only if this.continueAfterFail returns true
        (in that case this.onError and this.onResult will be ignored),
    */

  }, {
    key: "onErrorAndResult",
    value: function onErrorAndResult(error, result) {
      return error || result;
    }
    /*
      If it returns true, then this.onError and this.onResult will be ignored,
      and the represented result of this object
      will be returned by this.onErrorAndResult.
    */

  }, {
    key: "continueAfterFail",
    value: function continueAfterFail() {
      return false;
    }
  }, {
    key: "callbackWithError",
    value: function callbackWithError() {
      return true;
    } // PUBLIC API

  }, {
    key: "call",
    value: function call() {
      this.propagateCache(this);
      new AsyncTree(this).create().call();
    }
  }, {
    key: "after",
    value: function after(asyncObject) {
      this.next = asyncObject;
      return this;
    }
  }, {
    key: "as",
    value: function as(key) {
      this.asKey = key;
      return this;
    } // NOT ALLOWED TO BE OVERRIDDEN

  }, {
    key: "iterateArgs",
    value: function iterateArgs(func) {
      var _this = this;

      this.args.forEach(function (arg, index) {
        func(arg, index, _this.isAsyncObject(arg), _this.isEvent(arg));
      });
    }
  }, {
    key: "hasNoArgs",
    value: function hasNoArgs() {
      return this.args.length === 0;
    }
  }, {
    key: "readyToBeInvoked",
    value: function readyToBeInvoked(readyResultsNum) {
      return this.args.length === readyResultsNum;
    }
  }, {
    key: "callNextTreeIfExists",
    value: function callNextTreeIfExists() {
      if (this.next) {
        this.propagateCache(this.next);
        new AsyncTree(this.next).create().call();
      }
    }
  }, {
    key: "propagateCache",
    value: function propagateCache(arg) {
      var _this2 = this;

      if (this.isAsyncObject(arg)) {
        arg.withCache(this.cache);
        arg.iterateArgs(function (arg) {
          return _this2.propagateCache(arg);
        });
      }
    }
  }, {
    key: "withCache",
    value: function withCache(cache) {
      this.cache = cache;
      return this;
    }
  }, {
    key: "saveValueIntoCacheIfNeeded",
    value: function saveValueIntoCacheIfNeeded(value) {
      if (this.asKey) {
        this.cache[this.asKey] = value;
      }

      return this;
    }
  }, {
    key: "isAsyncObject",
    value: function isAsyncObject(arg) {
      return this.classChain(arg).indexOf('AsyncObject') !== -1;
    }
  }, {
    key: "isEvent",
    value: function isEvent(arg) {
      return this.classChain(arg).indexOf('Event') !== -1;
    }
  }, {
    key: "classChain",
    value: function classChain(obj, chain) {
      if (!chain) {
        chain = [];
      }

      if (typeof obj === 'function') {
        if (!obj.name || obj === Object) {
          return chain;
        }

        return this.classChain(Object.getPrototypeOf(obj), chain.concat(obj.name));
      }

      if (_typeof(obj) === 'object' && obj !== null) {
        return this.classChain(obj.constructor, chain);
      }

      return chain;
    }
  }]);

  return AsyncObject;
}();

module.exports = AsyncObject;

},{"./AsyncTree":12}],12:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleTreeNode = require('./SimpleTreeNode');

var AsyncTreeNode = require('./AsyncTreeNode');

var NotDefinedAsyncTreeNode = require('./NotDefinedAsyncTreeNode');

var AsyncTree =
/*#__PURE__*/
function () {
  /*
    rootField: AsyncObject
  */
  function AsyncTree(rootField) {
    _classCallCheck(this, AsyncTree);

    this.rootField = rootField;
    this.nodes = [];
  } // PUBLIC


  _createClass(AsyncTree, [{
    key: "create",
    value: function create() {
      this.createAsyncTreeNode(this.rootField, new NotDefinedAsyncTreeNode(), 0);
      return this;
    }
  }, {
    key: "call",
    value: function call() {
      var leaves = this.nodes.filter(function (node) {
        return node.isLeaf();
      });
      leaves.forEach(function (leaf) {
        leaf.call();
      });
    } // PRIVATE

  }, {
    key: "createChildNodes",
    value: function createChildNodes(field, parent) {
      var _this = this;

      field.iterateArgs(function (argAsField, index, isAsyncObject, isEvent) {
        if (isAsyncObject) {
          _this.createAsyncTreeNode(argAsField, parent, index);
        } else if (isEvent) {
          _this.createSimpleTreeNode(function () {
            argAsField.body.apply(argAsField, arguments);
          }, parent, index);
        } else {
          _this.createSimpleTreeNode(argAsField, parent, index);
        }
      });
    }
  }, {
    key: "createAsyncTreeNode",
    value: function createAsyncTreeNode(field, parent, index) {
      var asyncTreeNode = new AsyncTreeNode(field, parent, index);
      this.nodes.push(asyncTreeNode);
      this.createChildNodes(field, asyncTreeNode);
    }
  }, {
    key: "createSimpleTreeNode",
    value: function createSimpleTreeNode(field, parent, index) {
      var treeNode = new SimpleTreeNode(field, parent, index);
      this.nodes.push(treeNode);
    }
  }]);

  return AsyncTree;
}();

module.exports = AsyncTree;

},{"./AsyncTreeNode":13,"./NotDefinedAsyncTreeNode":15,"./SimpleTreeNode":17}],13:[function(require,module,exports){
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TreeNode = require('./TreeNode');

var AsyncTreeNode =
/*#__PURE__*/
function (_TreeNode) {
  _inherits(AsyncTreeNode, _TreeNode);

  /*
    field: AsyncObject
    parent: AsyncTreeNode or NotDefinedAsyncTree
    position: int
  */
  function AsyncTreeNode(field, parent, position) {
    var _this;

    _classCallCheck(this, AsyncTreeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AsyncTreeNode).call(this, field, parent, position));
    _this.argResults = [];
    _this.readyResultsNum = 0;
    return _this;
  } // PUBLIC


  _createClass(AsyncTreeNode, [{
    key: "call",
    value: function call() {
      var args = this.argResults;

      try {
        var asyncCall = this.field.asyncCall();

        if (this.field.callbackWithError()) {
          this.invokeAsyncCallWithError.apply(this, [asyncCall].concat(_toConsumableArray(args)));
        } else {
          this.invokeAsyncCallWithoutError.apply(this, [asyncCall].concat(_toConsumableArray(args)));
        }
      } catch (error) {
        if (error.message !== 'asyncCall or syncCall must be defined') {
          if (this.field.continueAfterFail()) {
            this.field.onErrorAndResult(error);
          } else {
            this.field.onError(error);
          }
        } else {
          var syncCall = this.field.syncCall();
          this.invokeSyncCall.apply(this, [syncCall].concat(_toConsumableArray(args)));
        }
      }
    }
  }, {
    key: "isLeaf",
    value: function isLeaf() {
      return this.field.hasNoArgs();
    }
  }, {
    key: "readyToBeInvoked",
    value: function readyToBeInvoked() {
      return this.field.readyToBeInvoked(this.readyResultsNum);
    }
  }, {
    key: "hasParent",
    value: function hasParent() {
      return this.parent instanceof AsyncTreeNode;
    }
  }, {
    key: "insertArgumentResult",
    value: function insertArgumentResult(position, result) {
      this.argResults[position] = result;
      this.readyResultsNum += 1;
    } // PRIVATE

  }, {
    key: "invokeAsyncCallWithError",
    value: function invokeAsyncCallWithError(asyncCall) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      asyncCall.apply(void 0, args.concat([function (error) {
        for (var _len2 = arguments.length, results = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          results[_key2 - 1] = arguments[_key2];
        }

        if (!_this2.processedError.apply(_this2, [error].concat(results))) {
          _this2.processedResult.apply(_this2, results);
        }
      }]));
    }
  }, {
    key: "invokeAsyncCallWithoutError",
    value: function invokeAsyncCallWithoutError(asyncCall) {
      var _this3 = this;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      asyncCall.apply(void 0, args.concat([function () {
        _this3.processedResult.apply(_this3, arguments);
      }]));
    }
  }, {
    key: "invokeSyncCall",
    value: function invokeSyncCall(syncCall) {
      try {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        var syncCallResult = syncCall.apply(void 0, args);
        this.processedResult(syncCallResult);
      } catch (error) {
        this.processedError(error);
      }
    }
  }, {
    key: "processedError",
    value: function processedError(error) {
      var isProcessed = false; // It's not possible to get rid of null here :(

      if (error != null) {
        if (this.field.continueAfterFail()) {
          var _this$field;

          for (var _len5 = arguments.length, results = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            results[_key5 - 1] = arguments[_key5];
          }

          var totalResult = (_this$field = this.field).onErrorAndResult.apply(_this$field, [error].concat(results));

          this.field.saveValueIntoCacheIfNeeded(totalResult);

          if (this.hasParent()) {
            _get(_getPrototypeOf(AsyncTreeNode.prototype), "callParent", this).call(this, totalResult);
          } else {
            this.field.callNextTreeIfExists();
          }
        } else {
          this.field.onError(error);
        }

        isProcessed = true;
      }

      return isProcessed;
    }
  }, {
    key: "processedResult",
    value: function processedResult() {
      var totalResult;

      for (var _len6 = arguments.length, results = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        results[_key6] = arguments[_key6];
      }

      if (this.field.continueAfterFail()) {
        var _this$field2;

        totalResult = (_this$field2 = this.field).onErrorAndResult.apply(_this$field2, [null].concat(results));
      } else {
        var _this$field3;

        totalResult = (_this$field3 = this.field).onResult.apply(_this$field3, results);
      }

      this.field.saveValueIntoCacheIfNeeded(totalResult);

      if (this.hasParent()) {
        _get(_getPrototypeOf(AsyncTreeNode.prototype), "callParent", this).call(this, totalResult);
      } else {
        this.field.callNextTreeIfExists();
      }

      return true;
    }
  }]);

  return AsyncTreeNode;
}(TreeNode);

module.exports = AsyncTreeNode;

},{"./TreeNode":18}],14:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Event =
/*#__PURE__*/
function () {
  function Event() {
    _classCallCheck(this, Event);
  } // TO BE OVERRIDDEN


  _createClass(Event, [{
    key: "body",
    value: function body() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      throw new Error("Method body must be overriden with arguments ".concat(args, " of the event/eventListener you call"));
    }
  }]);

  return Event;
}();

module.exports = Event;

},{}],15:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotDefinedAsyncTreeNode = function NotDefinedAsyncTreeNode() {
  _classCallCheck(this, NotDefinedAsyncTreeNode);
};

module.exports = NotDefinedAsyncTreeNode;

},{}],16:[function(require,module,exports){
"use strict";
'use strcit';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NullError =
/*#__PURE__*/
function (_Error) {
  _inherits(NullError, _Error);

  function NullError() {
    var _this;

    _classCallCheck(this, NullError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NullError).call(this, 'It is a null error'));
    _this.isNull = true;
    return _this;
  }

  return NullError;
}(_wrapNativeSuper(Error));

module.exports = NullError;

},{}],17:[function(require,module,exports){
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TreeNode = require('./TreeNode');

var SimpleTreeNode =
/*#__PURE__*/
function (_TreeNode) {
  _inherits(SimpleTreeNode, _TreeNode);

  /*
    field: simple argument (not AsyncObject, can be Event)
    parent: AsyncTreeNode or NotDefinedAsyncTree
    position: int
  */
  function SimpleTreeNode(field, parent, position) {
    _classCallCheck(this, SimpleTreeNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(SimpleTreeNode).call(this, field, parent, position));
  } // PUBLIC


  _createClass(SimpleTreeNode, [{
    key: "call",
    value: function call() {
      _get(_getPrototypeOf(SimpleTreeNode.prototype), "callParent", this).call(this, this.field);
    }
  }, {
    key: "isLeaf",
    value: function isLeaf() {
      return true;
    }
  }]);

  return SimpleTreeNode;
}(TreeNode);

module.exports = SimpleTreeNode;

},{"./TreeNode":18}],18:[function(require,module,exports){
'use strict';
/* abstract class */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TreeNode =
/*#__PURE__*/
function () {
  /*
    field: just some value (argument), also can be Event
    parent: AsyncTreeNode
    position: int
  */
  function TreeNode(field, parent, position) {
    _classCallCheck(this, TreeNode);

    this.field = field;
    this.parent = parent;
    this.position = position;
  } // TO BE OVERRIDEN


  _createClass(TreeNode, [{
    key: "call",
    value: function call(result) {
      result = result || '';
      throw new Error("call must be overridden and insert result ".concat(result, " into parent node"));
    }
  }, {
    key: "isLeaf",
    value: function isLeaf() {
      throw new Error('isLeaf must be overridden');
    } // NOT ALLOWED TO BE OVERRIDDEN

  }, {
    key: "callParent",
    value: function callParent(result) {
      this.parent.insertArgumentResult(this.position, result);

      if (this.parent.readyToBeInvoked()) {
        this.parent.call();
      }
    }
  }]);

  return TreeNode;
}();

module.exports = TreeNode;

},{}],19:[function(require,module,exports){
"use strict";

var PageAsyncObject = require('./AsyncObject');

var _require = require('@cuties/cutie'),
    AsyncObject = _require.AsyncObject;

module.exports = function (asyncObjects) {
  Object.keys(asyncObjects).forEach(function (key) {
    if (asyncObjects[key].prototype instanceof AsyncObject) {
      Object.setPrototypeOf(asyncObjects[key].prototype, PageAsyncObject.prototype);
      Object.setPrototypeOf(asyncObjects[key], PageAsyncObject);
    }
  });
  return asyncObjects;
};

},{"./AsyncObject":11,"@cuties/cutie":1}],20:[function(require,module,exports){
"use strict";

module.exports = {
  AsyncObject: require('./AsyncObject'),
  Event: require('./Event'),
  as: require('./As'),
  NullError: require('./NullError'),
  browserified: require('./browserified')
};

},{"./As":10,"./AsyncObject":11,"./Event":14,"./NullError":16,"./browserified":19}],21:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;

},{}],22:[function(require,module,exports){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

},{}],23:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":21,"./lib/rng":22}],24:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E =
/*#__PURE__*/
function () {
  function E(node) {
    _classCallCheck(this, E);

    this.node = node;
  }

  _createClass(E, [{
    key: "activate",
    value: function activate() {
      throw new Error('activate function must be defined');
    }
  }]);

  return E;
}();

module.exports = E;

},{}],25:[function(require,module,exports){
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

var E = require('./E');

var _require = require('./../cutie/exports'),
    as = _require.as;

var _require2 = require('./../async-ajax/exports'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody,
    ResponseHeaders = _require2.ResponseHeaders,
    ResponseStatusCode = _require2.ResponseStatusCode,
    JSResponseByHTTPReponseComponents = _require2.JSResponseByHTTPReponseComponents;

var _require3 = require('./../async-object/exports'),
    CreatedOptions = _require3.CreatedOptions;

var _require4 = require('./../async-dom/exports'),
    ShownElement = _require4.ShownElement,
    HiddenElement = _require4.HiddenElement,
    EnabledElement = _require4.EnabledElement,
    DisabledElement = _require4.DisabledElement,
    FirstParsedElmSelector = _require4.FirstParsedElmSelector;

var _require5 = require('./../async-json/exports'),
    ParsedJSON = _require5.ParsedJSON,
    StringifiedJSON = _require5.StringifiedJSON;

var _require6 = require('./../async-string/exports'),
    StringFromBuffer = _require6.StringFromBuffer;

var _require7 = require('./../actions/exports'),
    AppliedActionsOnResponse = _require7.AppliedActionsOnResponse;

var _require8 = require('./../file/exports'),
    FileInfo = _require8.FileInfo;

var _require9 = require('./../events/exports'),
    ShowProgressEvent = _require9.ShowProgressEvent,
    ShowFileReaderProgressEvent = _require9.ShowFileReaderProgressEvent,
    ShowFileReaderEndEvent = _require9.ShowFileReaderEndEvent;

var VALIDATION_PATTERNS = {
  date: /[0-3]\d\/[0-1]\d\/\d\d\d\d/,
  dateTime: /[0-3]\d\/[0-1]\d\/\d\d\d\d, \d\d:\d\d/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  month: /^\d\d\d\d-\d\d$/,
  number: /(\d)+/,
  password: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
  tel: /[0-9]{0,14}$/,
  time: /\d\d:\d\d/,
  // eslint-disable-next-line  no-useless-escape
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
};

var EFORM =
/*#__PURE__*/
function (_E) {
  _inherits(EFORM, _E);

  function EFORM(node) {
    _classCallCheck(this, EFORM);

    return _possibleConstructorReturn(this, _getPrototypeOf(EFORM).call(this, node));
  }

  _createClass(EFORM, [{
    key: "activate",
    value: function activate() {
      this.setup();
    }
  }, {
    key: "setup",
    value: function setup() {
      this.replaceWithForm();
      this.node.progressBars = this.node.getElementsByTagName('progress');
      this.node.inputs = this.node.getElementsByTagName('input');
      this.node.selects = this.node.getElementsByTagName('select');
      this.node.textareas = this.node.getElementsByTagName('textarea');
      this.node.localStorageValues = this.node.getElementsByTagName('e-local-storage-value');
      this.node.sessionStorageValues = this.node.getElementsByTagName('e-session-storage-value');
      this.node.buttons = this.node.getElementsByTagName('button');
      this.tuneFileInputs(this.filteredFileInputs(this.node.inputs));
      this.prepareDifferentFormElements();
      this.prepareProgressBars(this.node.progressBars);
    }
  }, {
    key: "replaceWithForm",
    value: function replaceWithForm() {
      var form = document.createElement('form');
      form.setAttribute('novalidate', 'true');
      form.setAttribute('data-e-form', 'true');

      for (var i = 0; i < this.node.attributes.length; i++) {
        form.setAttribute(this.node.attributes[i].name, this.node.attributes[i].value);
      }

      form.onsubmit = function () {
        return false;
      };

      form.submit = this.submit;
      form.validationErrorBoxes = [];
      this.setupMethodsForForm(form);

      while (this.node.firstChild) {
        var child = this.node.removeChild(this.node.firstChild);
        form.appendChild(child);
      }

      this.node.parentNode.replaceChild(form, this.node);
      this.node = form;
    }
  }, {
    key: "setupMethodsForForm",
    value: function setupMethodsForForm(form) {
      form.requestBody = this.requestBody;
      form.retrievedValuesFromInputsForRequestBody = this.retrievedValuesFromInputsForRequestBody;
      form.retrievedValuesFromSelectsForRequestBody = this.retrievedValuesFromSelectsForRequestBody;
      form.retrievedValuesFromTextareasForRequestBody = this.retrievedValuesFromTextareasForRequestBody;
      form.retrievedValuesFromLocalStorageForRequestBody = this.retrievedValuesFromLocalStorageForRequestBody;
      form.retrievedValuesFromSessionStorageForRequestBody = this.retrievedValuesFromSessionStorageForRequestBody;
      form.hideAllErrorsForForm = this.hideAllErrorsForForm;
      form.validateDifferentFormElements = this.validateDifferentFormElements;
      form.validateFormElements = this.validateFormElements;
      form.validateFormElement = this.validateFormElement;
      form.isFormValid = this.isFormValid;
      form.isCheckbox = this.isCheckbox;
      form.isFile = this.isFile;
      form.scrollToFirstErrorBox = this.scrollToFirstErrorBox;
      form.showErrorForFormElement = this.showErrorForFormElement;
    }
  }, {
    key: "prepareDifferentFormElements",
    value: function prepareDifferentFormElements() {
      this.prepareFormElements(this.node.inputs);
      this.prepareFormElements(this.node.selects);
      this.prepareFormElements(this.node.textareas);
      this.prepareFormElements(this.node.localStorageValues);
      this.prepareFormElements(this.node.sessionStorageValues);
      this.prepareFormElements(this.node.buttons);
    }
  }, {
    key: "prepareFormElements",
    value: function prepareFormElements(elms) {
      for (var index = 0; index < elms.length; index++) {
        var elm = elms[index];
        var ajaxIcon = document.querySelector(elm.getAttribute('data-ajax-icon'));

        if (ajaxIcon) {
          ajaxIcon.style.display = 'none';
        }
      }
    }
  }, {
    key: "prepareProgressBars",
    value: function prepareProgressBars(progressBars) {
      for (var index = 0; index < progressBars.length; index++) {
        if (progressBars[index]) {
          var progressBar = progressBars[index];
          progressBar.max = 100;
          progressBar.value = 0;
          progressBar.style.display = 'none';
        }
      }
    }
  }, {
    key: "submit",
    value: function submit(target) {
      if (!target) {
        throw new Error('you must pass target in submit method like: \'this.form.submit(this)\'');
      }

      var requestBody = this.requestBody(this);
      this.hideAllErrorsForForm(this);
      var validations = [];
      this.validateDifferentFormElements(this, requestBody, validations);
      console.log(validations);

      if (this.isFormValid(this, validations)) {
        new DisabledElement(target).after(new FirstParsedElmSelector(target.getAttribute('data-ajax-icon')).as('AJAX_ICON').after(new ShownElement(as('AJAX_ICON')).after(new ResponseFromAjaxRequest(new CreatedOptions('url', target.getAttribute('data-request-url'), 'headers', new ParsedJSON(target.getAttribute('data-request-headers') || '{}'), 'method', target.getAttribute('data-request-method') || 'POST', 'uploadProgressEvent', new ShowProgressEvent(new FirstParsedElmSelector(target.getAttribute('data-upload-progress-bar'))), 'progressEvent', new ShowProgressEvent(new FirstParsedElmSelector(target.getAttribute('data-progress-bar')))), new StringifiedJSON(requestBody)).as('RESPONSE').after(new EnabledElement(target).after(new HiddenElement(as('AJAX_ICON')).after(new AppliedActionsOnResponse(target.tagName, target.getAttribute('data-response-name') || 'response', new JSResponseByHTTPReponseComponents(new ParsedJSON(new StringFromBuffer(new ResponseBody(as('RESPONSE')))), new ResponseHeaders(as('RESPONSE')), new ResponseStatusCode(as('RESPONSE'))), target.getAttribute('data-actions-on-response')))))))).call();
      } else {
        this.scrollToFirstErrorBox(this);
      }
    }
  }, {
    key: "isFormValid",
    value: function isFormValid(form, validations) {
      for (var i = 0; i < validations.length; i++) {
        if (!validations[i]) {
          form.showErrorForFormElement(form, form, form.getAttribute('data-validation-bad-format-error-message') || "the form is invalid", form.getAttribute('data-validation-error-class-for-element'), form.getAttribute('data-validation-error-class-for-message-box'));
          return false;
        }
      }

      return true;
    }
  }, {
    key: "validateDifferentFormElements",
    value: function validateDifferentFormElements(form, requestBody, validations) {
      form.validateFormElements(form, form.inputs, requestBody, validations);
      form.validateFormElements(form, form.selects, requestBody, validations);
      form.validateFormElements(form, form.textareas, requestBody, validations);
      form.validateFormElements(form, form.localStorageValues, requestBody, validations);
      form.validateFormElements(form, form.sessionStorageValues, requestBody, validations);
    }
  }, {
    key: "validateFormElements",
    value: function validateFormElements(form, elements, requestBody, results) {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        results.push(form.validateFormElement(form, element, requestBody));
      }
    }
  }, {
    key: "validateFormElement",
    value: function validateFormElement(form, element, requestBody) {
      var validationPatternAttribute = element.getAttribute('pattern');
      var requiredAttribute = element.hasAttribute('required');
      var nameAttribute = element.getAttribute('name');
      var value = requestBody[nameAttribute];

      if (typeof value === 'string') {
        value = value.trim();
      }

      if (requiredAttribute) {
        if (!value) {
          form.showErrorForFormElement(form, element, element.getAttribute('data-validation-absence-error-message') || "".concat(nameAttribute, " is required"), element.getAttribute('data-validation-error-class-for-element'), element.getAttribute('data-validation-error-class-for-message-box'));
          return false;
        }

        if (form.isFile(element)) {
          var minFilesNumber = element.getAttribute('data-validation-min-files-number') * 1 || 1;

          if (value.length < minFilesNumber) {
            form.showErrorForFormElement(form, element, element.getAttribute('data-validation-absence-error-message') || "".concat(nameAttribute, " must have at least ").concat(minFilesNumber, " files"), element.getAttribute('data-validation-error-class-for-element'), element.getAttribute('data-validation-error-class-for-message-box'));
            return false;
          }
        }

        if (form.isCheckbox(element)) {
          var checkboxValue = element.getAttribute('value');

          if (!checkboxValue) {
            throw new Error('checkbox must have \'value\' attribute');
          }

          var checkboxValueIndex = value.findIndex(function (v) {
            return Object.keys(v)[0] === checkboxValue;
          });

          if (!value[checkboxValueIndex][checkboxValue]) {
            form.showErrorForFormElement(form, element, element.getAttribute('data-validation-absence-error-message') || "".concat(nameAttribute, " is required to be true for this value"), element.getAttribute('data-validation-error-class-for-element'), element.getAttribute('data-validation-error-class-for-message-box'));
            return false;
          }
        }
      }

      if (validationPatternAttribute) {
        var validationPattern = VALIDATION_PATTERNS[validationPatternAttribute] || new RegExp(validationPatternAttribute);

        if (!validationPattern.test(value)) {
          form.showErrorForFormElement(form, element, element.getAttribute('data-validation-bad-format-error-message') || "".concat(nameAttribute, " must have format ").concat(validationPattern), element.getAttribute('data-validation-error-class-for-element'), element.getAttribute('data-validation-error-class-for-message-box'));
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isCheckbox",
    value: function isCheckbox(element) {
      return element instanceof HTMLInputElement && element.type.toLowerCase() === 'checkbox';
    }
  }, {
    key: "isFile",
    value: function isFile(element) {
      return element instanceof HTMLInputElement && element.type.toLowerCase() === 'file';
    }
  }, {
    key: "showErrorForFormElement",
    value: function showErrorForFormElement(form, element, errorMessage, elementErrorClass, messageBoxErrorClass) {
      var elementWithErrorMessageBox = document.createElement('div');
      var messageBox = document.createElement('div');
      messageBox.innerText = errorMessage;
      element.parentNode.replaceChild(elementWithErrorMessageBox, element);
      elementWithErrorMessageBox.appendChild(element);
      elementWithErrorMessageBox.appendChild(messageBox);

      if (elementErrorClass) {
        element.classList.add(elementErrorClass);
      }

      if (messageBoxErrorClass) {
        messageBox.classList.add(messageBoxErrorClass);
      }

      form.validationErrorBoxes.push({
        elementWithErrorMessageBox: elementWithErrorMessageBox,
        element: element
      });

      var listener = function listener() {
        if (elementWithErrorMessageBox.parentNode) {
          elementWithErrorMessageBox.parentNode.replaceChild(element, elementWithErrorMessageBox);

          if (elementErrorClass) {
            element.classList.remove(elementErrorClass);
          }
        }

        element.removeEventListener('focus', listener);
        element.focus();
      };

      element.addEventListener('focus', listener);
    }
  }, {
    key: "hideAllErrorsForForm",
    value: function hideAllErrorsForForm(form) {
      form.validationErrorBoxes.forEach(function (errorBox) {
        if (errorBox.elementWithErrorMessageBox.parentNode) {
          errorBox.elementWithErrorMessageBox.parentNode.replaceChild(errorBox.element, errorBox.elementWithErrorMessageBox);
        }

        var elementErrorClass = errorBox.element.getAttribute('data-validation-error-class-for-element');

        if (elementErrorClass) {
          errorBox.element.classList.remove(elementErrorClass);
        }
      });
      form.validationErrorBoxes = [];
    }
  }, {
    key: "scrollToFirstErrorBox",
    value: function scrollToFirstErrorBox(form) {
      form.validationErrorBoxes[0].elementWithErrorMessageBox.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, {
    key: "requestBody",
    value: function requestBody(form) {
      var requestBody = {};
      form.retrievedValuesFromInputsForRequestBody(form.inputs, requestBody);
      form.retrievedValuesFromSelectsForRequestBody(form.selects, requestBody);
      form.retrievedValuesFromTextareasForRequestBody(form.textareas, requestBody);
      form.retrievedValuesFromLocalStorageForRequestBody(form.localStorageValues, requestBody);
      form.retrievedValuesFromSessionStorageForRequestBody(form.sessionStorageValues, requestBody);
      return requestBody;
    }
  }, {
    key: "retrievedValuesFromInputsForRequestBody",
    value: function retrievedValuesFromInputsForRequestBody(inputs, requestBody) {
      for (var index = 0; index < inputs.length; index++) {
        var input = inputs[index];

        if (!input.name) {
          throw new Error("input ".concat(input, " has no name"));
        }

        if (input.type.toLowerCase() === 'radio') {
          if (input.checked) {
            requestBody[input.name] = input.value;
          }
        } else if (input.type.toLowerCase() === 'checkbox') {
          if (!requestBody[input.name]) {
            requestBody[input.name] = [];
          }

          var inputValue = input.value;

          if (!inputValue) {
            throw new Error('checkbox must have \'value\' attribute');
          }

          var inputValueObj = {};
          inputValueObj[inputValue] = input.checked;
          requestBody[input.name].push(inputValueObj);
        } else if (input.type.toLowerCase() === 'file') {
          requestBody[input.name] = input.filesInfo;
        } else {
          requestBody[input.name] = input.value;
        }
      }
    }
  }, {
    key: "retrievedValuesFromSelectsForRequestBody",
    value: function retrievedValuesFromSelectsForRequestBody(selects, requestBody) {
      for (var index = 0; index < selects.length; index++) {
        var select = selects[index];

        if (!select.name) {
          throw new Error("select ".concat(select, " has no name"));
        }

        requestBody[select.name] = select.value;
      }
    }
  }, {
    key: "retrievedValuesFromTextareasForRequestBody",
    value: function retrievedValuesFromTextareasForRequestBody(textareas, requestBody) {
      for (var index = 0; index < textareas.length; index++) {
        var textarea = textareas[index];

        if (!textarea.name) {
          throw new Error("textarea ".concat(textarea, " has no name"));
        }

        requestBody[textarea.name] = textarea.value;
      }
    }
  }, {
    key: "retrievedValuesFromLocalStorageForRequestBody",
    value: function retrievedValuesFromLocalStorageForRequestBody(localStorageValues, requestBody) {
      for (var index = 0; index < localStorageValues.length; index++) {
        var localStorageValue = localStorageValues[index];

        if (!localStorageValue.name) {
          throw new Error("localStorageValue ".concat(localStorageValue, " has no name"));
        }

        requestBody[localStorageValue.name] = localStorageValue.value();
      }
    }
  }, {
    key: "retrievedValuesFromSessionStorageForRequestBody",
    value: function retrievedValuesFromSessionStorageForRequestBody(sessionStorageValues, requestBody) {
      for (var index = 0; index < sessionStorageValues.length; index++) {
        var sessionStorageValue = sessionStorageValues[index];

        if (!sessionStorageValue.name) {
          throw new Error("sessionStorageValue ".concat(sessionStorageValue, " has no name"));
        }

        requestBody[sessionStorageValue.name] = sessionStorageValue.value();
      }
    }
  }, {
    key: "tuneFileInputs",
    value: function tuneFileInputs(fileInputs) {
      for (var index = 0; index < fileInputs.length; index++) {
        this.tuneFileInput(fileInputs[index]);
      }
    }
  }, {
    key: "tuneFileInput",
    value: function tuneFileInput(fileInput) {
      var _this = this;

      var readProgressBar = document.querySelector(fileInput.getAttribute('data-read-progress-bar'));
      fileInput.addEventListener('change', function () {
        _this.readFilesContentForRequestBody(fileInput, readProgressBar);
      });
    }
  }, {
    key: "readFilesContentForRequestBody",
    value: function readFilesContentForRequestBody(fileInput, readProgressBar) {
      fileInput.filesInfo = [];
      var filesRead = {
        count: 0
      };

      for (var index = 0; index < fileInput.files.length; index++) {
        this.readFileContentForRequestBody(fileInput, readProgressBar, index, filesRead, fileInput.files.length);
      }
    }
  }, {
    key: "readFileContentForRequestBody",
    value: function readFileContentForRequestBody(fileInput, readProgressBar, index, filesRead, filesLength) {
      var file = fileInput.files[index];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        fileInput.filesInfo[index] = new FileInfo(file.name, file.size, file.type, reader.result, file.lastModifiedDate);
      };

      reader.onprogress = new ShowFileReaderProgressEvent(readProgressBar);
      reader.onloadend = new ShowFileReaderEndEvent(readProgressBar, filesRead, filesLength);

      reader.onerror = function () {
        throw new Error("cound not read file ".concat(file.name));
      };
    }
  }, {
    key: "filteredFileInputs",
    value: function filteredFileInputs(inputs) {
      var fileInputs = {
        length: 0
      };

      for (var index = 0; index < inputs.length; index++) {
        if (inputs[index].type.toLowerCase() === 'file') {
          fileInputs[fileInputs.length] = inputs[index];
          fileInputs.length += 1;
        }
      }

      return fileInputs;
    }
  }]);

  return EFORM;
}(E);

module.exports = EFORM;

},{"./../actions/exports":40,"./../async-ajax/exports":48,"./../async-dom/exports":80,"./../async-json/exports":90,"./../async-object/exports":98,"./../async-string/exports":106,"./../cutie/exports":119,"./../events/exports":126,"./../file/exports":128,"./E":24}],26:[function(require,module,exports){
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

var E = require('./E');

var _require = require('./../cutie/exports'),
    as = _require.as;

var _require2 = require('./../async-ajax/exports'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody,
    ResponseHeaders = _require2.ResponseHeaders,
    ResponseStatusCode = _require2.ResponseStatusCode,
    JSResponseByHTTPReponseComponents = _require2.JSResponseByHTTPReponseComponents;

var _require3 = require('./../async-string/exports'),
    StringFromBuffer = _require3.StringFromBuffer;

var _require4 = require('./../async-json/exports'),
    ParsedJSON = _require4.ParsedJSON;

var _require5 = require('./../actions/exports'),
    AppliedActionsOnResponse = _require5.AppliedActionsOnResponse;

var GOOGLE_API_SRC = 'https://apis.google.com/js/api:client.js';

var EGOOGLE_OAUTH_BUTTON =
/*#__PURE__*/
function (_E) {
  _inherits(EGOOGLE_OAUTH_BUTTON, _E);

  function EGOOGLE_OAUTH_BUTTON(node) {
    _classCallCheck(this, EGOOGLE_OAUTH_BUTTON);

    return _possibleConstructorReturn(this, _getPrototypeOf(EGOOGLE_OAUTH_BUTTON).call(this, node));
  }

  _createClass(EGOOGLE_OAUTH_BUTTON, [{
    key: "activate",
    value: function activate() {
      var _this = this;

      this.replaceWithButton();
      var googleSignInMetaElm = this.googleSignInMetaElm();
      var googleApiScriptElm = this.googleApiScriptElm();
      document.head.prepend(googleSignInMetaElm, googleApiScriptElm);
      this.node.style.display = 'none';

      googleApiScriptElm.onload = function () {
        _this.initGoogleOauth();
      };
    }
  }, {
    key: "replaceWithButton",
    value: function replaceWithButton() {
      var button = document.createElement('button');
      button.setAttribute('data-e-google-oauth-button', 'true');

      for (var i = 0; i < this.node.attributes.length; i++) {
        button.setAttribute(this.node.attributes[i].name, this.node.attributes[i].value);
      }

      while (this.node.firstChild) {
        var child = this.node.removeChild(this.node.firstChild);
        button.appendChild(child);
      }

      this.node.parentNode.replaceChild(button, this.node);
      this.node = button;
    }
  }, {
    key: "initGoogleOauth",
    value: function initGoogleOauth() {
      var _this2 = this;

      this.node.style.display = ''; // eslint-disable-next-line no-undef

      gapi.load('auth2', function () {
        // eslint-disable-next-line no-undef
        var auth2 = gapi.auth2.init({
          client_id: _this2.node.getAttribute('data-client-id'),
          cookiepolicy: _this2.node.getAttribute('data-cookiepolicy') || 'single_host_origin',
          scope: _this2.node.getAttribute('data-scope') || 'profile'
        });
        auth2.attachClickHandler(_this2.node, {}, function (googleUser) {
          var body = {};
          body[_this2.node.getAttribute('data-request-token-key') || 'googleToken'] = googleUser.getAuthResponse().id_token;
          new ResponseFromAjaxRequest({
            url: _this2.node.getAttribute('data-redirect-url') || '/',
            method: 'POST'
          }, JSON.stringify(body)).as('RESPONSE').after(new AppliedActionsOnResponse(_this2.node.tagName, _this2.node.getAttribute('data-response-name') || 'response', new JSResponseByHTTPReponseComponents(new ParsedJSON(new StringFromBuffer(new ResponseBody(as('RESPONSE')))), new ResponseHeaders(as('RESPONSE')), new ResponseStatusCode(as('RESPONSE'))), _this2.node.getAttribute('data-actions-on-response'))).call();
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
      googleSignInMetaElm.setAttribute('content', this.node.getAttribute('data-client-id'));
      return googleSignInMetaElm;
    }
  }, {
    key: "googleApiScriptElm",
    value: function googleApiScriptElm() {
      var googleApiScriptElm = document.createElement('script');
      googleApiScriptElm.setAttribute('src', GOOGLE_API_SRC);
      return googleApiScriptElm;
    }
  }]);

  return EGOOGLE_OAUTH_BUTTON;
}(E);

module.exports = EGOOGLE_OAUTH_BUTTON;

},{"./../actions/exports":40,"./../async-ajax/exports":48,"./../async-json/exports":90,"./../async-string/exports":106,"./../cutie/exports":119,"./E":24}],27:[function(require,module,exports){
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

var E = require('./E');

var _require = require('./../async-dom/exports'),
    UnwrappedChildrenOfParent = _require.UnwrappedChildrenOfParent,
    ElementWithInnerHTML = _require.ElementWithInnerHTML;

var _require2 = require('./../async-ajax/exports'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var _require3 = require('./../async-object/exports'),
    CreatedOptions = _require3.CreatedOptions;

var _require4 = require('./../async-json/exports'),
    ParsedJSON = _require4.ParsedJSON;

var EHTML =
/*#__PURE__*/
function (_E) {
  _inherits(EHTML, _E);

  function EHTML(node) {
    _classCallCheck(this, EHTML);

    return _possibleConstructorReturn(this, _getPrototypeOf(EHTML).call(this, node));
  }

  _createClass(EHTML, [{
    key: "activate",
    value: function activate() {
      new UnwrappedChildrenOfParent(new ElementWithInnerHTML(this.node, new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', this.node.getAttribute('data-src'), 'method', 'GET', 'headers', new ParsedJSON(this.node.getAttribute('data-headers') || '{}')))))).call();
    }
  }]);

  return EHTML;
}(E);

module.exports = EHTML;

},{"./../async-ajax/exports":48,"./../async-dom/exports":80,"./../async-json/exports":90,"./../async-object/exports":98,"./E":24}],28:[function(require,module,exports){
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

var E = require('./E');

var _require = require('./../cutie/exports'),
    as = _require.as;

var _require2 = require('./../async-dom/exports'),
    FirstParsedElmSelector = _require2.FirstParsedElmSelector,
    PreparedProgressBar = _require2.PreparedProgressBar,
    ShownElement = _require2.ShownElement,
    HiddenElement = _require2.HiddenElement;

var _require3 = require('./../async-ajax/exports'),
    ResponseFromAjaxRequest = _require3.ResponseFromAjaxRequest,
    ResponseBody = _require3.ResponseBody,
    ResponseHeaders = _require3.ResponseHeaders,
    ResponseStatusCode = _require3.ResponseStatusCode,
    JSResponseByHTTPReponseComponents = _require3.JSResponseByHTTPReponseComponents;

var _require4 = require('./../async-object/exports'),
    CreatedOptions = _require4.CreatedOptions;

var _require5 = require('./../async-json/exports'),
    ParsedJSON = _require5.ParsedJSON;

var _require6 = require('./../async-string/exports'),
    StringFromBuffer = _require6.StringFromBuffer;

var _require7 = require('./../events/exports'),
    ShowProgressEvent = _require7.ShowProgressEvent;

var _require8 = require('./../actions/exports'),
    AppliedActionsOnResponse = _require8.AppliedActionsOnResponse;

var EJSON =
/*#__PURE__*/
function (_E) {
  _inherits(EJSON, _E);

  function EJSON(node) {
    _classCallCheck(this, EJSON);

    return _possibleConstructorReturn(this, _getPrototypeOf(EJSON).call(this, node));
  }

  _createClass(EJSON, [{
    key: "activate",
    value: function activate() {
      new ShownElement(new FirstParsedElmSelector(this.node.getAttribute('data-ajax-icon')).as('AJAX_ICON')).after(new PreparedProgressBar(new FirstParsedElmSelector(this.node.getAttribute('data-progress-bar'))).as('PROGRESS_BAR').after(new ResponseFromAjaxRequest(new CreatedOptions('url', this.node.getAttribute('data-src'), 'method', 'GET', 'headers', new ParsedJSON(this.node.getAttribute('data-headers') || '{}'), 'progressEvent', new ShowProgressEvent(as('PROGRESS_BAR')))).as('RESPONSE').after(new HiddenElement(as('AJAX_ICON')).after(new AppliedActionsOnResponse(this.node.tagName, this.node.getAttribute('data-response-name') || 'response', new JSResponseByHTTPReponseComponents(new ParsedJSON(new StringFromBuffer(new ResponseBody(as('RESPONSE')))), new ResponseHeaders(as('RESPONSE')), new ResponseStatusCode(as('RESPONSE'))), this.node.getAttribute('data-actions-on-response')))))).call();
    }
  }]);

  return EJSON;
}(E);

module.exports = EJSON;

},{"./../actions/exports":40,"./../async-ajax/exports":48,"./../async-dom/exports":80,"./../async-json/exports":90,"./../async-object/exports":98,"./../async-string/exports":106,"./../cutie/exports":119,"./../events/exports":126,"./E":24}],29:[function(require,module,exports){
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

var E = require('./E');

var ELOCAL_STORAGE_VALUE =
/*#__PURE__*/
function (_E) {
  _inherits(ELOCAL_STORAGE_VALUE, _E);

  function ELOCAL_STORAGE_VALUE(node) {
    _classCallCheck(this, ELOCAL_STORAGE_VALUE);

    return _possibleConstructorReturn(this, _getPrototypeOf(ELOCAL_STORAGE_VALUE).call(this, node));
  }

  _createClass(ELOCAL_STORAGE_VALUE, [{
    key: "activate",
    value: function activate() {
      var _this = this;

      this.node.name = this.node.getAttribute('name');

      this.node.value = function () {
        return localStorage.getItem(_this.node.getAttribute('data-key'));
      };
    }
  }]);

  return ELOCAL_STORAGE_VALUE;
}(E);

module.exports = ELOCAL_STORAGE_VALUE;

},{"./E":24}],30:[function(require,module,exports){
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

var E = require('./E');

var EPAGE_URL =
/*#__PURE__*/
function (_E) {
  _inherits(EPAGE_URL, _E);

  function EPAGE_URL(node) {
    _classCallCheck(this, EPAGE_URL);

    return _possibleConstructorReturn(this, _getPrototypeOf(EPAGE_URL).call(this, node));
  }

  _createClass(EPAGE_URL, [{
    key: "activate",
    value: function activate() {
      var urlParams = {};
      var urlPattern = this.node.getAttribute('data-url-pattern');
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

  return EPAGE_URL;
}(E);

module.exports = EPAGE_URL;

},{"./E":24}],31:[function(require,module,exports){
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

var E = require('./E');

var ESESSION_STORAGE_VALUE =
/*#__PURE__*/
function (_E) {
  _inherits(ESESSION_STORAGE_VALUE, _E);

  function ESESSION_STORAGE_VALUE(node) {
    _classCallCheck(this, ESESSION_STORAGE_VALUE);

    return _possibleConstructorReturn(this, _getPrototypeOf(ESESSION_STORAGE_VALUE).call(this, node));
  }

  _createClass(ESESSION_STORAGE_VALUE, [{
    key: "activate",
    value: function activate() {
      var _this = this;

      this.node.name = this.node.getAttribute('name');

      this.node.value = function () {
        return sessionStorage.getItem(_this.node.getAttribute('data-key'));
      };
    }
  }]);

  return ESESSION_STORAGE_VALUE;
}(E);

module.exports = ESESSION_STORAGE_VALUE;

},{"./E":24}],32:[function(require,module,exports){
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

var E = require('./E');

var _require = require('./../async-location/exports'),
    TurboRedirected = _require.TurboRedirected;

var _require2 = require('./../async-json/exports'),
    ParsedJSON = _require2.ParsedJSON;

var ETURBOLINK =
/*#__PURE__*/
function (_E) {
  _inherits(ETURBOLINK, _E);

  function ETURBOLINK(node) {
    _classCallCheck(this, ETURBOLINK);

    return _possibleConstructorReturn(this, _getPrototypeOf(ETURBOLINK).call(this, node));
  }

  _createClass(ETURBOLINK, [{
    key: "activate",
    value: function activate() {
      var _this = this;

      this.replaceWithLink();
      this.node.addEventListener('click', function () {
        new TurboRedirected(_this.node.getAttribute('data-href'), new ParsedJSON(_this.node.getAttribute('data-headers') || '{}'), {
          ajaxFavicon: _this.node.getAttribute('data-ajax-favicon'),
          progressBarClassName: _this.node.getAttribute('data-with-progress-bar'),
          progressBarPlace: _this.node.getAttribute('data-progress-bar-place')
        }).call();
      });
    }
  }, {
    key: "replaceWithLink",
    value: function replaceWithLink() {
      var link = document.createElement('a');
      link.setAttribute('data-e-turbolink', 'true');

      for (var i = 0; i < this.node.attributes.length; i++) {
        link.setAttribute(this.node.attributes[i].name, this.node.attributes[i].value);
      }

      while (this.node.firstChild) {
        var child = this.node.removeChild(this.node.firstChild);
        link.appendChild(child);
      }

      this.node.parentNode.replaceChild(link, this.node);
      this.node = link;
    }
  }]);

  return ETURBOLINK;
}(E);

module.exports = ETURBOLINK;

},{"./../async-json/exports":90,"./../async-location/exports":93,"./E":24}],33:[function(require,module,exports){
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

var E = require('./E');

var _require = require('./../async-dom/exports'),
    ElementWithMappedObject = _require.ElementWithMappedObject;

var EVAR_MAP =
/*#__PURE__*/
function (_E) {
  _inherits(EVAR_MAP, _E);

  function EVAR_MAP(node) {
    _classCallCheck(this, EVAR_MAP);

    return _possibleConstructorReturn(this, _getPrototypeOf(EVAR_MAP).call(this, node));
  }

  _createClass(EVAR_MAP, [{
    key: "activate",
    value: function activate() {
      new ElementWithMappedObject(this.node).call();
    }
  }]);

  return EVAR_MAP;
}(E);

module.exports = EVAR_MAP;

},{"./../async-dom/exports":80,"./E":24}],34:[function(require,module,exports){
"use strict";

module.exports = {
  'e-html': require('./EHTML'),
  'e-json': require('./EJSON'),
  'e-form': require('./EFORM'),
  'e-local-storage-value': require('./ELOCAL_STORAGE_VALUE'),
  'e-session-storage-value': require('./ESESSION_STORAGE_VALUE'),
  'e-google-oauth-button': require('./EGOOGLE_OAUTH_BUTTON'),
  'e-page-url': require('./EPAGE_URL'),
  'e-var-map': require('./EVAR_MAP'),
  'e-turbolink': require('./ETURBOLINK')
};

},{"./EFORM":25,"./EGOOGLE_OAUTH_BUTTON":26,"./EHTML":27,"./EJSON":28,"./ELOCAL_STORAGE_VALUE":29,"./EPAGE_URL":30,"./ESESSION_STORAGE_VALUE":31,"./ETURBOLINK":32,"./EVAR_MAP":33}],35:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./string/exports'),
    StringWithMappedObjectAndAppliedVariables = _require.StringWithMappedObjectAndAppliedVariables;

var ELEMENTS = require('./E/exports');

var MutationObservation =
/*#__PURE__*/
function () {
  function MutationObservation() {
    _classCallCheck(this, MutationObservation);

    this.targetNode = document;
  }

  _createClass(MutationObservation, [{
    key: "run",
    value: function run() {
      var _this = this;

      var observer = new MutationObserver(function (mutationsList, observer) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mutation = _step.value;

            if (mutation.type === 'childList') {
              for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];

                _this.activateNodeWithItsChildNodes(node);
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
      observer.observe(this.targetNode, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
  }, {
    key: "activateNodeWithItsChildNodes",
    value: function activateNodeWithItsChildNodes(node) {
      var nodeName = node.nodeName.toLowerCase();

      if (ELEMENTS[nodeName] && !node.activated) {
        node.activated = true;

        for (var i = 0; i < node.attributes.length; i++) {
          node.setAttribute(node.attributes[i].name, new StringWithMappedObjectAndAppliedVariables(node.attributes[i].value).value());
        }

        new ELEMENTS[nodeName](node).activate();
      }

      var childNodes = node.childNodes;

      for (var _i = 0; _i < childNodes.length; _i++) {
        this.activateNodeWithItsChildNodes(childNodes[_i]);
      }
    }
  }]);

  return MutationObservation;
}();

new MutationObservation().run();

},{"./E/exports":34,"./string/exports":131}],36:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('./../async-ajax/exports'),
    ResponseFromAjaxRequest = _require.ResponseFromAjaxRequest,
    ResponseBody = _require.ResponseBody;

var _require2 = require('./../async-object/exports'),
    CreatedOptions = _require2.CreatedOptions;

var _require3 = require('./../async-dom/exports'),
    ElementWithInnerHTML = _require3.ElementWithInnerHTML,
    ElementWithAdditionalHTML = _require3.ElementWithAdditionalHTML,
    ElementWithTextContent = _require3.ElementWithTextContent,
    HiddenElements = _require3.HiddenElements,
    ShownElements = _require3.ShownElements,
    DisabledElements = _require3.DisabledElements,
    EnabledElements = _require3.EnabledElements,
    ElementWithMappedObject = _require3.ElementWithMappedObject,
    ElementsWithToggledClass = _require3.ElementsWithToggledClass,
    ElementWithChangedValue = _require3.ElementWithChangedValue,
    ParsedElmSelectors = _require3.ParsedElmSelectors;

var _require4 = require('./../async-log/exports'),
    Logged = _require4.Logged;

var _require5 = require('./../async-if-else/exports'),
    If = _require5.If;

var _require6 = require('./../async-location/exports'),
    RedirectedLocation = _require6.RedirectedLocation,
    TurboRedirected = _require6.TurboRedirected;

var _require7 = require('./../async-storage/exports'),
    LocalStorageWithSetValue = _require7.LocalStorageWithSetValue,
    SessionStorageWithSetValue = _require7.SessionStorageWithSetValue;

var _require8 = require('./../async-array/exports'),
    First = _require8.First;

var _require9 = require('./../async-uri/exports'),
    EncodedURI = _require9.EncodedURI;

var actions = {
  "if": function _if(statement, action) {
    return new If(statement, action);
  },
  logToConsole: function logToConsole() {
    for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
      objs[_key] = arguments[_key];
    }

    return _construct(Logged, objs);
  },
  redirect: function redirect(url) {
    return new RedirectedLocation(new EncodedURI(url));
  },
  saveToLocalStorage: function saveToLocalStorage(key, value) {
    return new LocalStorageWithSetValue(localStorage, key, value);
  },
  saveToSessionStorage: function saveToSessionStorage(key, value) {
    return new SessionStorageWithSetValue(sessionStorage, key, value);
  },
  hideElms: function hideElms() {
    for (var _len2 = arguments.length, elmSelectors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      elmSelectors[_key2] = arguments[_key2];
    }

    return new HiddenElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  showElms: function showElms() {
    for (var _len3 = arguments.length, elmSelectors = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      elmSelectors[_key3] = arguments[_key3];
    }

    return new ShownElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  disableElms: function disableElms() {
    for (var _len4 = arguments.length, elmSelectors = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      elmSelectors[_key4] = arguments[_key4];
    }

    return new DisabledElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  enableElms: function enableElms() {
    for (var _len5 = arguments.length, elmSelectors = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      elmSelectors[_key5] = arguments[_key5];
    }

    return new EnabledElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  innerHTML: function innerHTML(elmSelector, url, headers) {
    return new ElementWithInnerHTML(new First(new ParsedElmSelectors(elmSelector)), new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', new EncodedURI(url), 'method', 'GET', 'headers', headers))));
  },
  addHTMLTo: function addHTMLTo(elmSelector, url, headers) {
    return new ElementWithAdditionalHTML(new First(new ParsedElmSelectors(elmSelector)), new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', new EncodedURI(url), 'method', 'GET', 'headers', headers))));
  },
  textContent: function textContent(elmSelector, url, headers) {
    return new ElementWithTextContent(new First(new ParsedElmSelectors(elmSelector)), new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', new EncodedURI(url), 'method', 'GET', 'headers', headers))));
  },
  changeValueOf: function changeValueOf(elmSelector, newValue) {
    return new ElementWithChangedValue(new First(new ParsedElmSelectors(elmSelector)), newValue);
  },
  mapObjToElm: function mapObjToElm(obj, elmSelector) {
    return new ElementWithMappedObject(new First(new ParsedElmSelectors(elmSelector)), obj, 'data-object-name');
  },
  toggleElms: function toggleElms(className) {
    for (var _len6 = arguments.length, elmSelectors = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      elmSelectors[_key6 - 1] = arguments[_key6];
    }

    return new ElementsWithToggledClass(className, _construct(ParsedElmSelectors, elmSelectors));
  },
  turboRedirect: function turboRedirect(href, headers) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        progressBarClassName = _ref.progressBarClassName,
        ajaxFavicon = _ref.ajaxFavicon;

    return new TurboRedirected(href, headers, {
      progressBarClassName: progressBarClassName,
      ajaxFavicon: ajaxFavicon
    });
  }
};

var ActionByNameWithParams =
/*#__PURE__*/
function () {
  function ActionByNameWithParams(name) {
    _classCallCheck(this, ActionByNameWithParams);

    this.name = name;

    for (var _len7 = arguments.length, params = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      params[_key7 - 1] = arguments[_key7];
    }

    this.params = params;
  }

  _createClass(ActionByNameWithParams, [{
    key: "value",
    value: function value() {
      if (!actions[this.name]) {
        throw new Error("no such action with name \"".concat(this.name, "\""));
      }

      return actions[this.name].apply(actions, _toConsumableArray(this.params));
    }
  }]);

  return ActionByNameWithParams;
}();

module.exports = ActionByNameWithParams;

},{"./../async-ajax/exports":48,"./../async-array/exports":50,"./../async-dom/exports":80,"./../async-if-else/exports":86,"./../async-location/exports":93,"./../async-log/exports":95,"./../async-object/exports":98,"./../async-storage/exports":103,"./../async-uri/exports":108}],37:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./../async-object/exports'),
    TheSameObjectWithValue = _require.TheSameObjectWithValue;

var ParsedActions = require('./ParsedActions');

var BuiltAsyncTreeByParsedActions = require('./BuiltAsyncTreeByParsedActions');

var AppliedActionsOnResponse = function AppliedActionsOnResponse(tagName, resName, res, actions) {
  _classCallCheck(this, AppliedActionsOnResponse);

  var resObj = {};
  return new TheSameObjectWithValue(resObj, resName, res).after(new BuiltAsyncTreeByParsedActions(new ParsedActions(actions, tagName, resObj, resName).value()).value());
};

module.exports = AppliedActionsOnResponse;

},{"./../async-object/exports":98,"./BuiltAsyncTreeByParsedActions":38,"./ParsedActions":39}],38:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./../async/exports'),
    EmptyAsyncObject = _require.EmptyAsyncObject;

var BuiltAsyncTreeByParsedActions =
/*#__PURE__*/
function () {
  function BuiltAsyncTreeByParsedActions(parsedActions) {
    _classCallCheck(this, BuiltAsyncTreeByParsedActions);

    this.parsedActions = parsedActions;
  }

  _createClass(BuiltAsyncTreeByParsedActions, [{
    key: "value",
    value: function value() {
      if (this.parsedActions.length === 0) {
        return new EmptyAsyncObject();
      }

      return this.buildAsyncTree();
    }
  }, {
    key: "buildAsyncTree",
    value: function buildAsyncTree() {
      var curIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.parsedActions.length === curIndex) {
        return this.parsedActions[0];
      } else {
        this.getLastNext(this.parsedActions[curIndex]).after(this.parsedActions[curIndex + 1]);
        return this.buildAsyncTree(curIndex + 1);
      }
    }
  }, {
    key: "getLastNext",
    value: function getLastNext(parsedAction) {
      if (parsedAction.next) {
        return this.getLastNext(parsedAction.next);
      }

      return parsedAction;
    }
  }]);

  return BuiltAsyncTreeByParsedActions;
}();

module.exports = BuiltAsyncTreeByParsedActions;

},{"./../async/exports":110}],39:[function(require,module,exports){
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./../async-string/exports'),
    StringWithMappedObjectAndAppliedVariables = _require.StringWithMappedObjectAndAppliedVariables;

var _require2 = require('./../async-json/exports'),
    ParsedJSONOrString = _require2.ParsedJSONOrString;

var ActionByNameWithParams = require('./ActionByNameWithParams');

var ParsedActions =
/*#__PURE__*/
function () {
  function ParsedActions(actions, tagName, resObj, resName) {
    _classCallCheck(this, ParsedActions);

    // act1(p1, p2); act(q1, q2); ...
    this.actions = actions;
    this.tagName = tagName;
    this.resObj = resObj;
    this.resName = resName;
  }

  _createClass(ParsedActions, [{
    key: "value",
    value: function value() {
      var _this = this;

      var parsedActions = {};

      if (!this.actions) {
        return {
          length: 0
        };
      }

      var splittedActions = this.actions.split(';').map(function (action) {
        return action.trim();
      }).filter(function (action) {
        return action.length !== 0;
      });
      splittedActions.forEach(function (action, index) {
        var executedIfStatement = /if([\s]+)?(\(.+\))([\s]+)/.exec(action);
        var ifStatement;

        if (executedIfStatement) {
          ifStatement = executedIfStatement[0];
          action = action.replace(ifStatement, '');
        }

        var actionName = _this.expressionName(action);

        var actionParams = _this.expressionParams(action, actionName);

        var parsedAction;

        if (ifStatement) {
          var ifStatementName = _this.expressionName(ifStatement);

          var ifStatementParam = _this.expressionParams(ifStatement, ifStatementName)[0];

          parsedAction = new ActionByNameWithParams(ifStatementName, ifStatementParam, _construct(ActionByNameWithParams, [actionName].concat(_toConsumableArray(actionParams))).value()).value();
        } else {
          parsedAction = _construct(ActionByNameWithParams, [actionName].concat(_toConsumableArray(actionParams))).value();
        }

        parsedActions[index] = parsedAction;
      });
      parsedActions.length = splittedActions.length;
      return parsedActions;
    }
  }, {
    key: "expressionName",
    value: function expressionName(action) {
      return action.split('(')[0].trim();
    }
  }, {
    key: "expressionParams",
    value: function expressionParams(action, actionName) {
      var params = action.split(actionName)[1]; // eslint-disable-next-line no-eval

      return eval("this.funcWithParams".concat(params));
    }
  }, {
    key: "funcWithParams",
    value: function funcWithParams() {
      var _this2 = this;

      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return params.map(function (param) {
        if (_typeof(param) === 'object') {
          param = JSON.stringify(param);
        }

        return new ParsedJSONOrString(new StringWithMappedObjectAndAppliedVariables(param, _this2.resObj, _this2.resName));
      });
    }
  }]);

  return ParsedActions;
}();

module.exports = ParsedActions;

},{"./../async-json/exports":90,"./../async-string/exports":106,"./ActionByNameWithParams":36}],40:[function(require,module,exports){
"use strict";

module.exports = {
  ActionByNameWithParams: require('./ActionByNameWithParams'),
  AppliedActionsOnResponse: require('./AppliedActionsOnResponse'),
  BuiltAsyncTreeByParsedActions: require('./BuiltAsyncTreeByParsedActions'),
  ParsedActions: require('./ParsedActions')
};

},{"./ActionByNameWithParams":36,"./AppliedActionsOnResponse":37,"./BuiltAsyncTreeByParsedActions":38,"./ParsedActions":39}],41:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject; // Represented result is object


var CreatedOptions =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(CreatedOptions, _AsyncObject);

  function CreatedOptions() {
    var _getPrototypeOf2;

    _classCallCheck(this, CreatedOptions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreatedOptions)).call.apply(_getPrototypeOf2, [this].concat(args)));
  }

  _createClass(CreatedOptions, [{
    key: "syncCall",
    value: function syncCall() {
      return function () {
        var options = {};

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (args.length % 2 !== 0) {
          throw new Error('odd number of parameters for options');
        }

        for (var i = 0; i < args.length - 1; i += 2) {
          options[args[i]] = args[i + 1];
        }

        return options;
      };
    }
  }]);

  return CreatedOptions;
}(AsyncObject);

module.exports = CreatedOptions;

},{"./../cutie/exports":119}],42:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var JSResponseByHTTPReponseComponents =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(JSResponseByHTTPReponseComponents, _AsyncObject);

  function JSResponseByHTTPReponseComponents(body, headers, statusCode) {
    _classCallCheck(this, JSResponseByHTTPReponseComponents);

    return _possibleConstructorReturn(this, _getPrototypeOf(JSResponseByHTTPReponseComponents).call(this, body, headers, statusCode));
  }

  _createClass(JSResponseByHTTPReponseComponents, [{
    key: "syncCall",
    value: function syncCall() {
      return function (body, headers, statusCode) {
        return {
          body: body,
          headers: headers,
          statusCode: statusCode
        };
      };
    }
  }]);

  return JSResponseByHTTPReponseComponents;
}(AsyncObject);

module.exports = JSResponseByHTTPReponseComponents;

},{"./../cutie/exports":119}],43:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ResponseBody =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ResponseBody, _AsyncObject);

  function ResponseBody(response) {
    _classCallCheck(this, ResponseBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResponseBody).call(this, response));
  }

  _createClass(ResponseBody, [{
    key: "syncCall",
    value: function syncCall() {
      return function (response) {
        return response.body;
      };
    }
  }]);

  return ResponseBody;
}(AsyncObject);

module.exports = ResponseBody;

},{"./../cutie/exports":119}],44:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var responseFromAjaxRequest = require('./custom-calls/responseFromAjaxRequest'); // Represented result is {statusCode, headers, body}


var ResponseFromAjaxRequest =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ResponseFromAjaxRequest, _AsyncObject);

  function ResponseFromAjaxRequest(options, requestBody) {
    _classCallCheck(this, ResponseFromAjaxRequest);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResponseFromAjaxRequest).call(this, options, requestBody || null));
  }

  _createClass(ResponseFromAjaxRequest, [{
    key: "asyncCall",
    value: function asyncCall() {
      return responseFromAjaxRequest;
    }
  }]);

  return ResponseFromAjaxRequest;
}(AsyncObject);

module.exports = ResponseFromAjaxRequest;

},{"./../cutie/exports":119,"./custom-calls/responseFromAjaxRequest":47}],45:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ResponseHeaders =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ResponseHeaders, _AsyncObject);

  function ResponseHeaders(response) {
    _classCallCheck(this, ResponseHeaders);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResponseHeaders).call(this, response));
  }

  _createClass(ResponseHeaders, [{
    key: "syncCall",
    value: function syncCall() {
      return function (response) {
        return response.headers;
      };
    }
  }]);

  return ResponseHeaders;
}(AsyncObject);

module.exports = ResponseHeaders;

},{"./../cutie/exports":119}],46:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ResponseStatusCode =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ResponseStatusCode, _AsyncObject);

  function ResponseStatusCode(response) {
    _classCallCheck(this, ResponseStatusCode);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResponseStatusCode).call(this, response));
  }

  _createClass(ResponseStatusCode, [{
    key: "syncCall",
    value: function syncCall() {
      return function (response) {
        return response.statusCode;
      };
    }
  }]);

  return ResponseStatusCode;
}(AsyncObject);

module.exports = ResponseStatusCode;

},{"./../cutie/exports":119}],47:[function(require,module,exports){
"use strict";

// custom call
// err, {statusCode, headers, body} in callback
// options: {url, method, headers, mimeType, withCredentials, user, password, timeout, progressEvent, uploadProgressEvent}
var responseFromAjaxRequest = function responseFromAjaxRequest(options, requestBody, callback) {
  var resObj = {};
  var req = new XMLHttpRequest();
  req.open(options.method, options.url, true, options.user || null, options.password || null);
  req.withCredentials = options.withCredentials || false;
  req.timeout = options.timeout || 0;

  if (options.overrideMimeType !== undefined) {
    req.overrideMimeType(options.overrideMimeType);
  }

  var headers = options.headers || {};

  for (var headerName in headers) {
    req.setRequestHeader(headerName, headers[headerName]);
  }

  req.onreadystatechange = function () {
    if (req.readyState === req.DONE) {
      var allHeadersStr = req.getAllResponseHeaders().trim();
      var headerMap = {};

      var _headers = allHeadersStr.split(/[\r\n]+/);

      _headers.forEach(function (line) {
        var parts = line.split(/:\s*/);
        var header = parts.shift();
        var value = parts.join(': ');
        headerMap[header] = value;
      });

      resObj.statusCode = req.status;
      resObj.headers = headerMap;
      resObj.body = req.response;
      callback(null, resObj);
    }
  };

  req.addEventListener('progress', options.progressEvent);
  req.upload.addEventListener('progress', options.uploadProgressEvent);
  req.send(requestBody);
};

module.exports = responseFromAjaxRequest;

},{}],48:[function(require,module,exports){
"use strict";

module.exports = {
  JSResponseByHTTPReponseComponents: require('./JSResponseByHTTPReponseComponents'),
  ResponseBody: require('./ResponseBody'),
  ResponseFromAjaxRequest: require('./ResponseFromAjaxRequest'),
  ResponseHeaders: require('./ResponseHeaders'),
  ResponseStatusCode: require('./ResponseStatusCode')
};

},{"./JSResponseByHTTPReponseComponents":42,"./ResponseBody":43,"./ResponseFromAjaxRequest":44,"./ResponseHeaders":45,"./ResponseStatusCode":46}],49:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var First =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(First, _AsyncObject);

  function First(array) {
    _classCallCheck(this, First);

    return _possibleConstructorReturn(this, _getPrototypeOf(First).call(this, array));
  }

  _createClass(First, [{
    key: "syncCall",
    value: function syncCall() {
      return function (array) {
        return array[0] || null;
      };
    }
  }]);

  return First;
}(AsyncObject);

module.exports = First;

},{"./../cutie/exports":119}],50:[function(require,module,exports){
"use strict";

module.exports = {
  First: require('./First')
};

},{"./First":49}],51:[function(require,module,exports){
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
    AsyncObject = _require.AsyncObject;

var BodyInnerHTMLOfDocument =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(BodyInnerHTMLOfDocument, _AsyncObject);

  function BodyInnerHTMLOfDocument(doc) {
    _classCallCheck(this, BodyInnerHTMLOfDocument);

    return _possibleConstructorReturn(this, _getPrototypeOf(BodyInnerHTMLOfDocument).call(this, doc));
  }

  _createClass(BodyInnerHTMLOfDocument, [{
    key: "syncCall",
    value: function syncCall() {
      return function (doc) {
        if (doc.body) {
          return doc.body.innerHTML;
        }

        throw new Error('body element is missing in the html resource');
      };
    }
  }]);

  return BodyInnerHTMLOfDocument;
}(AsyncObject);

module.exports = BodyInnerHTMLOfDocument;

},{"@page-libs/cutie":20}],52:[function(require,module,exports){
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
    AsyncObject = _require.AsyncObject;

var BodyOfDocument =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(BodyOfDocument, _AsyncObject);

  function BodyOfDocument(doc) {
    _classCallCheck(this, BodyOfDocument);

    return _possibleConstructorReturn(this, _getPrototypeOf(BodyOfDocument).call(this, doc));
  }

  _createClass(BodyOfDocument, [{
    key: "syncCall",
    value: function syncCall() {
      return function (doc) {
        if (doc.body) {
          return doc.body;
        }

        throw new Error('body element is missing in the html resource');
      };
    }
  }]);

  return BodyOfDocument;
}(AsyncObject);

module.exports = BodyOfDocument;

},{"@page-libs/cutie":20}],53:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ChangedPageFavicon =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ChangedPageFavicon, _AsyncObject);

  function ChangedPageFavicon(doc, favicon, ajax) {
    _classCallCheck(this, ChangedPageFavicon);

    return _possibleConstructorReturn(this, _getPrototypeOf(ChangedPageFavicon).call(this, doc, favicon, ajax));
  }

  _createClass(ChangedPageFavicon, [{
    key: "syncCall",
    value: function syncCall() {
      return function (doc, favicon, ajax) {
        if (favicon) {
          var oldLink = document.querySelector("link[rel*='icon']");
          var newLink = document.createElement('link');
          newLink.type = ajax ? 'image/gif' : 'image/x-icon';
          newLink.rel = 'shortcut icon';
          newLink.href = favicon;

          if (oldLink) {
            document.head.removeChild(oldLink);
          }

          document.head.appendChild(newLink);
        }

        return favicon;
      };
    }
  }]);

  return ChangedPageFavicon;
}(AsyncObject);

module.exports = ChangedPageFavicon;

},{"./../cutie/exports":119}],54:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ChangedPageTitle =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ChangedPageTitle, _AsyncObject);

  function ChangedPageTitle(doc, title) {
    _classCallCheck(this, ChangedPageTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(ChangedPageTitle).call(this, doc, title));
  }

  _createClass(ChangedPageTitle, [{
    key: "syncCall",
    value: function syncCall() {
      return function (doc, title) {
        doc.title = title;
        return title;
      };
    }
  }]);

  return ChangedPageTitle;
}(AsyncObject);

module.exports = ChangedPageTitle;

},{"./../cutie/exports":119}],55:[function(require,module,exports){
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

var _require = require('./../dom/exports'),
    DocumentFragmentWithAttributes = _require.DocumentFragmentWithAttributes;

var _require2 = require('./../cutie/exports'),
    AsyncObject = _require2.AsyncObject;

var CreatedDocumentFragmentWithAttributes =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(CreatedDocumentFragmentWithAttributes, _AsyncObject);

  function CreatedDocumentFragmentWithAttributes(fragment, attributes) {
    _classCallCheck(this, CreatedDocumentFragmentWithAttributes);

    return _possibleConstructorReturn(this, _getPrototypeOf(CreatedDocumentFragmentWithAttributes).call(this, fragment, attributes));
  }

  _createClass(CreatedDocumentFragmentWithAttributes, [{
    key: "syncCall",
    value: function syncCall() {
      return function (fragment, attributes) {
        return new DocumentFragmentWithAttributes(fragment, attributes);
      };
    }
  }]);

  return CreatedDocumentFragmentWithAttributes;
}(AsyncObject);

module.exports = CreatedDocumentFragmentWithAttributes;

},{"./../cutie/exports":119,"./../dom/exports":122}],56:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var DisabledElement =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(DisabledElement, _AsyncObject);

  function DisabledElement(elm) {
    _classCallCheck(this, DisabledElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(DisabledElement).call(this, elm));
  }

  _createClass(DisabledElement, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm) {
        if (elm) {
          elm.setAttribute('disabled', true);
        }

        return elm;
      };
    }
  }]);

  return DisabledElement;
}(AsyncObject);

module.exports = DisabledElement;

},{"./../cutie/exports":119}],57:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var DisabledElements =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(DisabledElements, _AsyncObject);

  function DisabledElements(elms) {
    _classCallCheck(this, DisabledElements);

    return _possibleConstructorReturn(this, _getPrototypeOf(DisabledElements).call(this, elms));
  }

  _createClass(DisabledElements, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elms) {
        elms.forEach(function (elm) {
          elm.setAttribute('disabled', true);
        });
      };
    }
  }]);

  return DisabledElements;
}(AsyncObject);

module.exports = DisabledElements;

},{"./../cutie/exports":119}],58:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ElementWithAdditionalHTML =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithAdditionalHTML, _AsyncObject);

  function ElementWithAdditionalHTML(elm, html) {
    _classCallCheck(this, ElementWithAdditionalHTML);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementWithAdditionalHTML).call(this, elm, html));
  }

  _createClass(ElementWithAdditionalHTML, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm, html) {
        elm.innerHTML += html;
        return elm;
      };
    }
  }]);

  return ElementWithAdditionalHTML;
}(AsyncObject);

module.exports = ElementWithAdditionalHTML;

},{"./../cutie/exports":119}],59:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ElementWithChangedValue =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithChangedValue, _AsyncObject);

  function ElementWithChangedValue(elm, newValue) {
    _classCallCheck(this, ElementWithChangedValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementWithChangedValue).call(this, elm, newValue));
  }

  _createClass(ElementWithChangedValue, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm, newValue) {
        elm.value = newValue;
        return elm;
      };
    }
  }]);

  return ElementWithChangedValue;
}(AsyncObject);

module.exports = ElementWithChangedValue;

},{"./../cutie/exports":119}],60:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ElementWithInnerHTML =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithInnerHTML, _AsyncObject);

  function ElementWithInnerHTML(elm, html) {
    _classCallCheck(this, ElementWithInnerHTML);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementWithInnerHTML).call(this, elm, html));
  }

  _createClass(ElementWithInnerHTML, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm, html) {
        elm.innerHTML = html;
        return elm;
      };
    }
  }]);

  return ElementWithInnerHTML;
}(AsyncObject);

module.exports = ElementWithInnerHTML;

},{"./../cutie/exports":119}],61:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var _require2 = require('./../dom/exports'),
    ElementWithMappedObject = _require2.ElementWithMappedObject;

var AsyncElementWithMappedObject =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(AsyncElementWithMappedObject, _AsyncObject);

  function AsyncElementWithMappedObject(element, obj, objNameAttribute) {
    _classCallCheck(this, AsyncElementWithMappedObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(AsyncElementWithMappedObject).call(this, element, obj, objNameAttribute));
  }

  _createClass(AsyncElementWithMappedObject, [{
    key: "syncCall",
    value: function syncCall() {
      return function (element, response, objNameAttribute) {
        return new ElementWithMappedObject(element, response, objNameAttribute).value();
      };
    }
  }]);

  return AsyncElementWithMappedObject;
}(AsyncObject);

module.exports = AsyncElementWithMappedObject;

},{"./../cutie/exports":119,"./../dom/exports":122}],62:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ElementWithTextContent =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithTextContent, _AsyncObject);

  function ElementWithTextContent(elm, html) {
    _classCallCheck(this, ElementWithTextContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementWithTextContent).call(this, elm, html));
  }

  _createClass(ElementWithTextContent, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm, html) {
        elm.textContent = html;
        return elm;
      };
    }
  }]);

  return ElementWithTextContent;
}(AsyncObject);

module.exports = ElementWithTextContent;

},{"./../cutie/exports":119}],63:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ElementsWithToggledClass =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementsWithToggledClass, _AsyncObject);

  function ElementsWithToggledClass(className, elms) {
    _classCallCheck(this, ElementsWithToggledClass);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementsWithToggledClass).call(this, className, elms));
  }

  _createClass(ElementsWithToggledClass, [{
    key: "syncCall",
    value: function syncCall() {
      return function (className, elms) {
        elms.forEach(function (elm) {
          elm.classList.toggle(className);
        });
        return elms;
      };
    }
  }]);

  return ElementsWithToggledClass;
}(AsyncObject);

module.exports = ElementsWithToggledClass;

},{"./../cutie/exports":119}],64:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var EnabledElement =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(EnabledElement, _AsyncObject);

  function EnabledElement(elm) {
    _classCallCheck(this, EnabledElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(EnabledElement).call(this, elm));
  }

  _createClass(EnabledElement, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm) {
        if (elm) {
          elm.removeAttribute('disabled');
        }

        return elm;
      };
    }
  }]);

  return EnabledElement;
}(AsyncObject);

module.exports = EnabledElement;

},{"./../cutie/exports":119}],65:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var EnabledElements =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(EnabledElements, _AsyncObject);

  function EnabledElements(elms) {
    _classCallCheck(this, EnabledElements);

    return _possibleConstructorReturn(this, _getPrototypeOf(EnabledElements).call(this, elms));
  }

  _createClass(EnabledElements, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elms) {
        elms.forEach(function (elm) {
          elm.removeAttribute('disabled');
        });
        return elms;
      };
    }
  }]);

  return EnabledElements;
}(AsyncObject);

module.exports = EnabledElements;

},{"./../cutie/exports":119}],66:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ExtractedDocument =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ExtractedDocument, _AsyncObject);

  function ExtractedDocument(html) {
    _classCallCheck(this, ExtractedDocument);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExtractedDocument).call(this, html));
  }

  _createClass(ExtractedDocument, [{
    key: "syncCall",
    value: function syncCall() {
      return function (html) {
        var domparser = new DOMParser();
        return domparser.parseFromString(html, 'text/html');
      };
    }
  }]);

  return ExtractedDocument;
}(AsyncObject);

module.exports = ExtractedDocument;

},{"./../cutie/exports":119}],67:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var FaviconOfDocument =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(FaviconOfDocument, _AsyncObject);

  function FaviconOfDocument(doc) {
    _classCallCheck(this, FaviconOfDocument);

    return _possibleConstructorReturn(this, _getPrototypeOf(FaviconOfDocument).call(this, doc));
  }

  _createClass(FaviconOfDocument, [{
    key: "syncCall",
    value: function syncCall() {
      return function (doc) {
        if (doc.head) {
          var favicon = doc.head.querySelector("link[rel*='icon']");
          return favicon ? favicon.href : null;
        }

        return null;
      };
    }
  }]);

  return FaviconOfDocument;
}(AsyncObject);

module.exports = FaviconOfDocument;

},{"./../cutie/exports":119}],68:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var FirstParsedElmSelector =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(FirstParsedElmSelector, _AsyncObject);

  function FirstParsedElmSelector(elmSelector) {
    _classCallCheck(this, FirstParsedElmSelector);

    return _possibleConstructorReturn(this, _getPrototypeOf(FirstParsedElmSelector).call(this, elmSelector));
  }

  _createClass(FirstParsedElmSelector, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elmSelector) {
        return document.querySelector(elmSelector);
      };
    }
  }]);

  return FirstParsedElmSelector;
}(AsyncObject);

module.exports = FirstParsedElmSelector;

},{"./../cutie/exports":119}],69:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var HiddenElement =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(HiddenElement, _AsyncObject);

  function HiddenElement(elm) {
    _classCallCheck(this, HiddenElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(HiddenElement).call(this, elm));
  }

  _createClass(HiddenElement, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm) {
        if (elm) {
          elm.style.display = 'none';
        }

        return elm;
      };
    }
  }]);

  return HiddenElement;
}(AsyncObject);

module.exports = HiddenElement;

},{"./../cutie/exports":119}],70:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var HiddenElements =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(HiddenElements, _AsyncObject);

  function HiddenElements(elms) {
    _classCallCheck(this, HiddenElements);

    return _possibleConstructorReturn(this, _getPrototypeOf(HiddenElements).call(this, elms));
  }

  _createClass(HiddenElements, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elms) {
        elms.forEach(function (elm) {
          elm.style.display = 'none';
        });
        return elms;
      };
    }
  }]);

  return HiddenElements;
}(AsyncObject);

module.exports = HiddenElements;

},{"./../cutie/exports":119}],71:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ParsedElmSelectors =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ParsedElmSelectors, _AsyncObject);

  function ParsedElmSelectors() {
    var _getPrototypeOf2;

    _classCallCheck(this, ParsedElmSelectors);

    for (var _len = arguments.length, elmSelectors = new Array(_len), _key = 0; _key < _len; _key++) {
      elmSelectors[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ParsedElmSelectors)).call.apply(_getPrototypeOf2, [this].concat(elmSelectors)));
  }

  _createClass(ParsedElmSelectors, [{
    key: "syncCall",
    value: function syncCall() {
      return function () {
        var elms = [];

        for (var _len2 = arguments.length, elmSelectors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          elmSelectors[_key2] = arguments[_key2];
        }

        elmSelectors.forEach(function (elmSelector) {
          if (elmSelector) {
            var elmsToPush = document.querySelectorAll(elmSelector);

            for (var i = 0; i < elmsToPush.length; i++) {
              elms.push(elmsToPush[i]);
            }
          }
        });
        return elms;
      };
    }
  }]);

  return ParsedElmSelectors;
}(AsyncObject);

module.exports = ParsedElmSelectors;

},{"./../cutie/exports":119}],72:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var PreparedProgressBar =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(PreparedProgressBar, _AsyncObject);

  function PreparedProgressBar(progressBar) {
    _classCallCheck(this, PreparedProgressBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(PreparedProgressBar).call(this, progressBar));
  }

  _createClass(PreparedProgressBar, [{
    key: "syncCall",
    value: function syncCall() {
      return function (progressBar) {
        if (progressBar) {
          progressBar.max = 100;
          progressBar.value = 0;
          progressBar.style.display = 'none';
          return progressBar;
        }

        return null;
      };
    }
  }]);

  return PreparedProgressBar;
}(AsyncObject);

module.exports = PreparedProgressBar;

},{"./../cutie/exports":119}],73:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var PreparedProgressBars =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(PreparedProgressBars, _AsyncObject);

  function PreparedProgressBars(progressBars) {
    _classCallCheck(this, PreparedProgressBars);

    return _possibleConstructorReturn(this, _getPrototypeOf(PreparedProgressBars).call(this, progressBars));
  }

  _createClass(PreparedProgressBars, [{
    key: "syncCall",
    value: function syncCall() {
      return function (progressBars) {
        for (var index = 0; index < progressBars.length; index++) {
          if (progressBars[index]) {
            var progressBar = progressBars[index];
            progressBar.max = 100;
            progressBar.value = 0;
            progressBar.style.display = 'none';
          }
        }

        return progressBars;
      };
    }
  }]);

  return PreparedProgressBars;
}(AsyncObject);

module.exports = PreparedProgressBars;

},{"./../cutie/exports":119}],74:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ReplacedElementWithAnotherOne =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ReplacedElementWithAnotherOne, _AsyncObject);

  function ReplacedElementWithAnotherOne(oldElement, newElement) {
    _classCallCheck(this, ReplacedElementWithAnotherOne);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReplacedElementWithAnotherOne).call(this, oldElement, newElement));
  }

  _createClass(ReplacedElementWithAnotherOne, [{
    key: "syncCall",
    value: function syncCall() {
      return function (oldElement, newElement) {
        oldElement.parentNode.replaceChild(newElement, oldElement);
        return newElement;
      };
    }
  }]);

  return ReplacedElementWithAnotherOne;
}(AsyncObject);

module.exports = ReplacedElementWithAnotherOne;

},{"./../cutie/exports":119}],75:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ShownElement =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ShownElement, _AsyncObject);

  function ShownElement(elm) {
    _classCallCheck(this, ShownElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShownElement).call(this, elm));
  }

  _createClass(ShownElement, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm) {
        if (elm) {
          elm.style.display = '';
        }

        return elm;
      };
    }
  }]);

  return ShownElement;
}(AsyncObject);

module.exports = ShownElement;

},{"./../cutie/exports":119}],76:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ShownElements =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ShownElements, _AsyncObject);

  function ShownElements(elms) {
    _classCallCheck(this, ShownElements);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShownElements).call(this, elms));
  }

  _createClass(ShownElements, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elms) {
        elms.forEach(function (elm) {
          elm.style.display = '';
        });
        return elms;
      };
    }
  }]);

  return ShownElements;
}(AsyncObject);

module.exports = ShownElements;

},{"./../cutie/exports":119}],77:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var TitleOfDocument =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(TitleOfDocument, _AsyncObject);

  function TitleOfDocument(doc) {
    _classCallCheck(this, TitleOfDocument);

    return _possibleConstructorReturn(this, _getPrototypeOf(TitleOfDocument).call(this, doc));
  }

  _createClass(TitleOfDocument, [{
    key: "syncCall",
    value: function syncCall() {
      return function (doc) {
        return doc.title;
      };
    }
  }]);

  return TitleOfDocument;
}(AsyncObject);

module.exports = TitleOfDocument;

},{"./../cutie/exports":119}],78:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject; // remove parent without removing childen


var UnwrappedChildrenOfParent =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(UnwrappedChildrenOfParent, _AsyncObject);

  function UnwrappedChildrenOfParent(parent) {
    _classCallCheck(this, UnwrappedChildrenOfParent);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnwrappedChildrenOfParent).call(this, parent));
  }

  _createClass(UnwrappedChildrenOfParent, [{
    key: "syncCall",
    value: function syncCall() {
      return function (parent) {
        var docFrag = document.createDocumentFragment();

        while (parent.firstChild) {
          var child = parent.removeChild(parent.firstChild);
          docFrag.appendChild(child);
        }

        parent.parentNode.replaceChild(docFrag, parent);
        return docFrag;
      };
    }
  }]);

  return UnwrappedChildrenOfParent;
}(AsyncObject);

module.exports = UnwrappedChildrenOfParent;

},{"./../cutie/exports":119}],79:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var UnwrappedTemplate =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(UnwrappedTemplate, _AsyncObject);

  function UnwrappedTemplate(template) {
    _classCallCheck(this, UnwrappedTemplate);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnwrappedTemplate).call(this, template));
  }

  _createClass(UnwrappedTemplate, [{
    key: "syncCall",
    value: function syncCall() {
      return function (template) {
        var fragment = template.content.cloneNode(true);
        template.parentNode.replaceChild(fragment, template);
        return fragment;
      };
    }
  }]);

  return UnwrappedTemplate;
}(AsyncObject);

module.exports = UnwrappedTemplate;

},{"./../cutie/exports":119}],80:[function(require,module,exports){
"use strict";

module.exports = {
  BodyOfDocument: require('./BodyOfDocument'),
  ChangedPageFavicon: require('./ChangedPageFavicon'),
  ChangedPageTitle: require('./ChangedPageTitle'),
  CreatedDocumentFragmentWithAttributes: require('./CreatedDocumentFragmentWithAttributes'),
  DisabledElement: require('./DisabledElement'),
  DisabledElements: require('./DisabledElements'),
  ElementWithAdditionalHTML: require('./ElementWithAdditionalHTML'),
  ElementWithChangedValue: require('./ElementWithChangedValue'),
  ElementWithInnerHTML: require('./ElementWithInnerHTML'),
  ElementWithMappedObject: require('./ElementWithMappedObject'),
  ElementWithTextContent: require('./ElementWithTextContent'),
  ElementsWithToggledClass: require('./ElementsWithToggledClass'),
  EnabledElement: require('./EnabledElement'),
  EnabledElements: require('./EnabledElements'),
  ExtractedDocument: require('./ExtractedDocument'),
  FaviconOfDocument: require('./FaviconOfDocument'),
  FirstParsedElmSelector: require('./FirstParsedElmSelector'),
  HiddenElement: require('./HiddenElement'),
  HiddenElements: require('./HiddenElements'),
  ParsedElmSelectors: require('./ParsedElmSelectors'),
  PreparedProgressBar: require('./PreparedProgressBar'),
  PreparedProgressBars: require('./PreparedProgressBars'),
  ReplacedElementWithAnotherOne: require('./ReplacedElementWithAnotherOne'),
  ShownElement: require('./ShownElement'),
  ShownElements: require('./ShownElements'),
  TitleOfDocument: require('./TitleOfDocument'),
  UnwrappedChildrenOfParent: require('./UnwrappedChildrenOfParent'),
  UnwrappedTemplate: require('./UnwrappedTemplate')
};

},{"./BodyOfDocument":52,"./ChangedPageFavicon":53,"./ChangedPageTitle":54,"./CreatedDocumentFragmentWithAttributes":55,"./DisabledElement":56,"./DisabledElements":57,"./ElementWithAdditionalHTML":58,"./ElementWithChangedValue":59,"./ElementWithInnerHTML":60,"./ElementWithMappedObject":61,"./ElementWithTextContent":62,"./ElementsWithToggledClass":63,"./EnabledElement":64,"./EnabledElements":65,"./ExtractedDocument":66,"./FaviconOfDocument":67,"./FirstParsedElmSelector":68,"./HiddenElement":69,"./HiddenElements":70,"./ParsedElmSelectors":71,"./PreparedProgressBar":72,"./PreparedProgressBars":73,"./ReplacedElementWithAnotherOne":74,"./ShownElement":75,"./ShownElements":76,"./TitleOfDocument":77,"./UnwrappedChildrenOfParent":78,"./UnwrappedTemplate":79}],81:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var PushedStartStateToHistoryIfNeeded =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(PushedStartStateToHistoryIfNeeded, _AsyncObject);

  function PushedStartStateToHistoryIfNeeded(state, href) {
    _classCallCheck(this, PushedStartStateToHistoryIfNeeded);

    return _possibleConstructorReturn(this, _getPrototypeOf(PushedStartStateToHistoryIfNeeded).call(this, state, href));
  }

  _createClass(PushedStartStateToHistoryIfNeeded, [{
    key: "syncCall",
    value: function syncCall() {
      return function (state, href) {
        if (sessionStorage.getItem('isFirstStatePushedToHistory') === 'false') {
          history.replaceState(state, null, href);
          sessionStorage.setItem('isFirstStatePushedToHistory', 'true');
        }

        return state;
      };
    }
  }]);

  return PushedStartStateToHistoryIfNeeded;
}(AsyncObject);

module.exports = PushedStartStateToHistoryIfNeeded;

},{"./../cutie/exports":119}],82:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var PushedStateToHistory =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(PushedStateToHistory, _AsyncObject);

  function PushedStateToHistory(state, href) {
    _classCallCheck(this, PushedStateToHistory);

    return _possibleConstructorReturn(this, _getPrototypeOf(PushedStateToHistory).call(this, state, href));
  }

  _createClass(PushedStateToHistory, [{
    key: "syncCall",
    value: function syncCall() {
      return function (state, href) {
        history.pushState(state, null, href);
        return state;
      };
    }
  }]);

  return PushedStateToHistory;
}(AsyncObject);

module.exports = PushedStateToHistory;

},{"./../cutie/exports":119}],83:[function(require,module,exports){
"use strict";

module.exports = {
  PushedStartStateToHistoryIfNeeded: require('./PushedStartStateToHistoryIfNeeded'),
  PushedStateToHistory: require('./PushedStateToHistory')
};

},{"./PushedStartStateToHistoryIfNeeded":81,"./PushedStateToHistory":82}],84:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var Else =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(Else, _AsyncObject);

  function Else(action) {
    _classCallCheck(this, Else);

    return _possibleConstructorReturn(this, _getPrototypeOf(Else).call(this, function () {
      return action;
    }));
  }

  _createClass(Else, [{
    key: "syncCall",
    value: function syncCall() {
      var _this = this;

      return function (action) {
        var actionTree = action();

        _this.propagateCache(actionTree);

        actionTree.call();
        return true;
      };
    }
  }]);

  return Else;
}(AsyncObject);

module.exports = Else;

},{"./../cutie/exports":119}],85:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var If =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(If, _AsyncObject);

  function If(statement, action, nextStatement) {
    _classCallCheck(this, If);

    return _possibleConstructorReturn(this, _getPrototypeOf(If).call(this, statement, function () {
      return action;
    }, nextStatement ? function () {
      return nextStatement;
    } : undefined));
  }

  _createClass(If, [{
    key: "syncCall",
    value: function syncCall() {
      var _this = this;

      return function (statement, action, nextStatement) {
        if (statement) {
          var actionTree = action();

          _this.propagateCache(actionTree);

          actionTree.call();
        } else if (nextStatement) {
          var nextStatementTree = nextStatement();

          _this.propagateCache(nextStatementTree);

          nextStatementTree.call();
        }

        return statement;
      };
    }
  }]);

  return If;
}(AsyncObject);

module.exports = If;

},{"./../cutie/exports":119}],86:[function(require,module,exports){
"use strict";

module.exports = {
  Else: require('./Else'),
  If: require('./If')
};

},{"./Else":84,"./If":85}],87:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject; // Represented result is json


var ParsedJSON =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ParsedJSON, _AsyncObject);

  function ParsedJSON(string) {
    _classCallCheck(this, ParsedJSON);

    return _possibleConstructorReturn(this, _getPrototypeOf(ParsedJSON).call(this, string));
  }

  _createClass(ParsedJSON, [{
    key: "syncCall",
    value: function syncCall() {
      return JSON.parse;
    }
  }]);

  return ParsedJSON;
}(AsyncObject);

module.exports = ParsedJSON;

},{"./../cutie/exports":119}],88:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ParsedJSONOrString =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ParsedJSONOrString, _AsyncObject);

  function ParsedJSONOrString(string) {
    _classCallCheck(this, ParsedJSONOrString);

    return _possibleConstructorReturn(this, _getPrototypeOf(ParsedJSONOrString).call(this, string));
  }

  _createClass(ParsedJSONOrString, [{
    key: "syncCall",
    value: function syncCall() {
      return function (string) {
        try {
          return JSON.parse(string);
        } catch (error) {
          return string;
        }
      };
    }
  }]);

  return ParsedJSONOrString;
}(AsyncObject);

module.exports = ParsedJSONOrString;

},{"./../cutie/exports":119}],89:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject; // Represented result is string


var StringifiedJSON =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(StringifiedJSON, _AsyncObject);

  function StringifiedJSON(json) {
    _classCallCheck(this, StringifiedJSON);

    return _possibleConstructorReturn(this, _getPrototypeOf(StringifiedJSON).call(this, json));
  }

  _createClass(StringifiedJSON, [{
    key: "syncCall",
    value: function syncCall() {
      return JSON.stringify;
    }
  }]);

  return StringifiedJSON;
}(AsyncObject);

module.exports = StringifiedJSON;

},{"./../cutie/exports":119}],90:[function(require,module,exports){
"use strict";

module.exports = {
  ParsedJSON: require('./ParsedJSON'),
  ParsedJSONOrString: require('./ParsedJSONOrString'),
  StringifiedJSON: require('./StringifiedJSON')
};

},{"./ParsedJSON":87,"./ParsedJSONOrString":88,"./StringifiedJSON":89}],91:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var RedirectedLocation =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(RedirectedLocation, _AsyncObject);

  function RedirectedLocation(url) {
    _classCallCheck(this, RedirectedLocation);

    return _possibleConstructorReturn(this, _getPrototypeOf(RedirectedLocation).call(this, url));
  }

  _createClass(RedirectedLocation, [{
    key: "syncCall",
    value: function syncCall() {
      return function (url) {
        window.location.href = url;
      };
    }
  }]);

  return RedirectedLocation;
}(AsyncObject);

module.exports = RedirectedLocation;

},{"./../cutie/exports":119}],92:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./../cutie/exports'),
    as = _require.as;

var _require2 = require('./../async-string/exports'),
    StringFromBuffer = _require2.StringFromBuffer;

var _require3 = require('./../async-ajax/exports'),
    ResponseFromAjaxRequest = _require3.ResponseFromAjaxRequest,
    ResponseBody = _require3.ResponseBody;

var _require4 = require('./../async-object/exports'),
    CreatedOptions = _require4.CreatedOptions;

var _require5 = require('./../async-dom/exports'),
    ReplacedElementWithAnotherOne = _require5.ReplacedElementWithAnotherOne,
    ExtractedDocument = _require5.ExtractedDocument,
    BodyOfDocument = _require5.BodyOfDocument,
    TitleOfDocument = _require5.TitleOfDocument,
    FaviconOfDocument = _require5.FaviconOfDocument,
    ChangedPageTitle = _require5.ChangedPageTitle,
    ChangedPageFavicon = _require5.ChangedPageFavicon;

var _require6 = require('./../async-history/exports'),
    PushedStartStateToHistoryIfNeeded = _require6.PushedStartStateToHistoryIfNeeded,
    PushedStateToHistory = _require6.PushedStateToHistory;

var _require7 = require('./../events/exports'),
    ShowProgressEvent = _require7.ShowProgressEvent;

var TurboRedirected = function TurboRedirected(href, headers, _ref) {
  var progressBarPlace = _ref.progressBarPlace,
      progressBarClassName = _ref.progressBarClassName,
      ajaxFavicon = _ref.ajaxFavicon;

  _classCallCheck(this, TurboRedirected);

  var progressBar;

  if (progressBarClassName) {
    progressBar = document.createElement('progress');
    progressBar.setAttribute('class', progressBarClassName);
    progressBar.style.display = 'none';
    progressBar.max = 100;
    progressBar.value = 0;

    if (progressBarPlace) {
      document.querySelector(progressBarPlace).prepend(progressBar);
    } else {
      document.body.prepend(progressBar);
    }
  }

  return new PushedStartStateToHistoryIfNeeded(new CreatedOptions('url', location.href, 'headers', headers), location.href).after(new ChangedPageFavicon(document, ajaxFavicon, true).after(new ExtractedDocument(new StringFromBuffer(new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', href, 'method', 'GET', 'headers', headers, 'progressEvent', new ShowProgressEvent(progressBar, true)))))).as('DOC').after(new BodyOfDocument(as('DOC')).as('BODY').after(new TitleOfDocument(as('DOC')).as('TITLE').after(new FaviconOfDocument(as('DOC')).as('FAVICON').after(new PushedStateToHistory(new CreatedOptions('url', href, 'headers', headers), href).after(new ReplacedElementWithAnotherOne(document.body, as('BODY')).after(new ChangedPageTitle(document, as('TITLE')).after(new ChangedPageFavicon(document, as('FAVICON')))))))))));
};

module.exports = TurboRedirected;

},{"./../async-ajax/exports":48,"./../async-dom/exports":80,"./../async-history/exports":83,"./../async-object/exports":98,"./../async-string/exports":106,"./../cutie/exports":119,"./../events/exports":126}],93:[function(require,module,exports){
"use strict";

module.exports = {
  RedirectedLocation: require('./RedirectedLocation'),
  TurboRedirected: require('./TurboRedirected')
};

},{"./RedirectedLocation":91,"./TurboRedirected":92}],94:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var Logged =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(Logged, _AsyncObject);

  function Logged() {
    var _getPrototypeOf2;

    _classCallCheck(this, Logged);

    for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
      objs[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Logged)).call.apply(_getPrototypeOf2, [this].concat(objs)));
  }

  _createClass(Logged, [{
    key: "syncCall",
    value: function syncCall() {
      return function () {
        var _console;

        for (var _len2 = arguments.length, objs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          objs[_key2] = arguments[_key2];
        }

        (_console = console).log.apply(_console, objs);

        return objs;
      };
    }
  }]);

  return Logged;
}(AsyncObject);

module.exports = Logged;

},{"./../cutie/exports":119}],95:[function(require,module,exports){
"use strict";

module.exports = {
  Logged: require('./Logged')
};

},{"./Logged":94}],96:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"./../cutie/exports":119,"dup":41}],97:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject; // Represented result is obj


var TheSameObjectWithValue =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(TheSameObjectWithValue, _AsyncObject);

  function TheSameObjectWithValue(obj, key, value) {
    _classCallCheck(this, TheSameObjectWithValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(TheSameObjectWithValue).call(this, obj, key, value));
  }

  _createClass(TheSameObjectWithValue, [{
    key: "syncCall",
    value: function syncCall() {
      return function (obj, key, value) {
        obj[key] = value;
        return obj;
      };
    }
  }]);

  return TheSameObjectWithValue;
}(AsyncObject);

module.exports = TheSameObjectWithValue;

},{"./../cutie/exports":119}],98:[function(require,module,exports){
"use strict";

module.exports = {
  CreatedOptions: require('./CreatedOptions'),
  TheSameObjectWithValue: require('./TheSameObjectWithValue')
};

},{"./CreatedOptions":96,"./TheSameObjectWithValue":97}],99:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var LocalStorageWithSetValue =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(LocalStorageWithSetValue, _AsyncObject);

  function LocalStorageWithSetValue(localStorage, key, value) {
    _classCallCheck(this, LocalStorageWithSetValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(LocalStorageWithSetValue).call(this, localStorage, key, value));
  }

  _createClass(LocalStorageWithSetValue, [{
    key: "syncCall",
    value: function syncCall() {
      return function (localStorage, key, value) {
        localStorage.setItem(key, value);
        return localStorage;
      };
    }
  }]);

  return LocalStorageWithSetValue;
}(AsyncObject);

module.exports = LocalStorageWithSetValue;

},{"./../cutie/exports":119}],100:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var SessionStorageWithSetValue =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(SessionStorageWithSetValue, _AsyncObject);

  function SessionStorageWithSetValue(sessionStorage, key, value) {
    _classCallCheck(this, SessionStorageWithSetValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(SessionStorageWithSetValue).call(this, sessionStorage, key, value));
  }

  _createClass(SessionStorageWithSetValue, [{
    key: "syncCall",
    value: function syncCall() {
      return function (sessionStorage, key, value) {
        sessionStorage.setItem(key, value);
        return sessionStorage;
      };
    }
  }]);

  return SessionStorageWithSetValue;
}(AsyncObject);

module.exports = SessionStorageWithSetValue;

},{"./../cutie/exports":119}],101:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ValueFromLocalStorage =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ValueFromLocalStorage, _AsyncObject);

  function ValueFromLocalStorage(localStorage, key) {
    _classCallCheck(this, ValueFromLocalStorage);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValueFromLocalStorage).call(this, localStorage, key));
  }

  _createClass(ValueFromLocalStorage, [{
    key: "syncCall",
    value: function syncCall() {
      return function (localStorage, key) {
        return localStorage.getItem(key);
      };
    }
  }]);

  return ValueFromLocalStorage;
}(AsyncObject);

module.exports = ValueFromLocalStorage;

},{"./../cutie/exports":119}],102:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ValueFromSessionStorage =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ValueFromSessionStorage, _AsyncObject);

  function ValueFromSessionStorage(sessionStorage, key) {
    _classCallCheck(this, ValueFromSessionStorage);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValueFromSessionStorage).call(this, sessionStorage, key));
  }

  _createClass(ValueFromSessionStorage, [{
    key: "syncCall",
    value: function syncCall() {
      return function (sessionStorage, key) {
        return sessionStorage.getItem(key);
      };
    }
  }]);

  return ValueFromSessionStorage;
}(AsyncObject);

module.exports = ValueFromSessionStorage;

},{"./../cutie/exports":119}],103:[function(require,module,exports){
"use strict";

module.exports = {
  LocalStorageWithSetValue: require('./LocalStorageWithSetValue'),
  SessionStorageWithSetValue: require('./SessionStorageWithSetValue'),
  ValueFromLocalStorage: require('./ValueFromLocalStorage'),
  ValueFromSessionStorage: require('./ValueFromSessionStorage')
};

},{"./LocalStorageWithSetValue":99,"./SessionStorageWithSetValue":100,"./ValueFromLocalStorage":101,"./ValueFromSessionStorage":102}],104:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject; // Represented result is buffer


var StringFromBuffer =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(StringFromBuffer, _AsyncObject);

  function StringFromBuffer(buf, encoding, start, end) {
    _classCallCheck(this, StringFromBuffer);

    return _possibleConstructorReturn(this, _getPrototypeOf(StringFromBuffer).call(this, buf, encoding || 'utf8', start || 0, end || buf.length));
  }

  _createClass(StringFromBuffer, [{
    key: "syncCall",
    value: function syncCall() {
      return function (buf, encoding, start, end) {
        return buf.toString(encoding, start, end);
      };
    }
  }]);

  return StringFromBuffer;
}(AsyncObject);

module.exports = StringFromBuffer;

},{"./../cutie/exports":119}],105:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var _require2 = require('./../string/exports'),
    StringWithMappedObjectAndAppliedVariables = _require2.StringWithMappedObjectAndAppliedVariables;

var AsyncStringWithMappedObjectAndAppliedVariables =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(AsyncStringWithMappedObjectAndAppliedVariables, _AsyncObject);

  function AsyncStringWithMappedObjectAndAppliedVariables(str, obj, objName) {
    _classCallCheck(this, AsyncStringWithMappedObjectAndAppliedVariables);

    return _possibleConstructorReturn(this, _getPrototypeOf(AsyncStringWithMappedObjectAndAppliedVariables).call(this, str, obj, objName));
  }

  _createClass(AsyncStringWithMappedObjectAndAppliedVariables, [{
    key: "syncCall",
    value: function syncCall() {
      return function (str, obj, objName) {
        return new StringWithMappedObjectAndAppliedVariables(str, obj, objName).value();
      };
    }
  }]);

  return AsyncStringWithMappedObjectAndAppliedVariables;
}(AsyncObject);

module.exports = AsyncStringWithMappedObjectAndAppliedVariables;

},{"./../cutie/exports":119,"./../string/exports":131}],106:[function(require,module,exports){
"use strict";

module.exports = {
  StringFromBuffer: require('./StringFromBuffer'),
  StringWithMappedObjectAndAppliedVariables: require('./StringWithMappedObjectAndAppliedVariables')
};

},{"./StringFromBuffer":104,"./StringWithMappedObjectAndAppliedVariables":105}],107:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var EncodedURI =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(EncodedURI, _AsyncObject);

  function EncodedURI(url) {
    _classCallCheck(this, EncodedURI);

    return _possibleConstructorReturn(this, _getPrototypeOf(EncodedURI).call(this, url));
  }

  _createClass(EncodedURI, [{
    key: "syncCall",
    value: function syncCall() {
      return function (url) {
        return encodeURI(url);
      };
    }
  }]);

  return EncodedURI;
}(AsyncObject);

module.exports = EncodedURI;

},{"./../cutie/exports":119}],108:[function(require,module,exports){
"use strict";

module.exports = {
  EncodedURI: require('./EncodedURI')
};

},{"./EncodedURI":107}],109:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var EmptyAsyncObject =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(EmptyAsyncObject, _AsyncObject);

  function EmptyAsyncObject() {
    _classCallCheck(this, EmptyAsyncObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(EmptyAsyncObject).call(this));
  }

  _createClass(EmptyAsyncObject, [{
    key: "syncCall",
    value: function syncCall() {
      return function () {};
    }
  }]);

  return EmptyAsyncObject;
}(AsyncObject);

module.exports = EmptyAsyncObject;

},{"./../cutie/exports":119}],110:[function(require,module,exports){
"use strict";

module.exports = {
  EmptyAsyncObject: require('./EmptyAsyncObject')
};

},{"./EmptyAsyncObject":109}],111:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./AsyncObject":112,"dup":10}],112:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./AsyncTree":113,"dup":11}],113:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./AsyncTreeNode":114,"./NotDefinedAsyncTreeNode":116,"./SimpleTreeNode":117,"dup":12}],114:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./TreeNode":118,"dup":13}],115:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],116:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15}],117:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./TreeNode":118,"dup":17}],118:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],119:[function(require,module,exports){
"use strict";

module.exports = {
  AsyncObject: require('./AsyncObject'),
  Event: require('./Event'),
  as: require('./As')
};

},{"./As":111,"./AsyncObject":112,"./Event":115}],120:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentFragmentWithAttributes = function DocumentFragmentWithAttributes(fragment, attributes) {
  _classCallCheck(this, DocumentFragmentWithAttributes);

  fragment = fragment || document.createDocumentFragment();
  fragment.attributes = attributes || [];

  fragment.setAttribute = function (name, value) {
    var isSet = false;

    for (var i = 0; i < fragment.attributes.length; i++) {
      if (fragment.attributes[i].name === name) {
        fragment.attributes[i].value = value;
        isSet = true;
        break;
      }
    }

    if (!isSet) {
      fragment.attributes.push({
        name: name,
        value: value
      });
    }
  };

  fragment.getAttribute = function (name) {
    for (var i = 0; i < fragment.attributes.length; i++) {
      if (fragment.attributes[i].name === name) {
        return fragment.attributes[i].value;
      }
    }

    return null;
  };

  return fragment;
};

module.exports = DocumentFragmentWithAttributes;

},{}],121:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./../string/exports'),
    StringWithMappedObjectAndAppliedVariables = _require.StringWithMappedObjectAndAppliedVariables;

var DocumentFragmentWithAttributes = require('./DocumentFragmentWithAttributes');

var ElementWithMappedObject =
/*#__PURE__*/
function () {
  function ElementWithMappedObject(element, obj, objNameAttribute) {
    _classCallCheck(this, ElementWithMappedObject);

    this.element = element;
    this.obj = obj;
    this.objNameAttribute = objNameAttribute;
  }

  _createClass(ElementWithMappedObject, [{
    key: "value",
    value: function value() {
      if (this.obj) {
        var objName = this.element.getAttribute(this.objNameAttribute);

        if (!objName) {
          throw new Error("element #".concat(this.element.getAttribute('id'), " must have attribute ").concat(this.objNameAttribute, " for applying values to child nodes, so you can know what object it encapsulates"));
        }

        var obj = {};
        obj[objName] = this.obj;
        this.mapObjToChildren(this.element, obj, objName);
      } else {
        this.mapObjToChildren(this.element);
      }

      return this.element;
    }
  }, {
    key: "mapObjToChildren",
    value: function mapObjToChildren(element, obj, objName) {
      var _this = this;

      element.childNodes.forEach(function (child) {
        if (child.getAttribute) {
          for (var i = 0; i < child.attributes.length; i++) {
            var attrName = child.attributes[i].name;
            var attrValue = child.attributes[i].value;

            _this.mapObjToAttribute(child, attrName, attrValue, obj, objName);
          }
        }

        _this.mapObjToChildren(child, obj, objName);

        if (_this.isEForEach(child)) {
          _this.activateEForEach(child, obj, objName, _this.objNameAttribute);
        } else if (_this.isEIf(child)) {
          _this.activateEIf(child, obj, objName, _this.objNameAttribute);
        }
      });
    }
  }, {
    key: "mapObjToAttribute",
    value: function mapObjToAttribute(child, attrName, attrValue, obj, objName) {
      if (this.isForApplying(attrName)) {
        child.setAttribute(attrName, new StringWithMappedObjectAndAppliedVariables(child.getAttribute(attrName), obj, objName).value());

        if (attrName === 'data-text') {
          this.handleDataTextAttribute(child);
        } else if (attrName === 'data-value') {
          this.handleDataValueAttribute(child);
        }
      }
    }
  }, {
    key: "handleDataTextAttribute",
    value: function handleDataTextAttribute(element) {
      if (!this.hasParamsInAttributeToApply(element, 'data-text')) {
        this.insertTextIntoElm(element, element.getAttribute('data-text'));
        element.removeAttribute('data-text');
      }
    }
  }, {
    key: "handleDataValueAttribute",
    value: function handleDataValueAttribute(element) {
      if (!this.hasParamsInAttributeToApply(element, 'data-value')) {
        element.value = element.getAttribute('data-value');
        element.removeAttribute('data-value');
      }
    }
  }, {
    key: "insertTextIntoElm",
    value: function insertTextIntoElm(element, text) {
      var textNode = document.createTextNode(text);

      if (element.childNodes.length === 0) {
        element.appendChild(textNode);
      } else {
        element.insertBefore(textNode, element.childNodes[0]);
      }
    }
  }, {
    key: "hasParamsInAttributeToApply",
    value: function hasParamsInAttributeToApply(element, attrName) {
      return /\$\{([^${}]+)\}/g.test(element.getAttribute(attrName));
    }
  }, {
    key: "isForApplying",
    value: function isForApplying(attrName) {
      var attributesForNotApplying = ['data-list-to-iterate', 'data-condition-to-display'];
      return attributesForNotApplying.indexOf(attrName) === -1;
    }
  }, {
    key: "isEForEach",
    value: function isEForEach(element) {
      return element.nodeName.toLowerCase() === 'template' && element.getAttribute('is').toLowerCase() === 'e-for-each';
    }
  }, {
    key: "isEIf",
    value: function isEIf(element) {
      return element.nodeName.toLowerCase() === 'template' && element.getAttribute('is').toLowerCase() === 'e-if';
    }
  }, {
    key: "activateEForEach",
    value: function activateEForEach(element, obj, objName, objNameAttribute) {
      var _this2 = this;

      var list = JSON.parse(new StringWithMappedObjectAndAppliedVariables(element.getAttribute('data-list-to-iterate'), obj, objName).value());
      var fragment = new DocumentFragmentWithAttributes(document.createDocumentFragment(), [{
        name: objNameAttribute,
        value: objName
      }]);
      list.forEach(function (item, index) {
        item.index = index + 1;
        var itemFragment = new DocumentFragmentWithAttributes(element.content.cloneNode(true), _this2.itemFragmentAttributesForEForEach(element, objNameAttribute, objName));
        fragment.appendChild(new ElementWithMappedObject(itemFragment, item, 'data-item-name').value());
      });
      element.parentNode.replaceChild(new ElementWithMappedObject(fragment, obj[objName], objNameAttribute).value(), element);
    }
  }, {
    key: "itemFragmentAttributesForEForEach",
    value: function itemFragmentAttributesForEForEach(element, objNameAttribute, objName) {
      var attrs = [];

      for (var i = 0; i < element.attributes.length; i++) {
        attrs.push({
          name: element.attributes[i].name,
          value: element.attributes[i].value
        });
      }

      attrs.push({
        name: objNameAttribute,
        value: objName
      });
      return attrs;
    }
  }, {
    key: "activateEIf",
    value: function activateEIf(element, obj, objName, objNameAttribute) {
      var toDisplay = new StringWithMappedObjectAndAppliedVariables(element.getAttribute('data-condition-to-display'), obj, objName).value();

      if (toDisplay === 'true') {
        var fragment = new DocumentFragmentWithAttributes(element.content.cloneNode(true), [{
          name: objNameAttribute,
          value: objName
        }]);
        element.parentNode.replaceChild(new ElementWithMappedObject(fragment, obj[objName], objNameAttribute).value(), element);
      }
    }
  }]);

  return ElementWithMappedObject;
}();

module.exports = ElementWithMappedObject;

},{"./../string/exports":131,"./DocumentFragmentWithAttributes":120}],122:[function(require,module,exports){
"use strict";

module.exports = {
  DocumentFragmentWithAttributes: require('./DocumentFragmentWithAttributes'),
  ElementWithMappedObject: require('./ElementWithMappedObject')
};

},{"./DocumentFragmentWithAttributes":120,"./ElementWithMappedObject":121}],123:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShowFileReaderEndEvent = function ShowFileReaderEndEvent(progressBar, filesRead, filesLength) {
  _classCallCheck(this, ShowFileReaderEndEvent);

  if (progressBar) {
    return function () {
      filesRead.count += 1;

      if (filesRead.count === filesLength) {
        progressBar.style.display = 'none';
      } else {
        progressBar.value = 0;
      }
    };
  }

  return function () {};
};

module.exports = ShowFileReaderEndEvent;

},{}],124:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShowFileReaderProgressEvent = function ShowFileReaderProgressEvent(progressBar) {
  _classCallCheck(this, ShowFileReaderProgressEvent);

  if (progressBar) {
    return function (event) {
      if (event.lengthComputable) {
        progressBar.style.display = '';
        var percentComplete = parseInt(event.loaded / event.total * 100);
        progressBar.value = percentComplete;
      }
    };
  }

  return function () {};
};

module.exports = ShowFileReaderProgressEvent;

},{}],125:[function(require,module,exports){
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

var _require = require('./../cutie/exports'),
    AsyncObject = _require.AsyncObject;

var ShowProgressEvent =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ShowProgressEvent, _AsyncObject);

  function ShowProgressEvent(progressBar) {
    var removeProgressBarAfter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, ShowProgressEvent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowProgressEvent).call(this, progressBar, removeProgressBarAfter));
  }

  _createClass(ShowProgressEvent, [{
    key: "syncCall",
    value: function syncCall() {
      return function (progressBar, removeProgressBarAfter) {
        if (progressBar) {
          return function (event) {
            if (event.lengthComputable) {
              progressBar.style.display = '';
              var percentComplete = parseInt(event.loaded / event.total * 100);
              progressBar.value = percentComplete;

              if (progressBar.value === 100) {
                if (removeProgressBarAfter) {
                  progressBar.parentNode.removeChild(progressBar);
                } else {
                  progressBar.style.display = 'none';
                }
              }
            }
          };
        }

        return function () {};
      };
    }
  }]);

  return ShowProgressEvent;
}(AsyncObject);

module.exports = ShowProgressEvent;

},{"./../cutie/exports":119}],126:[function(require,module,exports){
"use strict";

module.exports = {
  ShowFileReaderEndEvent: require('./ShowFileReaderEndEvent'),
  ShowFileReaderProgressEvent: require('./ShowFileReaderProgressEvent'),
  ShowProgressEvent: require('./ShowProgressEvent')
};

},{"./ShowFileReaderEndEvent":123,"./ShowFileReaderProgressEvent":124,"./ShowProgressEvent":125}],127:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileInfo = function FileInfo(name, size, type, content, lastModifiedDate) {
  _classCallCheck(this, FileInfo);

  this.name = name;
  this.size = size;
  this.type = type;
  this.content = content;
  this.lastModifiedDate = lastModifiedDate;
};

module.exports = FileInfo;

},{}],128:[function(require,module,exports){
"use strict";

module.exports = {
  FileInfo: require('./FileInfo')
};

},{"./FileInfo":127}],129:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StringBuffer =
/*#__PURE__*/
function () {
  function StringBuffer() {
    _classCallCheck(this, StringBuffer);

    this.strings = [];
  }

  _createClass(StringBuffer, [{
    key: "append",
    value: function append(string) {
      this.strings.push(string);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.strings.join('');
    }
  }]);

  return StringBuffer;
}();

module.exports = StringBuffer;

},{}],130:[function(require,module,exports){
"use strict";
'use string';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uuidv4 = require('uuid/v4');

var StringWithMappedObjectAndAppliedVariables =
/*#__PURE__*/
function () {
  function StringWithMappedObjectAndAppliedVariables(str, obj, objName) {
    _classCallCheck(this, StringWithMappedObjectAndAppliedVariables);

    this.str = str;
    this.obj = obj;
    this.objName = objName;
  }

  _createClass(StringWithMappedObjectAndAppliedVariables, [{
    key: "value",
    value: function value() {
      this.str = this.stringWithLocalStorageVariables(this.stringWithSessionStorageVariables(this.stringWithUrlParams(this.str)));

      if (this.obj) {
        this.str = this.stringWithMappedObject(this.str, this.obj, this.objName);
        return this.str;
      }

      return this.evalString(this.str);
    }
  }, {
    key: "stringWithLocalStorageVariables",
    value: function stringWithLocalStorageVariables(str) {
      return str.replace(this.objRegExp('localStorage'), function (match, p1) {
        var expression = match.replace(/localStorage(\.[^{}$\s]+)?/g, function (match, p1) {
          return "'".concat(localStorage.getItem(p1.split('.')[1]), "'");
        });
        return expression;
      });
    }
  }, {
    key: "stringWithSessionStorageVariables",
    value: function stringWithSessionStorageVariables(str) {
      return str.replace(this.objRegExp('sessionStorage'), function (match, p1) {
        var expression = match.replace(/sessionStorage(\.[^{}$\s]+)?/g, function (match, p1) {
          return "'".concat(sessionStorage.getItem(p1.split('.')[1]), "'");
        });
        return expression;
      });
    }
  }, {
    key: "stringWithUrlParams",
    value: function stringWithUrlParams(str) {
      return str.replace(this.objRegExp('urlParams'), function (match, p1) {
        var expression = match.replace(/urlParams(\.[^{}$\s]+)?/g, function (match, p1) {
          // eslint-disable-next-line no-eval
          return eval("'urlParams".concat(p1, "'"));
        });
        return expression;
      });
    }
  }, {
    key: "stringWithMappedObject",
    value: function stringWithMappedObject(str, obj, objName) {
      return str.replace(this.objRegExp(objName), function (match, p1, p2, p3, p4, p5) {
        var expression = "\n          const ".concat(objName, " = obj['").concat(objName, "']\n          ").concat(p1, "\n        ");

        try {
          // eslint-disable-next-line no-eval
          var res = eval(expression);

          if (_typeof(res) === 'object') {
            return JSON.stringify(res);
          }

          return res;
        } catch (error) {
          var _res = match.replace(p5, function () {
            var name = uuidv4();
            window[name] = obj[objName];
            return "window['".concat(name, "']");
          });

          return _res;
        }
      });
    }
  }, {
    key: "objRegExp",
    value: function objRegExp(objName) {
      var objRegExp;

      if (window.eMappedRegExps[objName]) {
        objRegExp = window.eMappedRegExps[objName];
      } else {
        objRegExp = new RegExp("\\${((\\s)?([^{}$]+(\\s|\\()|[\\s(!]+)?(".concat(objName, ")(\\.[^\\s{}$]+)?(\\s)?(\\s[^{}$]+)?)}"), 'g');
        window.eMappedRegExps[objName] = objRegExp;
      }

      return objRegExp;
    }
  }, {
    key: "evalString",
    value: function evalString(str) {
      return str.replace(/\$\{([^{}\s]+)\}/g, function (match, p1) {
        try {
          // eslint-disable-next-line no-eval
          var res = eval(p1);

          if (_typeof(res) === 'object') {
            return JSON.stringify(res);
          }

          return res;
        } catch (error) {
          return match;
        }
      });
    }
  }]);

  return StringWithMappedObjectAndAppliedVariables;
}();

module.exports = StringWithMappedObjectAndAppliedVariables;

},{"uuid/v4":23}],131:[function(require,module,exports){
"use strict";

module.exports = {
  StringBuffer: require('./StringBuffer'),
  StringWithMappedObjectAndAppliedVariables: require('./StringWithMappedObjectAndAppliedVariables')
};

},{"./StringBuffer":129,"./StringWithMappedObjectAndAppliedVariables":130}],132:[function(require,module,exports){
'use strict';

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('./cutie/exports'),
    as = _require.as;

var _require2 = require('./actions/exports'),
    ActionByNameWithParams = _require2.ActionByNameWithParams;

var _require3 = require('./async-string/exports'),
    StringFromBuffer = _require3.StringFromBuffer;

var _require4 = require('./async-ajax/exports'),
    ResponseFromAjaxRequest = _require4.ResponseFromAjaxRequest,
    ResponseBody = _require4.ResponseBody;

var _require5 = require('./async-object/exports'),
    CreatedOptions = _require5.CreatedOptions;

var _require6 = require('./async-dom/exports'),
    ReplacedElementWithAnotherOne = _require6.ReplacedElementWithAnotherOne,
    ExtractedDocument = _require6.ExtractedDocument,
    BodyOfDocument = _require6.BodyOfDocument,
    TitleOfDocument = _require6.TitleOfDocument,
    FaviconOfDocument = _require6.FaviconOfDocument,
    ChangedPageTitle = _require6.ChangedPageTitle,
    ChangedPageFavicon = _require6.ChangedPageFavicon;

window.eMappedRegExps = {};

if (!window.customElements) {
  window.stop();
  throw new Error('Your browser does not support custom elements so you cannot use EHTML as it\'s based on them.');
}

if (!sessionStorage.getItem('isFirstStatePushedToHistory')) {
  sessionStorage.setItem('isFirstStatePushedToHistory', 'false');
}

var retrievedValue = function retrievedValue(target, value) {
  if (value instanceof Function) {
    return value(target);
  }

  return value;
};

window.onpopstate = function (event) {
  if (event.state) {
    new ExtractedDocument(new StringFromBuffer(new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', event.state.url, 'method', 'GET', 'headers', event.state.headers))))).as('DOC').after(new ReplacedElementWithAnotherOne(document.body, new BodyOfDocument(as('DOC'))).after(new ChangedPageTitle(document, new TitleOfDocument(as('DOC'))).after(new ChangedPageFavicon(document, new FaviconOfDocument(as('DOC')))))).call();
  }
};

window.onbeforeunload = function () {
  sessionStorage.removeItem('isFirstStatePushedToHistory');
};

window.redirect = function (target, url) {
  new ActionByNameWithParams('redirect', retrievedValue(target, url)).value().call();
};

window.saveToLocalStorage = function (target, key, value) {
  new ActionByNameWithParams('saveToLocalStorage', retrievedValue(target, key), retrievedValue(target, value)).value().call();
};

window.saveToSessionStorage = function (target, key, value) {
  new ActionByNameWithParams('saveToSessionStorage', retrievedValue(target, key), retrievedValue(target, value)).value().call();
};

window.hideElms = function () {
  for (var _len = arguments.length, elmSelectors = new Array(_len), _key = 0; _key < _len; _key++) {
    elmSelectors[_key] = arguments[_key];
  }

  _construct(ActionByNameWithParams, ['hideElms'].concat(elmSelectors)).value().call();
};

window.showElms = function () {
  for (var _len2 = arguments.length, elmSelectors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    elmSelectors[_key2] = arguments[_key2];
  }

  _construct(ActionByNameWithParams, ['showElms'].concat(elmSelectors)).value().call();
};

window.disableElms = function () {
  for (var _len3 = arguments.length, elmSelectors = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    elmSelectors[_key3] = arguments[_key3];
  }

  _construct(ActionByNameWithParams, ['disableElms'].concat(elmSelectors)).value().call();
};

window.enableElms = function () {
  for (var _len4 = arguments.length, elmSelectors = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    elmSelectors[_key4] = arguments[_key4];
  }

  _construct(ActionByNameWithParams, ['enableElms'].concat(elmSelectors)).value().call();
};

window.innerHTML = function (target, elm, url, headers) {
  new ActionByNameWithParams('innerHTML', retrievedValue(target, elm), retrievedValue(target, url), retrievedValue(target, headers)).value().call();
};

window.addHTMLTo = function (target, elm, url, headers) {
  new ActionByNameWithParams('addHTMLTo', retrievedValue(target, elm), retrievedValue(target, url), retrievedValue(target, headers)).value().call();
};

window.textContent = function (target, elm, url, headers) {
  new ActionByNameWithParams('textContent', retrievedValue(target, elm), retrievedValue(target, url), retrievedValue(target, headers)).value().call();
};

window.changeValueOf = function (target, elmSelector, newValue) {
  new ActionByNameWithParams('changeValueOf', elmSelector, retrievedValue(target, newValue)).value().call();
};

window.mapObjToElm = function (target, obj, elmSelector) {
  new ActionByNameWithParams('mapObjToElm', retrievedValue(target, obj), elmSelector).value().call();
};

window.toggleElms = function (className) {
  for (var _len5 = arguments.length, elmSelectors = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    elmSelectors[_key5 - 1] = arguments[_key5];
  }

  _construct(ActionByNameWithParams, ['toggleElms', className].concat(elmSelectors)).value().call();
};

window.turboRedirect = function (target, href, headers, ajaxFavicon) {
  new ActionByNameWithParams('turboRedirect', retrievedValue(target, href), retrievedValue(target, headers), retrievedValue(target, ajaxFavicon)).value().call();
};

},{"./actions/exports":40,"./async-ajax/exports":48,"./async-dom/exports":80,"./async-object/exports":98,"./async-string/exports":106,"./cutie/exports":119}]},{},[36,37,38,40,39,41,47,48,42,43,44,45,46,50,49,51,52,53,54,55,56,57,63,58,59,60,61,62,64,65,80,66,67,68,69,70,71,72,73,74,75,76,77,78,79,83,81,82,84,86,85,90,87,88,89,93,91,92,95,94,96,98,97,103,99,100,101,102,106,104,105,107,108,109,110,111,112,113,114,115,119,116,117,118,120,121,122,24,25,26,27,28,29,30,31,32,33,34,126,123,124,125,128,127,35,131,129,130,132]);
