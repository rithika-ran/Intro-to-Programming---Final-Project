let featuredBooksContainer = document.querySelector('#results')



if(input){
input.addEventListener("keypress", function (e) {
   if (e.key === "Enter") {
      fetchBook();
      featuredBooksContainer.classList.add('hidden')


   }
});
}


loadReadlist()