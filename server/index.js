'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

//socket server singleton
const server = new Server();

//listening for all events
server.listen(PORT);

//create namespace
const capsNameSpace = server.of('/caps');
capsNameSpace.on('connection', (socket) => {
  console.log('socket connected to namespace', socket.id);

  //join room
  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log(`joined the ${room} room`);
  });
});
