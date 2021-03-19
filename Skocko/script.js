const $ = e => document.querySelector(e);
const $$ = d => document.querySelectorAll(d);

const leftColumn = $$('.column-left');
const rightColumn = $$('.column-right');                                           
const images = $$('.symbol');
const finalCombination = $$('.column-final');
const trash = $('.trash');
const confirm = $('.confirm');

const randomCombination = new Array(4);
const userCombination = new Array(4);
const copyOfRandom = new Array(4);

var indexLeft = 0;
var indexRight = 0;
var indexBefore = 0;
var ifEnd = false;
var ifWon = false;

// Play audio
function playAudio (audio) {
    var audio = $(`.${audio}`);
    audio.volume = .3;
    audio.play();
}
// Reset Columns
const resetColumns = function (column, index) {
    column[index].style.backgroundImage = "none";
    column[index].style.opacity = .2;    
    column[index].style.backgroundColor = "rgb(20, 19, 19)";
}
// New game
const newGame = function () {
    playAudio("buttonSound");

    indexLeft = 0;
    indexRight = 0;
    indexBefore = 0;
    ifEnd = false;
    ifWon = false;

    for (i = 0; i < leftColumn.length; i++) {
        resetColumns(leftColumn, i);
        resetColumns(rightColumn, i);
    }
    for (i = 0; i < finalCombination.length; i++) {
        resetColumns(finalCombination, i);
    }
    generate();
}
// Adding symbols
const addItem = function (column, symbol, index) {
    if (indexLeft < indexBefore + 4) {
        column[index].style.opacity = 1;
        column[index].style.backgroundRepeat = "norepeat";
        column[index].style.backgroundSize = "cover";
        column[index].style.backgroundColor = "rgba(171, 183, 183, 1)";
        column[index].style.backgroundImage = "url('images/" + symbol + ".png')";
    }
}
// Deleting symbols
const deleteItem = function () {
    playAudio("buttonSound");

    if (ifEnd == true) {
        alert("Igra je zavresna zapocnite novu igru!");
        return;
    }
    if (indexLeft > indexBefore) {
        resetColumns(leftColumn, indexLeft - 1)
        indexLeft--;
    } else {
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
const generate = function () {
    for (i = 0; i < randomCombination.length; i++) {
        let randomNumber = Math.floor(Math.random() * 6);
        randomCombination[i] = randomNumber;
        copyOfRandom[i] = randomNumber;
    }
}
// Filling array for final combination
const fillFinalCombination = function () {
    for (let i = 0; i < finalCombination.length; i++) {
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
// Comparing random generated and user combination
const calculate = function () {
    playAudio("buttonSound");
    if (ifEnd == true) {
        alert("Igra je zavresna zapocnite novu igru!");
        return;
    }
    if (indexLeft < indexBefore + 4) {
        alert("Popunite sva polja!");
        return;
    }
    // RED
    for (let i = 0; i < userCombination.length; i++) {
        for (let j = 0; j < copyOfRandom.length; j++) {
            if (i == j && userCombination[i] == randomCombination[j]) {
                copyOfRandom[j] = -1;
                userCombination[i] = -1;
                break;
            }
        }
    }
    // YELLOW
    for (let i = 0; i < userCombination.length; i++) {
        for (let j = 0; j < copyOfRandom.length; j++) {
            if (userCombination[i] != -1 && copyOfRandom[j] != -1 && userCombination[i] != -2 && copyOfRandom[j] != -2) {
                if (userCombination[i] == randomCombination[j]) {
                    copyOfRandom[j] = -2;
                    userCombination[i] = -2;
                    break;
                }
            }
        }
    }
    paintRightRow();
    if (indexLeft == leftColumn.length) {
        if(ifWon == false){
            playAudio("loseSound");
        }
        ifEnd = true;
        fillFinalCombination();
    }
}
// Reset arrays
const resetArray = function (Array) {
    for (let i = 0; i < Array.length; i++) {
        copyOfRandom[i] = Array[i];
    }
}
// Helping method for paintRightRow()
const paint = function (color, index) {
    rightColumn[index].style.backgroundColor = color;
    rightColumn[index].style.opacity = 1;
    rightColumn[index].style.border = "none";
}
// Paint right row
const paintRightRow = function () {
    let coloredRed = 0;
    let colored = indexRight;

    // If equal -1 paint red
    for (let i = 0; i < copyOfRandom.length; i++) {
        if (copyOfRandom[i] == -1) {
            paint("red", colored);
            coloredRed++;
            colored++;
        }
    }
    // If equal -2 paint yellow
    for (let i = 0; i < copyOfRandom.length; i++) {
        if (copyOfRandom[i] == -2) {
            paint("yellow", colored);
            colored++;
        }
    }
    resetArray(randomCombination);

    // Move to next row and remember row before
    indexBefore += 4;
    indexRight += (4 - colored) + colored;

    if (coloredRed == 4) {
        fillFinalCombination();
        playAudio("correctSound");
        ifEnd = true;
        ifWon = true;
        return;
    }
}
// Adding events to all images
images.forEach(element => {
    element.addEventListener('click', () => {
        if (ifEnd == true) {
            alert("Igra je zavresna zapocnite novu igru!");
            return;
        }
        if (indexLeft < indexBefore + 4) {
            switch (parseInt(element.getAttribute("value"))) {
                case 0:
                    addItem(leftColumn, "smiley", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio("buttonSound");
                    break;
                case 1:
                    addItem(leftColumn, "heart", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio("buttonSound");
                    break;
                case 2:
                    addItem(leftColumn, "diamond", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio("buttonSound");
                    break;
                case 3:
                    addItem(leftColumn, "clubs", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio("buttonSound");
                    break;
                case 4:
                    addItem(leftColumn, "spade", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio("buttonSound");
                    break;
                case 5:
                    addItem(leftColumn, "star", indexLeft);
                    indexLeft++;
                    userCombination[indexLeft - 1 - indexBefore] = parseInt(element.getAttribute("value"));
                    playAudio("buttonSound");
                    break;
            }
        }
    })
});