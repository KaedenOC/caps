'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');

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

  //join room
  // socket.on('JOIN', (room) => {
  //   socket.join(room);
  //   console.log(`joined the ${room} room`);
  //   console.log('Payload in room', room);
  // });

  //socket on for pickup, in transit, delivered/ listens for and relays
  socket.on('pickup', (payload) => {
    logger('pickup', payload);
    socket.broadcast.emit('pickup', payload); // sends to all clients except the sender..
  });

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logger('delivered', payload);
    socket.broadcast.emit('delivered', payload);
  });

});
