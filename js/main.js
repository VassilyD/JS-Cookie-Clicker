var myButton = document.getElementById("clicker");
var multiply = document.getElementById("multiply");
var myDisplay = document.getElementById("display");
var data = {score:50, multiplier:1, mCost:50};

if (typeof(myDisplay) == 'object') {

	myDisplay.innerHTML = 'data.score';
}
//myButton.onclick = scoreInc(score);
myButton.addEventListener("click", function(){
	scoreInc(data, myDisplay);
});
multiply.addEventListener("click", function(){
	augmenterMultiplicateur(data, myDisplay, multiply);
});

