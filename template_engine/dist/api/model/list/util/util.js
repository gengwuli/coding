"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addIdx = addIdx;
exports.addListArray = addListArray;
function addIdx(cur) {
  for (var i = 0; cur; i++) {
    cur.idx = i;
    cur = cur.next;
  }
}

function addListArray(cur) {
  var listArray = [];
  for (var i = 0; cur; i++) {
    cur.listArray = listArray;
    listArray.push(cur);
    cur = cur.next;
  }
}