'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
// const eventPool = require('../../eventEmitter');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');



socket.emit('join', '1-206-flowers');
socket.emit('getAll', {queueId: '1-206-flowers'});

// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {
  orderHandler();
}, 5000);



socket.on('delivered', deliveredMessage);



