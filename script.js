const DEFAULT_CARDS = "https://raw.githubusercontent.com/Ahlyia/flashcards/refs/heads/main/default_cards.json"

var cards = {}

var currentSelection = "President";
var currentAnswer = "Honorable Donald Trump";

var canClick = false;

var selectionLabel;
var bodyElement;
var options = [];

var buttons = [];

var correctChoice = 0;

function update(){
    if (selectionLabel == null) return;

    selectionLabel.textContent = currentSelection;

    let random = Math.random();
    random = Math.round(random * 3) // all the possible buttons

    for(let i=0;i<buttons.length;i++){
        let button = buttons[i];
        if(i == random){
            button.textContent = currentAnswer;
            correctChoice = i;
        } else {
            button.textContent = chooseFalseAnswer();
        }
    }
}

function chooseFalseAnswer(){
    let ref = Object.assign({},cards); // create a copy, not a reference.
    delete ref[currentSelection];

    let random = Math.random();
    random *= Object.keys(ref).length-1; // makes it between all the cards.
    random = Math.round(random);

    return Object.values(ref)[random];
}

function pickRandom(){
    let keys = Object.keys(cards);
    let values = Object.values(cards);

    console.log(cards);

    let random = Math.random();
    random = Math.round(random * (keys.length-1));
    console.log(random);
        
    currentSelection = keys[random];
    currentAnswer = values[random];

    console.log(keys[random]);
    console.log(values[random]);

    update();
}

function getCards(){
 fetch(DEFAULT_CARDS)
    .then(response => {
        if(!response.ok){ // could not get
            throw new Error("Network response was not OK; "+response.statusText);
        }
        return response.json();
    })
    .then(data => {
        cards = data;

        pickRandom();
        
        canClick = true;
    })
    .catch(error => {
        console.error("Error fetching file: ",error);
    });
}

function buttonClicked(choice,button){
    console.log("clicked!")
    console.log(choice,button);

    if (choice == correctChoice){
        bodyElement.style.backgroundColor = "lime";
    } else {
        bodyElement.style.backgroundColor = "red";
    }
    setTimeout(() => {
        window.location.reload();
    },1000);
}

function onReady(){
   getCards();

   buttons = [
    document.getElementById("choice1"),
    document.getElementById("choice2"),
    document.getElementById("choice3"),
    document.getElementById("choice4")
   ]

   for(let i=0;i<buttons.length;i++){ // for every button
    let button = buttons[i];

    button.addEventListener("click",() => {
        buttonClicked(i,button);
    });
   }
}

addEventListener("DOMContentLoaded",() => {
    selectionLabel = document.getElementById("rankLabel");
    bodyElement = document.getElementById("body");
    onReady();
});