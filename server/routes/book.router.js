const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


//Setup PG to connect database



// Setup express (same as before)
const app = express();

// Setup body parser - to translating request body into JSON
app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );
app.use(express.static('server/public'));



// Get all books
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "books" ORDER BY "title";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
  });
});

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post('/',  (req, res) => {
  let newBook = req.body;
  console.log(`Adding book`, newBook);

  let queryText = `INSERT INTO "books" ("author", "title")
                   VALUES ($1, $2);`;
  pool.query(queryText, [newBook.author, newBook.title])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
});

router.put('/:id',  (req, res) => {
  let newBook = req.body;
  console.log(`Adding book`, newBook);
  console.log('id is', req.params.id);

  let queryText = `PUT AND UPDATE "books" ("author", "title")
                   VALUES ($1, $2);`;
  pool.query(queryText, [newBook.author, newBook.title])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
});

router.delete('/:id',  (req, res) => {
  let booksToDelete = req.params.id
  console.log(`Deleted book`, booksToDelete);

  let queryText = `DELETE FROM "books" ("author", "title")
                   VALUES ($1, $2);`;
  pool.query(queryText, [newBook.author, newBook.title])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
});
// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status


// TODO - DELETE 
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id


module.exports = router;
