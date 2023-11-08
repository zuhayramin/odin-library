const form = document.querySelector("form")

// Prevent form submission on button click
document
    .getElementById("submit-btn")
    .addEventListener("click", function (event) {
        event.preventDefault()
        console.log(form.title.value)
    })

const myLibrary = []

function Book() {
    // the constructor...
}

function addBookToLibrary() {
    // do stuff here
}
