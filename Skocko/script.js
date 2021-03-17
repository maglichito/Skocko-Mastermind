const $ = e => document.querySelector(e);
const $$ = d => document.querySelectorAll(d);


const leftColumn = $$('.column-left');
const rightColumn = $$('.column-right');
const images = $$('.symbol');
const finalCombination = $$('.column-final');
const trash = $('.trash');
const confirm = $('.confirm');


const randomCombination = new Array(4);
const resultCombination = new Array(4);
const userCombination = new Array(4);


var indexLeft = 0;
var indexRight = 0;
var indexBefore = 0;
var numbersGotPairJ = new Array(4);
var numbersGotPairI = new Array(4);
var ifEnd = false;

// Play audio
const playAudio = function(){
        var audio = $(".audio");
        audio.volume = .3;
        audio.play();
}
// Reset Columns
const resetColumns = function (column, index) {
    column[index].style.backgroundImage = "none";
    column[index].style.opacity = .2;
    column[index].style.border = "1px solid white";
    column[index].style.backgroundColor = "rgb(20, 19, 19)";
}

// New game
const newGame = function () {
    indexLeft = 0;
    indexRight = 0;
    indexBefore = 0;
    ifEnd = false;
    clearArray(numbersGotPairJ);
    clearArray(numbersGotPairI);
    for (i = 0; i < leftColumn.length; i++) {
        resetColumns(leftColumn, i);
        resetColumns(rightColumn, i);
    }
    for (i = 0; i < finalCombination.length; i++) {
        resetColumns(finalCombination, i);
    }
    generateCombination();
}

// Adding symbols
const addItem = function (column, symbol, index) {
    if (indexLeft < indexBefore + 4) {
        column[index].style.opacity = 1;
        column[index].style.backgroundRepeat = "norepeat";
        column[index].style.backgroundSize = "cover";
        column[index].style.backgroundColor = "rgba(171, 183, 183, 1)";
        column[index].style.border = "none";
        column[index].style.backgroundImage = "url('images/" + symbol + ".png')";
    }
}

// Deleting symbols
const deleteItem = function () {
    if(ifEnd === true){
        alert("Igra je zavresna zapocnite novu igru!");
        return;
    }
    if (indexLeft > indexBefore) {
        resetColumns(leftColumn, indexLeft - 1)
        indexLeft--;
        playAudio();
    } else {
        console.log("All elements are already deleted.");
        alert("Obrisao si vec sve elemente!");
    }
}
// Generating random combination for user
// Every number represents symbol
// 0 - Smiley
// 1 - Heart
// 2 - Diamond
// 3 - Club
// 4 - Spade
// 5 - Star
const generateCombination = function () {
    for (i = 0; i < randomCombination.length; i++) {
        let randomNumber = Math.floor(Math.random() * 6);
        randomCombination[i] = randomNumber;
    }
    console.log(randomCombination);
}

// Filling array for final combination
const fillFinalCombination = function () {
    for (i = 0; i < finalCombination.length; i++) {
        switch (randomCombination[i]) {
            case 0:
                addItem(finalCombination, "smiley", i);
                break;
            case 1:
                addItem(finalCombination, "heart", i);
                break;
            case 2:
                addItem(finalCombination, "diamond", i);
                break;
            case 3:
                addItem(finalCombination, "clubs", i);
                break;
            case 4:
                addItem(finalCombination, "spade", i);
                break;
            case 5:
                addItem(finalCombination, "star", i);
                break;
        }
    }
}
// Comparing random generating and user combination
const comparingCombinations = function () {
    if(ifEnd === true){
        alert("Igra je zavresna zapocnite novu igru!");
        return;
    }
    if (indexLeft < indexBefore + 4) {
        alert("Popunite sva polja!");
        return;
    }
    console.log(userCombination);
    for (i = 0; i < userCombination.length; i++) {
        for (j = 0; j < randomCombination.length; j++) {
            if (userCombination[i] === randomCombination[j]) {
                if (i === j && numbersGotPairJ[j] != true && numbersGotPairI[i] != true) {
                    numbersGotPairJ[j] = true;
                    numbersGotPairI[i] = true;
                    break;
                } else if (numbersGotPairJ[j] == null && numbersGotPairI[i] == null) {
                    numbersGotPairJ[j] = false;
                    break;
                }
            }
        }
    }
    paintRightRow();
    if (indexLeft == leftColumn.length) {
        ifEnd = true;
        fillFinalCombination();
    }
}
// Used to clear array
const clearArray = function (Array) {
    for (i = 0; i < Array.length; i++) {
        Array[i] = null;
    }
}

// Paint right side columns
const paint = function (color, index) {
    rightColumn[index].style.backgroundColor = color;
    rightColumn[index].style.opacity = 1;
    rightColumn[index].style.border = "none";
}

// Paint right row
const paintRightRow = function () {
    let coloredRed = 0;
    let colored = indexRight;
    for (i = 0; i < resultCombination.length; i++) {
        if (numbersGotPairJ[i] === true) {
            paint("red", colored);
            coloredRed++;
            colored++;
        }
    }
    for (i = 0; i < resultCombination.length; i++) {
        if (numbersGotPairJ[i] === false) {
            paint("yellow", colored);
            colored++;
        }
    }
    clearArray(numbersGotPairJ);
    clearArray(numbersGotPairI);
    indexBefore += 4;
    indexRight += (4 - colored) + colored;
    if (coloredRed === 4) {
        fillFinalCombination();
        ifEnd = true;
        return;
    }
}
// Adding events to all images
images.forEach(element => {
    element.addEventListener('click', () => {
        if(ifEnd === true){
            alert("Igra je zavresna zapocnite novu igru!");
            return;
        }
        if (indexLeft < indexBefore+4) {
            switch (parseInt(element.getAttribute("value"))) {
                case 0:
                    addItem(leftColumn, "smiley", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio();
                    break;
                case 1:
                    addItem(leftColumn, "heart", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio();
                    break;
                case 2:
                    addItem(leftColumn, "diamond", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio();
                    break;
                case 3:
                    addItem(leftColumn, "clubs", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio();
                    break;
                case 4:
                    addItem(leftColumn, "spade", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio();
                    break;
                case 5:
                    addItem(leftColumn, "star", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio();
                    break;
            }
        }
    })
});