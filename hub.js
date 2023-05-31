'use strict';

const eventPool = require('./eventEmitter');

//first package
require('./vendor/index');

//handlers
const { pickupHandler } = require('./driver');
const { deliveryHandler } = require('./driver');
const { deliveredHandler } = require('./driver');
const { thankYouHandler } = require('./driver');

//listeners
eventPool.on('NEW_ORDER', pickupHandler);
eventPool.on('DELIVERY', deliveryHandler);
eventPool.on('PACKAGE DELIVERED', deliveredHandler);
eventPool.on('DELIVERED', thankYouHandler);
