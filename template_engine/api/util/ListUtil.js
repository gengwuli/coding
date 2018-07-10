import DeleteVizEdge from '../model/list/viz/edges/DeleteVizEdge'
import AddVizEdge from '../model/list/viz/edges/AddVizEdge'
import NormalVizEdge from '../model/list/viz/edges/NormalVizEdge'
import NullVizListNode from '../model/list/viz/nodes/NullVizListNode'
import Graph from "../model/list/viz/graph/Graph";
import VizGraphFactory from "../model/list/viz/factory/VizGraphFactory";

// {
//     "arr":["a","b","c","d"],
//     "ptrs":[[0,"p"],[2,"q"]],
//     "highlights":[1,3],
//     "ops":[
//     {"insert":[1,9]}
// ]
// }
export default function renderList(str) {
    let json = JSON.parse(str);
    let arr = json.arr;
    let ops = json.ops;
    let ptrs = json.ptrs;
    let hls = json.highlights;
   var g = new Graph();
   g.subgraphs.push(VizGraphFactory.makeSimpleSubgraph(arr));

   if (ptrs) {
      let list = g.subgraphs[0].vizLists[0]
       list.addVizPointers(ptrs)
   }
   if (ops) {
      ops.forEach(op => {
         let sub = createSubgraph(op, arr);
         if (sub) g.subgraphs.push(sub)
      })
   }
   if (hls) {
       let list = g.subgraphs[0].vizLists[0]
       list.addVizProps(hls)
   }
   return g.render();
}

function createSubgraph(op, arr) {
   if (op.swap) {
      return VizGraphFactory.makeSwapSubgraph(arr, ...op.swap)
   }
   if (op.insert) {
      return VizGraphFactory.makeInsertSubgraph(arr, ...op.insert)
   }
   if (op.delete) {
      return VizGraphFactory.makeDeleteSubgraph(arr, op.delete)
   }
}