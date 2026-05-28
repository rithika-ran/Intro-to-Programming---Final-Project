let featuredBooksContainer = document.querySelector('#results')

window.addEventListener('DOMContentLoaded', async (e) => {
    const books = await fetchFeatured()
    displayFeatured(books)


})

async function fetchFeatured() {
    const url = "https://openlibrary.org/trending/daily.json"

    const response = await fetch(url)
    const data = await response.json()

    featuredBook = data.works.map(book => {
        let title = book.title
        let author;
        if (book.author_name) {
            author = book.author_name.join(" ,")
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
            title: title,
            author: author,
            date: date,
            cover: cover,
        }

        return trendingBook
    });

return featuredBook
}

function displayFeatured(featuredBook) {
    featuredBooksContainer.innerHTML = ""

    for(let book of featuredBook){

        const card = document.createElement('div')
        card.className = "readlist"
    
        card.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="info">
                <h3>${book.title}</h3>
                <h4>${book.author}</h4>
                <h4>${book.date}</h4>
            </div>
            `
            featuredBooksContainer.appendChild(card)
    }

}
