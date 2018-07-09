'use strict';

var _DeleteVizEdge = require('./viz/edges/DeleteVizEdge');

var _DeleteVizEdge2 = _interopRequireDefault(_DeleteVizEdge);

var _AddVizEdge = require('./viz/edges/AddVizEdge');

var _AddVizEdge2 = _interopRequireDefault(_AddVizEdge);

var _NormalVizEdge = require('./viz/edges/NormalVizEdge');

var _NormalVizEdge2 = _interopRequireDefault(_NormalVizEdge);

var _NullVizListNode = require('./viz/nodes/NullVizListNode');

var _NullVizListNode2 = _interopRequireDefault(_NullVizListNode);

var _VizListNode = require('./viz/nodes/VizListNode');

var _VizListNode2 = _interopRequireDefault(_VizListNode);

var _VizListFactory = require('./viz/factory/VizListFactory');

var _VizListFactory2 = _interopRequireDefault(_VizListFactory);

var _util = require('./util/util');

var _Graph = require('./viz/graph/Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _SubGraph = require('./viz/graph/subgraph/SubGraph');

var _SubGraph2 = _interopRequireDefault(_SubGraph);

var _VizGraphFactory = require('./viz/factory/VizGraphFactory');

var _VizGraphFactory2 = _interopRequireDefault(_VizGraphFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_VizListNode2.default, "Demo");
var a = new _VizListNode2.default(["a", "c", "c"]);

(0, _util.addIdx)(a);
(0, _util.addListArray)(a);
a.addVizProps([0, 2, 4]);
a.addVizPointers([[0, 'p'], [1, 'q'], [3, 'r']]);
a.addEdges([[0, 1, 'd'], [1, 2, 'a'], [2, 3, 'n'], [3, 4, 'n']]);

var b = new _VizListNode2.default(["a", "c", "d"]);

(0, _util.addIdx)(b);
(0, _util.addListArray)(b);
b.addEdges([[0, 1, 'n'], [1, 2, 'n'], [2, 3, 'n'], [3, 4, 'n']]);
console.log(a.renderViz());

var g = new _Graph2.default();
var sub = new _SubGraph2.default();
var sub2 = new _SubGraph2.default();
sub.vizLists.push(a);
sub.vizLists.push(b);
sub.vizLists.push(_VizListFactory2.default.makeSimpleList(["1", "2", "3", "4"]));

var c = new _VizListNode2.default(["e", "f", "g"]);

(0, _util.addIdx)(c);
(0, _util.addListArray)(c);
c.addEdges([[0, 1, 'n'], [1, 2, 'n'], [2, 3, 'n'], [3, 4, 'm']]);
sub2.vizLists.push(c);

g.subgraphs.push(_VizGraphFactory2.default.makeDeleteSubgraph([1, 2, 3, 4, 5], 2));
g.subgraphs.push(_VizGraphFactory2.default.makeInsertSubgraph([1, 2, 3, 4, 5], 2, 6));
g.subgraphs.push(_VizGraphFactory2.default.makeSwapSubgraph(["a", "b", "c", "d", "e", "f"], 1, 4));
var sub = _VizGraphFactory2.default.makeSimpleSubgraph([1, 2, 3, 4, 5]);
g.subgraphs.push(sub);
sub.vizLists[0].addVizPointers([[0, 'f'], [1, 's']]);
console.log(g.render());