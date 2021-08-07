const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const booksRouter = require('./routes/book.router');

//routes
app.use('/books', booksRouter);

// Serve back static files by default
app.use(express.static('server/public'))

// app.delete(`/books/${id}`, (req, res) => {
//   let reqId = req.params.id;
//   console.log('Delete request for id', reqId);
//   let sqlText = 'DELETE FROM books WHERE id=$1;';
//   pool.query(sqlText, [reqId])
//     .then( (result) => {
//       console.log('books deleted');
//       res.sendStatus(200);
//     })
//     .catch( (error) => {
//       console.log(`Error making database query ${sqlText}`, error);
//       res.sendStatus(500); // Good server always responds
//     })
// })

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
