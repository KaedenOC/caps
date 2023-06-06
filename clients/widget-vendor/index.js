'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.emit('join', 'acme-widgets');
socket.emit('getAll', {queueId: 'acme-widgets'});

// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {
  orderHandler();
}, 7000);



socket.on('delivered', deliveredMessage);



