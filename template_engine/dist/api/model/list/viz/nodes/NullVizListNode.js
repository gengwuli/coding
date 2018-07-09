'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VizListNode2 = require('./VizListNode');

var _VizListNode3 = _interopRequireDefault(_VizListNode2);

var _ID = require('../../util/ID');

var _ID2 = _interopRequireDefault(_ID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NullVizListNode = function (_VizListNode) {
  _inherits(NullVizListNode, _VizListNode);

  function NullVizListNode() {
    _classCallCheck(this, NullVizListNode);

    return _possibleConstructorReturn(this, (NullVizListNode.__proto__ || Object.getPrototypeOf(NullVizListNode)).apply(this, arguments));
  }

  _createClass(NullVizListNode, [{
    key: 'renderVizEdges',
    value: function renderVizEdges() {
      return "";
    }
  }, {
    key: 'renderVizNodes',
    value: function renderVizNodes() {
      return this.id + '[label="null"][shape=none][fontcolor=red];';
    }
  }, {
    key: 'addVizProps',
    value: function addVizProps(props) {
      return;
    }
  }, {
    key: 'addVizPointers',
    value: function addVizPointers(props) {
      if (props.length == 0) {
        return;
      }
      if (props[0][0] == this.idx) {
        this.pointers = this.pointers || [];
        this.pointers.push(props.shift()[1]);
      }
    }
  }, {
    key: 'renderPointers',
    value: function renderPointers() {
      var _this2 = this;

      return (this.pointers || []).map(function (p) {
        var pId = _ID2.default.next();
        return pId + '[shape=plaintext][fontsize=10][height=0.1][width=0.1][label="' + p + '"];\n           ' + pId + '->' + _this2.id + '[labelfontcolor=blue][labelfontsize=10][arrowsize=0.5][color="#ff0000bf"][taillabel="@"];';
      }).join("");
    }
  }, {
    key: 'addEdges',
    value: function addEdges(edges) {}
  }, {
    key: 'collect',
    value: function collect() {
      return [this.id];
    }
  }]);

  return NullVizListNode;
}(_VizListNode3.default);

exports.default = NullVizListNode;