const gameContainer = document.getElementById("game");

let card1 = null;
let card2 = null;
let card1Color = "";
let card2Color = "";
let card1Div = "";
let card2Div = "";
let countCards = 0;
let noClickEvent = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
    if(noClickEvent) return;
    if (e.target.classList.contains("flipped")) return;
  
  // card1 is empty, set up card1
  if (card1===null) {
    //get Div, give background color to user to see, add class with 'flipped', get card1 info;
    card1Div = e.target;
    card1Color = e.target.className;
    e.target.style.background = card1Color;
    e.target.classList.add("flipped");
    card1 = e.target.classList;
  };
 
  if (card1!=null){
    if (!e.target.classList.contains('flipped')){
      // IF do not click on same card, set up card2
        card2Div = e.target;
        card2Color = e.target.className;
        e.target.style.background = card2Color;
        e.target.classList.add("flipped");
        card2 = e.target.classList;
        noClickEvent = true;
      if (card1Color === card2Color){
        //same color, stay on, count card, null card 1 and 2 again, remove EventListener for both cards.
        console.log("card1 and card2 when they are the same", card1, card2);
        card1Div.removeEventListener("click", handleCardClick);
        card2Div.removeEventListener("click", handleCardClick);
        countCards += 2;
        card1 = null;
        card2 = null;
        card1Div = "";
        card2Div = "";
        card1Color = "";
        card2Color = "";
        noClickEvent = false;
      } else {
        // clear clear background color, remove flipped from both divs, clear card1 and card2 info.,
        setTimeout(function(){
            card1Div.style.background = "none";
            card2Div.style.background = "none";
            card1Div.classList.remove("flipped");
            card2Div.classList.remove("flipped");
            card1 = null;
            card2 = null;
            card1Div = "";
            card2Div = "";
            card1Color = "";
            card2Color = "";
            noClickEvent = false;
        },1000);
    }
  }
  if (countCards === 10){
    alert("You Won!");
    return;
  }
};
}
// when the DOM loads
createDivsForColors(shuffledColors);
