const form = document.querySelector("form")
let myLibrary = []

const storedData = localStorage.getItem("myLibrary")

if (storedData !== null) {
    console.log("Data has been successfully retrieved:", JSON.parse(storedData))
} else {
    console.log("No data found for the specified key.")
}

// if (localStorage.getItem("userLibrary")) {
//     myLibrary = JSON.parse(localStorage.getItem("userLibrary"))
//     console.log(myLibrary)
// }

// if (storedBooksJSON) {
//     myLibrary = JSON.parse(storedBooksJSON)
// } else {
//     myLibrary = []
// }

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
        console.log(myLibrary)
        console.log(JSON.stringify(myLibrary))
        try {
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            console.log("Data has been stored successfully.")
        } catch (error) {
            console.error("Error while storing data in localStorage:", error)
        }
    })

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    // do stuff here
}
