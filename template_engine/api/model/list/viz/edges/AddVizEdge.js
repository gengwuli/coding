import VizEdge from "./VizEdge"
export default class AddVizEdge extends VizEdge {
  constructor(from, to) {
    super(from, to)
    this.vizProps = [`[color=darkgreen][fontsize=9][fontcolor=red][label=" "]`]
  }
}