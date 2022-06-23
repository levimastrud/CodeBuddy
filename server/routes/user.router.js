const { response } = require('express');
const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (name, username, password, recent_topic_completed)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [name, username, password, 0])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.post('/next-topic', (req, res) => {
  const username = req.body.username;
  const nextTopic = req.body.nextTopic;
  let queryText = `UPDATE "user"
  SET "recent_topic_completed" = $1
  WHERE "username" = $2;`
  pool.query(queryText, [nextTopic, username])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error going to next topic', err);
      res.sendStatus(500);
    });
});

router.post('/reset', (req, res) => {
  const username = req.body.username;
  let queryText = `UPDATE "user"
  SET "recent_topic_completed" = 0,
  "elements_results" = 0,
	"images_results" = 0,
	"links_results" = 0,
	"lists_results" = 0,
 	"styles_results" = 0,
	"buttons_results" = 0,
	"tables_results" = 0,
	"forms_results" = 0,
 	"final_results" = 0
  WHERE "username" = $1;`
  pool.query(queryText, [username])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error resetting progression', err);
      res.sendStatus(500);
    });
})

router.get('/fetch-scores', (req, res) => {
  pool.query('SELECT * FROM "user";')
    .then(response => {
      res.send(response.rows)
    }).catch(error => {
      console.log('error getting results')
    })
});

// Router for results

router.post('/elements-quiz-total', (req, res) => {
  const userId = req.body.userId;
  const quizTotal = req.body.quizTotal;
  let queryText = `UPDATE "user"
  SET elements_results = $1
  WHERE id = $2;`
  pool.query(queryText, [quizTotal, userId])
    .then(() => {
      res.sendStatus(201)
      console.log('sent QUIZ RESULTS')
    })
    .catch((err) => {
      console.log('Error posting results', err);
      res.sendStatus(500);
    });
});

router.post('/lists-quiz-total', (req, res) => {
  const userId = req.body.userId;
  const quizTotal = req.body.quizTotal;
  let queryText = `UPDATE "user"
  SET lists_results = $1
  WHERE id = $2;`
  pool.query(queryText, [quizTotal, userId])
    .then(() => {
      res.sendStatus(201)
      console.log('sent QUIZ RESULTS')
    })
    .catch((err) => {
      console.log('Error posting results', err);
      res.sendStatus(500);
    });
});

module.exports = router;
