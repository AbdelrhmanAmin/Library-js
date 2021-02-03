let myLibrary = [];
function Book(author, title, pages, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function setBooks() {
  const data = JSON.stringify(myLibrary);
  localStorage.setItem('library', data);
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

function addBookToLibrary(arr, book) {
  arr.push(book);
  setBooks();
  window.location.reload();
}

const getter = getBooks();
myLibrary = [...getter];

const auth = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const btn = document.getElementById('submit');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (auth.value !== '' && title.value !== '' && pages.value !== '') {
    const book = new Book(auth.value, title.value, pages.value, read.checked);
    addBookToLibrary(myLibrary, book);
  }
});
