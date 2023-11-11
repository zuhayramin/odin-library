const form = document.querySelector("form")
const booksContainer = document.querySelector(".display-books")
let myLibrary = []

const storedData = localStorage.getItem("myLibrary")

if (storedData !== null) {
    console.log("Data has been successfully retrieved:", JSON.parse(storedData))
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
    bookPages.innerText = book.pages

    const bookRead = document.createElement("div")
    if (book.read === true) {
        bookRead.classList.add("book-read")
        bookRead.innerText = "Read"
    } else if (book.read === false) {
        bookRead.classList.add("book-not-read")
        bookRead.innerText = "Not Read"
    }

    newBook.appendChild(bookTitle)
    newBook.appendChild(bookAuthor)
    newBook.appendChild(bookPages)
    newBook.appendChild(bookRead)

    booksContainer.appendChild(newBook)
}
