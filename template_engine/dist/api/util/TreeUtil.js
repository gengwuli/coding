"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderTree;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeNode = function TreeNode(val) {
    _classCallCheck(this, TreeNode);

    this.val = val;
    this.left = null;
    this.right = null;
};

function renderTree(tree) {
    var node_def = [];
    var node_conn = [];
    var node_strs = tree.trim().split(",");
    var gap = 0;
    var nodes = node_strs.map(function (s) {
        return s == "null" ? null : new TreeNode(s);
    });
    nodes.forEach(function (node, idx) {
        if (!node) {
            gap += 2;
        } else {
            node_def.push("node" + idx + "[label = \"<left> |<val> " + node.val + "|<right> \"];");
            var left = 2 * idx + 1 - gap;
            var right = 2 * idx + 2 - gap;
            if (left < nodes.length) {
                node.left = nodes[left];
            }
            if (node.left) {
                node_conn.push("node" + idx + ":left -> node" + left + ":val;");
            }
            if (right < nodes.length) {
                node.right = nodes[right];
            }
            if (node.right) {
                node_conn.push("node" + idx + ":right -> node" + right + ":val;");
            }
        }
    });
    return "\n    digraph g {\n    node [shape = record,height=.1];\n    " + node_def.join("\n") + "\n    " + node_conn.join("\n") + "\n    }\n    ";
}