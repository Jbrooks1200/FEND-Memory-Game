let openCards = [];
let moves = 0; //Current number of moves the user has made.
let matches = 0; //Current number of matches the user has made.
let totalMatches = 8; //Total number of possible matches. Used to determine when the game is over.
let allowClick = true; //This helps prevent an accidental double-click while waiting for the no-match timer.
let deck = document.querySelector(".deck"); 
let timerOff = true;


function startGame() {
  shuffleDeck();
  console.log('shuffle') 
  resetStars();
  
  // reset moves 
  moves = 0; 
  moveCount.innerHTML = moves; 
  
  //reset timer 
  /*
  clearInterval(interval);
  var timer = document.querySelector(".timer"); timer.innerHTML = "0 mins 0 secs"; 
  stopTimer();
  seconds = 0;
  minutes = 0;
  timerOff = true; 
  */
  clearInterval(interval); second = 0; minute = 0; timer.innerHTML = "0 mins 0 secs" 
  setTimeout(function wait(){ startTimer(); },1000);


  
  // remove all existing classes from each card 
  let card = document.getElementsByClassName("card");
  cards = [...card] 
  
  //removeClasses();
  for (var i = 0; i < cards.length; i++){ 
    deck.innerHTML = ""; 
    [].forEach.call(cards, function(item) { 
      deck.appendChild(item);
      console.log('inside remove classes'); 
    }); 
    cards[i].classList.remove("show", "open", "match", "disabled"); }
    
    document.querySelector(".modal-overlay").style.display = "none";
    
    //clear array and matches
    openCards = [];
    matches = 0;

}; 

document.addEventListener('DOMContentLoaded', function(){
  startGame();
});
  
  
let second = 0, minute = 0; 
let timer = document.querySelector(".timer"); 
let interval; 
function startTimer() { 
  interval = setInterval(function() { 
    timer.innerHTML = minute + "mins " + second + "secs"; 
    second++; 
    if(second == 60){ minute++; second = 0; } 
    if(minute == 60){ hour++; minute = 0; } },1000); 
};
    
function stopTimer() {
  clearInterval(interval); //You have to pass in the VARIABLE assigned to the setInterval() method.
}

function moveCounter() { 
  moves++; 
  moveCount.innerHTML = moves; 
  //start timer on first move 
  if(moves == 1){ second = 0; minute = 0; hour = 0; startTimer(); } 
  //We would update the moveCounter function to start timer on first move.
}
  
    
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}

//Take shuffle function and applies it to the cards and manuipulates the DOM with the new cards
function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
  let shuffledCards = shuffle(cardsToShuffle);
  for(card of shuffledCards) {
    deck.appendChild(card);
  }    
};
    
    
    
const cardContainer = document.querySelector(".deck");
cardContainer.addEventListener("click", function(e){
  const cardClicked = e.target; 
  if (cardClicked.classList.contains("card")) {
    if (timerOff) {
      startTimer();
      timerOff = false;
    }
    if (!allowClick) return;
    cardClicked.classList.add("open");
    cardClicked.classList.add("show");
    cardClicked.classList.add("disable");
    addOpenedCard(cardClicked);
  }
});
    
    
function addOpenedCard(cardClicked) {
  openCards.push(cardClicked);
  console.log(openCards);
  let len = openCards.length;
  
  if (len == 2) { //See if the user has opened the second card
    starRating();
    moves++;  //Update the number of moves made 
    document.querySelector("#moveCount").innerHTML = moves; //Updates the screen with the number of moves
    //Must user the array index followed by the <li> index to get the class name
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
      matched();
    } else {
      //The timer has finished and the no-match cards have been reset so allow the user to click again.
      allowClick = false;
      notMatched();
    }
  }
};
    
function matched() {
  //Just a loop to update both indexes
  for (let i = 0; i <= 1; i++) {
    openCards[i].classList.add("match");
    openCards[i].classList.add("disable");
    openCards[i].classList.remove("show");
  }
  matches++;
  openCards = [];
  if (matches == totalMatches) {
    modalStats(); 
  }  
};
    
function notMatched() {
  openCards[0].classList.add("unmatched");
  openCards[1].classList.add("unmatched");
  openCards[0].classList.remove("disable");
  openCards[1].classList.remove("disable");
  
  //This is the timer that shows the no-match cards for 1/2 second to give visual feedback and then resets them back to their original state.
  setTimeout(function() {
    for (var i = 0; i <= 1; i++) {
      openCards[i].classList.remove("open");
      openCards[i].classList.remove("show");
      openCards[i].classList.remove("match");
      openCards[i].classList.remove("unmatched");
      allowClick = true;
    }
    openCards = [];  
  }, 500);  
};
    
//Removes stars based on the number of moves.
function starRating () {
  if (moves == 12 || moves == 20) {
    removeStar();
  }
};

function removeStar() {
  let starCount = document.querySelectorAll(".stars li");
  for(let star of starCount) {
    if(star.style.display !== "none") {
      star.style.display = "none";
      break;
    }
  }
};
    
function removeClasses() {
  let cards = document.querySelectorAll(".card i")
  for (var i = 0; i < cards.length; i++) {
    document.querySelector(".card").classList.remove("open", "show", "match", "disable")	
    console.log('inside remove classes')
  } 
}

function resetStars() {
  let starCount = document.querySelectorAll(".stars li");
  for(var star of starCount) {
    star.style.display = "inline-block";
  }
}

function modalStats() { 
  if (totalMatches = 8){
    stopTimer();
    finalTime = timer.innerHTML;
    
    // show congratulations modal
    document.querySelector("#modal").style.display = "block";
    document.querySelector(".modal-overlay").style.display = "block";
    
    // declare star rating variable
    let stars = document.querySelector(".stars").innerHTML;
    
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves; 
    document.getElementById("totalTime").innerHTML = finalTime;
    document.getElementById("stars").innerHTML = stars; 
    clearInterval(timer);
  };
}
 
document.querySelector(".restart").addEventListener("click", startGame);
document.querySelector("#anotherRound").addEventListener("click", startGame);

