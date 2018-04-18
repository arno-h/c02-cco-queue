const storage = require('azure-storage');
const util = require('./util');

class Queue {
    constructor(queue_account, queue_key, queue_name) {
        this.queueService =  storage.createQueueService(queue_account, queue_key);
        this.queue_name = queue_name;
    }

    post(message) {
        return util.promisify3(callback => {
            let b64msg = Buffer.from(JSON.stringify(message)).toString('base64');
            this.queueService.createMessage(this.queue_name, b64msg, callback);
        });
    }

    peek() {
        return util.promisify3(callback => {
            this.queueService.peekMessages(this.queue_name, callback);
        });
    }

    // returns array of string messages (need to be decoded first: B64 -> JSON.parse)
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

    // Inhalt ist in result.message
    async dequeue() {
        let messages = await this.get();
        if (messages.length === 0) {
            return null;
        }
        await this.delete(messages[0]);
        messages[0].message = JSON.parse(Buffer.from(messages[0].messageText, 'base64'));
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