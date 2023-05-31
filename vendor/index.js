'use strict';

let eventPool = require('../eventEmitter.js');

let Chance = require('chance');
// Instantiate Chance so it can be used
let chance = new Chance();

// Generate a new order for pickup
setInterval(() => {
  const payload = {
    store: chance.company(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  eventPool.emit('NEW ORDER', { payload });
}, 5000);




