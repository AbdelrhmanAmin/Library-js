let myLibrary = [];
const auth = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const btn = document.getElementById('submit');
const table = document.getElementById('table');

function getBooks() {
  let data = localStorage.getItem('library');
  data = JSON.parse(data);
  return data;
}
function setBooks() {
  const data = JSON.stringify(myLibrary);
  localStorage.setItem('library', data);
}

function Book(author, title, pages, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(arr, book) {
  arr.push(book);
  setBooks();
  window.location.reload();
}


const getter = getBooks();
myLibrary = [...getter];
getBooks();
if (getter.length === 0) {
  getter.push(new Book('Neko Master', '9999 Reasons I love my mommy', '9999999', true));
  myLibrary = [...getter]
  setBooks()
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (auth.value !== '' && title.value !== '' && pages.value !== '') {
    const book = new Book(auth.value, title.value, pages.value, read.checked);
    addBookToLibrary(myLibrary, book);
  }
});

function displayEachBook() {
  getter.forEach((book) => {
    const tr = document.createElement('tr');
    const tdAuthor = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdPages = document.createElement('td');
    const tdBtn = document.createElement('td');
    const tdBtn2 = document.createElement('td');
    const delBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.className = 'btn btn-danger';
    if (book.read === false) {
      readBtn.innerHTML = 'read';
      readBtn.className = 'btn btn-success';
      readBtn.addEventListener('click', () => {
        myLibrary[myLibrary.indexOf(book)].read = true;
        setBooks();
        window.location.reload();
      });
    } else {
      readBtn.innerHTML = 'unread';
      readBtn.className = 'btn btn-warning';
      readBtn.addEventListener('click', () => {
        myLibrary[myLibrary.indexOf(book)].read = false;
        setBooks();
        window.location.reload();
      });
    }

    delBtn.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      localStorage.setItem('library', JSON.stringify(myLibrary));
      tr.innerHTML = '';
    });
    tdBtn.appendChild(delBtn);
    tdBtn2.appendChild(readBtn);
    tdAuthor.innerHTML = book.author;
    tdTitle.innerHTML = book.title;
    tdPages.innerHTML = book.pages;
    tr.appendChild(tdAuthor);
    tr.appendChild(tdTitle);
    tr.appendChild(tdPages);
    tr.appendChild(tdBtn2);
    tr.appendChild(tdBtn);
    table.appendChild(tr);
  });
}
displayEachBook();
