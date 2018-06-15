class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

export default function renderTree(tree) {
    let node_def = [];
    let node_conn = [];
    let node_strs = tree.trim().split(",");
    let gap = 0;
    let nodes = node_strs.map(s => s == "null" ? null : new TreeNode(s));
    nodes.forEach((node, idx) => {
        if(!node) {
            gap += 2
        } else {
            node_def.push(`node${idx}[label = "<left> |<val> ${node.val}|<right> "];`);
            let left = 2 * idx + 1 - gap;
            let right = 2 * idx + 2 - gap;
            if (left < nodes.length) {
                node.left = nodes[left];
            }
            if(node.left) {
                node_conn.push(`node${idx}:left -> node${left}:val;`);
            }
            if (right < nodes.length) {
                node.right = nodes[right];
            }
            if (node.right) {
                node_conn.push(`node${idx}:right -> node${right}:val;`);
            }
        }
    });
    return `
    digraph g {
    node [shape = record,height=.1];
    ${node_def.join("\n")}
    ${node_conn.join("\n")}
    }
    `
}