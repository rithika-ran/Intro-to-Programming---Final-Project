




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


        //     card.innerHTML = `<img src="${imageUrl}" alt="${book_card.title}">
        //    <div class="info">
        //        <h3>${book_card.title}</h3>
        //        <button class= "add-btn">${addIcon}</button>
        //    </div>`;

        card.innerHTML = `
         <div class="readlist-card">
             <img src="${imageUrl}" alt="${book_card.title}">
             <div class="info"> 
                 <h3 class="ps-1 title-text fw-bold">${book_card.title}</h3>
                  <h5 class="lead ps-1">By: ${book_card.author_name ? book_card.author_name.join(" , ") : "Unknown"}</h5>
                  

                  <h5 class="ps-1 lead">${book_card.first_publish_year || "N/A"}</h5>
                 
                 <button class="add-btn">${addIcon}</button>
            

             </div>
         </div> 
             `



        resultsContainer.appendChild(card)


        const addBtn = card.querySelector(".add-btn")
        addBtn.addEventListener("click", function () {
            book_card.cover = imageUrl
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

        //    card.innerHTML = `
        // <img src="${imageUrl}" alt="${book_card.title}">
        // <div> 
        //     <h3 class="ps-1 title-text fw-bold">${book_card.title}</h3>
        //     <h5 class="lead ps-1">By: ${book.author}</h5>
        //     <div class="d-flex justify-content-between align-item-center">
        //     <h5 class="ps-1 lead">${book_card.first_publish_year || "N/A"}</h5>
        //      <button class= "remove-btn">✔</button>

        // </div>
        // `



        readListContainer.appendChild(card)
        const removeBtn = card.querySelector(".remove-btn")
        removeBtn.addEventListener("click", function () {
            toggleReadlist(book_card)
        })
    }
}


function toggleReadlist(book_card) {
    const bookId = book_card.key || book_card.id
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
        let imageUrl = book_card.cover || "https://placehold.co/300x200?text=No+Image";
        if (book_card.cover_i) {
            imageUrl = "https://covers.openlibrary.org/b/id/" + book_card.cover_i + "-M.jpg";
        }
        console.log("looking for:", book_card.key, book_card.id)
        console.log("readList ids:", readList.map(b => b.id))
        readList.push({
            id: book_card.key,
            title: book_card.title,
            image: imageUrl,
        });
    }
    saveReadlist();
    renderReadList();
    if (allResults.docs) {
        displayBooks(allResults)
    }

    if (lastFeatured.length > 0) {
        const featuredBooksContainer = document.querySelector('#results')
        if (featuredBooksContainer && !featuredBooksContainer.classList.contains('hidden')) {
            displayFeatured(lastFeatured)
        }
    }
    if (genreReadlist.length > 0) {
        if (document.querySelector("#romance")) { displayRomance(genreReadlist) }
        if (document.querySelector("#fantasy")) {
            displayFantasy(genreReadlist)
        }
        if (document.querySelector("#historical")) {
            displayHistorical(genreReadlist)
        }
        if (document.querySelector("#mystery")) {
            displayMystery(genreReadlist)
        }
        if (document.querySelector("#scifi")) {
            displayScifi(genreReadlist)
        }

        if (document.querySelector("#thriller")) {
            displayThriller(genreReadlist)

        }




    }


}
