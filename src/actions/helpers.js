export function randomize(order) {
  let orderCopy = [...order];
  let newOrder = [];
  let index;
  order.map(element => {
    index = Math.floor(Math.random() * orderCopy.length + 0);
    newOrder.push(orderCopy[index]);
    orderCopy.splice(index, 1);
  });
  return newOrder;
  //check if this is solvable
}

export function movePiece(order, piece) {
  /*  [0][1][2]
      [3][4][5]
      [6][7][8]   */
  if (order[piece - 3] === null) {
    order[piece] = null;
    order[piece - 3] = piece;
    return order;
  } else if (order[piece + 3] === null) {
    order[piece] = null;
    order[piece + 3] = piece;
    return order;
  } else if (order[piece - 1] === null) {
    order[piece] = null;
    order[piece - 1] = piece;
    return order;
  } else if (order[piece + 1] === null) {
    order[piece] = null;
    order[piece + 1] = piece;
    return order;
  }
}
