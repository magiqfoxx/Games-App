const pictures9 = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function randomizeList(list) {
  let listRandomized = [];
  for (let i = list.length; i > 0; i--) {
    let random = Math.floor(Math.random() * Math.floor(list.length));
    listRandomized.push(list[random]);
    list.splice(random, 1);
  }
  return listRandomized;
}

export function drawBoard(boardType) {
  if (boardType === "memo") {
    return drawMemoBoard();
  } else if (boardType === "slider") {
    return drawSliderBoard();
  } else if (boardType === "color") {
    return drawColorBoard();
  }
}
function drawMemoBoard() {}

function drawSliderBoard() {
  return randomizeList(pictures9);
}

function drawColorBoard() {}
