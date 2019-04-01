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
export const randomizeBark = order => {
  return {
    type: "RANDOMIZE_ORDER__BARK",
    payload: {
      order
    }
  };
};

export const setNewSeqBark = newSeq => {
  return {
    type: "SET_NEW_SEQ__BARK",
    payload: {
      newSeq
    }
  };
};
export const resetSeqBark = () => {
  return {
    type: "RESET_SEQ__BARK"
  };
};
export const upLevel = level => {
  return {
    type: "UP_LEVEL__BARK",
    payload: {
      level
    }
  };
};
export const zeroLevel = () => {
  return {
    type: "ZERO_LEVEL__BARK"
  };
};
