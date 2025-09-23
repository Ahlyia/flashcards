const DEFAULT_CARDS = "https://raw.githubusercontent.com/Ahlyia/flashcards/refs/heads/main/default_cards.json"

var cards = {}

var currentSelection = "President";
var currentAnswer = "Honorable Donald Trump";

var canClick = false;

var selectionLabel;
var options = [];

function update(){

}

function pickRandom(){
    let keys = Object.keys(cards);
    let values = Object.values(cards);

    console.log(data);

    let random = Math.random();
    random = Math.round(random * keys.length-1);
    console.log(random);
        
    currentSelection = keys[random];
    currentAnswer = values[random];

    console.log(keys[random]);
    console.log(values[random]);


    let randomOption1 = values[Math.random() * values.length-1];
    let randomOption2 = values[Math.round(Math.random * keys.length-1)];

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

}

function onReady(){
   getCards();

   var buttons = [
    document.getElementById("choice1"),
    document.getElementById("choice2"),
    document.getElementById("choice3"),
    document.getElementById("choice4")
   ]

   for(let i=1;i<buttons.length-1;i++){ // for every button
    let button = buttons[i];

    button.addEventListener(onclick,() => {
        buttonClicked(i,button);
    });
   }
}

addEventListener("DOMContentLoaded",() => {
    onReady();
});