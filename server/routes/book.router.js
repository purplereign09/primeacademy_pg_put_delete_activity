const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


//Setup PG to connect database



//model DELETE and PUT after these!
// Get all books
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "books" ORDER BY "title";';
  pool.query(queryText)
  .then(result => {
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
// Req Body = book object
// Book object = 'title', 'author'
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

router.put('/',  (req, res) => {
  // let updatedBook = req.params.id;
  console.log(`Adding book`, updatedBook);
  //adding parameterized query text to protect from anon
  let queryText = `UPDATE "books" ("author", "title", "isRead")
                   VALUES ($1, $2, $3);`;
  pool.query(queryText, [newBook.author, newBook.title, newBook.isRead])
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
});


router.delete('/:id',  (req, res) => {
  let idToDelete = req.params.id;
  console.log(`Deleted book`, idToDelete);
//adding parameterized query text to protect from hackers
  let queryText = `DELETE FROM "books" WHERE "id" = $1;
            `;
  //adding real query text to tell db what to do
  const sqlParams = [idToDelete];
  pool.query(queryText, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
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
