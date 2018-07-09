import DeleteVizEdge from './viz/edges/DeleteVizEdge'
import AddVizEdge from './viz/edges/AddVizEdge'
import NormalVizEdge from './viz/edges/NormalVizEdge'
import NullVizListNode from './viz/nodes/NullVizListNode'
import VizListNode from './viz/nodes/VizListNode'
import VizListFactory from './viz/factory/VizListFactory'

import {addIdx, addListArray} from './util/util'
import Graph from "./viz/graph/Graph";

import SubGraph from "./viz/graph/subgraph/SubGraph"
import VizGraphFactory from "./viz/factory/VizGraphFactory";
console.log(VizListNode, "Demo")
var a = new VizListNode(["a","c","c"])

addIdx(a)
addListArray(a)
a.addVizProps([0,2,4])
a.addVizPointers([[0,'p'],[1,'q'],[3,'r']])
a.addEdges([[0,1,'d'],[1,2,'a'],[2,3,'n'],[3,4,'n']])

var b = new VizListNode(["a", "c", "d"])

addIdx(b)
addListArray(b)
b.addEdges([[0,1,'n'],[1,2,'n'],[2,3,'n'],[3,4,'n']])
console.log(a.renderViz())

var g  = new Graph();
var sub = new SubGraph();
var sub2 = new SubGraph();
sub.vizLists.push(a);
sub.vizLists.push(b);
sub.vizLists.push(VizListFactory.makeSimpleList(["1","2","3","4"]));

var c = new VizListNode(["e", "f", "g"])

addIdx(c)
addListArray(c)
c.addEdges([[0,1,'n'], [1,2,'n'],[2,3,'n'],[3,4,'m']]);
sub2.vizLists.push(c);

g.subgraphs.push(VizGraphFactory.makeDeleteSubgraph([1,2,3,4,5],2))
g.subgraphs.push(VizGraphFactory.makeInsertSubgraph([1,2,3,4,5],2,6))
g.subgraphs.push(VizGraphFactory.makeSwapSubgraph(["a","b","c","d", "e", "f"],1,4))
var sub = VizGraphFactory.makeSimpleSubgraph([1,2,3,4,5]);
g.subgraphs.push(sub);
sub.vizLists[0].addVizPointers([[0,'f'], [1,'s']])
console.log(g.render());