export function newSeqNoR(length) {
  /* Returns an array of [0,...,length-1] - no repeats */

  let arr = [...Array(length).keys()]; //for iteration
  let arrCopy = arr.slice(); //for operation
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arrCopy.length);
    newArr.push(arrCopy[randomIndex]); //push random number to array
    arrCopy.splice(randomIndex, 1);
  }
  return newArr;
}

export function randomPositions(length) {
  /* Returns an object with random positions */

  let positions = {};
  const randomArr = newSeqNoR(length);
  for (let i = 0; i < length; i++) {
    positions[i] = randomArr[i];
  }
  return positions;
}

export function ValidateOrder(correctArr, checkArr) {
  if (JSON.stringify(correctArr) === JSON.stringify(checkArr)) {
    return true;
  } else {
    return false;
  }
}
