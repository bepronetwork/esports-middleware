export default class ClientQueue {
    constructor(RABBIT_URL_QUEUE_BET) {
        this.__init__(RABBIT_URL_QUEUE_BET);
    }
    __init__(RABBIT_URL_QUEUE_BET) {
        try{
            this.__connectInstance = require('amqplib').connect(RABBIT_URL_QUEUE_BET).then(conn => conn.createChannel());
        }catch(err){
            Logger.error(`Can´t connect with RabbiMQ Service ${err}`)
        }
    }
    __connect(){
        return this.__connectInstance;
    }
    __createQueue(channel, queue){
        try{
            return new Promise((resolve, reject) => {
                try{
                    channel.assertQueue(queue, { durable: true });
                    resolve(channel);
                }
                catch(err){ reject(err) }
            });
        }catch(err){
            Logger.error(`Can´t connect with RabbiMQ Service ${err}`)
        }
    }
    sendToQueue(queue, message){
        try{
            return new Promise((resolve, reject) =>{
                this.__connect()
                .then(channel => this.__createQueue(channel, queue))
                .then(channel => {
                    channel.sendToQueue( queue, Buffer.from(JSON.stringify(message)) );
                    resolve(true);
                })
                .catch(err => reject(err))
            });
        }catch(err){
            Logger.error(`Can´t connect with RabbiMQ Service ${err}`)
        }
    }
}