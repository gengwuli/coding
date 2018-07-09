"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VizEdge2 = require("./VizEdge");

var _VizEdge3 = _interopRequireDefault(_VizEdge2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NormalVizEdge = function (_VizEdge) {
  _inherits(NormalVizEdge, _VizEdge);

  function NormalVizEdge() {
    _classCallCheck(this, NormalVizEdge);

    return _possibleConstructorReturn(this, (NormalVizEdge.__proto__ || Object.getPrototypeOf(NormalVizEdge)).apply(this, arguments));
  }

  return NormalVizEdge;
}(_VizEdge3.default);

exports.default = NormalVizEdge;