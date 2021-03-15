const $ = e => document.querySelector(e);
const $$ = d => document.querySelectorAll(d);

const leftColumn = $$('.column-left');
const rightColumn = $$('.column-right');
const images = $$('.symbol');
const trash = $('.trash');
const confirm = $('.confirm');
const randomCombination = new Array(4);
const resultCombination = new Array(4);
const userCombination = new Array(4);

// Position to add symbol
var indexLeft = 0;
var indexRight = 0;
var indexBefore = 0;
var numbersGotPairJ = new Array(4);
var numbersGotPairI = new Array(4);

// Adding symbols
const addItem = function(symbol){
    if(indexLeft < indexBefore+4){
        leftColumn[indexLeft].style.opacity = 1;
        leftColumn[indexLeft].style.backgroundRepeat = "norepeat";
        leftColumn[indexLeft].style.backgroundSize = "cover";
        leftColumn[indexLeft].style.backgroundColor = "rgba(171, 183, 183, 1)";
        leftColumn[indexLeft].style.border = "none";    
        leftColumn[indexLeft].style.backgroundImage = "url('images/" + symbol +  ".png')";
        indexLeft++;   
    }
}

// Deleting symbols
const deleteItem = function(){
    if(indexLeft > indexBefore){
        leftColumn[indexLeft-1].style.backgroundImage = "none";
        leftColumn[indexLeft-1].style.opacity = .3;
        leftColumn[indexLeft-1].style.backgroundColor = "rgb(20, 19, 19)";
        indexLeft--;
    }else{
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
const generateCombination = function(){
    for (i = 0; i < randomCombination.length; i++) {
        let randomNumber = Math.floor(Math.random() * 6);
        randomCombination[i] = randomNumber;
      }
      console.log(randomCombination);
}

// Comparing random generating and user combination
const comparingCombinations = function(){

    if(indexLeft < indexBefore+4){
        alert("Popunite sva polja!");
        return;
    }
    console.log(userCombination);
    for (i = 0; i < userCombination.length; i++) {
        for (j = 0; j < randomCombination.length; j++) {
            if(userCombination[i] === randomCombination[j]){
                   if(i === j && numbersGotPairJ[j] != true && numbersGotPairI[i] !=true){
                        numbersGotPairJ[j] = true;
                        numbersGotPairI[i] = true;
                        break;
                   }else if(numbersGotPairJ[j] == null && numbersGotPairI[i] == null){
                        numbersGotPairJ[j] = false;
                        break;
                   }           
            }
          }
      }
      paintRightRow();
}
const clearArray = function(Array){
    for (i = 0; i < Array.length; i++) {
        Array[i] = null;
      }
}
const paint = function(color,index){
            rightColumn[index].style.backgroundColor = color;
            rightColumn[index].style.opacity = 1;
            rightColumn[index].style.border = "none";
}
const paintRightRow = function (){
    let colored = indexRight;
    for (i = 0; i < resultCombination.length; i++) {
        if(numbersGotPairJ[i] === true){
            paint("red",colored);
            colored++;
        }
      }
      for (i = 0; i < resultCombination.length; i++) {
        if(numbersGotPairJ[i] === false){
            paint("yellow",colored);
            colored++;
        }
      }
      clearArray(numbersGotPairJ);
      clearArray(numbersGotPairI);
      indexBefore+= 4;
      indexRight+= (4-colored)+colored;
}

images.forEach(element => {
    element.addEventListener('click', ()=>{
        switch(parseInt(element.getAttribute("value"))){
            case 0:
                addItem("smiley");
                userCombination[indexLeft-1-indexBefore] = parseInt(element.getAttribute("value"));
                break;
            case 1:
                addItem("heart");
                userCombination[indexLeft-1-indexBefore] = parseInt(element.getAttribute("value"));
                break;
            case 2:
                addItem("diamond");
                userCombination[indexLeft-1-indexBefore] = parseInt(element.getAttribute("value"));
                break;
            case 3:
                addItem("clubs");
                userCombination[indexLeft-1-indexBefore] = parseInt(element.getAttribute("value"));
                break;
            case 4:
                addItem("spade");
                userCombination[indexLeft-1-indexBefore] = parseInt(element.getAttribute("value"));
                break;
            case 5:
                addItem("star");
                userCombination[indexLeft-1-indexBefore] = parseInt(element.getAttribute("value"));
                break;
        }
    })
});
