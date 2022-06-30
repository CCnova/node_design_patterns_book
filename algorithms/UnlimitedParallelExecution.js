/**
 Algorithm

const tasks = [...];
let executed = 0;

tasks.forEach(task => {
  task(() => {
    executed++;
    if (executed === tasks.length) finish();
  });
});

function finish() {
  // All tasks completed
}

 */

function task1(callback) {
  return Promise.resolve(console.log('Task 1 executed')).then(callback);
}
function task2(callback) {
  return Promise.resolve(console.log('Task 1 executed')).then(callback);
}
function task3(callback) {
  return Promise.resolve(console.log('Task 1 executed')).then(callback);
}
function finish() {
  console.log('All tasks completed');
}

const tasks = [task1, task2, task3];
let executed = 0;


tasks.forEach(task => task(() => {
  executed++;
  if (executed === tasks.length) finish();
}));
