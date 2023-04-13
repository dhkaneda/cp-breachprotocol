export const selectRandomFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

export const shuffleArray = (arr) => {
  arr.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });
};