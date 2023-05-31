'use strict';

const eventPool = require('../eventEmitter');
const { handlePickupAndDelivery } = require('./handler');

eventPool.on('pickup', handlePickupAndDelivery);
