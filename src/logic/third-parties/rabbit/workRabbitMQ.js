const amqplib = require('amqplib');

export default class WorkRabbitMQ {

    constructor(RABBIT_URL_QUEUE_BET) {
        this.channelLocal = null;
        this.RABBIT_URL_QUEUE_BET = RABBIT_URL_QUEUE_BET;
    }
    connect() {
        return amqplib.connect(this.RABBIT_URL_QUEUE_BET).then(conn => conn.createChannel());
    }
    createQueue(channel, queue) {
        return new Promise((resolve, reject) => {
            try {
                channel.prefetch(1);
                this.channelLocal = channel;
                channel.assertQueue(queue, { durable: true, autoDelete: false });
                resolve(channel);
            }
            catch (err) { reject(err) }
        });
    }
    consume(queue, callback) {
        this.connect()
        .then(channel => this.createQueue(channel, queue))
        .then(channel => { return channel.consume(queue, callback, { noAck: false }); })
        .catch(err => console.log(err));
    }
    getChannel() {
        return this.channelLocal;
    }
};


// export {
//     consume as workConsume,
//     getChannel as getWorkChannel
// }
//   consume("queue", (msg)=>{
//       setTimeout(()=>{
//         getChannel().ack(msg);
//       }, 10000)
//     console.log(msg.content.toString());
//   });