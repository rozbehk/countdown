function livesearch() {
    // Declare variables
    var input, filter, cardsEl, titleEl;
    input = document.getElementById('search');
    filter = input.value.toLowerCase();
    filter = filter.split(' ');
    cardsEl = document.getElementsByClassName("cards");
  
    titleEl = document.getElementsByClassName('title');
   // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < titleEl.length; i++) {
      var sw = 1;
      for (let j = 0; j < filter.length; j++) {
        if (titleEl[i].innerHTML.toLowerCase().indexOf(filter[j]) == -1) {
          sw = 0;
          break;
        }
      }
      if (sw) {
        cardsEl[i].style.display = "";
      } else {
        cardsEl[i].style.display = "none";
      }
    }
  }