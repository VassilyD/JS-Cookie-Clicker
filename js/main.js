var btClic = document.getElementById("clicker");
var btMultiply = document.getElementById("multiply");
var btDisplay = document.getElementById("display");
var btAutoClic = document.getElementById("autoclic");
var btBonus = document.getElementById("bonus");
var btCritic = document.getElementById("critical");
var myAutoClic = 0;
var myBonus = 0;
var bonusTimer = 0;
var data = {score:0, multiplier:1, mCost:50,
 aTimer:1000, aCost:500, aLvl:1,
  bTimer:30, bMult:1, bCost:5000, bLvl:0,
   cHit:0};
var autoCheck = setInterval(checkInterval, 100);
var myPos = {};

//myButton.onclick = scoreInc(score);
btClic.addEventListener("click", function(){
	scoreInc();
	data.cHit = 0;
});
btMultiply.addEventListener("click", augmenterMultiplicateur);
btAutoClic.addEventListener("click", activateAutoClic);
btBonus.addEventListener("click", activateBonus);
btCritic.addEventListener("click", function(){
	scoreInc(data.cHit, 3 * (1 + data.cHit / 10));
	data.cHit++;
});
myPos['clicker'] = [btClic.offsetLeft + btClic.offsetWidth/2, btClic.offsetTop + btClic.offsetHeight/2];
myPos['critical'] = [btCritic.offsetLeft + btCritic.offsetWidth/2, btCritic.offsetTop + btCritic.offsetHeight/2];
myMove();