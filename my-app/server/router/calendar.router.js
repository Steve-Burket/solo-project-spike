const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const query = `SELECT * FROM calendar`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR in getting calendar', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created lesson date and time
  const insertCalendar = `;`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertCalendar, [req.body.week, req.body.day, req.body.time])
    .then((result) => {
      console.log('New lesson time Id:', result.rows[0].id); //ID IS HERE!

      const createdLessonTimeID = result.rows[0].id;

      pool.query().then((result) => {
        //Now that it's done, send back success!
        res.sendStatus(201);
      });

      // Catch for the query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
