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
export const startTimer = () => {
  return {
    type: "START_TIMER",
    payload: {}
  };
};

//BARK
export const randomizeOrderBark = () => {
  return {
    type: "RANDOMIZE_ORDER__BARK"
  };
};

export const addToSeqBark = guess => {
  return {
    type: "ADD_TO_SEQ__BARK",
    payload: {
      guess
    }
  };
};
export const resetSeqBark = () => {
  return {
    type: "RESET_SEQ__BARK"
  };
};
export const upLevel = () => {
  return {
    type: "UP_LEVEL__BARK"
  };
};
export const zeroLevel = () => {
  return {
    type: "ZERO_LEVEL__BARK"
  };
};
