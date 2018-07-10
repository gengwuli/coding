"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderArray;
// {
//     "arr":[1,2,3,4,5,6],
//     "ptrs":[[0,"p"],[3,"q"]],
//     "highlights":[1,5,3]
// }
function renderArray(arrStr) {
    var json = JSON.parse(arrStr);
    var array = json.arr;
    var ptrs = json.ptrs;
    var hls = json.highlights;

    // for 1d array
    array = Array.isArray(array[0]) ? array : [array];
    if (ptrs) ptrs = ptrs[0].length == 3 ? ptrs : ptrs.map(function (p) {
        return [0].concat(p);
    });
    if (hls) hls = Array.isArray(hls[0]) ? hls : hls.map(function (e) {
        return [0, e];
    });

    var pointers = (ptrs || []).map(function (e) {
        var x = e[0],
            y = e[1];
        var taillabel = array.length === 1 ? "a[" + y + "]" : "a[" + x + "][" + y + "]";
        return e[2] + "->arr:a" + x + "_" + y + " [taillabel=\"" + taillabel + "\"]";
    }).join("\n");

    var items = array.map(function (e, i) {
        return e.map(function (k, j) {
            return "<td PORT=\"a" + i + "_" + j + "\">" + k + "</td>";
        });
    });
    (hls || []).forEach(function (pos) {
        var x = pos[0],
            y = pos[1];
        items[x][y] = "<td PORT=\"a" + x + "_" + y + "\"><font color=\"orange\">" + array[x][y] + "</font></td>";
    });

    var trs = items.map(function (e, i) {
        return "<tr>" + e.join("") + "</tr>";
    }).join("");

    var label = "<\n        <TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\" CELLPADDING=\"4\">\n            " + trs + "\n         </TABLE>>";

    return "digraph G {\n        node[shape=plaintext,height=0.1,width=0.1];\n        edge[arrowsize=0.5,color=\"#ff0000bf\",labelfontcolor=blue,labelfontsize=10];\n        arr[shape=none, margin=0, label=" + label + "];\n        " + pointers + "\n     }\n    ";
}