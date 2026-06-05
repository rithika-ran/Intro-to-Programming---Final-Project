//Selectors
const input = document.querySelector("#search-input");
const resultsContainer = document.querySelector("#results");
const readListContainer = document.querySelector("#readlist-container")


let readList =[]
let allResults = []
let lastFeatured = []
let genreReadlist = []


function loadReadlist(){
   const saved = localStorage.getItem("bookReadlist")
   if(saved!== null){
       readList = JSON.parse(saved)
   }
   renderReadList()
}




function saveReadlist(){
   localStorage.setItem("bookReadlist", JSON.stringify(readList))
}
