'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = renderList;

var _DeleteVizEdge = require('../model/list/viz/edges/DeleteVizEdge');

var _DeleteVizEdge2 = _interopRequireDefault(_DeleteVizEdge);

var _AddVizEdge = require('../model/list/viz/edges/AddVizEdge');

var _AddVizEdge2 = _interopRequireDefault(_AddVizEdge);

var _NormalVizEdge = require('../model/list/viz/edges/NormalVizEdge');

var _NormalVizEdge2 = _interopRequireDefault(_NormalVizEdge);

var _NullVizListNode = require('../model/list/viz/nodes/NullVizListNode');

var _NullVizListNode2 = _interopRequireDefault(_NullVizListNode);

var _Graph = require('../model/list/viz/graph/Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _VizGraphFactory = require('../model/list/viz/factory/VizGraphFactory');

var _VizGraphFactory2 = _interopRequireDefault(_VizGraphFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// {
//     "arr":["a","b","c","d"],
//     "ptrs":[[0,"p"],[2,"q"]],
//     "highlights":[1,3],
//     "ops":[
//     {"insert":[1,9]}
// ]
// }
function renderList(str) {
   var json = JSON.parse(str);
   var arr = json.arr;
   var ops = json.ops;
   var ptrs = json.ptrs;
   var hls = json.highlights;
   var g = new _Graph2.default();
   g.subgraphs.push(_VizGraphFactory2.default.makeSimpleSubgraph(arr));

   if (ptrs) {
      var list = g.subgraphs[0].vizLists[0];
      list.addVizPointers(ptrs);
   }
   if (ops) {
      ops.forEach(function (op) {
         var sub = createSubgraph(op, arr);
         if (sub) g.subgraphs.push(sub);
      });
   }
   if (hls) {
      var _list = g.subgraphs[0].vizLists[0];
      _list.addVizProps(hls);
   }
   return g.render();
}

function createSubgraph(op, arr) {
   if (op.swap) {
      return _VizGraphFactory2.default.makeSwapSubgraph.apply(_VizGraphFactory2.default, [arr].concat(_toConsumableArray(op.swap)));
   }
   if (op.insert) {
      return _VizGraphFactory2.default.makeInsertSubgraph.apply(_VizGraphFactory2.default, [arr].concat(_toConsumableArray(op.insert)));
   }
   if (op.delete) {
      return _VizGraphFactory2.default.makeDeleteSubgraph(arr, op.delete);
   }
}