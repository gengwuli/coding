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

var AddVizEdge = function (_VizEdge) {
  _inherits(AddVizEdge, _VizEdge);

  function AddVizEdge(from, to) {
    _classCallCheck(this, AddVizEdge);

    var _this = _possibleConstructorReturn(this, (AddVizEdge.__proto__ || Object.getPrototypeOf(AddVizEdge)).call(this, from, to));

    _this.vizProps = ["[color=darkgreen][fontsize=9][fontcolor=red][label=\" \"]"];
    return _this;
  }

  return AddVizEdge;
}(_VizEdge3.default);

exports.default = AddVizEdge;