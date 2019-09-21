(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {

  AllocatedBuffer: require('./src/AllocatedBuffer'),
  AllocatedUnsafeBuffer: require('./src/AllocatedUnsafeBuffer'),
  AllocatedUnsafeSlowBuffer: require('./src/AllocatedUnsafeSlowBuffer'),
  AreBuffersEqual: require('./src/AreBuffersEqual'),
  ArrayBufferOfBuffer: require('./src/ArrayBufferOfBuffer'),
  ArrayOfBuffers: require('./src/ArrayOfBuffers'),
  BufferAsJSON: require('./src/BufferAsJSON'),
  BufferEntries: require('./src/BufferEntries'),
  BufferFromArray: require('./src/BufferFromArray'),
  BufferFromArrayBuffer: require('./src/BufferFromArrayBuffer'),
  BufferFromBuffer: require('./src/BufferFromBuffer'),
  BufferFromObject: require('./src/BufferFromObject'),
  BufferFromString: require('./src/BufferFromString'),
  BufferKeys: require('./src/BufferKeys'),
  BufferLength: require('./src/BufferLength'),
  BufferValues: require('./src/BufferValues'),
  ByteLengthOfBuffer: require('./src/ByteLengthOfBuffer'),
  ComparedBuffers: require('./src/ComparedBuffers'),
  ConcatenatedBuffers: require('./src/ConcatenatedBuffers'),
  CopiedBuffer: require('./src/CopiedBuffer'),
  FilledBuffer: require('./src/FilledBuffer'),
  IndexOf: require('./src/IndexOf'),
  IsBuffer: require('./src/IsBuffer'),
  IsEncoding: require('./src/IsEncoding'),
  IsIncluded: require('./src/IsIncluded'),
  LastIndexOf: require('./src/LastIndexOf'),
  ReadDoubleBE: require('./src/ReadDoubleBE'),
  ReadDoubleLE: require('./src/ReadDoubleLE'),
  ReadFloatBE: require('./src/ReadFloatBE'),
  ReadFloatLE: require('./src/ReadFloatLE'),
  ReadInt16BE: require('./src/ReadInt16BE'),
  ReadInt16LE: require('./src/ReadInt16LE'),
  ReadInt32BE: require('./src/ReadInt32BE'),
  ReadInt32LE: require('./src/ReadInt32LE'),
  ReadInt8: require('./src/ReadInt8'),
  ReadIntBE: require('./src/ReadIntBE'),
  ReadIntLE: require('./src/ReadIntLE'),
  ReadUInt16BE: require('./src/ReadUInt16BE'),
  ReadUInt16LE: require('./src/ReadUInt16LE'),
  ReadUInt32BE: require('./src/ReadUInt32BE'),
  ReadUInt32LE: require('./src/ReadUInt32LE'),
  ReadUInt8: require('./src/ReadUInt8'),
  ReadUIntBE: require('./src/ReadUIntBE'),
  ReadUIntLE: require('./src/ReadUIntLE'),
  SlicedBuffer: require('./src/SlicedBuffer'),
  StringFromBuffer: require('./src/StringFromBuffer'),
  Swapped16Buffer: require('./src/Swapped16Buffer'),
  Swapped32Buffer: require('./src/Swapped32Buffer'),
  Swapped64Buffer: require('./src/Swapped64Buffer'),
  TranscodedBuffer: require('./src/TranscodedBuffer'),
  WrittenBuffer: require('./src/WrittenBuffer'),
  WrittenDoubleBE: require('./src/WrittenDoubleBE'),
  WrittenDoubleLE: require('./src/WrittenDoubleLE'),
  WrittenFloatBE: require('./src/WrittenFloatBE'),
  WrittenFloatLE: require('./src/WrittenFloatLE'),
  WrittenInt16BE: require('./src/WrittenInt16BE'),
  WrittenInt16LE: require('./src/WrittenInt16LE'),
  WrittenInt32BE: require('./src/WrittenInt32BE'),
  WrittenInt32LE: require('./src/WrittenInt32LE'),
  WrittenInt8: require('./src/WrittenInt8'),
  WrittenIntBE: require('./src/WrittenIntBE'),
  WrittenIntLE: require('./src/WrittenIntLE'),
  WrittenUInt16BE: require('./src/WrittenUInt16BE'),
  WrittenUInt16LE: require('./src/WrittenUInt16LE'),
  WrittenUInt32BE: require('./src/WrittenUInt32BE'),
  WrittenUInt32LE: require('./src/WrittenUInt32LE'),
  WrittenUInt8: require('./src/WrittenUInt8'),
  WrittenUIntBE: require('./src/WrittenUIntBE'),
  WrittenUIntLE: require('./src/WrittenUIntLE')

}

},{"./src/AllocatedBuffer":2,"./src/AllocatedUnsafeBuffer":3,"./src/AllocatedUnsafeSlowBuffer":4,"./src/AreBuffersEqual":5,"./src/ArrayBufferOfBuffer":6,"./src/ArrayOfBuffers":7,"./src/BufferAsJSON":8,"./src/BufferEntries":9,"./src/BufferFromArray":10,"./src/BufferFromArrayBuffer":11,"./src/BufferFromBuffer":12,"./src/BufferFromObject":13,"./src/BufferFromString":14,"./src/BufferKeys":15,"./src/BufferLength":16,"./src/BufferValues":17,"./src/ByteLengthOfBuffer":18,"./src/ComparedBuffers":19,"./src/ConcatenatedBuffers":20,"./src/CopiedBuffer":21,"./src/FilledBuffer":22,"./src/IndexOf":23,"./src/IsBuffer":24,"./src/IsEncoding":25,"./src/IsIncluded":26,"./src/LastIndexOf":27,"./src/ReadDoubleBE":28,"./src/ReadDoubleLE":29,"./src/ReadFloatBE":30,"./src/ReadFloatLE":31,"./src/ReadInt16BE":32,"./src/ReadInt16LE":33,"./src/ReadInt32BE":34,"./src/ReadInt32LE":35,"./src/ReadInt8":36,"./src/ReadIntBE":37,"./src/ReadIntLE":38,"./src/ReadUInt16BE":39,"./src/ReadUInt16LE":40,"./src/ReadUInt32BE":41,"./src/ReadUInt32LE":42,"./src/ReadUInt8":43,"./src/ReadUIntBE":44,"./src/ReadUIntLE":45,"./src/SlicedBuffer":46,"./src/StringFromBuffer":47,"./src/Swapped16Buffer":48,"./src/Swapped32Buffer":49,"./src/Swapped64Buffer":50,"./src/TranscodedBuffer":51,"./src/WrittenBuffer":52,"./src/WrittenDoubleBE":53,"./src/WrittenDoubleLE":54,"./src/WrittenFloatBE":55,"./src/WrittenFloatLE":56,"./src/WrittenInt16BE":57,"./src/WrittenInt16LE":58,"./src/WrittenInt32BE":59,"./src/WrittenInt32LE":60,"./src/WrittenInt8":61,"./src/WrittenIntBE":62,"./src/WrittenIntLE":63,"./src/WrittenUInt16BE":64,"./src/WrittenUInt16LE":65,"./src/WrittenUInt32BE":66,"./src/WrittenUInt32LE":67,"./src/WrittenUInt8":68,"./src/WrittenUIntBE":69,"./src/WrittenUIntLE":70}],2:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class AllocatedBuffer extends AsyncObject {
  constructor (size, fill, encoding) {
    super(size, fill || 0, encoding || 'utf8')
  }

  syncCall () {
    return Buffer.alloc
  }
}

module.exports = AllocatedBuffer

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],3:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class AllocatedUnsafeBuffer extends AsyncObject {
  constructor (size) {
    super(size)
  }

  syncCall () {
    return Buffer.allocUnsafe
  }
}

module.exports = AllocatedUnsafeBuffer

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],4:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class AllocatedUnsafeSlowBuffer extends AsyncObject {
  constructor (size) {
    super(size)
  }

  syncCall () {
    return Buffer.allocUnsafeSlow
  }
}

module.exports = AllocatedUnsafeSlowBuffer

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],5:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

class AreBuffersEqual extends AsyncObject {
  constructor (buf1, buf2) {
    super(buf1, buf2)
  }

  syncCall () {
    return (buf1, buf2) => {
      return buf1.equals(buf2)
    }
  }
}

module.exports = AreBuffersEqual

},{"@cuties/cutie":71}],6:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is ArrayBuffer
class ArrayBufferOfBuffer extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.buffer
    }
  }
}

module.exports = ArrayBufferOfBuffer

},{"@cuties/cutie":71}],7:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer[]
class ArrayOfBuffers extends AsyncObject {
  constructor (...buffers) {
    super(...buffers)
  }

  syncCall () {
    return (...buffers) => {
      return buffers
    }
  }
}

module.exports = ArrayOfBuffers

},{"@cuties/cutie":71}],8:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is json
class BufferAsJSON extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.toJSON()
    }
  }
}

module.exports = BufferAsJSON

},{"@cuties/cutie":71}],9:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is iterator [index, byte]
class BufferEntries extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.entries()
    }
  }
}

module.exports = BufferEntries

},{"@cuties/cutie":71}],10:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class BufferFromArray extends AsyncObject {
  constructor (array) {
    super(array)
  }

  syncCall () {
    return Buffer.from
  }
}

module.exports = BufferFromArray

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],11:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class BufferFromArrayBuffer extends AsyncObject {
  constructor (arrayBuf, byteOffset, length) {
    super(arrayBuf, byteOffset || 0, length || arrayBuf.length - byteOffset)
  }

  syncCall () {
    return Buffer.from
  }
}

module.exports = BufferFromArrayBuffer

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],12:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class BufferFromBuffer extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return Buffer.from
  }
}

module.exports = BufferFromBuffer

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],13:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class BufferFromObject extends AsyncObject {
  constructor (object, offsetOrEncoding, length) {
    super(object, offsetOrEncoding, length)
  }

  syncCall () {
    return Buffer.from
  }
}

module.exports = BufferFromObject

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],14:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class BufferFromString extends AsyncObject {
  constructor (string, encoding) {
    super(string, encoding || 'utf8')
  }

  syncCall () {
    return Buffer.from
  }
}

module.exports = BufferFromString

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],15:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is iterator [index]
class BufferKeys extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.keys()
    }
  }
}

module.exports = BufferKeys

},{"@cuties/cutie":71}],16:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is integer
class BufferLength extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.length
    }
  }
}

module.exports = BufferLength

},{"@cuties/cutie":71}],17:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is iterator [byte]
class BufferValues extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.values()
    }
  }
}

module.exports = BufferValues

},{"@cuties/cutie":71}],18:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is integer
class ByteLengthOfBuffer extends AsyncObject {
  constructor (string, encoding) {
    super(string, encoding || 'utf8')
  }

  syncCall () {
    return Buffer.byteLength
  }
}

module.exports = ByteLengthOfBuffer

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],19:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is integer
class ComparedBuffers extends AsyncObject {
  constructor (source, target, targetStart, targetEnd, sourceStart, sourceEnd) {
    super(
      source, target,
      targetStart || 0, targetEnd || target.length,
      sourceStart || 0, sourceEnd || source.length
    )
  }

  syncCall () {
    return (source, target, targetStart, targetEnd, sourceStart, sourceEnd) => {
      return source.compare(target, targetStart, targetEnd, sourceStart, sourceEnd)
    }
  }
}

module.exports = ComparedBuffers

},{"@cuties/cutie":71}],20:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class ConcatenatedBuffers extends AsyncObject {
  constructor (buffers, totalLength) {
    super(buffers, totalLength)
  }

  syncCall () {
    return Buffer.concat
  }
}

module.exports = ConcatenatedBuffers

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],21:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class CopiedBuffer extends AsyncObject {
  constructor (source, target, targetStart, sourceStart, sourceEnd) {
    super(
      source, target,
      targetStart || 0, sourceStart || 0,
      sourceEnd || source.length
    )
  }

  syncCall () {
    return (source, target, targetStart, sourceStart, sourceEnd) => {
      source.copy(target, targetStart, sourceStart, sourceEnd)
      return target
    }
  }
}

module.exports = CopiedBuffer

},{"@cuties/cutie":71}],22:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

class FilledBuffer extends AsyncObject {
  constructor (buf, value, offset, end, encoding) {
    super(buf, value, offset || 0, end || buf.length, encoding || 'utf8')
  }

  syncCall () {
    return (buf, value, offset, end, encoding) => {
      return buf.fill(value, offset, end, encoding)
    }
  }
}

module.exports = FilledBuffer

},{"@cuties/cutie":71}],23:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is integer
class IndexOf extends AsyncObject {
  constructor (buf, value, byteOffset, encoding) {
    super(buf, value, byteOffset || 0, encoding || 'utf8')
  }

  syncCall () {
    return (buf, value, byteOffset, encoding) => {
      return buf.indexOf(value, byteOffset, encoding)
    }
  }
}

module.exports = IndexOf

},{"@cuties/cutie":71}],24:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsBuffer extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return Buffer.isBuffer
  }
}

module.exports = IsBuffer

}).call(this,{"isBuffer":require("../../../is-buffer/index.js")})
},{"../../../is-buffer/index.js":148,"@cuties/cutie":71}],25:[function(require,module,exports){
(function (Buffer){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsEncoding extends AsyncObject {
  constructor (encoding) {
    super(encoding)
  }

  syncCall () {
    return Buffer.isEncoding
  }
}

module.exports = IsEncoding

}).call(this,require("buffer").Buffer)
},{"@cuties/cutie":71,"buffer":146}],26:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsIncluded extends AsyncObject {
  constructor (buf, value, byteOffset, encoding) {
    super(buf, value, byteOffset || 0, encoding || 'utf8')
  }

  syncCall () {
    return (buf, value, byteOffset, encoding) => {
      return buf.includes(value, byteOffset, encoding)
    }
  }
}

module.exports = IsIncluded

},{"@cuties/cutie":71}],27:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is integer
class LastIndexOf extends AsyncObject {
  constructor (buf, value, byteOffset, encoding) {
    super(buf, value, byteOffset || buf.length - 1, encoding || 'utf8')
  }

  syncCall () {
    return (buf, value, byteOffset, encoding) => {
      return buf.lastIndexOf(value, byteOffset, encoding)
    }
  }
}

module.exports = LastIndexOf

},{"@cuties/cutie":71}],28:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadDoubleBE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readDoubleBE(offset, noAssert)
    }
  }
}

module.exports = ReadDoubleBE

},{"@cuties/cutie":71}],29:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadDoubleLE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readDoubleLE(offset, noAssert)
    }
  }
}

module.exports = ReadDoubleLE

},{"@cuties/cutie":71}],30:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadFloatBE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readFloatBE(offset, noAssert)
    }
  }
}

module.exports = ReadFloatBE

},{"@cuties/cutie":71}],31:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadFloatLE extends AsyncObject {
  constructor (buffer, offset, noAssert) {
    super(buffer, offset, noAssert || false)
  }

  syncCall () {
    return (buffer, offset, noAssert) => {
      return buffer.readFloatLE(offset, noAssert)
    }
  }
}

module.exports = ReadFloatLE

},{"@cuties/cutie":71}],32:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadInt16BE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readInt16BE(offset, noAssert)
    }
  }
}

module.exports = ReadInt16BE

},{"@cuties/cutie":71}],33:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadInt16LE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readInt16LE(offset, noAssert)
    }
  }
}

module.exports = ReadInt16LE

},{"@cuties/cutie":71}],34:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadInt32BE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readInt32BE(offset, noAssert)
    }
  }
}

module.exports = ReadInt32BE

},{"@cuties/cutie":71}],35:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadInt32LE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readInt32LE(offset, noAssert)
    }
  }
}

module.exports = ReadInt32LE

},{"@cuties/cutie":71}],36:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadInt8 extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readInt8(offset, noAssert)
    }
  }
}

module.exports = ReadInt8

},{"@cuties/cutie":71}],37:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadIntBE extends AsyncObject {
  constructor (buf, byteLength, offset, noAssert) {
    super(buf, byteLength, offset, noAssert || false)
  }

  syncCall () {
    return (buf, byteLength, offset, noAssert) => {
      return buf.readIntBE(offset, byteLength, noAssert)
    }
  }
}

module.exports = ReadIntBE

},{"@cuties/cutie":71}],38:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadIntLE extends AsyncObject {
  constructor (buf, byteLength, offset, noAssert) {
    super(buf, byteLength, offset, noAssert || false)
  }

  syncCall () {
    return (buf, byteLength, offset, noAssert) => {
      return buf.readIntLE(offset, byteLength, noAssert)
    }
  }
}

module.exports = ReadIntLE

},{"@cuties/cutie":71}],39:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadUInt16BE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readUInt16BE(offset, noAssert)
    }
  }
}

module.exports = ReadUInt16BE

},{"@cuties/cutie":71}],40:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadUInt16LE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readUInt16LE(offset, noAssert)
    }
  }
}

module.exports = ReadUInt16LE

},{"@cuties/cutie":71}],41:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadUInt32BE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readUInt32BE(offset, noAssert)
    }
  }
}

module.exports = ReadUInt32BE

},{"@cuties/cutie":71}],42:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadUInt32LE extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readUInt32LE(offset, noAssert)
    }
  }
}

module.exports = ReadUInt32LE

},{"@cuties/cutie":71}],43:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadUInt8 extends AsyncObject {
  constructor (buf, offset, noAssert) {
    super(buf, offset, noAssert || false)
  }

  syncCall () {
    return (buf, offset, noAssert) => {
      return buf.readUInt8(offset, noAssert)
    }
  }
}

module.exports = ReadUInt8

},{"@cuties/cutie":71}],44:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadUIntBE extends AsyncObject {
  constructor (buf, offset, byteLength, noAssert) {
    super(buf, offset, byteLength, noAssert || false)
  }

  syncCall () {
    return (buf, offset, byteLength, noAssert) => {
      return buf.readUIntBE(offset, byteLength, noAssert)
    }
  }
}

module.exports = ReadUIntBE

},{"@cuties/cutie":71}],45:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class ReadUIntLE extends AsyncObject {
  constructor (buf, offset, byteLength) {
    super(buf, offset, byteLength)
  }

  syncCall () {
    return (buf, offset, byteLength) => {
      return buf.readUIntLE(offset, byteLength)
    }
  }
}

module.exports = ReadUIntLE

},{"@cuties/cutie":71}],46:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class SlicedBuffer extends AsyncObject {
  constructor (buf, start, end) {
    super(buf, start || 0, end || buf.length)
  }

  syncCall () {
    return (buf, start, end) => {
      return buf.slice(start, end)
    }
  }
}

module.exports = SlicedBuffer

},{"@cuties/cutie":71}],47:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class StringFromBuffer extends AsyncObject {
  constructor (buf, encoding, start, end) {
    super(buf, encoding || 'utf8', start || 0, end || buf.length)
  }

  syncCall () {
    return (buf, encoding, start, end) => {
      return buf.toString(encoding, start, end)
    }
  }
}

module.exports = StringFromBuffer

},{"@cuties/cutie":71}],48:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class Swapped16Buffer extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.swap16()
    }
  }
}

module.exports = Swapped16Buffer

},{"@cuties/cutie":71}],49:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class Swapped32Buffer extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.swap32()
    }
  }
}

module.exports = Swapped32Buffer

},{"@cuties/cutie":71}],50:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class Swapped64Buffer extends AsyncObject {
  constructor (buf) {
    super(buf)
  }

  syncCall () {
    return (buf) => {
      return buf.swap64()
    }
  }
}

module.exports = Swapped64Buffer

},{"@cuties/cutie":71}],51:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject
const buffer = require('buffer')

// Represented result is buffer
class TranscodedBuffer extends AsyncObject {
  constructor (source, fromEnc, toEnc) {
    super(source, fromEnc, toEnc)
  }

  syncCall () {
    return (source, fromEnc, toEnc) => {
      return buffer.transcode(source, fromEnc, toEnc)
    }
  }
}

module.exports = TranscodedBuffer

},{"@cuties/cutie":71,"buffer":146}],52:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is buffer
class WrittenBuffer extends AsyncObject {
  constructor (buf, string, offset, length, encoding) {
    super(buf, string, offset || 0, length || buf.length - offset, encoding || 'utf8')
  }

  syncCall () {
    return (buf, string, offset, length, encoding) => {
      buf.write(string, offset, length, encoding)
      return buf
    }
  }
}

module.exports = WrittenBuffer

},{"@cuties/cutie":71}],53:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenDoubleBE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeDoubleBE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenDoubleBE

},{"@cuties/cutie":71}],54:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenDoubleLE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeDoubleLE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenDoubleLE

},{"@cuties/cutie":71}],55:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenFloatBE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeFloatBE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenFloatBE

},{"@cuties/cutie":71}],56:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenFloatLE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeFloatLE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenFloatLE

},{"@cuties/cutie":71}],57:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenInt16BE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeInt16BE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenInt16BE

},{"@cuties/cutie":71}],58:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenInt16LE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeInt16LE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenInt16LE

},{"@cuties/cutie":71}],59:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenInt32BE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeInt32BE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenInt32BE

},{"@cuties/cutie":71}],60:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenInt32LE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeInt32LE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenInt32LE

},{"@cuties/cutie":71}],61:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenInt8 extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeInt8(value, offset, noAssert)
    }
  }
}

module.exports = WrittenInt8

},{"@cuties/cutie":71}],62:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenIntBE extends AsyncObject {
  constructor (buf, value, offset, byteLength) {
    super(buf, value, offset, byteLength)
  }

  syncCall () {
    return (buf, value, offset, byteLength) => {
      return buf.writeIntBE(value, offset, byteLength)
    }
  }
}

module.exports = WrittenIntBE

},{"@cuties/cutie":71}],63:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenIntLE extends AsyncObject {
  constructor (buf, value, offset, byteLength) {
    super(buf, value, offset, byteLength)
  }

  syncCall () {
    return (buf, value, offset, byteLength) => {
      return buf.writeIntLE(value, offset, byteLength)
    }
  }
}

module.exports = WrittenIntLE

},{"@cuties/cutie":71}],64:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenUInt16BE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeUInt16BE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenUInt16BE

},{"@cuties/cutie":71}],65:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenUInt16LE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeUInt16LE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenUInt16LE

},{"@cuties/cutie":71}],66:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenUInt32BE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeUInt32BE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenUInt32BE

},{"@cuties/cutie":71}],67:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenUInt32LE extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeUInt32LE(value, offset, noAssert)
    }
  }
}

module.exports = WrittenUInt32LE

},{"@cuties/cutie":71}],68:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenUInt8 extends AsyncObject {
  constructor (buf, value, offset, noAssert) {
    super(buf, value, offset, noAssert || false)
  }

  syncCall () {
    return (buf, value, offset, noAssert) => {
      return buf.writeUInt8(value, offset, noAssert)
    }
  }
}

module.exports = WrittenUInt8

},{"@cuties/cutie":71}],69:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenUIntBE extends AsyncObject {
  constructor (buf, value, offset, byteLength) {
    super(buf, value, offset, byteLength)
  }

  syncCall () {
    return (buf, value, offset, byteLength) => {
      return buf.writeUIntBE(value, offset, byteLength)
    }
  }
}

module.exports = WrittenUIntBE

},{"@cuties/cutie":71}],70:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is number
class WrittenUIntLE extends AsyncObject {
  constructor (buf, value, offset, byteLength) {
    super(buf, value, offset, byteLength)
  }

  syncCall () {
    return (buf, value, offset, byteLength) => {
      return buf.writeUIntLE(value, offset, byteLength)
    }
  }
}

module.exports = WrittenUIntLE

},{"@cuties/cutie":71}],71:[function(require,module,exports){
module.exports = {

  AsyncObject: require('./src/AsyncObject'),
  Event: require('./src/Event'),
  as: require('./src/As')

}

},{"./src/As":72,"./src/AsyncObject":73,"./src/Event":76}],72:[function(require,module,exports){
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

},{"./AsyncObject":73}],73:[function(require,module,exports){
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

},{"./AsyncTree":74}],74:[function(require,module,exports){
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

},{"./AsyncTreeNode":75,"./NotDefinedAsyncTreeNode":77,"./SimpleTreeNode":78}],75:[function(require,module,exports){
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

},{"./TreeNode":79}],76:[function(require,module,exports){
'use strict'

class Event {
  constructor () {}

  // TO BE OVERRIDDEN

  body (...args) {
    throw new Error(`Method body must be overriden with arguments ${args} of the event/eventListener you call`)
  }
}

module.exports = Event

},{}],77:[function(require,module,exports){
'use strict'

class NotDefinedAsyncTreeNode {
  constructor () {}
}

module.exports = NotDefinedAsyncTreeNode

},{}],78:[function(require,module,exports){
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

},{"./TreeNode":79}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
module.exports = {

  ParsedJSON: require('./src/ParsedJSON'),
  PrettyStringifiedJSON: require('./src/PrettyStringifiedJSON'),
  StringifiedJSON: require('./src/StringifiedJSON'),
  Value: require('./src/Value'),

}

},{"./src/ParsedJSON":81,"./src/PrettyStringifiedJSON":82,"./src/StringifiedJSON":83,"./src/Value":84}],81:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is json
class ParsedJSON extends AsyncObject {
  constructor (string) {
    super(string)
  }

  syncCall () {
    return JSON.parse
  }
}

module.exports = ParsedJSON

},{"@cuties/cutie":71}],82:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject
const prettyStringify = require('json-stringify-pretty-compact')

// Represented result is string
class PrettyStringifiedJSON extends AsyncObject {
  constructor (json) {
    super(json)
  }

  syncCall () {
    return prettyStringify
  }
}

module.exports = PrettyStringifiedJSON

},{"@cuties/cutie":71,"json-stringify-pretty-compact":149}],83:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is string
class StringifiedJSON extends AsyncObject {
  constructor (json) {
    super(json)
  }

  syncCall () {
    return JSON.stringify
  }
}

module.exports = StringifiedJSON

},{"@cuties/cutie":71}],84:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is value
class Value extends AsyncObject {
  // path has signature: 'key1.key2.key3[0]'
  constructor (json, path) {
    super(json, path)
  }

  syncCall () {
    return (json, path) => {
      return eval(`json.${path}`)
    }
  }
}

module.exports = Value

},{"@cuties/cutie":71}],85:[function(require,module,exports){
module.exports = {

  AreObjectsEqual: require('./src/AreObjectsEqual'),
  AssignedObject: require('./src/AssignedObject'),
  CreatedObject: require('./src/CreatedObject'),
  CreatedOptions: require('./src/CreatedOptions'),
  FrozenObject: require('./src/FrozenObject'),
  HasOwnProperty: require('./src/HasOwnProperty'),
  IsExtensible: require('./src/IsExtensible'),
  IsFrozen: require('./src/IsFrozen'),
  IsPropertyEnumerable: require('./src/IsPropertyEnumerable'),
  IsPrototypeOf: require('./src/IsPrototypeOf'),
  IsSealed: require('./src/IsSealed'),
  Keys: require('./src/Keys'),
  LocaleStringFrom: require('./src/LocaleStringFrom'),
  NotExtensibleObject: require('./src/NotExtensibleObject'),
  ObjectWithDefinedProperties: require('./src/ObjectWithDefinedProperties'),
  ObjectWithDefinedProperty: require('./src/ObjectWithDefinedProperty'),
  ObjectWithPrototypeOf: require('./src/ObjectWithPrototypeOf'),
  ObjectWithValue: require('./src/ObjectWithValue'),
  OwnPropertyDescriptor: require('./src/OwnPropertyDescriptor'),
  OwnPropertyNames: require('./src/OwnPropertyNames'),
  OwnPropertySymbols: require('./src/OwnPropertySymbols'),
  ProcessedObject: require('./src/ProcessedObject'),
  PrototypeOf: require('./src/PrototypeOf'),
  SealedObject: require('./src/SealedObject'),
  StringFrom: require('./src/StringFrom'),
  TheSameObjectWithValue: require('./src/TheSameObjectWithValue'),
  Value: require('./src/Value'),
  ValueOf: require('./src/ValueOf'),
  Values: require('./src/Values')

}

},{"./src/AreObjectsEqual":86,"./src/AssignedObject":87,"./src/CreatedObject":88,"./src/CreatedOptions":89,"./src/FrozenObject":90,"./src/HasOwnProperty":91,"./src/IsExtensible":92,"./src/IsFrozen":93,"./src/IsPropertyEnumerable":94,"./src/IsPrototypeOf":95,"./src/IsSealed":96,"./src/Keys":97,"./src/LocaleStringFrom":98,"./src/NotExtensibleObject":99,"./src/ObjectWithDefinedProperties":100,"./src/ObjectWithDefinedProperty":101,"./src/ObjectWithPrototypeOf":102,"./src/ObjectWithValue":103,"./src/OwnPropertyDescriptor":104,"./src/OwnPropertyNames":105,"./src/OwnPropertySymbols":106,"./src/ProcessedObject":107,"./src/PrototypeOf":108,"./src/SealedObject":109,"./src/StringFrom":110,"./src/TheSameObjectWithValue":111,"./src/Value":112,"./src/ValueOf":113,"./src/Values":114}],86:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class AreObjectsEqual extends AsyncObject {
  constructor (obj1, obj2) {
    super(obj1, obj2)
  }

  syncCall () {
    return (obj1, obj2) => {
      return Object.is(obj1, obj2)
    }
  }
}

module.exports = AreObjectsEqual

},{"@cuties/cutie":71}],87:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class AssignedObject extends AsyncObject {
  constructor (target, ...sources) {
    super(target, ...sources)
  }

  syncCall () {
    return (target, ...sources) => {
      return Object.assign(target, ...sources)
    }
  }
}

module.exports = AssignedObject

},{"@cuties/cutie":71}],88:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class CreatedObject extends AsyncObject {
  constructor (proto, propertiesObject) {
    super(proto, propertiesObject)
  }

  syncCall () {
    return (proto, propertiesObject) => {
      return Object.create(proto, propertiesObject)
    }
  }
}

module.exports = CreatedObject

},{"@cuties/cutie":71}],89:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class CreatedOptions extends AsyncObject {
  constructor (...args) {
    super(...args)
  }

  syncCall () {
    return (...args) => {
      let options = {}
      if (args.length % 2 !== 0) {
        throw new Error('odd number of parameters for options')
      }
      for (let i = 0; i < args.length - 1; i += 2) {
        options[args[i]] = args[i + 1]
      }
      return options
    }
  }
}

module.exports = CreatedOptions

},{"@cuties/cutie":71}],90:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class FrozenObject extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.freeze(obj)
    }
  }
}

module.exports = FrozenObject

},{"@cuties/cutie":71}],91:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class HasOwnProperty extends AsyncObject {
  constructor (obj, prop) {
    super(obj, prop)
  }

  syncCall () {
    return (obj, prop) => {
      return obj.hasOwnProperty(prop)
    }
  }
}

module.exports = HasOwnProperty

},{"@cuties/cutie":71}],92:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsExtensible extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.isExtensible(obj)
    }
  }
}

module.exports = IsExtensible

},{"@cuties/cutie":71}],93:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsFrozen extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.isFrozen(obj)
    }
  }
}

module.exports = IsFrozen

},{"@cuties/cutie":71}],94:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsPrototypeEnumerable extends AsyncObject {
  constructor (obj, prop) {
    super(obj, prop)
  }

  syncCall () {
    return (obj, prop) => {
      return obj.propertyIsEnumerable(prop)
    }
  }
}

module.exports = IsPrototypeEnumerable

},{"@cuties/cutie":71}],95:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsPrototypeOf extends AsyncObject {
  constructor (prototypeObj, obj) {
    super(prototypeObj, obj)
  }

  syncCall () {
    return (prototypeObj, obj) => {
      return prototypeObj.isPrototypeOf(obj)
    }
  }
}

module.exports = IsPrototypeOf

},{"@cuties/cutie":71}],96:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is boolean
class IsSealed extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.isSealed(obj)
    }
  }
}

module.exports = IsSealed

},{"@cuties/cutie":71}],97:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is string[]
class Keys extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.keys(obj)
    }
  }
}

module.exports = Keys

},{"@cuties/cutie":71}],98:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is string
class LocaleStringFrom extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return obj.toLocaleString()
    }
  }
}

module.exports = LocaleStringFrom

},{"@cuties/cutie":71}],99:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class NotExtensibleObject extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.preventExtensions(obj)
    }
  }
}

module.exports = NotExtensibleObject

},{"@cuties/cutie":71}],100:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class ObjectWithDefinedProperties extends AsyncObject {
  constructor (obj, props) {
    super(obj, props)
  }

  syncCall () {
    return (obj, props) => {
      return Object.defineProperties(obj, props)
    }
  }
}

module.exports = ObjectWithDefinedProperties

},{"@cuties/cutie":71}],101:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class ObjectWithDefinedProperty extends AsyncObject {
  constructor (obj, prop, descriptor) {
    super(obj, prop, descriptor)
  }

  syncCall () {
    return (obj, prop, descriptor) => {
      return Object.defineProperty(obj, prop, descriptor)
    }
  }
}

module.exports = ObjectWithDefinedProperty

},{"@cuties/cutie":71}],102:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class ObjectWithPrototypeOf extends AsyncObject {
  constructor (obj, prototype) {
    super(obj, prototype)
  }

  syncCall () {
    return (obj, prototype) => {
      return Object.setPrototypeOf(obj, prototype)
    }
  }
}

module.exports = ObjectWithPrototypeOf

},{"@cuties/cutie":71}],103:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is obj
class ObjectWithValue extends AsyncObject {
  constructor (obj, key, value) {
    super(obj, key, value)
  }

  syncCall () {
    return (obj, key, value) => {
      let newObj = Object.assign({}, obj)
      newObj[key] = value
      return newObj
    }
  }
}

module.exports = ObjectWithValue

},{"@cuties/cutie":71}],104:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class OwnPropertyDescriptor extends AsyncObject {
  constructor (obj, prop) {
    super(obj, prop)
  }

  syncCall () {
    return (obj, prop) => {
      return Object.getOwnPropertyDescriptor(obj, prop)
    }
  }
}

module.exports = OwnPropertyDescriptor

},{"@cuties/cutie":71}],105:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is string[]
class OwnPropertyNames extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj, prop) => {
      return Object.getOwnPropertyNames(obj)
    }
  }
}

module.exports = OwnPropertyNames

},{"@cuties/cutie":71}],106:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is string[]
class OwnPropertySymbols extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.getOwnPropertySymbols(obj)
    }
  }
}

module.exports = OwnPropertySymbols

},{"@cuties/cutie":71}],107:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is obj
class ProcessedObject extends AsyncObject {
  constructor (obj, iterator, ...additionalArgs) {
    super(obj, iterator, ...additionalArgs)
  }

  syncCall () {
    return (obj, iterator, ...additionalArgs) => {
      let newObj = Object.assign({}, obj)
      for (var key in newObj) {
        iterator(newObj, key, newObj[key], ...additionalArgs)
      }
      return newObj
    }
  }
}

module.exports = ProcessedObject

},{"@cuties/cutie":71}],108:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is prototype
class PrototypeOf extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.getPrototypeOf(obj)
    }
  }
}

module.exports = PrototypeOf

},{"@cuties/cutie":71}],109:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is object
class SealedObject extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.seal(obj)
    }
  }
}

module.exports = SealedObject

},{"@cuties/cutie":71}],110:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is string
class StringFrom extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return obj.toString()
    }
  }
}

module.exports = StringFrom

},{"@cuties/cutie":71}],111:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is obj
class TheSameObjectWithValue extends AsyncObject {
  constructor (obj, key, value) {
    super(obj, key, value)
  }

  syncCall () {
    return (obj, key, value) => {
      obj[key] = value
      return obj
    }
  }
}

module.exports = TheSameObjectWithValue

},{"@cuties/cutie":71}],112:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is value
class Value extends AsyncObject {
  constructor (obj, key) {
    super(obj, key)
  }

  syncCall () {
    return (obj, key) => {
      return obj[key]
    }
  }
}

module.exports = Value

},{"@cuties/cutie":71}],113:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is value
class ValueOf extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return obj.valueOf()
    }
  }
}

module.exports = ValueOf

},{"@cuties/cutie":71}],114:[function(require,module,exports){
'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

// Represented result is string[]
class Values extends AsyncObject {
  constructor (obj) {
    super(obj)
  }

  syncCall () {
    return (obj) => {
      return Object.values(obj)
    }
  }
}

module.exports = Values

},{"@cuties/cutie":71}],115:[function(require,module,exports){
"use strict";

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

},{"@page-libs/cutie":131}],116:[function(require,module,exports){
"use strict";

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

},{"./custom-calls/responseFromAjaxRequest":119,"@page-libs/cutie":131}],117:[function(require,module,exports){
"use strict";

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

},{"@page-libs/cutie":131}],118:[function(require,module,exports){
"use strict";

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

},{"@page-libs/cutie":131}],119:[function(require,module,exports){
"use strict";

// custom call
// err, {statusCode, headers, body} in callback
// options: {url, method, headers, mimeType, withCredentials, user, password, timeout, progressEvent, uploadProgressEvent}
var responseFromAjaxRequest = function responseFromAjaxRequest(options, requestBody, callback) {
  var resObj = {};
  var req = new XMLHttpRequest();
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
  req.open(options.method, options.url, true, options.user || null, options.password || null);
  req.send(requestBody);
};

module.exports = responseFromAjaxRequest;

},{}],120:[function(require,module,exports){
"use strict";

module.exports = {
  ResponseBody: require('./ResponseBody'),
  ResponseFromAjaxRequest: require('./ResponseFromAjaxRequest'),
  ResponseHeaders: require('./ResponseHeaders'),
  ResponseStatusCode: require('./ResponseStatusCode')
};

},{"./ResponseBody":115,"./ResponseFromAjaxRequest":116,"./ResponseHeaders":117,"./ResponseStatusCode":118}],121:[function(require,module,exports){
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

},{"./AsyncObject":122}],122:[function(require,module,exports){
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

},{"./AsyncTree":123}],123:[function(require,module,exports){
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

},{"./AsyncTreeNode":124,"./NotDefinedAsyncTreeNode":126,"./SimpleTreeNode":128}],124:[function(require,module,exports){
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

},{"./TreeNode":129}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotDefinedAsyncTreeNode = function NotDefinedAsyncTreeNode() {
  _classCallCheck(this, NotDefinedAsyncTreeNode);
};

module.exports = NotDefinedAsyncTreeNode;

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{"./TreeNode":129}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{"./AsyncObject":122,"@cuties/cutie":71}],131:[function(require,module,exports){
"use strict";

module.exports = {
  AsyncObject: require('./AsyncObject'),
  Event: require('./Event'),
  as: require('./As'),
  NullError: require('./NullError'),
  browserified: require('./browserified')
};

},{"./As":121,"./AsyncObject":122,"./Event":125,"./NullError":127,"./browserified":130}],132:[function(require,module,exports){
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

var CreatedElement =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(CreatedElement, _AsyncObject);

  function CreatedElement(tagName, attrStr, text) {
    _classCallCheck(this, CreatedElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(CreatedElement).call(this, tagName, attrStr, text));
  }

  _createClass(CreatedElement, [{
    key: "syncCall",
    value: function syncCall() {
      return function (tagName, attrStr, text) {
        var elm = document.createElement(tagName);

        if (attrStr) {
          attrStr.trim().split(' ').filter(function (str) {
            return str.trim().length !== 0;
          }).forEach(function (attrPair) {
            var nameAndValue = attrPair.split('=');
            var name = nameAndValue[0].trim();
            var value = nameAndValue[1].replace(/['"]+/g, '').trim();
            elm.setAttribute(name, value);
          });
        }

        if (text) {
          elm.appendChild(document.createTextNode(text));
        }

        return elm;
      };
    }
  }]);

  return CreatedElement;
}(AsyncObject);

module.exports = CreatedElement;

},{"@page-libs/cutie":131}],133:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],134:[function(require,module,exports){
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

var ElementWithAppendedChildren =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithAppendedChildren, _AsyncObject);

  function ElementWithAppendedChildren(elm) {
    var _getPrototypeOf2;

    _classCallCheck(this, ElementWithAppendedChildren);

    for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ElementWithAppendedChildren)).call.apply(_getPrototypeOf2, [this, elm].concat(children)));
  }

  _createClass(ElementWithAppendedChildren, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm) {
        for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          children[_key2 - 1] = arguments[_key2];
        }

        elm.append.apply(elm, children);
        return elm;
      };
    }
  }]);

  return ElementWithAppendedChildren;
}(AsyncObject);

module.exports = ElementWithAppendedChildren;

},{"@page-libs/cutie":131}],135:[function(require,module,exports){
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

var ElementWithAppendedText =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithAppendedText, _AsyncObject);

  function ElementWithAppendedText(elm, text) {
    _classCallCheck(this, ElementWithAppendedText);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementWithAppendedText).call(this, elm, text));
  }

  _createClass(ElementWithAppendedText, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm, text) {
        elm.appendChild(document.createTextNode(text));
        return elm;
      };
    }
  }]);

  return ElementWithAppendedText;
}(AsyncObject);

module.exports = ElementWithAppendedText;

},{"@page-libs/cutie":131}],136:[function(require,module,exports){
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

var ElementWithAttributes =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithAttributes, _AsyncObject);

  function ElementWithAttributes(elm, attrStr) {
    _classCallCheck(this, ElementWithAttributes);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementWithAttributes).call(this, elm, attrStr));
  }

  _createClass(ElementWithAttributes, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm, attrStr) {
        attrStr.split(' ').forEach(function (attrPair) {
          var nameAndValue = attrPair.split('=');
          var name = nameAndValue[0].trim();
          var value = nameAndValue[1].replace(/['"]+/g, '').trim();
          elm.setAttribute(name, value);
        });
        return elm;
      };
    }
  }]);

  return ElementWithAttributes;
}(AsyncObject);

module.exports = ElementWithAttributes;

},{"@page-libs/cutie":131}],137:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],138:[function(require,module,exports){
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

var ElementWithPrependedChildren =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithPrependedChildren, _AsyncObject);

  function ElementWithPrependedChildren(elm) {
    var _getPrototypeOf2;

    _classCallCheck(this, ElementWithPrependedChildren);

    for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ElementWithPrependedChildren)).call.apply(_getPrototypeOf2, [this, elm].concat(children)));
  }

  _createClass(ElementWithPrependedChildren, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm) {
        for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          children[_key2 - 1] = arguments[_key2];
        }

        elm.prepend.apply(elm, children);
        return elm;
      };
    }
  }]);

  return ElementWithPrependedChildren;
}(AsyncObject);

module.exports = ElementWithPrependedChildren;

},{"@page-libs/cutie":131}],139:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],140:[function(require,module,exports){
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

var RemovedElement =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(RemovedElement, _AsyncObject);

  function RemovedElement(elm) {
    _classCallCheck(this, RemovedElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(RemovedElement).call(this, elm));
  }

  _createClass(RemovedElement, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elm) {
        elm.parentNode.removeChild(elm);
        return elm;
      };
    }
  }]);

  return RemovedElement;
}(AsyncObject);

module.exports = RemovedElement;

},{"@page-libs/cutie":131}],141:[function(require,module,exports){
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

var ReplacedElement =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ReplacedElement, _AsyncObject);

  function ReplacedElement(newElm, oldElm) {
    _classCallCheck(this, ReplacedElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReplacedElement).call(this, newElm, oldElm));
  }

  _createClass(ReplacedElement, [{
    key: "syncCall",
    value: function syncCall() {
      return function (newElm, oldElm) {
        oldElm.parentNode.replaceChild(newElm, oldElm);
        return newElm;
      };
    }
  }]);

  return ReplacedElement;
}(AsyncObject);

module.exports = ReplacedElement;

},{"@page-libs/cutie":131}],142:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],143:[function(require,module,exports){
'use strict';

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CreatedElement = require('./CreatedElement');

var ElementWithAppendedChildren = require('./ElementWithAppendedChildren');

var tags = 'a, abbr, acronym, address, applet, area, article, aside, audio, b, base, basefont, bdo, big, blockquote, body, br, button, canvas, caption, center, cite, code, col, colgroup, datalist, dd, del, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, font, footer, form, frame, frameset, head, header, h1, h2, h3, h4, h5, h6, hr, html, i, iframe, img, input, ins, kbd, label, legend, li, link, main, map, mark, meta, meter, nav, noscript, object, ol, optgroup, option, p, param, pre, progress, q, s, samp, script, section, select, small, source, span, strike, strong, style, sub, sup, table, tbody, td, textarea, tfoot, th, thead, time, title, tr, u, ul, var, video, wbr'.split(', ');
var elms = {};
tags.forEach(function (tag) {
  elms[tag] = function (attrStr, text) {
    return function () {
      for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }

      return _construct(ElementWithAppendedChildren, [new CreatedElement(tag, attrStr, text)].concat(children));
    };
  };
});
module.exports = elms;

},{"./CreatedElement":132,"./ElementWithAppendedChildren":134}],144:[function(require,module,exports){
"use strict";

var exportsObj = require('./elms');

exportsObj.CreatedElement = require('./CreatedElement');
exportsObj.ElementWithAdditionalHTML = require('./ElementWithAdditionalHTML');
exportsObj.ElementWithAppendedChildren = require('./ElementWithAppendedChildren');
exportsObj.ElementWithAppendedText = require('./ElementWithAppendedText');
exportsObj.ElementWithAttributes = require('./ElementWithAttributes');
exportsObj.ElementWithInnerHTML = require('./ElementWithInnerHTML');
exportsObj.ElementWithPrependedChildren = require('./ElementWithPrependedChildren');
exportsObj.ElementWithTextContent = require('./ElementWithTextContent');
exportsObj.RemovedElement = require('./RemovedElement');
exportsObj.ReplacedElement = require('./ReplacedElement');
exportsObj.UnwrappedChildrenOfParent = require('./UnwrappedChildrenOfParent');
module.exports = exportsObj;

},{"./CreatedElement":132,"./ElementWithAdditionalHTML":133,"./ElementWithAppendedChildren":134,"./ElementWithAppendedText":135,"./ElementWithAttributes":136,"./ElementWithInnerHTML":137,"./ElementWithPrependedChildren":138,"./ElementWithTextContent":139,"./RemovedElement":140,"./ReplacedElement":141,"./UnwrappedChildrenOfParent":142,"./elms":143}],145:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],146:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var customInspectSymbol = typeof Symbol === 'function' ? Symbol.for('nodejs.util.inspect.custom') : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)
},{"base64-js":145,"buffer":146,"ieee754":147}],147:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],148:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],149:[function(require,module,exports){
function stringify (obj, options) {
  options = options || {}
  var indent = JSON.stringify([1], null, get(options, 'indent', 2)).slice(2, -3)
  var addMargin = get(options, 'margins', false)
  var maxLength = (indent === '' ? Infinity : get(options, 'maxLength', 80))

  return (function _stringify (obj, currentIndent, reserved) {
    if (obj && typeof obj.toJSON === 'function') {
      obj = obj.toJSON()
    }

    var string = JSON.stringify(obj)

    if (string === undefined) {
      return string
    }

    var length = maxLength - currentIndent.length - reserved

    if (string.length <= length) {
      var prettified = prettify(string, addMargin)
      if (prettified.length <= length) {
        return prettified
      }
    }

    if (typeof obj === 'object' && obj !== null) {
      var nextIndent = currentIndent + indent
      var items = []
      var delimiters
      var comma = function (array, index) {
        return (index === array.length - 1 ? 0 : 1)
      }

      if (Array.isArray(obj)) {
        for (var index = 0; index < obj.length; index++) {
          items.push(
            _stringify(obj[index], nextIndent, comma(obj, index)) || 'null'
          )
        }
        delimiters = '[]'
      } else {
        Object.keys(obj).forEach(function (key, index, array) {
          var keyPart = JSON.stringify(key) + ': '
          var value = _stringify(obj[key], nextIndent,
                                 keyPart.length + comma(array, index))
          if (value !== undefined) {
            items.push(keyPart + value)
          }
        })
        delimiters = '{}'
      }

      if (items.length > 0) {
        return [
          delimiters[0],
          indent + items.join(',\n' + nextIndent),
          delimiters[1]
        ].join('\n' + currentIndent)
      }
    }

    return string
  }(obj, '', 0))
}

// Note: This regex matches even invalid JSON strings, but since we’re
// working on the output of `JSON.stringify` we know that only valid strings
// are present (unless the user supplied a weird `options.indent` but in
// that case we don’t care since the output would be invalid anyway).
var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,\][}{]/g

function prettify (string, addMargin) {
  var m = addMargin ? ' ' : ''
  var tokens = {
    '{': '{' + m,
    '[': '[' + m,
    '}': m + '}',
    ']': m + ']',
    ',': ', ',
    ':': ': '
  }
  return string.replace(stringOrChar, function (match, string) {
    return string ? match : tokens[match]
  })
}

function get (options, name, defaultValue) {
  return (name in options ? options[name] : defaultValue)
}

module.exports = stringify

},{}],150:[function(require,module,exports){
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var StringWithAppliedStorageVariables = require('./util/StringWithAppliedStorageVariables');

var E =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(E, _HTMLElement);

  function E() {
    var _this;

    _classCallCheck(this, E);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(E).call(this));
    _this.rendered = false;
    return _this;
  }

  _createClass(E, [{
    key: "onRender",
    value: function onRender() {
      throw new Error('render function must be overridden');
    }
  }, {
    key: "applyStorageValuesToAttributes",
    value: function applyStorageValuesToAttributes() {
      for (var i = 0; i < this.attributes.length; i++) {
        if (this.attributes[i].name !== 'data-actions') {
          this.setAttribute(this.attributes[i].name, new StringWithAppliedStorageVariables(this.attributes[i].value).value());
        }
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.applyStorageValuesToAttributes();
      setTimeout(function () {
        if (!_this2.rendered) {
          _this2.onRender();

          _this2.rendered = true;
        }
      });
    }
  }]);

  return E;
}(_wrapNativeSuper(HTMLElement));

module.exports = E;

},{"./util/StringWithAppliedStorageVariables":182}],151:[function(require,module,exports){
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

},{"./../util/Actions":176,"@cuties/object":85}],152:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],153:[function(require,module,exports){
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

var StringWithAppliedStorageVariables = require('./../util/StringWithAppliedStorageVariables');

var StringWithMappedObject = require('./../util/StringWithMappedObject');

var ElementWithMappedObject =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementWithMappedObject, _AsyncObject);

  function ElementWithMappedObject(element, obj) {
    _classCallCheck(this, ElementWithMappedObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementWithMappedObject).call(this, element, obj));
  }

  _createClass(ElementWithMappedObject, [{
    key: "syncCall",
    value: function syncCall() {
      var _this = this;

      return function (element, obj) {
        var objName = element.getAttribute('data-response-object-name');

        if (!objName) {
          throw new Error("elm #".concat(element.getAttribute('id'), " must have attribute data-response-object-name for applying values to child nodes, so you can know what object it encapsulates"));
        }

        var OBJ = {};
        OBJ[objName] = obj;
        return _this.mapObjToChildren(element, OBJ);
      };
    }
  }, {
    key: "mapObjToChildren",
    value: function mapObjToChildren(element, obj) {
      var _this2 = this;

      element.childNodes.forEach(function (child) {
        if (child.getAttribute) {
          for (var i = 0; i < child.attributes.length; i++) {
            var attrName = child.attributes[i].name;
            var attrValue = child.attributes[i].value;

            if (attrName !== 'data-actions-on-response') {
              _this2.applyStorageVariablesInAttribute(child, attrName, attrValue);

              _this2.mapObjToAttribute(child, attrName, attrValue, obj);

              if (attrName === 'data-text') {
                if (!_this2.hasParamsInAttributeToApply(child, 'data-text')) {
                  _this2.insertTextIntoElm(child, child.getAttribute('data-text'));

                  child.removeAttribute('data-text');
                }
              } else if (attrName === 'data-value') {
                if (!_this2.hasParamsInAttributeToApply(child, 'data-value')) {
                  child.value = child.getAttribute('data-value');
                  child.removeAttribute('data-value');
                }
              }
            }
          }

          _this2.mapObjToChildren(child, obj);
        }
      });
      return element;
    }
  }, {
    key: "insertTextIntoElm",
    value: function insertTextIntoElm(elm, text) {
      var textNode = document.createTextNode(text);

      if (elm.childNodes.length === 0) {
        elm.appendChild(textNode);
      } else {
        elm.insertBefore(textNode, elm.childNodes[0]);
      }
    }
  }, {
    key: "applyStorageVariablesInAttribute",
    value: function applyStorageVariablesInAttribute(element, attrName, attrValue) {
      element.setAttribute(attrName, new StringWithAppliedStorageVariables(attrValue).value());
    }
  }, {
    key: "mapObjToAttribute",
    value: function mapObjToAttribute(element, attrName, attrValue, obj) {
      element.setAttribute(attrName, new StringWithMappedObject(element.getAttribute(attrName), obj).value());
    }
  }, {
    key: "hasParamsInAttributeToApply",
    value: function hasParamsInAttributeToApply(element, attrName) {
      return /\$\{([^{}]+|\S*)\}/g.test(element.getAttribute(attrName));
    }
  }]);

  return ElementWithMappedObject;
}(AsyncObject);

module.exports = ElementWithMappedObject;

},{"./../util/StringWithAppliedStorageVariables":182,"./../util/StringWithMappedObject":183,"@page-libs/cutie":131}],154:[function(require,module,exports){
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

var ElementsWithChangedClass =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(ElementsWithChangedClass, _AsyncObject);

  function ElementsWithChangedClass(newClassName, elms) {
    _classCallCheck(this, ElementsWithChangedClass);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementsWithChangedClass).call(this, newClassName, elms));
  }

  _createClass(ElementsWithChangedClass, [{
    key: "syncCall",
    value: function syncCall() {
      return function (newClassName, elms) {
        elms.forEach(function (elm) {
          elm.className = newClassName;
        });
        return elms;
      };
    }
  }]);

  return ElementsWithChangedClass;
}(AsyncObject);

module.exports = ElementsWithChangedClass;

},{"@page-libs/cutie":131}],155:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],156:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],157:[function(require,module,exports){
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

var FirstOf =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(FirstOf, _AsyncObject);

  function FirstOf(elms) {
    _classCallCheck(this, FirstOf);

    return _possibleConstructorReturn(this, _getPrototypeOf(FirstOf).call(this, elms));
  }

  _createClass(FirstOf, [{
    key: "syncCall",
    value: function syncCall() {
      return function (elms) {
        return elms[0];
      };
    }
  }]);

  return FirstOf;
}(AsyncObject);

module.exports = FirstOf;

},{"@page-libs/cutie":131}],158:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],159:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],160:[function(require,module,exports){
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

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

var ParsedElmSelectors = require('./../util/ParsedElmSelectors');

var AsyncParsedElmSelectors =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(AsyncParsedElmSelectors, _AsyncObject);

  function AsyncParsedElmSelectors() {
    var _getPrototypeOf2;

    _classCallCheck(this, AsyncParsedElmSelectors);

    for (var _len = arguments.length, elmSelectors = new Array(_len), _key = 0; _key < _len; _key++) {
      elmSelectors[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AsyncParsedElmSelectors)).call.apply(_getPrototypeOf2, [this].concat(elmSelectors)));
  }

  _createClass(AsyncParsedElmSelectors, [{
    key: "syncCall",
    value: function syncCall() {
      return function () {
        for (var _len2 = arguments.length, elmSelectors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          elmSelectors[_key2] = arguments[_key2];
        }

        return _construct(ParsedElmSelectors, elmSelectors).value();
      };
    }
  }]);

  return AsyncParsedElmSelectors;
}(AsyncObject);

module.exports = AsyncParsedElmSelectors;

},{"./../util/ParsedElmSelectors":180,"@page-libs/cutie":131}],161:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],162:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],163:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],164:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],165:[function(require,module,exports){
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

var StringWithAppliedStorageVariables = require('./../util/StringWithAppliedStorageVariables');

var AsyncStringWithAppliedStorageVariables =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(AsyncStringWithAppliedStorageVariables, _AsyncObject);

  function AsyncStringWithAppliedStorageVariables(str) {
    _classCallCheck(this, AsyncStringWithAppliedStorageVariables);

    return _possibleConstructorReturn(this, _getPrototypeOf(AsyncStringWithAppliedStorageVariables).call(this, str));
  }

  _createClass(AsyncStringWithAppliedStorageVariables, [{
    key: "syncCall",
    value: function syncCall() {
      return function (str) {
        return new StringWithAppliedStorageVariables(str).value();
      };
    }
  }]);

  return AsyncStringWithAppliedStorageVariables;
}(AsyncObject);

module.exports = AsyncStringWithAppliedStorageVariables;

},{"./../util/StringWithAppliedStorageVariables":182,"@page-libs/cutie":131}],166:[function(require,module,exports){
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

var StringWithMappedObject = require('./../util/StringWithMappedObject');

var AsyncStringWithMappedObject =
/*#__PURE__*/
function (_AsyncObject) {
  _inherits(AsyncStringWithMappedObject, _AsyncObject);

  function AsyncStringWithMappedObject(str, obj) {
    _classCallCheck(this, AsyncStringWithMappedObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(AsyncStringWithMappedObject).call(this, str, obj));
  }

  _createClass(AsyncStringWithMappedObject, [{
    key: "syncCall",
    value: function syncCall() {
      return function (str, obj) {
        return new StringWithMappedObject(str, obj).value();
      };
    }
  }]);

  return AsyncStringWithMappedObject;
}(AsyncObject);

module.exports = AsyncStringWithMappedObject;

},{"./../util/StringWithMappedObject":183,"@page-libs/cutie":131}],167:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],168:[function(require,module,exports){
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

},{"@page-libs/cutie":131}],169:[function(require,module,exports){
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

var _require2 = require('@page-libs/ajax'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var _browserified = browserified(require('@cuties/object')),
    CreatedOptions = _browserified.CreatedOptions;

var _browserified2 = browserified(require('@cuties/json')),
    ParsedJSON = _browserified2.ParsedJSON,
    StringifiedJSON = _browserified2.StringifiedJSON;

var AppliedActionsOnResponse = require('./../async/AppliedActionsOnResponse');

var EnabledElements = require('./../async/EnabledElements');

var ParsedElmSelectors = require('./../util/ParsedElmSelectors');

var FileInfo = require('./../util/FileInfo');

var E = require('./../E');

var EForm =
/*#__PURE__*/
function (_E) {
  _inherits(EForm, _E);

  function EForm() {
    _classCallCheck(this, EForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(EForm).call(this));
  }

  _createClass(EForm, [{
    key: "onRender",
    value: function onRender() {
      this.inputs = this.getElementsByTagName('input');
      this.selects = this.getElementsByTagName('select');
      this.textareas = this.getElementsByTagName('textarea');
      this.localStorageValues = this.getElementsByTagName('e-local-storage-value');
      this.sessionStorageValues = this.getElementsByTagName('e-session-storage-value');
      this.buttons = this.getElementsByTagName('button');
      this.progressBars = this.getElementsByTagName('progress');
      this.tuneFileInputs(this.filteredFileInputs(this.inputs));
      this.propagateFormSendEvent(this.inputs);
      this.propagateFormSendEvent(this.selects);
      this.propagateFormSendEvent(this.textareas);
      this.propagateFormSendEvent(this.localStorageValues);
      this.propagateFormSendEvent(this.sessionStorageValues);
      this.propagateFormSendEvent(this.buttons);
      this.prepareProgressBars(this.progressBars);
    }
  }, {
    key: "propagateFormSendEvent",
    value: function propagateFormSendEvent(elms) {
      var _this = this;

      var _loop = function _loop(index) {
        var elm = elms[index];
        var eventName = elm.getAttribute('data-send-form-on');

        if (eventName) {
          elm.addEventListener(eventName, function () {
            _this.submit(elm);
          });
        }
      };

      for (var index = 0; index < elms.length; index++) {
        _loop(index);
      }
    }
  }, {
    key: "submit",
    value: function submit(target) {
      var uploadProgressBar = new ParsedElmSelectors(target.getAttribute('data-upload-progress-bar')).value()[0];
      var progressBar = new ParsedElmSelectors(target.getAttribute('data-progress-bar')).value()[0];
      target.disabled = true;
      var requestBody = this.requestBody();
      new ParsedJSON(new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', target.getAttribute('data-request-url'), 'headers', new ParsedJSON(target.getAttribute('data-request-headers') || '{}'), 'method', target.getAttribute('data-request-method') || 'POST', 'uploadProgressEvent', this.showProgress(uploadProgressBar), 'progressEvent', this.showProgress(progressBar)), new StringifiedJSON(requestBody)))).as('RESPONSE').after(new EnabledElements([target]).after(new AppliedActionsOnResponse(target.tagName, target.getAttribute('data-response-object-name'), target.getAttribute('data-actions-on-response'), as('RESPONSE')))).call();
    }
  }, {
    key: "requestBody",
    value: function requestBody() {
      var requestBody = {};
      this.retrievedValuesFromInputsForRequestBody(this.inputs, requestBody);
      this.retrievedValuesFromSelectsForRequestBody(this.selects, requestBody);
      this.retrievedValuesFromTextareasForRequestBody(this.textareas, requestBody);
      this.retrievedValuesFromLocalStorageForRequestBody(this.localStorageValues, requestBody);
      this.retrievedValuesFromSessionStorageForRequestBody(this.sessionStorageValues, requestBody);
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
          requestBody[input.name] = input.checked;
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
      var _this2 = this;

      var readProgressBar = new ParsedElmSelectors(fileInput.getAttribute('data-read-progress-bar')).value()[0];
      fileInput.addEventListener('change', function () {
        _this2.readFilesContentForRequestBody(fileInput, readProgressBar);
      });
    }
  }, {
    key: "readFilesContentForRequestBody",
    value: function readFilesContentForRequestBody(fileInput, readProgressBar) {
      fileInput.filesInfo = [];

      for (var index = 0; index < fileInput.files.length; index++) {
        this.readFileContentForRequestBody(fileInput, readProgressBar, index);
      }
    }
  }, {
    key: "readFileContentForRequestBody",
    value: function readFileContentForRequestBody(fileInput, readProgressBar, index) {
      var file = fileInput.files[index];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        fileInput.filesInfo[index] = new FileInfo(file.name, file.size, file.type, reader.result, file.lastModifiedDate);
      };

      reader.onprogress = this.showProgress(readProgressBar);
      reader.onloadend = this.hideProgress(readProgressBar);

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
  }, {
    key: "prepareProgressBars",
    value: function prepareProgressBars(progressBars) {
      for (var index = 0; index < progressBars.length; index++) {
        var progressBar = progressBars[index];
        progressBar.max = 100;
        progressBar.value = 0;
        progressBar.style.display = 'none';
      }
    }
  }, {
    key: "showProgress",
    value: function showProgress(progressBar) {
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
    }
  }, {
    key: "hideProgress",
    value: function hideProgress(progressBar) {
      if (progressBar) {
        return function () {
          progressBar.style.display = 'none';
        };
      }

      return function () {};
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  return EForm;
}(E);

window.customElements.define('e-form', EForm);
module.exports = EForm;

},{"./../E":150,"./../async/AppliedActionsOnResponse":151,"./../async/EnabledElements":156,"./../util/FileInfo":178,"./../util/ParsedElmSelectors":180,"@cuties/json":80,"@cuties/object":85,"@page-libs/ajax":120,"@page-libs/cutie":131}],170:[function(require,module,exports){
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

var _browserified = browserified(require('@cuties/json')),
    ParsedJSON = _browserified.ParsedJSON;

var AppliedActionsOnResponse = require('./../async/AppliedActionsOnResponse');

var E = require('./../E');

var GOOGLE_API_SRC = 'https://apis.google.com/js/api:client.js';

var EGoogleOauthButton =
/*#__PURE__*/
function (_E) {
  _inherits(EGoogleOauthButton, _E);

  function EGoogleOauthButton() {
    _classCallCheck(this, EGoogleOauthButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(EGoogleOauthButton).call(this));
  }

  _createClass(EGoogleOauthButton, [{
    key: "supportedActions",
    value: function supportedActions() {
      return ['redirect', 'saveToLocalStorage', 'saveToSessionStorage', 'innerHTML', 'addHTMLTo', 'mapObjToElm', 'hideElms', 'showElms', 'disableElms', 'enableElms', 'changeElmsClassName'];
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var _this = this;

      var googleSignInMetaElm = this.googleSignInMetaElm();
      var googleApiScriptElm = this.googleApiScriptElm();
      document.head.prepend(googleSignInMetaElm, googleApiScriptElm);
      this.style['display'] = 'none';

      googleApiScriptElm.onload = function () {
        _this.initGoogleOauth();
      };

      this.rendered = true;
    }
  }, {
    key: "initGoogleOauth",
    value: function initGoogleOauth() {
      var _this2 = this;

      this.style['display'] = ''; // eslint-disable-next-line no-undef

      gapi.load('auth2', function () {
        // eslint-disable-next-line no-undef
        var auth2 = gapi.auth2.init({
          client_id: _this2.getAttribute('data-client-id'),
          cookiepolicy: _this2.getAttribute('data-cookiepolicy') || 'single_host_origin',
          scope: _this2.getAttribute('data-scope') || 'profile'
        });
        auth2.attachClickHandler(_this2, {}, function (googleUser) {
          var body = {};
          body[_this2.getAttribute('data-request-token-key') || 'googleToken'] = googleUser.getAuthResponse().id_token;
          new AppliedActionsOnResponse(_this2.tagName, _this2.getAttribute('data-response-object-name'), _this2.getAttribute('data-actions-on-response'), _this2.supportedActions(), new ParsedJSON(new ResponseBody(new ResponseFromAjaxRequest({
            url: _this2.getAttribute('data-redirect-url') || '/',
            method: 'POST'
          }, JSON.stringify(body))))).call();
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
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-client-id', 'data-cookiepolicy', 'data-scope', 'data-redirect-url', 'data-local-storage-jwt-key', 'data-response-object-name', 'data-actions-on-response'];
    }
  }]);

  return EGoogleOauthButton;
}(E);

window.customElements.define('e-google-oauth-button', EGoogleOauthButton);
module.exports = EGoogleOauthButton;

},{"./../E":150,"./../async/AppliedActionsOnResponse":151,"@cuties/json":80,"@page-libs/ajax":120,"@page-libs/cutie":131}],171:[function(require,module,exports){
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

var _browserified = browserified(require('@cuties/object')),
    CreatedOptions = _browserified.CreatedOptions;

var _browserified2 = browserified(require('@cuties/json')),
    ParsedJSON = _browserified2.ParsedJSON;

var _require2 = require('@page-libs/ajax'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var _require3 = require('@page-libs/dom'),
    UnwrappedChildrenOfParent = _require3.UnwrappedChildrenOfParent,
    ElementWithInnerHTML = _require3.ElementWithInnerHTML;

var E = require('./../E');

var EHTML =
/*#__PURE__*/
function (_E) {
  _inherits(EHTML, _E);

  function EHTML() {
    _classCallCheck(this, EHTML);

    return _possibleConstructorReturn(this, _getPrototypeOf(EHTML).call(this));
  }

  _createClass(EHTML, [{
    key: "onRender",
    value: function onRender() {
      new UnwrappedChildrenOfParent(new ElementWithInnerHTML(this, new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', this.getAttribute('data-src'), 'method', 'GET', 'headers', new ParsedJSON(this.getAttribute('data-headers') || '{}')))))).call();
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-src', 'data-headers'];
    }
  }]);

  return EHTML;
}(E);

window.customElements.define('e-html', EHTML);
module.exports = EHTML;

},{"./../E":150,"@cuties/json":80,"@cuties/object":85,"@page-libs/ajax":120,"@page-libs/cutie":131,"@page-libs/dom":144}],172:[function(require,module,exports){
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

var _browserified = browserified(require('@cuties/object')),
    CreatedOptions = _browserified.CreatedOptions;

var _browserified2 = browserified(require('@cuties/json')),
    ParsedJSON = _browserified2.ParsedJSON;

var _browserified3 = browserified(require('@cuties/buffer')),
    StringFromBuffer = _browserified3.StringFromBuffer;

var _require2 = require('@page-libs/ajax'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var AppliedActionsOnResponse = require('./../async/AppliedActionsOnResponse');

var E = require('./../E');

var EJSON =
/*#__PURE__*/
function (_E) {
  _inherits(EJSON, _E);

  function EJSON() {
    _classCallCheck(this, EJSON);

    return _possibleConstructorReturn(this, _getPrototypeOf(EJSON).call(this));
  }

  _createClass(EJSON, [{
    key: "supportedActions",
    value: function supportedActions() {
      return ['redirect', 'saveToLocalStorage', 'saveToSessionStorage', 'innerHTML', 'addHTMLTo', 'mapObjToElm', 'hideElms', 'showElms', 'disableElms', 'enableElms', 'changeElmsClassName'];
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var event = this.getAttribute('data-event');

      if (event) {
        this.addEventListener(event, this.activate);
      } else {
        this.activate();
      }
    }
  }, {
    key: "activate",
    value: function activate() {
      new AppliedActionsOnResponse(this.tagName, this.getAttribute('data-response-object-name'), this.getAttribute('data-actions-on-response'), this.supportedActions(), new ParsedJSON(new StringFromBuffer(new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', this.getAttribute('data-src'), 'method', 'GET', 'headers', new ParsedJSON(this.getAttribute('data-headers') || '{}'))))))).call();
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-src', 'data-headers', 'data-response-object-name', 'data-actions-on-response', 'data-event'];
    }
  }]);

  return EJSON;
}(E);

window.customElements.define('e-json', EJSON);
module.exports = EJSON;

},{"./../E":150,"./../async/AppliedActionsOnResponse":151,"@cuties/buffer":1,"@cuties/json":80,"@cuties/object":85,"@page-libs/ajax":120,"@page-libs/cutie":131}],173:[function(require,module,exports){
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

var ELocalStorageValue =
/*#__PURE__*/
function (_E) {
  _inherits(ELocalStorageValue, _E);

  function ELocalStorageValue() {
    _classCallCheck(this, ELocalStorageValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(ELocalStorageValue).call(this));
  }

  _createClass(ELocalStorageValue, [{
    key: "onRender",
    value: function onRender() {
      this.name = this.getAttribute('name');
    }
  }, {
    key: "value",
    value: function value() {
      return localStorage.getItem(this.getAttribute('data-key'));
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['name', 'data-key'];
    }
  }]);

  return ELocalStorageValue;
}(E);

window.customElements.define('e-local-storage-value', ELocalStorageValue);
module.exports = ELocalStorageValue;

},{"./../E":150}],174:[function(require,module,exports){
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

var ESessionStorageValue =
/*#__PURE__*/
function (_E) {
  _inherits(ESessionStorageValue, _E);

  function ESessionStorageValue() {
    _classCallCheck(this, ESessionStorageValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(ESessionStorageValue).call(this));
  }

  _createClass(ESessionStorageValue, [{
    key: "supportedActions",
    value: function supportedActions() {
      return [];
    }
  }, {
    key: "onRender",
    value: function onRender() {
      this.name = this.getAttribute('name');
    }
  }, {
    key: "value",
    value: function value() {
      // eslint-disable-next-line no-undef
      return sessionStorageWrapper.getItem(this.getAttribute('data-key'));
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['name', 'data-key'];
    }
  }]);

  return ESessionStorageValue;
}(E);

window.customElements.define('e-session-storage-value', ESessionStorageValue);
module.exports = ESessionStorageValue;

},{"./../E":150}],175:[function(require,module,exports){
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

var _require = require('@page-libs/cutie'),
    browserified = _require.browserified;

var _browserified = browserified(require('@cuties/object')),
    CreatedOptions = _browserified.CreatedOptions;

var _require2 = require('@page-libs/ajax'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var _require3 = require('@page-libs/dom'),
    ElementWithInnerHTML = _require3.ElementWithInnerHTML,
    ElementWithAdditionalHTML = _require3.ElementWithAdditionalHTML;

var RedirectedLocation = require('./../async/RedirectedLocation');

var LocalStorageWithSetValue = require('./../async/LocalStorageWithSetValue');

var SessionStorageWithSetValue = require('./../async/SessionStorageWithSetValue');

var HiddenElements = require('./../async/HiddenElements');

var ShownElements = require('./../async/ShownElements');

var DisabledElements = require('./../async/DisabledElements');

var EnabledElements = require('./../async/EnabledElements');

var ElementWithMappedObject = require('./../async/ElementWithMappedObject');

var ElementsWithChangedClass = require('./../async/ElementsWithChangedClass');

var FirstOf = require('./../async/FirstOf');

var ParsedElmSelectors = require('./../async/ParsedElmSelectors');

var ParsedJSONOrString = require('./../async/ParsedJSONOrString');

var actions = {
  redirect: function redirect(url) {
    return new RedirectedLocation(url);
  },
  saveToLocalStorage: function saveToLocalStorage(key, value) {
    return new LocalStorageWithSetValue(localStorage, key, value);
  },
  saveToSessionStorage: function saveToSessionStorage(key, value) {
    // eslint-disable-next-line no-undef
    return new SessionStorageWithSetValue(sessionStorageWrapper, key, value);
  },
  hideElms: function hideElms() {
    for (var _len = arguments.length, elmSelectors = new Array(_len), _key = 0; _key < _len; _key++) {
      elmSelectors[_key] = arguments[_key];
    }

    return new HiddenElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  showElms: function showElms() {
    for (var _len2 = arguments.length, elmSelectors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      elmSelectors[_key2] = arguments[_key2];
    }

    return new ShownElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  disableElms: function disableElms() {
    for (var _len3 = arguments.length, elmSelectors = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      elmSelectors[_key3] = arguments[_key3];
    }

    return new DisabledElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  enableElms: function enableElms() {
    for (var _len4 = arguments.length, elmSelectors = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      elmSelectors[_key4] = arguments[_key4];
    }

    return new EnabledElements(_construct(ParsedElmSelectors, elmSelectors));
  },
  innerHTML: function innerHTML(elmSelector, url, headers) {
    return new ElementWithInnerHTML(new FirstOf(new ParsedElmSelectors(elmSelector)), new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', url, 'method', 'GET', 'headers', new ParsedJSONOrString(headers || '{}')))));
  },
  addHTMLTo: function addHTMLTo(elmSelector, url, headers) {
    return new ElementWithAdditionalHTML(new FirstOf(new ParsedElmSelectors(elmSelector)), new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', url, 'method', 'GET', 'headers', new ParsedJSONOrString(headers || '{}')))));
  },
  mapObjToElm: function mapObjToElm(elmSelector, obj) {
    return new ElementWithMappedObject(new FirstOf(new ParsedElmSelectors(elmSelector)), obj);
  },
  changeElmsClassName: function changeElmsClassName(newClassName) {
    for (var _len5 = arguments.length, elmSelectors = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      elmSelectors[_key5 - 1] = arguments[_key5];
    }

    return new ElementsWithChangedClass(newClassName, _construct(ParsedElmSelectors, elmSelectors));
  }
};

var ActionByNameWithParams =
/*#__PURE__*/
function () {
  function ActionByNameWithParams(name) {
    _classCallCheck(this, ActionByNameWithParams);

    this.name = name;

    for (var _len6 = arguments.length, params = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      params[_key6 - 1] = arguments[_key6];
    }

    this.params = params;
  }

  _createClass(ActionByNameWithParams, [{
    key: "value",
    value: function value() {
      if (!actions[this.name]) {
        throw new Error("no such action with name ".concat(this.name));
      }

      return actions[this.name].apply(actions, _toConsumableArray(this.params));
    }
  }]);

  return ActionByNameWithParams;
}();

module.exports = ActionByNameWithParams;

},{"./../async/DisabledElements":152,"./../async/ElementWithMappedObject":153,"./../async/ElementsWithChangedClass":154,"./../async/EnabledElements":156,"./../async/FirstOf":157,"./../async/HiddenElements":158,"./../async/LocalStorageWithSetValue":159,"./../async/ParsedElmSelectors":160,"./../async/ParsedJSONOrString":161,"./../async/RedirectedLocation":162,"./../async/SessionStorageWithSetValue":163,"./../async/ShownElements":164,"@cuties/object":85,"@page-libs/ajax":120,"@page-libs/cutie":131,"@page-libs/dom":144}],176:[function(require,module,exports){
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

},{"./BuiltAsyncTreeByParsedActions":177,"./ParsedActions":179}],177:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmptyAsyncObject = require('./../async/EmptyAsyncObject');

var BuiltAsyncTreeByParsedActions =
/*#__PURE__*/
function () {
  function BuiltAsyncTreeByParsedActions(parsedActions, values) {
    _classCallCheck(this, BuiltAsyncTreeByParsedActions);

    this.parsedActions = parsedActions;
    this.values = values;
  }

  _createClass(BuiltAsyncTreeByParsedActions, [{
    key: "value",
    value: function value() {
      return this.buildAsyncTree();
    }
  }, {
    key: "buildAsyncTree",
    value: function buildAsyncTree() {
      var curIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.parsedActions.length === 0) {
        return new EmptyAsyncObject(this.values);
      }

      if (this.parsedActions.length === curIndex) {
        return this.parsedActions[0];
      } else {
        this.parsedActions[curIndex].after(this.parsedActions[curIndex + 1]);
        return this.buildAsyncTree(curIndex + 1);
      }
    }
  }]);

  return BuiltAsyncTreeByParsedActions;
}();

module.exports = BuiltAsyncTreeByParsedActions;

},{"./../async/EmptyAsyncObject":155}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

var EmptyAsyncObject = require('./../async/EmptyAsyncObject');

var StringWithAppliedStorageVariables = require('./../async/StringWithAppliedStorageVariables');

var StringWithMappedObject = require('./../async/StringWithMappedObject');

var ParsedJSONOrString = require('./../async/ParsedJSONOrString');

var ActionByNameWithParams = require('./ActionByNameWithParams');

var ParsedActions =
/*#__PURE__*/
function () {
  function ParsedActions(actions, tagName, obj) {
    _classCallCheck(this, ParsedActions);

    // act1(p1, p2); act(q1, q2); ...
    this.actions = actions;
    this.tagName = tagName;
    this.obj = obj;
  }

  _createClass(ParsedActions, [{
    key: "value",
    value: function value() {
      var _this = this;

      var parsedActions = [];

      if (!this.actions) {
        return new EmptyAsyncObject();
      }

      var splitedActions = this.actions.split(';').map(function (action) {
        return action.trim();
      }).filter(function (action) {
        return action.length !== 0;
      });
      splitedActions.forEach(function (action) {
        var actionName = action.split('(')[0].trim();

        var actionParams = _this.actionParams(action, actionName);

        parsedActions.push(_construct(ActionByNameWithParams, [actionName].concat(_toConsumableArray(actionParams))).value());
      });
      return parsedActions;
    }
  }, {
    key: "actionParams",
    value: function actionParams(action, actionName) {
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

        return new ParsedJSONOrString(new StringWithMappedObject(new StringWithAppliedStorageVariables(param), _this2.obj));
      });
    }
  }]);

  return ParsedActions;
}();

module.exports = ParsedActions;

},{"./../async/EmptyAsyncObject":155,"./../async/ParsedJSONOrString":161,"./../async/StringWithAppliedStorageVariables":165,"./../async/StringWithMappedObject":166,"./ActionByNameWithParams":175}],180:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParsedElmSelectors =
/*#__PURE__*/
function () {
  function ParsedElmSelectors() {
    _classCallCheck(this, ParsedElmSelectors);

    for (var _len = arguments.length, elmSelectors = new Array(_len), _key = 0; _key < _len; _key++) {
      elmSelectors[_key] = arguments[_key];
    }

    this.elmSelectors = elmSelectors;
  }

  _createClass(ParsedElmSelectors, [{
    key: "value",
    value: function value() {
      return this.parseElmSelectors();
    }
  }, {
    key: "parseElmSelectors",
    value: function parseElmSelectors() {
      var _this = this;

      var elms = [];
      this.elmSelectors.forEach(function (elmSelector) {
        if (elmSelector) {
          elmSelector = elmSelector.trim();

          if (new RegExp(/^#(\S+)$/g).test(elmSelector)) {
            elms.push(document.getElementById(elmSelector.split('#')[1]));
          } else if (new RegExp(/^\.(\S+)$/g).test(elmSelector)) {
            _this.pushElms(elms, document.getElementsByClassName(elmSelector.split('.')[1]));
          } else if (new RegExp(/^(\S+)$/g).test(elmSelector)) {
            _this.pushElms(elms, document.getElementsByTagName(elmSelector));
          }
        }
      });
      return elms;
    }
  }, {
    key: "pushElms",
    value: function pushElms(elms, elmsToPush) {
      for (var i = 0; i < elmsToPush.length; i++) {
        elms.push(elmsToPush[i]);
      }
    }
  }]);

  return ParsedElmSelectors;
}();

module.exports = ParsedElmSelectors;

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StringWithAppliedStorageVariables =
/*#__PURE__*/
function () {
  function StringWithAppliedStorageVariables(str) {
    _classCallCheck(this, StringWithAppliedStorageVariables);

    this.str = str;
  }

  _createClass(StringWithAppliedStorageVariables, [{
    key: "value",
    value: function value() {
      return this.str.replace(/\$\{localStorage\.(.+)\}/g, function (match, p1, offset, string) {
        return localStorage.getItem(p1);
      }).replace(/\$\{sessionStorage\.(.+)\}/g, function (match, p1, offset, string) {
        var value = sessionStorage.getItem(p1);

        if (value instanceof Object) {
          return JSON.stringify(value);
        }

        return value;
      });
    }
  }]);

  return StringWithAppliedStorageVariables;
}();

module.exports = StringWithAppliedStorageVariables;

},{}],183:[function(require,module,exports){
"use strict";
'use string';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StringWithMappedObject =
/*#__PURE__*/
function () {
  function StringWithMappedObject(str, obj) {
    _classCallCheck(this, StringWithMappedObject);

    this.str = str;
    this.obj = obj;
  }

  _createClass(StringWithMappedObject, [{
    key: "value",
    value: function value() {
      var _this = this;

      return this.str.replace(/\$\{([^{}]+|\S*)\}/g, function (match, p1, offset, string) {
        try {
          var res = _this.valueOf(_this.obj, p1.split('.'));

          if (_typeof(res) === 'object') {
            return JSON.stringify(res);
          }

          return res;
        } catch (e) {
          return match;
        }
      });
    }
  }, {
    key: "valueOf",
    value: function valueOf(obj, pathParts) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (pathParts.length - 1 === index) {
        return obj[pathParts[index]];
      } else {
        return this.valueOf(obj[pathParts[index]], pathParts, index + 1);
      }
    }
  }]);

  return StringWithMappedObject;
}();

module.exports = StringWithMappedObject;

},{}]},{},[151,152,154,153,155,156,157,158,159,160,161,162,163,164,165,166,167,168,150,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183]);
