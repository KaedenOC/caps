'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

//socket server singleton
const server = new Server();

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

  //socket on for pickup, in transit, delivered
  socket.on('pickup', (payload) => {
    logger('pickup', payload);
    capsNameSpace.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    capsNameSpace.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logger('delivered', payload);
    capsNameSpace.emit('delivered', payload);
  });

});
