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

export const shuffle = (array) => {
  let newArr;
  let random = newSeqNoR(array.length);
  newArr = random.reduce(function (sum, thisElement) {
    sum.push(array[thisElement]);
    return sum;
  }, []);
  return newArr;
};
export const checkIfGameWon = (array) => {
  return array.length > 7;
};

export const playBark = (element) => {
  const audio = new Audio(
    `${process.env.PUBLIC_URL}/audio/bark/${element}.mp3`
  );
  audio.play();
};

export const addClassPlaying = (element) => {
  try {
    document.getElementById(`bark--piece-${element}`).classList.add("playing");
  } catch (error) {
    console.log(error);
  }
};

export const removeClassPlaying = (element) => {
  try {
    document
      .getElementById(`bark--piece-${element}`)
      .classList.remove("playing");
  } catch (error) {
    console.log(error);
  }
};
