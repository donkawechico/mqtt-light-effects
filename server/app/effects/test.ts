export async function waiting(
  iter: IterableIterator<any>,
  doWork: (lastItem: IteratorResult<any>) => void,
  sleep: number
) { // Line 1
  let lastItem = iter.next();

  while (!lastItem.done) {
    lastItem = iter.next();
    console.log(lastItem);
    doWork(lastItem);
    await delay(sleep);
  }
}

const delay = (amount: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, amount);
  });
};

export async function loop() {
  for (let i = 0; i < 50; i++) {
    console.log(i);
    await delay(100);
  }
}
