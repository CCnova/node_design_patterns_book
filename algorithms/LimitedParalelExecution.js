/**
 * Algorithm
 *
 * const tasks = [...]
 * const concurrency = 2
 * let running = 0
 * let completed = 0
 * function next() {
 *    while (running <= concurrency && completed < tasks.length) {
 *      const task = tasks.shift()
 *      task(() => {
 *        running -= 1
 *        completed += 1
 *        if (completed === tasks.length) return finish()
 *        next()
 *      })
 *      running += 1
 *    }
 * }
 * next()
 * function finish() {}
 */

/**
 * Implementation
 */

const task1 = (callback) => {
  console.log('Starting task 1...');
  console.log('Finished task 1...');
  callback();
};
const task2 = (callback) => {
  console.log('Starting task 2...');
  console.log('Finished task 2...');
  callback();
};
const task3 = (callback) => {
  console.log('Starting task 3...');
  console.log('Finished task 3...');
  callback();
};

const tasks = [
  task1,
  task2,
  task3,
  task1,
  task2,
  task3,
];
const concurrency = 4;
let completed = 0;
let running = 0;
let index = 0;

function next() {
  while (running < concurrency && index < tasks.length) {
    console.log('New spawn');
    const task = tasks[index];
    index += 1;
    task(() => {
      completed += 1;
      if (completed === tasks.length) return finish();
      running -= 1;
      next();
    });
    running += 1;
  }
}

function finish() {
  console.log(`FINISHED RUNNING ${completed} tasks`);
}

next();