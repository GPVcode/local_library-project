function findAuthorById(authors, id) {
  return authors.find((author) => author.id ===id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = books.filter((book) => book.borrows[0].returned === false )
  let returned = books.filter((book) => book.borrows[0].returned === true)
  return [borrowedBooks,returned];
}

function getBorrowersForBook(book, accounts) {
  let result = book.borrows.map((borrows) => { //assign as array into result variable
    let account = accounts.find((account) => account.id === borrows.id); // find account ids that match borrower id
    return{ ...borrows, ...account}; //return all all borrows and accounts using spread operator
  });
  return result.slice(0,10); // limit return to only ten
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
