const Request = require('request');

function setup() {

    Request.post({
        url: 'http://localhost:3000/pubsub/subscribers/',
        json: {
            subscriberUrl: 'http://localhost:3000/worker/'
        }
    });


    Request.post({
        url: 'http://localhost:3000/pubsub/subscribers/',
        json: {
            subscriberUrl: 'http://localhost:3000/bytecount/'
        }
    });

    Request.put({
        url: 'http://localhost:3000/polling/config',
        json: {
            inputUrl: 'http://localhost:3000/queue/',
            outputUrl: 'http://localhost:3000/pubsub/'
        }
    });

}

module.exports = setup;