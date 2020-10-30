require('dotenv').config();
const amqplib = require('amqplib');
var channelLocal = null;
function connect(){
    const CLOUDAMQP_URL_PANDA = `amqp://${encodeURIComponent(process.env.PANDA_EMAIL)}:${process.env.PANDA_TOKEN}@${process.env.PANDA_HOST}:${process.env.PANDA_PORT}/odds%2F${process.env.PANDA_COMPANY_ID}`;
    return amqplib.connect(String(CLOUDAMQP_URL_PANDA).toString()).then(conn => conn.createChannel());
  }
  function createQueue(channel, queue){
    return new Promise((resolve, reject) => {
      try{
        channel.prefetch(1);
        channelLocal = channel;
        channel.assertQueue(queue, { durable: true, autoDelete: false });
        resolve(channel);
      }
      catch(err){ reject(err) }
    });
  }
  function getChannel() {
    return channelLocal;
}
  function consume(queue, callback){
    connect()
      .then(channel => createQueue(channel, queue))
      .then(channel => channel.consume(queue, callback, { noAck: false }))
      .catch(err => console.log(err));
  }
 export {
    consume,
    getChannel
  }
