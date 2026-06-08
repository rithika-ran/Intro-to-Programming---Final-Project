


if (input) {
   input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
         fetchBook();
         if (featuredBooksContainer) {
            featuredBooksContainer.classList.add('hidden')
         }


      }
   });
}


loadReadlist()