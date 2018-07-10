import DeleteVizEdge from '../model/list/viz/edges/DeleteVizEdge'
import AddVizEdge from '../model/list/viz/edges/AddVizEdge'
import NormalVizEdge from '../model/list/viz/edges/NormalVizEdge'
import NullVizListNode from '../model/list/viz/nodes/NullVizListNode'
import Graph from "../model/list/viz/graph/Graph";
import VizGraphFactory from "../model/list/viz/factory/VizGraphFactory";

// [1,2,3,4]|{"ptrs":[[0,"p"],[1,"q"]],"ops":[{"swap":[1,2]},{"insert":[2,10]},{"delete":3}]}
export default function renderList(str) {
   let split = str.split("|");
   let arr = JSON.parse(split[0].trim());
   var g = new Graph();
   g.subgraphs.push(VizGraphFactory.makeSimpleSubgraph(arr));

   if (split[1]) {
       let extra = JSON.parse(split[1].trim());
       if (extra.ptrs) {
          let list = g.subgraphs[0].vizLists[0]
           list.addVizPointers(extra.ptrs)
       }
       if (extra.ops) {
          extra.ops.forEach(op => {
             let sub = createSubgraph(op, arr);
             if (sub) g.subgraphs.push(sub)
          })
       }
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