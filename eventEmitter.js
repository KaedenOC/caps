'use strict';

//create emitter for our events pool
//events is part of node
const Event = require('events');
const eventEmitter = new Event();



module.exports = eventEmitter;

