
class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task) {
    this.queue.push(task);
    process.nextTick(this.next.bind(this));

    return this;
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      console.log('SPAWN NEW THREAD');
      const task = this.queue.shift();
      task((number) => {
        console.log(`Finished running task ${number}`);
        this.running -= 1;
        process.nextTick(this.next.bind(this));
      });
      this.running += 1;
    }
  }
}

const taskQueue = new TaskQueue(1); // Increase this to see different threads number working
taskQueue.pushTask(task1);
taskQueue.pushTask(task2);
taskQueue.pushTask(task3);
taskQueue.pushTask(task4);

function task1(callback) {
  console.log('Starting task 1...');
  setTimeout(() => {
    console.log('Task 1 finished...');
    callback(1);
  }, 5000);
}
function task2(callback) {
  console.log('Starting task 2...');
  setTimeout(() => {
    console.log('Task 2 finished...');
    callback(2);
  }, 5000);
}
function task3(callback) {
  console.log('Starting task 3...');
  setTimeout(() => {
    console.log('Task 3 finished...');
    callback(3);
  }, 5000);
}
function task4(callback) {
  console.log('Starting task 4...');
  setTimeout(() => {
    console.log('Task 4 finished...');
    callback(4);
  }, 5000);
}