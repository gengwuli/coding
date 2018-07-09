'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ListNode2 = require('../../base/ListNode');

var _ListNode3 = _interopRequireDefault(_ListNode2);

var _NullVizListNode = require('./NullVizListNode');

var _NullVizListNode2 = _interopRequireDefault(_NullVizListNode);

var _DeleteVizEdge = require('../edges/DeleteVizEdge');

var _DeleteVizEdge2 = _interopRequireDefault(_DeleteVizEdge);

var _AddVizEdge = require('../edges/AddVizEdge');

var _AddVizEdge2 = _interopRequireDefault(_AddVizEdge);

var _NormalVizEdge = require('../edges/NormalVizEdge');

var _NormalVizEdge2 = _interopRequireDefault(_NormalVizEdge);

var _ID = require('../../util/ID');

var _ID2 = _interopRequireDefault(_ID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VizListNode = function (_ListNode) {
  _inherits(VizListNode, _ListNode);

  function VizListNode(array) {
    _classCallCheck(this, VizListNode);

    if (Array.isArray(array)) {
      var _this = _possibleConstructorReturn(this, (VizListNode.__proto__ || Object.getPrototypeOf(VizListNode)).call(this, array.shift()));

      _this.edges = [];
      _this.vizProps = [];
      _this.pointers = [];
      _this.next = array.length === 0 ? new _NullVizListNode2.default("null") : new VizListNode(array);
    } else {
      var _this = _possibleConstructorReturn(this, (VizListNode.__proto__ || Object.getPrototypeOf(VizListNode)).call(this, "null"));
    }
    return _possibleConstructorReturn(_this);
  }

  _createClass(VizListNode, [{
    key: 'renderVizEdges',
    value: function renderVizEdges() {
      return this.edges.map(function (e) {
        return e.render();
      }).join("") + this.next.renderVizEdges();
    }
  }, {
    key: 'renderVizNodes',
    value: function renderVizNodes() {
      return this.id + '[label="' + this.label + '"]' + this.vizProps.join("") + ';' + this.next.renderVizNodes();
    }
  }, {
    key: 'addVizProps',
    value: function addVizProps(props) {
      if (props.length == 0) {
        return;
      }
      if (props[0] == this.idx) {
        props.shift();
        this.vizProps.push("[fontcolor=orange][color=blue]");
      }
      this.next.addVizProps(props);
    }
  }, {
    key: 'addVizPointers',
    value: function addVizPointers(props) {
      if (props.length == 0) {
        return;
      }
      if (props[0][0] == this.idx) {
        this.pointers.push(props.shift()[1]);
      }
      this.next.addVizPointers(props);
    }
  }, {
    key: 'renderPointers',
    value: function renderPointers() {
      var _this2 = this;

      return this.pointers.map(function (p) {
        var pId = _ID2.default.next();
        return pId + '[shape=plaintext][fontsize=10][height=0.1][width=0.1][label="' + p + '"];\n       ' + pId + '->' + _this2.id + '[labelfontcolor=blue][labelfontsize=10][arrowsize=0.5][color="#ff0000bf"][taillabel="l[' + _this2.idx + ']"];';
      }).join("") + this.next.renderPointers();
    }
  }, {
    key: 'addEdges',
    value: function addEdges(edges) {
      while (edges.length > 0 && edges[0][0] == this.idx) {
        var e = edges.shift();
        var to = e[1];
        switch (e[2]) {
          case 'n':
            this.edges.push(new _NormalVizEdge2.default(this, this.listArray[to]));
            break;
          case 'd':
            this.edges.push(new _DeleteVizEdge2.default(this, this.listArray[to]));
            break;
          case 'a':
            this.edges.push(new _AddVizEdge2.default(this, this.listArray[to]));
            break;
        }
      }
      this.next.addEdges(edges);
    }
  }, {
    key: 'collect',
    value: function collect() {
      var res = this.next.collect();
      res.unshift(this.id);
      return res;
    }
  }, {
    key: 'renderViz',
    value: function renderViz() {
      return this.renderVizNodes() + this.renderVizEdges() + this.renderPointers();
    }
  }]);

  return VizListNode;
}(_ListNode3.default);

exports.default = VizListNode;