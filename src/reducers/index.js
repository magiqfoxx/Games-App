import { combineReducers } from "redux";
import { randomize, movePiece } from "./helpers";

const newOrderReducer = (
  currentOrder = [null, 1, 2, 3, 4, 5, 6, 7, 8],
  action
) => {
  if (action.type === "RANDOMIZE_ORDER") {
    return randomize(action.payload.order);
  } else if (action.type === "MOVE_PIECE") {
    return movePiece(action.payload.order, action.payload.piece);
  } else {
    return currentOrder;
  }
};

//BARK
const orderBark = (currentOrder = [0, 1, 2], action) => {
  if (action.type === "RANDOMIZE_ORDER__BARK") {
    return randomize(currentOrder);
  } else {
    return currentOrder;
  }
};
const guessedSeqBark = (guess = [], action) => {
  if (action.type === "ADD_TO_SEQ__BARK") {
    return guess; //.concat(action.payload.guess) ?? whyy
  } else if (action.type === "RESET_SEQ__BARK") {
    return [];
  } else {
    return guess;
  }
};
const level = (level = 1, action) => {
  if (action.type === "UP_LEVEL__BARK") {
    return level + 1;
  } else if (action.type === "ZERO_LEVEL__BARK") {
    return 1;
  } else {
    return level;
  }
};
const movesReducer = (moves = 0, action) => {
  if (action.type === "INCREMENT_MOVEMENT") {
    //nonsense. doesn't do anything
    return action.payload.moves;
  } else {
    return moves;
  }
};
const timerReducer = (time = 0, action) => {
  if (action.type === "START_TIMER") {
    return true;
  }
};
export default combineReducers({
  newOrder: newOrderReducer,
  orderBark,
  guessedSeqBark: guessedSeqBark,
  level: level,
  moves: movesReducer
});
