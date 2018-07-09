"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderArray;
//'[1,2,3,4]|[["p",0,1],["q",0,3]]'
function renderArray(arrsWithPionters) {
    var split = arrsWithPionters.split("|");
    var arrs = split[0];
    if (arrs.length - arrs.replace(/^\[+/, "").length == 1) {
        arrs = "[" + arrs + "]";
    }
    var array = JSON.parse(arrs);

    var pointers = '';
    if (split.length > 1 && split[1].trim().length > 0) {
        pointers = split[1];
        pointers = JSON.parse(pointers);
        pointers = pointers.map(function (e) {
            var x = e[1],
                y = e[2];
            var taillabel = array.length == 1 ? "a[" + y + "]" : "a[" + x + "][" + y + "]";
            return e[0] + "->arr:a" + x + "_" + y + " [taillabel=\"" + taillabel + "\"]";
        }).join("\n");
    }

    var items = array.map(function (e, i) {
        return e.map(function (k, j) {
            return "<td PORT=\"a" + i + "_" + j + "\">" + k + "</td>";
        });
    });
    if (split.length > 2 && split[2].trim().length > 0) {
        var positions = split[2];
        positions = JSON.parse(positions);
        positions.forEach(function (pos) {
            var x = 0,
                y = 0;
            if (pos.length == 1) {
                y = pos[0];
            } else if (pos.length == 2) {
                x = pos[0];
                y = pos[1];
            }
            items[x][y] = "<td PORT=\"a" + x + "_" + y + "\"><font color=\"orange\">" + array[x][y] + "</font></td>";
        });
    }
    var trs = items.map(function (e, i) {
        return "<tr>" + e.join("") + "</tr>";
    }).join("");

    var label = "<\n        <TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\" CELLPADDING=\"4\">\n            " + trs + "\n         </TABLE>>";

    return "digraph G {\n        node[shape=plaintext,height=0.1,width=0.1];\n        edge[arrowsize=0.5,color=\"#ff0000bf\",labelfontcolor=blue,labelfontsize=10];\n        arr[shape=none, margin=0, label=" + label + "];\n        " + pointers + "\n     }\n    ";
}