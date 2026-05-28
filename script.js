let featuredBooksContainer = document.querySelector('#featured-books-container')

window.addEventListener('DOMContentLoaded', (e)=> {

    
    
})

function fetchFeatured(){
    const url = "https://openlibrary.org/trending/daily.json"

    fetch(url)
    const response = await fetch(url)
    const data = await response.json()
    
    


}