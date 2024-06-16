"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs-extra');

var path = require('path');

var rootDir = path.resolve('/');
/**
 * 递归逐级向上查找项目package.json所在的目录
 * @returns {Promise<String|null>}
 */

module.exports = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var dir;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dir = process.cwd();

        case 1:
          _context.next = 4;
          return fs.exists("".concat(dir, "/package.json"));

        case 4:
          if (!_context.sent) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", dir);

        case 8:
          if (!(dir === rootDir)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", null);

        case 12:
          dir = path.dirname(dir);

        case 13:
          _context.next = 1;
          break;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));