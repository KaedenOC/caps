'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const capsQueue = new Queue();

//socket server singleton
const server = new Server(); //currently only tcp

//listening for all events
server.listen(PORT);

server.on('MESSAGE', () => {
  console.log('SERVER: Message event');
});

// logs the event, a timestamp and the payload
function logger(event, payload) {
  const timestamp = new Date();
  console.log('EVENT: ', { event, timestamp, payload });
}



//create namespace
const capsNameSpace = server.of('/caps');
capsNameSpace.on('connection', (socket) => {
  console.log('socket connected to namespace', socket.id);

  // join room
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined the ${room} room.`);
  });

  socket.onAny((event, payload) => {
    logger(event, payload);
  });

  //socket on for pickup, in transit, delivered/ listens for and relays
  socket.on('pickup', (payload) => {
    // logger('pickup', payload);
    let driverQueue = capsQueue.read('DRIVER');
    if(!driverQueue){
      let driverKey = capsQueue.store('DRIVER', new Queue());
      driverQueue = capsQueue.read(driverKey);
    }
    driverQueue.store(payload.messageId, payload);
    socket.broadcast.emit('pickup', payload); // sends to all clients except the sender..
  });

  socket.on('received', (payload) => {
    let currentQueue = capsQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('there are messages but no queue!');
    }
    let order = currentQueue.remove(payload.messageId);
    socket.broadcast.emit('received', order);
  });

  socket.on('in-transit', (payload) => {
    // logger('in-transit', payload);
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    // logger('delivered', payload);
    let vendorQueue = capsQueue.read(payload.queueId);
    if(!vendorQueue){
      let queueKey = capsQueue.store(payload.queueId, new Queue());
      vendorQueue = capsQueue.read(queueKey);
    }
    vendorQueue.store(payload.messageId, payload);
    socket.to(payload.queueId).emit('delivered', payload);
  });

  socket.on('getAll', (payload) => {
    console.log('attempting to get all messages!');
    let currentQueue = capsQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      const ids = Object.keys(currentQueue.data);
      ids.forEach(messageId => {
        let savedPayLoad = currentQueue.read(messageId);
        socket.emit(savedPayLoad.event, savedPayLoad);
      });
    }
  });

});
