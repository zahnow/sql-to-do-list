const express = require("express");
const router = express.Router();

const pool = require('../modules/pool');
//TODO

router.get('/', (req, res) => {
    console.log('GET request on /todo');
    res.sendStatus(200);
});

module.exports = router;