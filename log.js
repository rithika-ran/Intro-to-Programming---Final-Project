let form = document.getElementById('log-form')

let noBooks = document.getElementById('noBooks')
let logTable = document.getElementById('logs-table')

let booksLog = JSON.parse(localStorage.getItem('booksLog')) || []

  window.addEventListener('DOMContentLoaded', (e) => {
    for(let book of booksLog ){
        addBooktoLog(book)
    }
  })

function addBooktoLog(book){
            let nextRow = document.createElement('tr')
        nextRow.innerHTML = `
           <td class="p-4">${book.rating}⭐</td>
           <td class="p-4">${book.name}</td>
            <td class="p-4">${book.author}</td>
           <td class="p-4">${book.date}</td>
           <td class="p-4">${book.notes}</td>
    
        `
        logTable.appendChild(nextRow)

}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    // get values 
    let bookName = document.getElementById('name-input').value.trim()
    let authorName = document.getElementById('author-input').value.trim()
    let finishDate = document.getElementById('finish-date').value.trim()
    let formNotes = document.getElementById('notes-input').value.trim()

    // let starValue = document.getElementById('star-rating').value // fix this...
    let sixStar = document.getElementById('6-star')
    let fiveStar = document.getElementById('5-star')
    let fourStar = document.getElementById('4-star')
    let threeStar = document.getElementById('3-star')
    let twoStar = document.getElementById('2-star')
    let oneStar = document.getElementById('1-star')
    let starValue

    if(oneStar.checked){
        starValue = oneStar.value 
    }

     if(twoStar.checked){
     starValue = twoStar.value 
    }

     if(threeStar.checked){
         starValue = threeStar.value
    }

     if(fourStar.checked){
     starValue = fourStar.value
    }

     if(fiveStar.checked){
         starValue = fiveStar.value 
    }

      if(sixStar.checked){
         starValue = sixStar.value 
    } 

    logTable.classList.remove('hidden')
    noBooks.classList.add('hidden')


    // create object 

    let newBook = {
        rating: starValue,
        name: bookName,
        author: authorName,
        date: finishDate,
        notes: formNotes,
    }
    booksLog.push(newBook)

    // //stringfy & local storage

    localStorage.setItem('booksLog', JSON.stringify(booksLog) )

    // add new book into log array 
    addBooktoLog(newBook)

    e.target.reset()

})