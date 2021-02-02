let myLibrary = [];
let auth = document.getElementById("author");
let title = document.getElementById("title");
let pages = document.getElementById("pages");
let read = document.getElementById("read");
let btn = document.querySelector(".submit");
let table = document.getElementById("table");
function Book(author, title, pages, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(arr, book) {
  arr.push(book);
}

btn.addEventListener("click", () => {
  if (auth.value !== "" && title.value !== "" && pages.value !== "") {
    let newBook = new Book(auth.value, title.value, pages.value, read.checked);
    addBookToLibrary(myLibrary, newBook);
    displayEachBook();
  }
});
function displayEachBook() {
  let tr = document.createElement("tr");
  let td_Author = document.createElement("td");
  let td_Title = document.createElement("td");
  let td_Pages = document.createElement("td");
  let td_Read = document.createElement("td");
  myLibrary.forEach((book) => {
    td_Author.innerHTML = book.author;
    td_Title.innerHTML = book.title;
    td_Pages.innerHTML = book.pages;
    td_Read.innerHTML = book.read;
  });
  tr.appendChild(td_Author);
  tr.appendChild(td_Title);
  tr.appendChild(td_Pages);
  tr.appendChild(td_Read);
  table.appendChild(tr);
}
