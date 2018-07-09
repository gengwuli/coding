import VizEdge from "./VizEdge"
export default class DeleteVizEdge extends VizEdge {
  constructor(from, to) {
    super(from, to)
    this.vizProps = [`[style=dotted][color=red][arrowsize=0.5][fontsize=9][fontcolor=red][label=" "]`]
  }
}