import VizListNode from "../nodes/VizListNode";
import {addIdx, addListArray} from "../../util/util";

export default class VizListFactory {
    static makeSimpleList(arr) {
        let list = new VizListNode(arr.slice(0));
        addIdx(list);
        addListArray(list);
        let edges = arr.map((e,i) => [i, i + 1, 'n']);
        list.addEdges(edges);
        return list
    }
}