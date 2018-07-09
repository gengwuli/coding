export function addIdx(cur) {
  for (let i = 0; cur; i++) {
    cur.idx = i
    cur = cur.next
  }
}

export function addListArray(cur) {
  let listArray = []
  for (let i = 0; cur; i++) {
    cur.listArray = listArray
    listArray.push(cur)
    cur = cur.next
  }
}