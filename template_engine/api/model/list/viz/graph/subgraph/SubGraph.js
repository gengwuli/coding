import Graph from "../Graph";

/**
 * simulate subgraph of viz, including a title
 * containing ranks, which aligns listnodes in a single row
 * ans should also contains invisible connectors to put things in position
 */
export default class Subgraph extends Graph {
    constructor() {
        super();
        this.vizLists = [];
        this.vizProps = ['label="demo";', 'style="dashed";'];
        this.invisConnect = [];
    }

    render() {
       return `subgraph cluster_${this.id} {
          ${this.vizProps.join("")}
          ${this.createRanks()}
          ${this.vizLists.map(list => list.renderViz()).join("")}
          ${this.connectListsVertical()}
          ${this.invisConnect.join("")}
         }
       `
    }

    createRanks() {
        // need to remove a new inserted node from ranks
        let ranks = this.ranks || this.vizLists.map(l => l.collect());
        return ranks.map(r => `{rank=same ${r.join(' ')}};`).join("");
    }

    connectListsVertical() {
        return this.vizLists.slice(1, this.vizLists.length).map((e,i) => {
            return `${this.vizLists[i].id}->${this.vizLists[i + 1].id}[style=invis];`
        }).join("")
    }
}