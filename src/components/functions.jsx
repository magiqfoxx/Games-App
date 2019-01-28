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
export function returnPositions(keys, values) {
  //Returns an object from two arrays

  let positions = {};
  for (let key of keys) {
    positions[key] = values[key];
  }
  return positions;
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
export function shuffleArray(arr) {
  let random = newSeqNoR(arr.length);
  let newArr = random.reduce(function(sum, thisElement) {
    sum.push(arr[thisElement]);
    return sum;
  }, []);

  return newArr;
}

export function ValidateOrder(correctArr, checkArr) {
  if (JSON.stringify(correctArr) === JSON.stringify(checkArr)) {
    return true;
  } else {
    return false;
  }
}

export function findNull(object) {
  //Returns key for which object[key] === null
  let locationOfNull = Number(
    Object.keys(Object.values(object)).find(
      key => Object.values(object)[key] === null
    )
  );
  return locationOfNull;
}

export function findArrows(locationOfNull) {
  let arrows = {};
  if (locationOfNull < 6) {
    arrows[locationOfNull + 3] = "up";
  }
  if (locationOfNull > 2) {
    arrows[locationOfNull - 3] = "down";
  }
  if (locationOfNull !== 2 && locationOfNull !== 5 && locationOfNull !== 8) {
    arrows[locationOfNull + 1] = "left";
  }
  if (locationOfNull !== 0 && locationOfNull !== 3 && locationOfNull !== 6) {
    arrows[locationOfNull - 1] = "right";
  }
  return arrows;
}
