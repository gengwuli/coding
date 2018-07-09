import VizListNode from './VizListNode'
import ID from '../../util/ID'
export default class NullVizListNode extends VizListNode {
  renderVizEdges() { return "" }

  renderVizNodes() { return `${this.id}[label="null"][shape=none][fontcolor=red];` }

  addVizProps(props) { return }

  addVizPointers(props) {
    if (props.length == 0) { return }
    if (props[0][0] == this.idx) {
        this.pointers = this.pointers || []
        this.pointers.push(props.shift()[1])
    }
  }

  renderPointers() {
    return (this.pointers || []).map((p) => {
      let pId = ID.next();
      return `${pId}[shape=plaintext][fontsize=10][height=0.1][width=0.1][label="${p}"];
           ${pId}->${this.id}[labelfontcolor=blue][labelfontsize=10][arrowsize=0.5][color="#ff0000bf"][taillabel="@"];`
      }).join("");
  }

  addEdges(edges) { }

  collect() {
      return [this.id]
  }
}