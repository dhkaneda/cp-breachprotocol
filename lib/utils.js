export const selectRandomFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}