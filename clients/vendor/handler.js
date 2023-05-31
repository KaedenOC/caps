'use strict';

let Chance = require('chance');
const eventPool = require('../eventEmitter');

let chance = new Chance();

const orderHandler = (payload=null) => {
  if(!payload){
    payload = {
      store: chance.company(),
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  console.log('VENDOR: ORDER ready for pickup:', payload);
  eventPool.emit('pickup', payload);
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.customer);


const deliveredMessage = (payload) => {
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
};

module.exports = { orderHandler, deliveredMessage, thankDriver };

