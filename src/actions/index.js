//TIME
export const startTimer = () => {
  return {
    type: "START_TIMER"
  };
};
export const stopTimer = () => {
  return {
    type: "STOP_TIMER"
  };
};
export const incrementTimer = () => {
  return {
    type: "INCREMENT_TIMER"
  };
};
export const resetTimer = () => {
  return {
    type: "RESET_TIMER"
  };
};
export const timeWhenStopped = time => {
  return {
    type: "TIME_WHEN_STOPPED",
    payload: {
      time
    }
  };
};
//POINTS
export const addPoints = points => {
  return {
    type: "ADD_POINTS",
    payload: {
      points
    }
  };
};
export const resetPoints = () => {
  return {
    type: "RESET_POINTS"
  };
};
//MOVEMENT
export const incrementMovement = () => {
  return {
    type: "INCREMENT_MOVEMENT"
  };
};

export const resetMovement = () => {
  return {
    type: "RESET_MOVEMENT"
  };
};
//LEVEL
export const upLevel = () => {
  return {
    type: "UP_LEVEL"
  };
};
export const resetLevel = () => {
  return {
    type: "RESET_LEVEL"
  };
};

//SLIDER
export const randomizeSlider = order => {
  return {
    type: "RANDOMIZE_ORDER__SLIDER",
    payload: {
      order
    }
  };
};

export const movePieceSlider = (order, piece) => {
  return {
    type: "MOVE_PIECE__SLIDER",
    payload: {
      order,
      piece
      //add number of moves but only if piece *actually* moves
    }
  };
};
//MEMO
export const setboardSize = size => {
  return {
    type: "SET_BOARD_SIZE__MEMO",
    payload: {
      size
    }
  };
};
export const setOrderMemo = size => {
  return {
    type: "SET_NEW_ORDER__MEMO",
    payload: {
      size
    }
  };
};
export const randomizeMemo = () => {
  return {
    type: "RANDOMIZE_ORDER__MEMO"
  };
};
export const setPairMemo = pair => {
  return {
    type: "SET_PAIR__MEMO",
    payload: {
      pair
    }
  };
};
export const resetPairMemo = () => {
  return {
    type: "RESET_PAIR__MEMO"
  };
};
//BARK
export const setNewOrderBark = level => {
  return {
    type: "SET_NEW_ORDER__BARK",
    payload: {
      level
    }
  };
};
export const addToOrderBark = newOrder => {
  return {
    type: "ADD_TO_ORDER__BARK",
    payload: {
      newOrder
    }
  };
};
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
