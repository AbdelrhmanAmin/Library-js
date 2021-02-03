let myLibrary = [];
let auth = document.getElementById("author");
let title = document.getElementById("title");
let pages = document.getElementById("pages");
let read = document.getElementById("read");
let btn = document.querySelector(".submit");
let table = document.getElementById("table");
let getter = getBooks();
myLibrary = [...getter];

function Book(author, title, pages, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(arr, book) {
  arr.push(book);
  setBooks();
}

function setBooks() {
  const data = JSON.stringify(myLibrary);
  localStorage.setItem("library", data);
}

function getBooks() {
  let data = localStorage.getItem("library");
  data = JSON.parse(data);
  const result = [];
  data.map((book) => {
    const { author, title, pages, read } = book;
    result.push(new Book(author, title, pages, read));
    return true;
  });
  return result;
}

btn.addEventListener("click", () => {
  if (auth.value !== "" && title.value !== "" && pages.value !== "") {
    let book = new Book(auth.value, title.value, pages.value, read.checked);
    addBookToLibrary(myLibrary, book);
    auth.reset();
    title.reset();
    pages.reset();
    read.reset();
  }
});

function displayEachBook() {
  getter.forEach((book) => {
    let tr = document.createElement("tr");
    let td_Author = document.createElement("td");
    let td_Title = document.createElement("td");
    let td_Pages = document.createElement("td");
    let td_btn = document.createElement("td");
    let td_btn2 = document.createElement("td");
    let del_btn = document.createElement("button");
    let read_btn = document.createElement("button");
    del_btn.innerHTML = "Delete";
    del_btn.className = "btn btn-danger";
    if (book.read == false) {
      read_btn.innerHTML = "read";
      read_btn.className = "btn btn-success";
      read_btn.addEventListener("click", () => {
        myLibrary[myLibrary.indexOf(book)].read = true;
        setBooks();
        location.reload();
      });
    } else {
      read_btn.innerHTML = "unread";
      read_btn.className = "btn btn-warning";
      read_btn.addEventListener("click", () => {
        myLibrary[myLibrary.indexOf(book)].read = false;
        setBooks();
        location.reload();
      });
    }

    del_btn.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      localStorage.setItem("library", JSON.stringify(myLibrary));
      tr.innerHTML = "";
    });
    td_btn.appendChild(del_btn);
    td_btn2.appendChild(read_btn);
    td_Author.innerHTML = book.author;
    td_Title.innerHTML = book.title;
    td_Pages.innerHTML = book.pages;
    tr.appendChild(td_Author);
    tr.appendChild(td_Title);
    tr.appendChild(td_Pages);
    tr.appendChild(td_btn2);
    tr.appendChild(td_btn);
    table.appendChild(tr);
  });
}
displayEachBook();
