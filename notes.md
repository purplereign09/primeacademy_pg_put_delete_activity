## PUT DELETE
    [X] Create database called awesome_reads
        [X] Create a table called books
        [X] Copy/paste the sample data and test run it
            [] -npm start
            [] -npm install pg

## Remove a book
[] Add a `Delete` button for each book
    [ ] Make an AJAX call to a `Delete` endpoint 
    [ ] passing the book `id` as a URL parameter
    [ ] Remove the book from the database

## Check List

Do the inputs work? [x]Yes
Do they emtpy on click? [X]
Does the table load? [X]
Do rows delete on the DOM? [X]
Is the table updated? [X]
Mark as read button [x]]
Do endoints match? [x]

Client
type: 'GET',
url: '/books'

Server
app.use('/books', booksRouter);

Pool/PG
const pool = require('../modules/pool.js');

DB
awesome_reads
