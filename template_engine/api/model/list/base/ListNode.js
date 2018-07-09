import ID from '../util/ID'
export default class ListNode {
  constructor(label="null") {
    this.label = label;
    this.next = null;
    this.id = ID.next();
  }
}