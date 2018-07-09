//'[1,2,3,4]|[["p",0,1],["q",0,3]]'
export default function renderArray(arrsWithPionters) {
    let split = arrsWithPionters.split("|")
    let arrs = split[0]
    if (arrs.length - arrs.replace(/^\[+/,"").length == 1) {
        arrs = "[" + arrs + "]"
    }
    let array = JSON.parse(arrs)

    let pointers = ''
    if (split.length > 1 && split[1].trim().length > 0) {
        pointers = split[1]
        pointers = JSON.parse(pointers)
        pointers = pointers.map(e => {
            let x = e[1], y = e[2]
            let taillabel = array.length == 1 ? `a[${y}]` : `a[${x}][${y}]`
            return `${e[0]}->arr:a${x}_${y} [taillabel="${taillabel}"]`
        }).join("\n")
    }

    let items = array.map((e,i) => e.map((k,j) => `<td PORT="a${i}_${j}">${k}</td>`))
    if (split.length > 2 && split[2].trim().length > 0) {
        let positions = split[2]
        positions = JSON.parse(positions)
        positions.forEach(pos => {
            let x = 0, y = 0
            if (pos.length == 1) {
                y = pos[0]
            } else if (pos.length == 2) {
                x = pos[0]
                y = pos[1]
            }
            items[x][y] = `<td PORT="a${x}_${y}"><font color="orange">${array[x][y]}</font></td>`
        })
    }
    let trs = items.map((e,i) => `<tr>${e.join("")}</tr>`).join("")

    let label = `<
        <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
            ${trs}
         </TABLE>>`
    

    return `digraph G {
        node[shape=plaintext,height=0.1,width=0.1];
        edge[arrowsize=0.5,color="#ff0000bf",labelfontcolor=blue,labelfontsize=10];
        arr[shape=none, margin=0, label=${label}];
        ${pointers}
     }
    `
}
