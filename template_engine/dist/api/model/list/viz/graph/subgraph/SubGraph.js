'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graph2 = require('../Graph');

var _Graph3 = _interopRequireDefault(_Graph2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * simulate subgraph of viz, including a title
 * containing ranks, which aligns listnodes in a single row
 * ans should also contains invisible connectors to put things in position
 */
var Subgraph = function (_Graph) {
    _inherits(Subgraph, _Graph);

    function Subgraph() {
        _classCallCheck(this, Subgraph);

        var _this = _possibleConstructorReturn(this, (Subgraph.__proto__ || Object.getPrototypeOf(Subgraph)).call(this));

        _this.vizLists = [];
        _this.vizProps = ['label="demo";', 'style="dashed";'];
        _this.invisConnect = [];
        return _this;
    }

    _createClass(Subgraph, [{
        key: 'render',
        value: function render() {
            return 'subgraph cluster_' + this.id + ' {\n          ' + this.vizProps.join("") + '\n          ' + this.createRanks() + '\n          ' + this.vizLists.map(function (list) {
                return list.renderViz();
            }).join("") + '\n          ' + this.connectListsVertical() + '\n          ' + this.invisConnect.join("") + '\n         }\n       ';
        }
    }, {
        key: 'createRanks',
        value: function createRanks() {
            // need to remove a new inserted node from ranks
            var ranks = this.ranks || this.vizLists.map(function (l) {
                return l.collect();
            });
            return ranks.map(function (r) {
                return '{rank=same ' + r.join(' ') + '};';
            }).join("");
        }
    }, {
        key: 'connectListsVertical',
        value: function connectListsVertical() {
            var _this2 = this;

            return this.vizLists.slice(1, this.vizLists.length).map(function (e, i) {
                return _this2.vizLists[i].id + '->' + _this2.vizLists[i + 1].id + '[style=invis];';
            }).join("");
        }
    }]);

    return Subgraph;
}(_Graph3.default);

exports.default = Subgraph;