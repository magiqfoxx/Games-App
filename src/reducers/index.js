import { combineReducers } from "redux";
import { randomize, movePiece } from "./helpers";

const timer = (time = false, action) => {
  /* Stop: stops  and resets the timer
  Start: resets and starts the timer */
  if (action.type === "START_TIMER") {
    return true;
  } else if (action.type === "STOP_TIMER") {
    return false;
  } else if (action.type === "INCREMENT_TIMER") {
    return time + 1;
  } else if (action.type === "RESET_TIMER") {
    return "reset";
  } else {
    return time;
  }
};
const timeWhenStopped = (time = 0, action) => {
  if (action.type === "TIME_WHEN_STOPPED") {
    return action.payload.time;
  } else if (action.type === "RESET_TWS") {
    return 0;
  } else {
    return time;
  }
};
const points = (points = 0, action) => {
  if (action.type === "RESET_POINTS") {
    return 0;
  } else if (action.type === "ADD_POINTS") {
    return points + action.payload.points;
  } else {
    return points;
  }
};
const moves = (moves = 0, action) => {
  if (action.type === "INCREMENT_MOVEMENT") {
    return moves + 1;
  } else if (action.type === "RESET_MOVEMENT") {
    return 0;
  } else {
    return moves;
  }
};
const level = (level = 1, action) => {
  if (action.type === "UP_LEVEL") {
    return level + 1;
  } else if (action.type === "RESET_LEVEL") {
    return 1;
  } else {
    return level;
  }
};
//SLIDER
const orderSlider = (currentOrder = [null, 1, 2, 3, 4, 5, 6, 7, 8], action) => {
  if (action.type === "RANDOMIZE_ORDER__SLIDER") {
    return randomize(action.payload.order);
  } else if (action.type === "MOVE_PIECE__SLIDER") {
    return movePiece(action.payload.order, action.payload.piece);
  } else {
    return currentOrder;
  }
};
//MEMO
const boardSizeMemo = (gameSize = 6, action) => {
  if (action.type === "SET_BOARD_SIZE__MEMO") {
    return action.payload.size;
  } else {
    return gameSize;
  }
};
const orderMemo = (currentOrder = [], action) => {
  if (action.type === "SET_NEW_ORDER__MEMO") {
    return [...Array(action.payload.size).keys()].concat([
      ...Array(action.payload.size).keys()
    ]);
  } else if (action.type === "RANDOMIZE_ORDER__MEMO") {
    return randomize(currentOrder);
  } else {
    return currentOrder;
  }
};
const pairMemo = (pair = {}, action) => {
  if (action.type === "SET_PAIR__MEMO") {
    return action.payload.pair;
  }
  if (action.type === "RESET_PAIR__MEMO") {
    return {};
  } else {
    return pair;
  }
};
//BARK
const orderBark = (currentOrder = [], action) => {
  if (action.type === "SET_NEW_ORDER__BARK") {
    return [...Array(action.payload.level + 2).keys()];
  } else if (action.type === "ADD_TO_ORDER__BARK") {
    return currentOrder.concat(action.payload.newOrder);
  } else if (action.type === "RANDOMIZE_ORDER__BARK") {
    return randomize(currentOrder);
  } else {
    return currentOrder;
  }
};
const guessedSeqBark = (guess = [], action) => {
  if (action.type === "ADD_TO_SEQ__BARK") {
    return guess; //.concat(action.payload.guess) ?? whyy. how does that work?
  } else if (action.type === "RESET_SEQ__BARK") {
    return [];
  } else {
    return guess;
  }
};

export default combineReducers({
  time: timer,
  timeWhenStopped: timeWhenStopped,
  points: points,
  moves: moves,
  level: level,
  orderSlider: orderSlider,
  boardSizeMemo: boardSizeMemo,
  orderMemo: orderMemo,
  pairMemo: pairMemo,
  orderBark: orderBark,
  guessedSeqBark: guessedSeqBark
});
