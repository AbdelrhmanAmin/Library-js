let myLibrary = [];
let auth = document.getElementById("author");
let title = document.getElementById("title");
let pages = document.getElementById("pages");
let read = document.getElementById("read");
let btn = document.querySelector(".submit");
let table = document.getElementById("table");
let getter = JSON.parse(localStorage.getItem("library"));
console.log(getter);
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
    auth.value = "";
    title.value = "";
    pages.value = 0;
    read.checked = false;
    addBookToLibrary(myLibrary, newBook);
    myLibrary.push(...getter);
    localStorage.setItem("library", JSON.stringify(myLibrary));
  }
});
function displayEachBook() {
  // let td_btn = document.createElement("td");
  // let del_btn = document.createElement("button");
  // del_btn.innerHTML = "Delete";
  // del_btn.className = "btn btn-danger";
  // td_btn.appendChild(del_btn);
  getter.forEach((book) => {
    let tr = document.createElement("tr");
    let td_Author = document.createElement("td");
    let td_Title = document.createElement("td");
    let td_Pages = document.createElement("td");
    let td_Read = document.createElement("td");
    td_Author.innerHTML = book.author;
    td_Title.innerHTML = book.title;
    td_Pages.innerHTML = book.pages;
    td_Read.innerHTML = book.read;
    tr.appendChild(td_Author);
    tr.appendChild(td_Title);
    tr.appendChild(td_Pages);
    tr.appendChild(td_Read);
    table.appendChild(tr);
  });

  // tr.appendChild(td_btn);
}
displayEachBook();
