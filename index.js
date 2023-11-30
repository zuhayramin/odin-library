const form = document.querySelector("form")
const booksContainer = document.querySelector(".display-books")
let myLibrary = []

const storedData = localStorage.getItem("myLibrary")
// localStorage.clear()

if (storedData !== null) {
    console.log("Data has been successfully retrieved:", JSON.parse(storedData))
    parsedData = JSON.parse(storedData)
    myLibrary = parsedData.map((bookData) => {
        let newBook = new Book(
            bookData.title,
            bookData.author,
            bookData.pages,
            bookData.read
        )
        return newBook
    })
} else {
    console.log("No data found for the specified key.")
}

// Create a books class
class Book {
    constructor(title, author, pages, read) {
        ;(this.title = title),
            (this.author = author),
            (this.pages = pages),
            (this.read = read)
    }

    addBookToLibrary() {
        const newBook = document.createElement("div")
        newBook.classList.add("book")

        const bookTitle = document.createElement("div")
        bookTitle.classList.add("book-title")
        bookTitle.innerText = this.title

        const bookAuthor = document.createElement("div")
        bookAuthor.classList.add("book-author")
        bookAuthor.innerText = this.author

        const bookPages = document.createElement("div")
        bookPages.classList.add("book-pages")
        bookPages.innerText = this.pages + " Pages"

        const btnWrapper = document.createElement("div")
        btnWrapper.classList.add("btn-wrapper")

        const delBtn = document.createElement("button")
        const delIcon = document.createElement("img")
        delIcon.classList.add("del-icon")
        delIcon.src = "./images/delete.png"

        delBtn.appendChild(delIcon)

        delBtn.addEventListener("click", () => {
            this.deleteBook()
        })

        const readButton = document.createElement("button")
        console.log(this.read)
        this.read === true
            ? (readButton.classList.add("book-read"),
              (readButton.innerText = "Read"))
            : (readButton.classList.add("book-not-read"),
              (readButton.innerText = "Not Read"))

        readButton.addEventListener("click", () => {
            this.toggleReadStatus()
            this.read === true
                ? (readButton.classList.add("book-read"),
                  readButton.classList.remove("book-not-read"),
                  (readButton.innerText = "Read"))
                : (readButton.classList.add("book-not-read"),
                  readButton.classList.remove("book-read"),
                  (readButton.innerText = "Not Read"))

            saveLibrary()
        })

        newBook.appendChild(bookTitle)
        newBook.appendChild(bookAuthor)
        newBook.appendChild(bookPages)

        btnWrapper.appendChild(readButton)
        btnWrapper.appendChild(delBtn)
        newBook.appendChild(btnWrapper)

        booksContainer.appendChild(newBook)
    }

    deleteBook() {
        const index = myLibrary.indexOf(this)

        if (index !== -1) {
            myLibrary = myLibrary
                .slice(0, index)
                .concat(myLibrary.slice(index + 1))
        }
        console.log(myLibrary)
        emptyLibrary()
        myLibrary.forEach((book) => {
            book.addBookToLibrary()
        })

        saveLibrary()
    }
}

myLibrary.forEach((book) => {
    book.addBookToLibrary()
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
        saveLibrary()

        book.addBookToLibrary()
    })

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read
    console.log(this.read)
}

function emptyLibrary() {
    const container = document.querySelector(".display-books")

    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function saveLibrary() {
    try {
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        console.log("Data has been updated successfully.")
    } catch (error) {
        console.error("Error while updating data in localStorage:", error)
    }
}
