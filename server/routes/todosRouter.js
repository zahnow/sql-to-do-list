const express = require("express");
const router = express.Router();

const pool = require('../modules/pool');
//TODO

router.get('/', (req, res) => {
    console.log('GET request on /todo');
    const queryString = `SELECT * FROM "todos"`;
    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((error) => {
            console.log('Error getting todos:', error);
            res.sendStatus(500);
        });
});

module.exports = router;