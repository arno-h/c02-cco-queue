const storage = require('azure-storage');
const util = require('./util');

class Queue {
    constructor(queue_account, queue_key, queue_name) {
        this.queueService =  storage.createQueueService(queue_account, queue_key);
        this.queue_name = queue_name;
    }

    post(message) {
        return util.promisify3(callback => {
            this.queueService.createMessage(this.queue_name, JSON.stringify(message), callback);
        });
    }

    peek() {
        return util.promisify3(callback => {
            this.queueService.peekMessages(this.queue_name, callback);
        });
    }

    // returns array of string messages (need to be decoded first!)
    get() {
        return util.promisify3(callback => {
            this.queueService.getMessages(this.queue_name, callback);
        });
    }

    delete(message) {
        return util.promisify3(callback => {
            this.queueService.deleteMessage(this.queue_name, message.messageId, message.popReceipt, callback);
        });

    }

    // Inhalt ist in result.messageText (muss noch JSON-dekodiert werden)
    async dequeue() {
        let messages = await this.get();
        if (messages.length === 0) {
            return null;
        }
        await this.delete(messages[0]);
        return messages[0];
    }

    approx_queue_len() {
        return util.promisify3((resolve, reject) => {
            this.queueService.getQueueMetadata(this.queue_name, (error, results, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.approximateMessageCount);
                }
            });
        });

    }
}

module.exports = Queue;