export function fakeAsync<T>(
  callback: () => T,
  maxDelay: number = 800,
): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = callback();
      resolve(result);
    }, Math.random() * maxDelay);
  });
}
