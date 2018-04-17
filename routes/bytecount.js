const express = require('express');
const router = express.Router();

router.post('/', handleMsg);
router.get('/', readBytes);

let sumBytes = 0;

function handleMsg(request, response) {
    let bytes = request.body.msg.bytes;
    sumBytes += bytes;

    response.json(true);
}

function readBytes(request, response) {
    response.json({
        totalBytes: sumBytes
    });
}


module.exports = router;