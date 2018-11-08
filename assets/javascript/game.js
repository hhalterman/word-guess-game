/*
1) The will be an array of length strings I choose
2) A listener, to start the game and know the state of each key press event.
3) An input of what the user has entered. 
4) An array to contain what letters the user already has entered.
5) A counter to minus minus with each unsuccessful guess.

Functions 
1) One can include a check to see if the letter chosen is in the guess
2) Function to re-write the puzzle section
3) Function to pop up the letters used 
4) Function to minus the counter
5) Function to move all to lower case
6) Function to check if user input is a letter or space
*/

// To use two words: two different arrays, one to show on the screen and one that has the characters for guessing. Transpose one array into the other. they are mask characters like when you fill in the date and it automattically fills in the slashes or dashes//

// Global variables. 
let wordArray = [
    "middlebass", 
    "southbass", 
    "northbass",
    "kelleys", 
    "johnsons", 
    "pelee", 
    "rattlesnake", 
    "balast", 
    "buckeye", 
    "sugar", 
    "gibraltar", 
    "westsister", 
    "middle", 
    "hen",
    "middlesister",
    "eastsister",
    "mouse",
    "green",
    "turtle",
    "starve",
    "indian",
    "north harbour",
    "ryersons",
    "mohawk"];


const maxTries = 12;
let guessedLetters = [];
let currentWordIndex;
let guessingWord = [];
let remainingGuesses = 0;       // remaining guesses
let hasFinished = false;        //
let wins = 0;                   // Set Wins to Zero
let losses = 0;                 // Set Losses to Zero

// needed to restart game & get new word
function resetGame() {
    remainingGuesses = maxTries;
    document.getElementById("startMsg").innerText = "Press any letter to play!";
    currentWordIndex = Math.floor(Math.random() * (wordArray.length));
    guessedLetters = [];
    guessingWord = [];

    for (let i = 0; i < wordArray[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    updateGameContent();
};

// send the html the updates and status of where we are in the game
function updateGameContent() {

    document.getElementById("winCount").innerText = wins;
    document.getElementById("lossCount").innerText = losses;
    let guessingWordText = "";

    for (let i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    console.log("CurrentWordIndex:", currentWordIndex);
    console.log("island:", wordArray[currentWordIndex]);
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingChances").innerText = remainingGuesses;
    document.getElementById("usedLetters").innerText = guessedLetters;
};


// test if the existing letter is in the array.
function evaluateGuess(letter) {
    // Array to store strArray of letters in string
    let strArray = [];
    console.log("Current Word Index :", currentWordIndex);

    // Loop through word finding all uses of guessed letter, store value in an array.
    for (let i = 0; i < wordArray[currentWordIndex].length; i++) {
        if (wordArray[currentWordIndex][i] === letter) {
            strArray.push(i);
        }
    }

    if (strArray.length <= 0) {
        remainingGuesses--;
    }

    else {
        for (let i = 0; i < strArray.length; i++) {
            guessingWord[strArray[i]] = letter;
        }
    }
};


function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
        document.getElementById("startMsg").innerText = "Congratulations!";
    }
}; 


function checkLoss() {
    if (remainingGuesses <= 0) {
        hasFinished = true;
        losses++;
        document.getElementById("startMsg").innerText = "Sorry you lose!";
    }
}

// Makes a guess
function letterPress(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event listener
document.onkeyup = function (event) {
    // If game finished, hit anything and reset.
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } 
    // Check to make sure a-z was pressed using the  ASCII Table codes 65 is A 90 is Z
    else {
        if (event.keyCode >= 65 && event.keyCode <= 90) { 
            letterPress(event.key.toLowerCase());
            updateGameContent();
            checkWin();
            checkLoss();
        }
    }

};    
