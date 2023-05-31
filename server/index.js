'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

//socket server singleton
const server = new Server();

//listening for all events on
server.listen(PORT);
