export const generateUniqueNumber = (arr: Array<number | string>) => {
  let max = 1;
  arr.forEach(el => {
    if (typeof el === 'number' && el >= max) {
      max = el + 1;
    }
  })
  console.log(max);
  return max;
}
