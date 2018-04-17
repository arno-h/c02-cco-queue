const express = require('express');
const router = express.Router();

router.post("/", handleMessage);

function handleMessage(request, response) {
    let msg = request.body.msg;

    console.log("Nachricht: " + JSON.stringify(msg));

    response.json(true);
}

module.exports = router;