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

export const shuffle = array => {
  let newArr;
  let random = newSeqNoR(array.length);
  newArr = random.reduce(function(sum, thisElement) {
    sum.push(array[thisElement]);
    return sum;
  }, []);
  return newArr;
};
export const isGameWon = array => {
  return array.length > 7;
};

export const playElement = element => {
  const audio = new Audio(`../audio/bark/${element}.mp3`);
  audio.play();
};

export const addClassPlaying = element => {
  document.getElementById(`bark--piece-${element}`).classList.add("playing");
};

export const removeClassPlaying = element => {
  document.getElementById(`bark--piece-${element}`).classList.remove("playing");
};
