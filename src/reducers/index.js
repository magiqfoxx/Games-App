import { combineReducers } from "redux";
import { randomize, movePiece } from "./helpers";

//const pieces = [null, 1, 2, 3, 4, 5, 6, 7, 8];

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
const movesReducer = (moves = 0, action) => {
  if (action.type === "INCREMENT_MOVEMENT") {
    //nonsense. doesn't do anything
    return action.payload.moves;
  } else {
    return moves;
  }
};
export default combineReducers({
  newOrder: newOrderReducer,
  moves: movesReducer
});
