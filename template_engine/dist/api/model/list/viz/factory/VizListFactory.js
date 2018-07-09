"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VizListNode = require("../nodes/VizListNode");

var _VizListNode2 = _interopRequireDefault(_VizListNode);

var _util = require("../../util/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VizListFactory = function () {
    function VizListFactory() {
        _classCallCheck(this, VizListFactory);
    }

    _createClass(VizListFactory, null, [{
        key: "makeSimpleList",
        value: function makeSimpleList(arr) {
            var list = new _VizListNode2.default(arr.slice(0));
            (0, _util.addIdx)(list);
            (0, _util.addListArray)(list);
            var edges = arr.map(function (e, i) {
                return [i, i + 1, 'n'];
            });
            list.addEdges(edges);
            return list;
        }
    }]);

    return VizListFactory;
}();

exports.default = VizListFactory;