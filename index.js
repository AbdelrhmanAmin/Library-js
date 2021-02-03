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
function Book(author, title, pages, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(arr, book) {
  arr.push(book);
  setBooks();
  location.reload();
}

function setBooks() {
  const data = JSON.stringify(myLibrary);
  localStorage.setItem('library', data);
}

const getter = getBooks();
myLibrary = [...getter];
getBooks();
if (getter.length === 0) {
  getter.push(
    new Book('Neko Master', '9999 Reasons I love my mommy', '9999999', true)
  );
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (auth.value !== '' && title.value !== '' && pages.value !== '') {
    let book = new Book(auth.value, title.value, pages.value, read.checked);
    addBookToLibrary(myLibrary, book);
  }
});

function displayEachBook() {
  getter.forEach((book) => {
    let tr = document.createElement('tr');
    let tdAuthor = document.createElement('td');
    let tdTitle = document.createElement('td');
    let tdPages = document.createElement('td');
    let td_btn = document.createElement('td');
    let td_btn2 = document.createElement('td');
    let del_btn = document.createElement('button');
    let read_btn = document.createElement('button');
    del_btn.innerHTML = 'Delete';
    del_btn.className = 'btn btn-danger';
    if (book.read == false) {
      read_btn.innerHTML = 'read';
      read_btn.className = 'btn btn-success';
      read_btn.addEventListener('click', () => {
        myLibrary[myLibrary.indexOf(book)].read = true;
        setBooks();
        location.reload();
      });
    } else {
      read_btn.innerHTML = 'unread';
      read_btn.className = 'btn btn-warning';
      read_btn.addEventListener('click', () => {
        myLibrary[myLibrary.indexOf(book)].read = false;
        setBooks();
        location.reload();
      });
    }

    del_btn.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      localStorage.setItem('library', JSON.stringify(myLibrary));
      tr.innerHTML = '';
    });
    td_btn.appendChild(del_btn);
    td_btn2.appendChild(read_btn);
    tdAuthor.innerHTML = book.author;
    tdTitle.innerHTML = book.title;
    tdPages.innerHTML = book.pages;
    tr.appendChild(td_Author);
    tr.appendChild(td_Title);
    tr.appendChild(td_Pages);
    tr.appendChild(td_btn2);
    tr.appendChild(td_btn);
    table.appendChild(tr);
  });
}
displayEachBook();
