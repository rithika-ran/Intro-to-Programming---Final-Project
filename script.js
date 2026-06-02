
window.addEventListener('DOMContentLoaded', async (e) => {
    const books = await fetchFeatured()
    lastFeatured = books
    displayFeatured(books)


})

async function fetchFeatured() {
    const url = "https://openlibrary.org/trending/daily.json"

    const response = await fetch(url)
    const data = await response.json()

    let featuredBook = data.works.map(book => {
        let title = book.title
        let author;
        if (book.author_name) {
            author = book.author_name.join(" , ")
        } else {
            author = "Unknown"
        }
        let date = book.first_publish_year || 'N/A'
        let cover;
        if (book.cover_i) {
            cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        } else {
            cover = `https://placehold.co/200x300?text=Cover+Unavalible+:(`

        }


        let trendingBook = {
            key: book.key,
            title: title,
            author: author,
            date: date,
            cover_i: book.cover_i,
            cover: cover,

        }
        

        return trendingBook
    });

    return featuredBook
}

function displayFeatured(featuredBook) {
    const featuredBooksContainer = document.querySelector('#results')
    if (!featuredBooksContainer) return

    featuredBooksContainer.innerHTML = ""

    for (let book of featuredBook) {
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
        featuredBooksContainer.appendChild(card)
        const removeBtn = card.querySelector(".add-btn")
        removeBtn.addEventListener("click", function () {
            toggleReadlist(book)
        })



    }

}
