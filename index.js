let myLibrary = [];
function Book(author, title, pages, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function getBooks() {
  let data = localStorage.getItem('library');
  data = JSON.parse(data);
  if (data == null) {
    myLibrary.push(
      new Book('Neko Master', '9999 Reasons I love my mommy', '9999999', true)
    );
    setBooks();
    data = JSON.parse(localStorage.getItem('library'));
  }
  return data;
}
function setBooks() {
  const data = JSON.stringify(myLibrary);
  localStorage.setItem('library', data);
}

function addBookToLibrary(arr, book) {
  arr.push(book);
  setBooks();
  window.location.reload();
}

const getter = getBooks();
myLibrary = [...getter];
