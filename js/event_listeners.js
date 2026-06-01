// let featuredBooksContainer = document.querySelector('#results')




input.addEventListener("keypress", function(e){
   if(e.key === "Enter"){
        // featuredBooksContainer.classList.add('hidden')
       fetchBook();
   }
});


loadReadlist()