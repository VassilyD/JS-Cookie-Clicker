var btClic = document.getElementById("clicker");
var btMultiply = document.getElementById("multiply");
var btDisplay = document.getElementById("display");
var btAutoClic = document.getElementById("autoclic");
var btBonus = document.getElementById("bonus");
var myAutoClic = 0;
var myBonus = 0;
var bonusTimer = 0;
var data = {score:10000, multiplier:1, mCost:50, mLvl:1, aTimer:1000, aCost:500, aLvl:1, bonus:200, bTimer:30, bClic:3, bCost:5000, bLvl:1};
var autoCheck = setInterval(checkInterval, 100);

//myButton.onclick = scoreInc(score);
btClic.addEventListener("click", scoreInc);
btMultiply.addEventListener("click", augmenterMultiplicateur);
btAutoClic.addEventListener("click", activateAutoClic);
btBonus.addEventListener("click", activateBonus);
