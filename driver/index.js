'use strict';

const eventPool = require('../eventEmitter');


const pickupHandler = (payload) => {
  setTimeout(() => {
    console.log('DRIVER ON WAY FOR PICKUP', payload);
    eventPool.emit('DELIVERY', payload);
  }, 1000);
};

const deliveryHandler = (payload) => {
  setTimeout(() => {
    console.log('IN TRANSIT ', payload);
    eventPool.emit('something', payload);
  }, 1000);
};

const deliveredHandler = (payload) => {
  setTimeout(() => {
    console.log('PACKAGE DELIVERED', payload);
    eventPool.emit('DELIVERED', payload);
  }, 1000);
};

const thankYouHandler = (payload) => {
  setTimeout(() => {
    console.log('thank you for your order', payload);

  }, 1000);
};


module.exports = { pickupHandler, deliveryHandler, deliveredHandler, thankYouHandler };
