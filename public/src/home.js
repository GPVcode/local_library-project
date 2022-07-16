function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    return acc + book.borrows.filter(notReturned => notReturned.returned === false).length;
  }, 0);
}

function getMostCommonGenres(books) {
  let obj = {};
  books.forEach((book) => {
    if(obj[book.genre]){
      obj[book.genre]++;
    } else {
      obj[book.genre] = 1
    }
  });
  let genreCount = [];
  for (let [key, value] of Object.entries(obj)) {
    genreCount.push({
      'name' : key,
      'count' : value
    });
  }
  genreCount.sort((a,b) => b.count - a.count);
  return genreCount.slice(0,5);
}

function getMostPopularBooks(books) {
  let nameToBorrowCount = {};
  books.forEach((book) => {
    nameToBorrowCount[book.title] = book.borrows.length;
  });
  let borrowCount = [];
  for(let [key, value] of Object.entries(nameToBorrowCount)){
    borrowCount.push({
      'name' : key,
      'count' : value
    });
  }
  borrowCount.sort((a,b) => b.count - a.count);
  return borrowCount.slice(0,5);
}


function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => {
    const { authorId, borrows } = book;
    const authorObj = authors.find(author => author.id === authorId);
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    const count = borrows.length;
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      authExists.count += count;
    } else{
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    return acc;
  }, []);

  const sortedAuthorList = authorList.sort((a,b) => b.count - a.count);
  const topFive = sortedAuthorList.slice(0,5);
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
