import VizListNode from "../nodes/VizListNode";
import {addIdx, addListArray} from "../../util/util";
import Subgraph from "../graph/subgraph/SubGraph";
import VizListFactory from "./VizListFactory";

export default class VizGraphFactory {
    static makeSimpleList(arr) {
        let list = new VizListNode(arr.slice(0));
        addIdx(list);
        addListArray(list);
        let edges = arr.map((e,i) => [i, i + 1, 'n']);
        list.addEdges(edges);
        return list
    }

    static makeSimpleSubgraph(arr) {
        let sub = new Subgraph();
        sub.vizProps.push(`label="simple list"`);
        sub.vizLists.push(VizListFactory.makeSimpleList(arr));
        return sub;
    }

    static makeDeleteSubgraph(arr, pos) {
        var sub = new Subgraph();
        sub.vizProps.push(`label="delete(${arr[pos]})"`);
        sub.vizLists.push(VizListFactory.makeSimpleList(arr));
        let list = new VizListNode(arr.slice(0));
        addIdx(list);
        addListArray(list);
        let edges = arr.map((e,i) => {
            if (pos === 0) {
                return [[0,1,'d']]
            } else if (i === pos - 1) {
                return [[i, i + 1, 'd'],[i, i + 2, 'a']]
            } else if (i === pos) {
                return [[i, i + 1, 'd']]
            } else {
                return [[i, i + 1, 'n']]
            }
        }).reduce((acc, val) => acc.concat(val), []);
        list.addEdges(edges);

        if (pos === 0) {
            list.listArray[0].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`))
        } else {
            list.listArray[pos - 1].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`))
            list.listArray[pos].edges.forEach(e => e.vizProps.push(`[taillabel="2"]`))
        }
        sub.vizLists.push(list);
        arr.splice(pos, 1);
        sub.vizLists.push(VizListFactory.makeSimpleList(arr));
        sub.vizLists[0].addVizProps([pos]);
        sub.vizLists[1].addVizProps([pos]);
        return sub;
    }

    static makeInsertSubgraph(arr,pos,val) {
        var sub = new Subgraph();
        sub.vizProps.push(`label="insert(${pos}, ${val})"`);
        sub.vizLists.push(VizListFactory.makeSimpleList(arr));
        arr.splice(pos, 0, val)
        let list = new VizListNode(arr.slice(0));
        addIdx(list);
        addListArray(list);
        let edges = arr.map((e,i) => {
            if (i === pos - 1) {
                return [[i, i + 1, 'a'],[i, i + 2, 'd']]
            } else if (i === pos) {
                return [[i, i + 1, 'a']]
            } else {
                return [[i, i + 1, 'n']]
            }
        }).reduce((acc, val) => acc.concat(val), []);

        list.addEdges(edges);



        if (pos === 0) {
            list.listArray[0].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`))
        } else {
            list.listArray[pos - 1].edges.forEach(e => e.vizProps.push(`[taillabel="2"]`))
            list.listArray[pos].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`))
        }
        sub.vizLists.push(list);
        sub.vizLists.push(VizListFactory.makeSimpleList(arr));
        sub.invisConnect.push(`${sub.vizLists[1].listArray[pos].id}->${sub.vizLists[2].listArray[pos].id}[style=invis]`)
        sub.ranks = sub.vizLists.map(l => l.collect());
        if (pos != 0) {
            sub.ranks[1].splice(pos, 1);
        }

        sub.vizLists[1].addVizProps([pos])
        sub.vizLists[2].addVizProps([pos])

        return sub;
    }

    static makeSwapSubgraph(arr, pos1, pos2) {
        var sub = new Subgraph();
        sub.vizProps.push(`label="swap(${arr[pos1]}, ${arr[pos2]})"`);
        sub.vizLists.push(VizListFactory.makeSimpleList(arr.slice(0)));

        let list = new VizListNode(arr.slice(0));
        addIdx(list);
        addListArray(list);
        let edges = arr.map((e,i) => {
            if (i == 0 && pos1 === 0) {
                return [[0,1,'d'],[0,pos2 + 1, 'a']]
            } else if (i === pos1 - 1) {
                return [[i, i + 1, 'd'],[i, pos2, 'a']]
            } else if (i === pos1) {
                return [[i, i + 1, 'd'],[i,pos2+1, 'a']]
            } else if (i === pos2 - 1) {
                return [[i, i + 1, 'd'], [i, pos1, 'a']]
            } else if (i === pos2) {
                return [[i,i + 1, 'd'], [i, pos1 + 1 === pos2 ? pos1 : pos1 + 1, 'a']]
            } else {
                return [[i, i + 1, 'n']]
            }
        }).reduce((acc, val) => acc.concat(val), []);
        list.addEdges(edges);
        sub.vizLists.push(list);

        sub.vizLists[1].listArray[pos2].edges[1].vizProps.push(`[constraint=false]`);
        if (pos1 + 1 !== pos2) {
            sub.vizLists[1].listArray[pos2 - 1].edges[1].vizProps.push(`[constraint=false]`);
        }

        if (pos1 + 1 === pos2) {
            if (pos1 === 0) {
                list.listArray[0].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`))
                list.listArray[1].edges.forEach(e => e.vizProps.push(`[taillabel="2"]`))
            } else {
                list.listArray[pos1 - 1].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`));
                list.listArray[pos1].edges.forEach(e => e.vizProps.push(`[taillabel="2"]`))
                list.listArray[pos2].edges.forEach(e => e.vizProps.push(`[taillabel="3"]`))
            }
        } else {
            if (pos1 === 0) {
                list.listArray[0].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`))
                list.listArray[pos2].edges.forEach(e => e.vizProps.push(`[taillabel="2"]`));
                list.listArray[pos2 - 1].edges.forEach(e => e.vizProps.push(`[taillabel="3"]`));
            } else {
                list.listArray[pos1 - 1].edges.forEach(e => e.vizProps.push(`[taillabel="1"]`))
                list.listArray[pos1].edges.forEach(e => e.vizProps.push(`[taillabel="2"]`));
                list.listArray[pos2].edges.forEach(e => e.vizProps.push(`[taillabel="3"]`));
                list.listArray[pos2 - 1].edges.forEach(e => e.vizProps.push(`[taillabel="4"]`));
            }
        }

        let tmp = arr[pos1];
        arr[pos1] = arr[pos2];
        arr[pos2] = tmp;
        sub.vizLists.push(VizListFactory.makeSimpleList(arr.slice(0)));
        sub.vizLists.forEach(list => {
            list.addVizProps([pos1, pos2])
        });
        return sub;
    }
}