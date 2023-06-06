'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
// const eventPool = require('../../eventEmitter');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

// let store = ''

// setTimeout(() => {
//   socket.emit('JOIN', 'storeName');
// }, 1000);
// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {
  orderHandler();
}, 7000);

socket.emit('getAll', {queueId: 'acme-widgets'});




socket.on('delivered', deliveredMessage);



