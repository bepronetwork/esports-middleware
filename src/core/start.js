import ClientQueue from '../logic/third-parties/rabbit/clientRabbitMQ';
import { consume, getChannel } from './queue';

require('dotenv').config();

class StartCore {
    start() {
        const RABBIT_LIST = JSON.parse(process.env.RABBIT_LIST);
        let listQueue = [];
        for(let rabbitURL of RABBIT_LIST) {
            listQueue.push( (new ClientQueue(rabbitURL)) );
        }
        consume("my_queue", async message => {

            for(let queue of listQueue) {
                queue.sendToQueue("my_queue", JSON.parse(message.content.toString()));
            }
            getChannel().ack(message);
            return;
        });
    }
}
const StartSingleton = new StartCore();
export {
    StartSingleton
}
