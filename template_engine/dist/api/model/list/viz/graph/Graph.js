"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ID = require("../../util/ID");

var _ID2 = _interopRequireDefault(_ID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * simulate a Graph, while rendering, first render the top level graph and go to
 * subgraph and render until hit the bottom level
 */
var Graph = function () {
    function Graph() {
        _classCallCheck(this, Graph);

        this.id = _ID2.default.next();
        this.subgraphs = [];
        this.vizProps = [];
    }

    _createClass(Graph, [{
        key: "render",
        value: function render() {
            return "\n      digraph {\n        " + this.subgraphs.map(function (sub) {
                return sub.render();
            }).join("") + "\n        " + this.createSubConnect() + "\n      }";
        }

        /**
         * Need to create invisible connectors so as to put subgraphs in position
         * such that subgraphs will align vertically
         * @returns {string}
         */

    }, {
        key: "createSubConnect",
        value: function createSubConnect() {
            var _this = this;

            return this.subgraphs.slice(1, this.subgraphs.length).map(function (sub, i) {
                var curListHead = _this.subgraphs[i].vizLists[_this.subgraphs[i].vizLists.length - 1];
                var nextListHead = _this.subgraphs[i + 1].vizLists[0];
                return curListHead.id + " -> " + nextListHead.id + "[style=invis];";
            }).join("");
        }
    }]);

    return Graph;
}();

exports.default = Graph;