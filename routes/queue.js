const express = require('express');
const router = express.Router();

router.post("/", queueMessage);
router.get("/", readMessage);

let queue = [];

function queueMessage(request, response) {
    let msg = request.body.msg;
    queue.push(msg);

    response.json(true);
}

function readMessage(request, response) {
    let msg = queue.shift();

    response.json({
        "msg": msg,
        "version": 1
    });
}

module.exports = router;