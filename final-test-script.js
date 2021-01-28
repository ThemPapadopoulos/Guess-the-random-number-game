const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

let previousGuesses = [];
let theGuess;

window.onload = newRandom();
console.log(theGuess);
newGuess.focus();

root.addEventListener("keypress", checkKey);
root.addEventListener("keypress", selection); // => selection() : a function to concat the selected numbers. (line 123)
checkButton.addEventListener("click", checkGuess);
checkButton.addEventListener("click", selection);
restartButton.addEventListener("click", restart);

// randomizer 1-100
function newRandom() {
  theGuess = Math.floor(Math.random() * 100) + 1;
}

// keypress check
function checkKey(e) {
  if (e.code === "Enter") {
    console.log(e.code);
    checkGuess();
  }
}

function checkGuess() {
  processGuess(); //! οι λειτουργιες ειναι ολες ενσωματωμενες στην function
  lowHigh.style.color = "gray";
}

function processGuess(newValue) {
  //value inserted
  var newValue = newGuess.value;

  // if not a number
  if (isNaN(newValue)) {
    message.innerHTML = "Δώσε αριθμό";
    newGuess.value = "";
  }
  // inside the 1-100 boundaries
  if (newValue < 101 && newValue > 0) {
    previousGuesses.push(newValue);
    newGuess.value = "";
  }

  //lower
  if (newValue < theGuess) {
    message.innerHTML = "Λάθος,είσαι πιο χαμηλά";
  }

  //higher
  if (newValue > theGuess) {
    message.innerHTML = "Λάθος, το ξεπέρασες";
  }

  // out of boundaries
  if (newValue > 100) {
    message.innerHTML = "Λάθος, το ξεπέρασες";
    newGuess.value = "";
    previousGuesses.push(newValue);
  }

  // correct choice
  if (newValue == theGuess) {
    message.innerHTML = "Μπράβο το βρήκες!";

    //change to green
    message.style.backgroundColor = "rgb(0, 128, 32)";
    newGuess.value = "";

    //remove event listeners & button on win.
    checkButton.style.display = "none";
    root.removeEventListener("keypress", checkKey);
    checkButton.removeEventListener("click", checkGuess);
  }

  // limit of 10 numbers
  if (previousGuesses.length == 10) {
    message.innerHTML = "Τέλος παιχνιδιού, έχασες!";
    lowHigh.innerHTML = "";
    previousGuesses = [];
    lowHigh.style.display = "none";
    //remove event listeners & button on 10th try.
    checkButton.style.display = "none";
    root.removeEventListener("keypress", checkKey);
    checkButton.removeEventListener("click", checkGuess);
  }
}

//! a function to concat all the selected numbers
function selection() {
  lowHigh.innerHTML = "προηγουμενες επιλογες:";
  previousGuesses.forEach((element) => {
    lowHigh.innerHTML += " " + element;
  });
}

//the restart function
function restart() {
  newGuess.value = "";
  message.innerHTML = "";
  lowHigh.innerHTML = "";
  previousGuesses = [];
  checkButton.style.display = "inline";
  //console.log("reset");

  // listeners - ON
  root.addEventListener("keypress", checkKey);
  checkButton.addEventListener("click", checkGuess);
  //refresh page
  location.reload();
}
