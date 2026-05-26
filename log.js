let form = document.getElementById('log-form')
let nameInput = document.getElementById('name-input').value.trim()
let authorName = document.getElementById('author-input').value.trim()
let starValue = document.getElementById('star-rating') // fix this...
let finishDate = document.getElementById('finish-date').value.trim()
let formNotes = document.getElementById('notes-input').value.trim()
let noBooks = document.getElementById('noBooks')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    noBooks.classList.add('hidden') // create hidden class

    


})