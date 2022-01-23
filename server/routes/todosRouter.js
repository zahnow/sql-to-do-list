const express = require("express");
const router = express.Router();

const pool = require('../modules/pool');
//TODO

router.get('/', (req, res) => {
    console.log('GET request on /todos');
    const queryString = `
        SELECT * FROM "todos"
        ORDER BY "id" asc;`;
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
    `;
    pool.query(queryString, [req.body.summary])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error POSTing to todos:', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    console.log('DELETE request on /todos on index:', req.params.id);
    const queryString = `
        DELETE FROM "todos"
        WHERE id=$1;
    `;
    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log('Error deleting from todos:', error);
            res.sendStatus(500);
        });
})

router.put('/complete/:id', (req, res) => {
    console.log('PUT request on /todos on index', req.params.id);
    const queryString = `
        UPDATE "todos"
        SET "is_complete" = NOT is_complete
        WHERE "id" = $1;
    `
    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error updating in todos:', error);
            res.sendStatus(500);
        })
})
module.exports = router;