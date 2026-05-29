input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        fetchBook();
    }
});


loadReadlist()




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


    if (!data.docs || data.docs.length === 0) {
        resultsContainer.innerHTML = '<div class="problem"> No results! Try typing it again.<div>'
        return;
    }


    for (let i = 0; i < data.docs.length; i++) {
        const book_card = data.docs[i];
        // placeholder(just used from tvwatchlist code)
        let imageUrl = "https://placehold.co/300x200?text=No+Image"


        if (book_card.cover_i) {
            imageUrl = "https://covers.openlibrary.org/b/id/" + book_card.cover_i + "-M.jpg";


        }


        let isSaved = false
        for (let j = 0; j < readList.length; j++) {
            if (readList[j].id === book_card.key) {
                isSaved = true
                break
            }
        }


        const addIcon = isSaved ? "✔" : "+"


        const card = document.createElement("div");
        card.className = "books-card";


        card.innerHTML = `<img src="${imageUrl}" alt="${book_card.title}">
       <div class="info">
           <h3>${book_card.title}</h3>
           <button class= "add-btn">${addIcon}</button>
       </div>`;


        resultsContainer.appendChild(card)


        const addBtn = card.querySelector(".add-btn")
        addBtn.addEventListener("click", function () {
            toggleReadlist(book_card)
        })












    }
}

function renderReadList() {
    const emptyState = document.querySelector('.empty-state')


    if (readList.length === 0) {
        if (emptyState) emptyState.style.display = 'block'
    } else {
        if (emptyState) emptyState.style.display = 'none'
    }
    if (!readListContainer) return


    readListContainer.innerHTML = ""
    for (let i = 0; i < readList.length; i++) {
        const book_card = readList[i]
        let imageUrl = book_card.image || "https://placehold.co/300x200?text=No+Image"


        const card = document.createElement("div")
        card.className = "readlist-card"


        card.innerHTML = `<img src="${imageUrl}" alt="${book_card.title}">
       <div class="info">
           <h3>${book_card.title}</h3>
           <button class= "remove-btn">✔</button>
       </div>`;


        readListContainer.appendChild(card)
        const removeBtn = card.querySelector(".remove-btn")
        removeBtn.addEventListener("click", function () {
            toggleReadlist(book_card)
        })
    }
}


function toggleReadlist(book_card) {
    let found = false
    for (let i = 0; i < readList.length; i++) {
        if (readList[i].id === book_card.key || readList[i].id === book_card.id) { // ← add book_card.id
            found = true
            break
        }
    }
    if (found) {
        const newReadlist = []
        for (let i = 0; i < readList.length; i++) {
            if (readList[i].id !== book_card.key && readList[i].id !== book_card.id) { // ← add book_card.id
                newReadlist.push(readList[i])
            }
        }
        readList = newReadlist
    } else {
        let imageUrl = "https://placehold.co/300x200?text=No+Image";
        if (book_card.cover_i) {
            imageUrl = "https://covers.openlibrary.org/b/id/" + book_card.cover_i + "-M.jpg";
        }
        readList.push({
            id: book_card.key,
            title: book_card.title,
            image: imageUrl,
        });
    }
    saveReadlist();
    renderReadList();
    displayBooks(allResults)
}
