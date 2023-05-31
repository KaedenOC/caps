'use strict';

let eventPool = require('../eventEmitter');

const pickupOccurred = (payload) => {
  console.log('DRIVER: picked up', payload.orderId);
  eventPool.emit('intransit', payload);
};

const packageDelivered = (payload) => {
  console.log('DRIVER: delivered', payload.orderId);
  eventPool.emit('delivered', payload);
};

const handlePickupAndDelivery = (payload) => {
  setTimeout(() => {
    pickupOccurred(payload);
  }, 1000);
  setTimeout(() => {
    packageDelivered(payload);
  }, 2000);
};

module.exports = { pickupOccurred, packageDelivered, handlePickupAndDelivery };
