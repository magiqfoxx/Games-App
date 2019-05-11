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
//I don't think this works?
const isSolvable = order => {
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
  } else if (order[spot - 1] === null) {
    newOrder[spot] = null;
    newOrder[spot - 1] = order[spot];
    return newOrder;
  } else if (order[spot + 1] === null) {
    newOrder[spot] = null;
    newOrder[spot + 1] = order[spot];
    return newOrder;
  } else {
    return newOrder;
  }
};

export const isGameWon = sequence => {
  if (
    JSON.stringify(sequence) === JSON.stringify([null, 1, 2, 3, 4, 5, 6, 7, 8])
  ) {
    return true;
  } else {
    return false;
  }
};
