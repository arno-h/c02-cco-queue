const express = require('express');
const router = express.Router();
const Request = require('request');

router.put('/config', updateConfiguration);

let inputUrl = null;
let outputUrl = null;

function updateConfiguration(request, response) {
    inputUrl = request.body.inputUrl;
    outputUrl = request.body.outputUrl;

    response.json(true);
}

function forwardMsg() {
    setTimeout(forwardMsg, 1000);
    if (inputUrl !== null && outputUrl !== null) {
        Request.get(inputUrl, handleMsg);
    }
}

function handleMsg(error, response, body) {
    let msgBody = JSON.parse(body);
    if (typeof msgBody.msg !== "undefined") {
        Request.post({
            url: outputUrl,
            json: { msg: msgBody.msg }
        });
    }
}

forwardMsg();

module.exports = router;