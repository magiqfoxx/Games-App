export function randomize(order) {
  let orderCopy = [...order];
  let newOrder = [];
  let index;
  order.map(element => {
    index = Math.floor(Math.random() * orderCopy.length + 0);
    newOrder.push(orderCopy[index]);
    orderCopy.splice(index, 1);
  });

  return newOrder;
}

export const getSequence = array => {
  //produces a random sequence where each element of array appears twice
  return randomize(array).concat(randomize(array));
};

export const isGameWon = () => {};
