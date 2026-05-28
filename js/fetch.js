function fetchBook() {
    const book = input.value.trim()
    if (book == "") {
        resultsContainer.innerHTML = '<div class="problem">Please enter the book!!!!</div>'
        return;
    }

    resultsContainer.innerHTML = '<div class="problem"> Loading...</div>'

    const url = "https://openlibrary.org/search.json?q=" + book

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            allResults = data
            displayBooks(data)
        })


}

function displayBooks(data) {
    resultsContainer.innerHTML = ""

    if (data.length == 0) {
        resultsContainer.innerHTML = '<div class="problem"> No results! Try typing it again.<div>'
        return;
    }

    for (let i = 0; i < data.length; i++) {
        // placeholder(just used from tvwatchlist code)
        let imageUrl = "https://via.placeholder.com/300x200?text=No+Image";

        if (book.cover_i) {
            imageUrl = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
        }

    }
}

