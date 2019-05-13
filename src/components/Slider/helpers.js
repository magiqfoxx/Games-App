export function newSeqNoR(length) {
  /* Returns an array of [0,...,length-1] - no repeats */

  let arr = [...Array(length).keys()]; //for iteration
  let arrCopy = arr.slice(); //for operation: deep copy
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arrCopy.length);
    newArr.push(arrCopy[randomIndex]); //push random number to array
    arrCopy.splice(randomIndex, 1);
  }
  return newArr;
}
let isSolvable = order => {
  //only applies to odd-numbered grid widths!
  //find the number of inversion, by counting tiles that preceed another tile with lower number
  //odd number - unsolvable
  //kudos to Tushar Vaghela on Stack
  const index = order.indexOf(null);
  let orderCopy = order.slice();
  orderCopy[index] = 0;
  let totalInversions = 0;
  for (let i = 0; i <= order.length; i++) {
    if (i < 9 && orderCopy[i] > orderCopy[i + 1]) {
      totalInversions++;
    }
  }
  return totalInversions % 2 === 0;
};
export const shuffle = array => {
  let newArr;
  do {
    let random = newSeqNoR(array.length);
    newArr = random.reduce(function(sum, thisElement) {
      sum.push(array[thisElement]);
      return sum;
    }, []);
  } while (!isSolvable(newArr));
  return newArr;
};

export const movePiece = (spot, order) => {
  /*  [0][1][2]
      [3][4][5]
      [6][7][8]   */
  let newOrder = order.slice();
  if (order[spot - 3] === null) {
    newOrder[spot] = null;
    newOrder[spot - 3] = order[spot];
    return newOrder;
  } else if (order[spot + 3] === null) {
    newOrder[spot] = null;
    newOrder[spot + 3] = order[spot];
    return newOrder;
  } else if (order[spot - 1] === null && spot != 3 && spot != 6) {
    newOrder[spot] = null;
    newOrder[spot - 1] = order[spot];
    return newOrder;
  } else if (order[spot + 1] === null && spot != 2 && spot != 5) {
    newOrder[spot] = null;
    newOrder[spot + 1] = order[spot];
    return newOrder;
  } else {
    return newOrder;
  }
};

export const checkIfGameWon = sequence => {
  if (
    JSON.stringify(sequence) === JSON.stringify([null, 1, 2, 3, 4, 5, 6, 7, 8])
  ) {
    return true;
  } else {
    return false;
  }
};
