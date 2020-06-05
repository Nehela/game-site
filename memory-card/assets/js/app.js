const cards = document.querySelectorAll(".memorycard");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function  flipCard(){
 if (lockBoard) return;
 if (this === firstCard) return;
 this.classList.toggle("flip");

 if (!hasFlippedCard){
     //first click
     hasFlippedCard = true;
     firstCard = this;

     return;
 } 
     //second click
   hasFlippedCard = false;
   secondCard = this;
   
   checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch? disableCards() : unflipCards();
 }

function disableCards(){
    firstCard.removeEventListener("click", flipCard);
       secondCard.removeEventListener("click", flipCard);

       resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
     },700);
     lockBoard = false;
    }

function resetBoard(){
    [hasFlippedCard,lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*16);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener("click",flipCard));

function resetGame(){
        location.reload();
}