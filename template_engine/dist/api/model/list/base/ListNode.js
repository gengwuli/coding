"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ID = require("../util/ID");

var _ID2 = _interopRequireDefault(_ID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListNode = function ListNode() {
  var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "null";

  _classCallCheck(this, ListNode);

  this.label = label;
  this.next = null;
  this.id = _ID2.default.next();
};

exports.default = ListNode;