import { EventEmitter } from 'events';

const ticker = {
  emitter: new EventEmitter(),
  numberOfTicks: 0,

  tick() {
    console.log('TICK: ', this.numberOfTicks);
    this.emitter.emit('tick', this.callback);
    if (this.numberOfTicks*50 <= this.interval)
      return setTimeout(this.tick.bind(this), 50);
    return this.callback();
  },

  start(interval, callback) {
    this.interval = interval;
    this.callback = callback;
    this.tick();
  },

  increaseCount() {
    this.numberOfTicks++;
  },
};

// function ticker(interval, callback) {
//   tickerEmitter.emit('tick', callback);
//   let numberOfTicks = 0;
//   tickerEmitter.on('tick', () => numberOfTicks++);

//   const tick = () => {
//     console.log('TICK: ', numberOfTicks);
//     tickerEmitter.emit('tick', callback);
//     if (numberOfTicks*50 <= interval)
//       return setTimeout(tick, 50);
//     return callback();
//   };

//   setTimeout(tick, 50);
// }

ticker.emitter.on('tick', callback => {
  if (Date.now()%5 === 0) {
    const error = new Error('Timestamp divisible by 5');
    callback(error);
    ticker.emitter.emit('error', error);
  }
  ticker.increaseCount();
});

ticker.start(2000, (error) => console.log('From callback', error || 'FINISHED'));