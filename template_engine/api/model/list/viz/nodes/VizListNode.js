import ListNode from '../../base/ListNode'
import NullVizListNode from './NullVizListNode'
import DeleteVizEdge from '../edges/DeleteVizEdge'
import AddVizEdge from '../edges/AddVizEdge'
import NormalVizEdge from '../edges/NormalVizEdge'
import ID from '../../util/ID'

export default class VizListNode extends ListNode {
  constructor(array) {
    if (Array.isArray(array)) {
      super(array.shift()); 
      this.edges = []
      this.vizProps = []
      this.pointers = []
      this.next = array.length === 0 ? new NullVizListNode("null") : new VizListNode(array)
    } else {
      super("null")
    }
  }

  renderVizEdges() {
    return this.edges.map(e=>e.render()).join("") + this.next.renderVizEdges()
  }

  renderVizNodes() {
    return `${this.id}[label="${this.label}"]${this.vizProps.join("")};` + this.next.renderVizNodes()
  }

  addVizProps(props) {
    if (props.length == 0) {
      return
    }
    if (props[0] == this.idx) {
      props.shift();
      this.vizProps.push("[fontcolor=orange][color=blue]")
    }
    this.next.addVizProps(props)
  }

  addVizPointers(props) {
    if (props.length == 0) {
      return
    }
    if (props[0][0] == this.idx) {
      this.pointers.push(props.shift()[1])
    }
    this.next.addVizPointers(props)
  }

  renderPointers() {
    return this.pointers.map((p) => {
      let pId = ID.next()
      return `${pId}[shape=plaintext][fontsize=10][height=0.1][width=0.1][label="${p}"];
       ${pId}->${this.id}[labelfontcolor=blue][labelfontsize=10][arrowsize=0.5][color="#ff0000bf"][taillabel="l[${this.idx}]"];`
    }).join("") + this.next.renderPointers();
  }

  addEdges(edges) {
    while (edges.length > 0 && edges[0][0] == this.idx) {
      let e = edges.shift()
      let to = e[1]
      switch (e[2]) {
        case 'n':
          this.edges.push(new NormalVizEdge(this, this.listArray[to]));
          break;
        case 'd':
          this.edges.push(new DeleteVizEdge(this, this.listArray[to]));
          break;
        case 'a':
          this.edges.push(new AddVizEdge(this, this.listArray[to]));
          break;
      }
    }
    this.next.addEdges(edges)
  }

  collect() {
    var res = this.next.collect();
      res.unshift(this.id);
      return res
  }

  renderViz() {
    return this.renderVizNodes() + this.renderVizEdges() + this.renderPointers();
  }
}
