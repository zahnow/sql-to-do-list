const express = require("express");
const router = express.Router();

const pool = require('../modules/pool');
//TODO

router.get('/', (req, res) => {
    console.log('GET request on /todos');
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

router.post('/', (req, res) => {
    console.log('POST request on /todos');
    const queryString = `
        INSERT INTO "todos" ("summary")
        VALUES ($1);
    `
    pool.query(queryString, [req.body.summary])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error POSTing to todos:', error);
            res.sendStatus(500);
        });
});

module.exports = router;