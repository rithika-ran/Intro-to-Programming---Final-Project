// const romancebtn = document.querySelector("#romance")

// romancebtn.addEventListener('click', async (e) => {
//     const books = await fetchFeatured()
//     lastFeatured = books
//     displayFeatured(books)


// })
  const fantasyBooksContainer = document.querySelector('#fantasy')

window.addEventListener('DOMContentLoaded', async (e) => {
    fantasyBooksContainer.innerHTML= `<div class="problem"> Loading...</div>`
    const books = await fetchFantasy()
    genreReadlist = books
    displayFantasy(books)


})

async function fetchFantasy() {
    const url = "https://openlibrary.org/subjects/fantasy.json?limit=50"
    const response = await fetch(url)
    const data = await response.json()
    
    let fantasyBooks = data.works.map(book => {
        console.log(book)
        let title = book.title
        let author;
        if (book.authors) {
            author = book.authors.map(author => author.name).join(" , ") 
        } else {
            author = "Unknown"
        }
        let date = book.first_publish_year || 'N/A'
        let cover;
        if (book.cover_id) {
            cover = `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
        } else {
            cover = `https://placehold.co/200x300?text=Cover+Unavalible+:(`

        }


        let trendingBook = {
            key: book.key,
            title: title,
            author: author,
            date: date,
            cover_id: book.cover_id,
            cover: cover,

        }
        console.log(trendingBook.key)

        return trendingBook
    });

    return fantasyBooks
}

function displayFantasy(fantasyBooks) {
    if (!fantasyBooksContainer) return

    fantasyBooksContainer.innerHTML = ""

    for (let book of fantasyBooks) {
        let isSaved = false
        for (let j = 0; j < readList.length; j++) {
            if (readList[j].id === book.key) {
                isSaved = true
                break
            }
        }

        const addIcon = isSaved ? "✔" : "+"
        const card = document.createElement('div')
        card.className = "readlist-card"

        card.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div> 
                <h3 class="ps-1 title-text fw-bold">${book.title}</h3>
                <h5 class="lead ps-1">By: ${book.author}</h5>
                <div class="d-flex justify-content-between align-item-center">
                <h5 class="ps-1 lead">${book.date}</h5>
                <button class="add-btn">${addIcon}</button>
            </div>
            `
        fantasyBooksContainer.appendChild(card)
        const removeBtn = card.querySelector(".add-btn")
        removeBtn.addEventListener("click", function () {
            toggleReadlist(book)
        })



    }

}
