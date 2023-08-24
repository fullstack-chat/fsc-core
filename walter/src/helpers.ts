export async function asyncForEach(array: any[], callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
export function rng(min: number, max: number): number {
  var num = Math.random() * (max - min) + min;
  return Math.floor(num)
}