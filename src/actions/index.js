export const incrementMoves = moves => {
  return {
    type: "INCREMENT_MOVEMENT",
    payload: {
      moves: moves + 1
    }
  };
};
export const randomizeAction = order => {
  return {
    type: "RANDOMIZE_ORDER",
    payload: {
      order
    }
  };
};
export const movePieceAction = (order, piece) => {
  return {
    type: "MOVE_PIECE",
    payload: {
      order,
      piece
      //add number of moves but only if piece *actually* moves
    }
  };
};
