const form = document.querySelector("form")
const booksContainer = document.querySelector(".display-books")
let myLibrary = []

const storedData = localStorage.getItem("myLibrary")
// localStorage.clear()

if (storedData !== null) {
    console.log("Data has been successfully retrieved:", JSON.parse(storedData))
    myLibrary = JSON.parse(storedData)
} else {
    console.log("No data found for the specified key.")
}

myLibrary.forEach((book) => {
    addBookToLibrary(book)
})

// Prevent form submission on button click
document
    .getElementById("submit-btn")
    .addEventListener("click", function (event) {
        event.preventDefault()
        const form = document.querySelector("form")
        let book = new Book(
            form.title.value,
            form.author.value,
            form.pages.value,
            form.read.checked
        )
        myLibrary.push(book)
        try {
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            console.log("Data has been stored successfully.")
        } catch (error) {
            console.error("Error while storing data in localStorage:", error)
        }

        addBookToLibrary(book)
    })

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read
    console.log(this.read)
}

function addBookToLibrary(book) {
    const newBook = document.createElement("div")
    newBook.classList.add("book")

    const bookTitle = document.createElement("div")
    bookTitle.classList.add("book-title")
    bookTitle.innerText = book.title

    const bookAuthor = document.createElement("div")
    bookAuthor.classList.add("book-author")
    bookAuthor.innerText = book.author

    const bookPages = document.createElement("div")
    bookPages.classList.add("book-pages")
    bookPages.innerText = book.pages + " Pages"

    const btnWrapper = document.createElement("div")
    btnWrapper.classList.add("btn-wrapper")

    const delBtn = document.createElement("button")
    const delIcon = document.createElement("img")
    delIcon.classList.add("del-icon")
    delIcon.src = "./images/delete.png"

    delBtn.appendChild(delIcon)

    delBtn.addEventListener("click", () => {
        deleteBook(book)
    })

    const readButton = document.createElement("button")
    console.log(book.read)
    book.read === true
        ? (readButton.classList.add("book-read"),
          (readButton.innerText = "Read"))
        : (readButton.classList.add("book-not-read"),
          (readButton.innerText = "Not Read"))

    readButton.addEventListener("click", () => {
        book.toggleReadStatus()
        book.read === true
            ? (readButton.classList.add("book-read"),
              readButton.classList.remove("book-not-read"),
              (readButton.innerText = "Read"))
            : (readButton.classList.add("book-not-read"),
              readButton.classList.remove("book-read"),
              (readButton.innerText = "Not Read"))

        try {
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            console.log("Data has been stored successfully.")
        } catch (error) {
            console.error("Error while storing data in localStorage:", error)
        }
    })

    newBook.appendChild(bookTitle)
    newBook.appendChild(bookAuthor)
    newBook.appendChild(bookPages)

    btnWrapper.appendChild(readButton)
    btnWrapper.appendChild(delBtn)
    newBook.appendChild(btnWrapper)

    booksContainer.appendChild(newBook)
}

function deleteBook(book) {
    const index = myLibrary.indexOf(book)

    if (index !== -1) {
        myLibrary = myLibrary.slice(0, index).concat(myLibrary.slice(index + 1))
    }
    console.log(myLibrary)
    emptyLibrary()
    myLibrary.forEach((book) => {
        addBookToLibrary(book)
    })

    // try {
    //     localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    //     console.log("Data has been updated successfully.")
    // } catch (error) {
    //     console.error("Error while updating data in localStorage:", error)
    // }

    // addBookToLibrary(myLibrary)
}

function emptyLibrary() {
    const container = document.querySelector(".display-books")

    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}
