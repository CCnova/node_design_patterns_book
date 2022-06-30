// Algorithm
// function iterate(index) {
//   if (index === tasks.length) return finish();

//   const task = tasks[index];
//   task(() => iterate(index + 1));
// }

// function finish() {
//   // iteration completed
// }

function iterateSeries(collection, iteratorCallback, finalCallback) {
  const iterate = (index) => {
    if (index === collection.length) return finalCallback();

    const item = collection[index];
    iteratorCallback(item, () => iterate(index + 1));
  };

  iterate(0);
}

iterateSeries(
  [1, 2, 3],
  (number, callback) => {
    console.log(`Executed task ${number}`);
    callback();
  },
  () => console.log("FINISHED")
);
