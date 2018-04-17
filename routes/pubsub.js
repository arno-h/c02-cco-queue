const express = require('express');
const router = express.Router();
const Request = require('request');

router.post('/', newMessage);
router.post('/subscribers', addSubscriber);

let subscribers = [];

function addSubscriber(request, response) {
    subscribers.push(request.body.subscriberUrl);

    response.json(true);
}

function newMessage(request, response) {
    for (let subscriber of subscribers) {
        Request.post({
            url: subscriber,
            json: { msg: request.body.msg }
        });
    }

    response.json(true);
}

module.exports = router;