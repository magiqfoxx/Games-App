export function randomize(order) {
  let orderCopy = [...order];
  let newOrder = [];
  let index;
  order.map(element => {
    index = Math.floor(Math.random() * orderCopy.length + 0);
    newOrder.push(orderCopy[index]);
    orderCopy.splice(index, 1);
  });

  if (!isSolvable(newOrder)) {
    randomize(order);
  }
  return newOrder;
}
export function movePiece(order, piece) {
  /*  [0][1][2]
      [3][4][5]
      [6][7][8]   */
  const index = order.indexOf(piece);
  if (order[index - 3] === null) {
    order[index] = null;
    order[index - 3] = piece;
  } else if (order[index + 3] === null) {
    order[index] = null;
    order[index + 3] = piece;
  } else if (order[index - 1] === null) {
    order[index] = null;
    order[index - 1] = piece;
  } else if (order[index + 1] === null) {
    order[index] = null;
    order[index + 1] = piece;
  }
  return [...order]; //WHY??????
}
function isSolvable(order) {
  //only applies to odd-numbered grid widths!
  //find the number of inversion, by counting tiles that preceed another tile with lower number
  //odd number - unsolvable
  //kudos to Tushar Vaghela on Stack
  let totalInversions = 0;
  for (let i = 0; i <= order.length; i++) {
    if (order[i] === null) {
      continue;
    } else {
      for (let j = i; j <= order.length; j++) {
        if (order[j] < order[i]) {
          totalInversions++;
        }
      }
    }
  }
  if (totalInversions % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
