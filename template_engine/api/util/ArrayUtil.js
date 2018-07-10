// {
//     "arr":[1,2,3,4,5,6],
//     "ptrs":[[0,"p"],[3,"q"]],
//     "highlights":[1,5,3]
// }
export default function renderArray(arrStr) {
    let json = JSON.parse(arrStr);
    let array = json.arr;
    let ptrs = json.ptrs;
    let hls = json.highlights;

    // for 1d array
    array = Array.isArray(array[0]) ? array : [array];
    if (ptrs) ptrs = ptrs[0].length == 3 ? ptrs : ptrs.map(p => [0].concat(p));
    if (hls) hls = Array.isArray(hls[0]) ? hls : hls.map(e => [0,e]);

    let pointers = (ptrs || []).map(e => {
        let x = e[0], y = e[1];
        let taillabel = array.length === 1 ? `a[${y}]` : `a[${x}][${y}]`;
        return `${e[2]}->arr:a${x}_${y} [taillabel="${taillabel}"]`
    }).join("\n");

    let items = array.map((e,i) => e.map((k,j) => `<td PORT="a${i}_${j}">${k}</td>`));
    (hls || []).forEach(pos => {
        let x = pos[0], y = pos[1];
        items[x][y] = `<td PORT="a${x}_${y}"><font color="orange">${array[x][y]}</font></td>`
    });

    let trs = items.map((e,i) => `<tr>${e.join("")}</tr>`).join("");

    let label = `<
        <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
            ${trs}
         </TABLE>>`;

    return `digraph G {
        node[shape=plaintext,height=0.1,width=0.1];
        edge[arrowsize=0.5,color="#ff0000bf",labelfontcolor=blue,labelfontsize=10];
        arr[shape=none, margin=0, label=${label}];
        ${pointers}
     }
    `
}
