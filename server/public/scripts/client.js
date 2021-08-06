$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
  
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $('#bookShelf').on('click', '.deleteBttn', deleteRow); 
  // TODO - Add code for edit & delete buttons
}

//Having trouble with this
function deleteRow(){
  console.log('in delete', $(this));
  let tr = $(this).parents('tr');
  console.log('tr', tr);
  let id = tr.data('id');
  console.log('id', id);

$.ajax({
    type: 'DELETE',
    url: `/books/${id}`
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to delete book at this time. Please try again later.');
    });
  }


function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
$.ajax({
    method: 'PUT',
    url: `/books/${booksId}`,
  })
  .then( function(response) {
    getAllSongs();
  })
  .catch( function(error) {
    alert('Error on vote on song', error);
  })


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();
// console.log('hi');
  //assigned an id to table row
  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    console.log(book);
    // For each book, append a new row to our table
    $('#bookShelf').append(`
    <tr data-id="${book.id}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button class="deleteBttn">X</button></td>
      </tr>
    `);
  }
}


// {/* <tr data-id="${response[i].id}">  */}
//add a delete button that goes to the table
//AJAX --> SERVER --> ROUTER --> SQL
//AJAX <-- SERVER <-- ROUTER <-- SQL

//Add a delete button to each book item
//HTTP: DELETE --> SQL: DELETE FROM using ID

//Update using a 'mark as read button'
//HTTP: PUT -->  SQL: UPDATE set