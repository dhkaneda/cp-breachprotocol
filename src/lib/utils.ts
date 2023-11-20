export const selectRandomFrom = (array: string | any[]) => {
  return array[Math.floor(Math.random() * array.length)];
}

export const shuffleArray = (arr: any[]) => {
  arr.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });
};