import Edge from "../../base/Edge"
export default class VizEdge extends Edge {
  constructor(from, to) {
    super(from, to)
    this.vizProps = []
  }

  render() {
    return `${this.from.id}->${this.to.id}${this.vizProps.join("")};`
  }
}