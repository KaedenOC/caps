'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
let Chance = require('chance');
// const eventPool = require('../../eventEmitter');

let chance = new Chance();

const orderHandler = (order=null) => {
  if(!order){
    order = {
      store: 'acme-widgets',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  let payload = {
    event: 'pickup',
    messageId: order.orderId,
    queueId: 'acme-widgets',
    order,
  };
  // console.log('VENDOR: ORDER ready for pickup:', payload);
  socket.emit('pickup', payload); //emit will go to one place.
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.order.customer);


const deliveredMessage = (payload) => {
  setTimeout(() => {
    socket.emit('received', payload);
    thankDriver(payload);
  }, 1000);
};

module.exports = { orderHandler, deliveredMessage, thankDriver };

