'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
const eventPool = require('../eventEmitter');

// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {
  orderHandler();
}, 5000);

eventPool.on('delivered', deliveredMessage);



