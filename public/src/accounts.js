//Computer, please bring up account that match given ID parameter in our accounts array
const findAccountById = (accounts, id) => {
  return accounts.find((account) => account.id === id); //Use find function to run through given index and perform comparative function
}
//should return the list of accounts ordered by last name try sort method
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last;
    const lastNameB = accountB.name.last;
    return lastNameA.toLowerCase() < lastNameB.toLowerCase() ? -1 :1;
  });
}

// get total number of borrows from one particular account
const getTotalNumberOfBorrows = (account, books) => { //run through account parameter and compare using books parameter
  //first, initialize a variable to 0 (later incrementing)
  let initialValue = 0;
  books.forEach((book) => { //provide a function once for each array element
    let borrowedBooks = book.borrows.filter((borrower) => borrower.id === account.id) //for each book, see if borrowerId matches accountId
    initialValue += borrowedBooks.length //add truthy values to our initialValue
  })
  return initialValue
};

const getBooksPossessedByAccount = (account, books, authors) => {
  let result = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned);
  });
  return result.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const newBook = {...book, author};
    return newBook;
  })

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
