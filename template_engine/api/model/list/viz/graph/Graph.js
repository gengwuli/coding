import ID from "../../util/ID"

/**
 * simulate a Graph, while rendering, first render the top level graph and go to
 * subgraph and render until hit the bottom level
 */
export default class Graph {
    constructor() {
        this.id = ID.next()
        this.subgraphs = []
        this.vizProps = []
    }

    render() {
        return `
      digraph {
        ${this.subgraphs.map(sub => sub.render()).join("")}
        ${this.createSubConnect()}
      }`
    }

    /**
     * Need to create invisible connectors so as to put subgraphs in position
     * such that subgraphs will align vertically
     * @returns {string}
     */
    createSubConnect() {
        return this.subgraphs.slice(1, this.subgraphs.length).map((sub, i) => {
            let curListHead = this.subgraphs[i].vizLists[this.subgraphs[i].vizLists.length - 1]
            let nextListHead = this.subgraphs[i + 1].vizLists[0]
            return `${curListHead.id} -> ${nextListHead.id}[style=invis];`
        }).join("")
    }
}