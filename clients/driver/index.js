'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
// const eventPool = require('../../eventEmitter');
const { handlePickupAndDelivery } = require('./handler');

socket.emit('getAll', {queueId: 'DRIVER'});

socket.on('pickup', handlePickupAndDelivery);

// setTimeout(() => {
//   socket.emit('JOIN', 'storeName');
//   console.log('successful join');
// }, 1000);
