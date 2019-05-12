export const formatTime = (hours, minutes, seconds) => {
  if (hours < 1 && minutes < 1) {
    return `${seconds} s.`;
  } else if (hours < 1) {
    return `${minutes}min. and ${seconds}s.`;
  } else {
    return `${hours}h. ${minutes}min. and ${seconds}s.`;
  }
};
