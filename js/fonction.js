function nbToStr(nb) {
	var multiple = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
	var tmp = 1000;
	var i = 0;
	var tailStr = '';
	while(nb > tmp) {
		nb = Math.round(nb)/1000;
		i++;
	}
	while(i > 6) {
		i -= 6;
		tailStr += 'E';
	}
	return nb + ' ' + multiple[i] + tailStr;
}

function scoreInc(adder = 0, mult = 1) {
	data.score += ((data.multiplier + adder) * mult) * data.bMult;
	btDisplay.innerHTML = nbToStr(data.score);
}

function augmenterMultiplicateur() {
	if(data.score >= data.mCost) {
		data.score -= data.mCost;
		btDisplay.innerHTML = nbToStr(data.score);
		data.multiplier += 1;
		data.mCost *= 2;
		btMultiply.innerHTML = 'x' + nbToStr(data.multiplier * data.bMult) + ' multiplier<br>Next : ' + nbToStr(data.mCost);
	}
}

function activateAutoClic() {
	if(data.score >= data.aCost) {
		myAutoClic = setInterval(scoreInc, data.aTimer);
		if(myAutoClic != 0) {
			data.score -= data.aCost;
			btDisplay.innerHTML = nbToStr(data.score);
			data.aTimer = Math.round(data.aTimer * 0.95);
			data.aCost *= 2;
			data.aLvl++;
			btAutoClic.innerHTML = 'Next autoclic : ' + nbToStr(data.aCost) + '<br>Next cycle : ' + data.aTimer + 'ms'
		}
	}
}

function timerWait() {
	if(bonusTimer > 1) {
		bonusTimer--;
		btBonus.innerHTML = '*!* Wait *!*<br>' + bonusTimer + 's';
		myBonus = setTimeout(timerWait, 1000);
	}
	else {
		bonusTimer = 0;
		data.bTimer++;
		data.bCost = Math.round(1.1 * data.bCost);
		btBonus.innerHTML = '*!* BONUS *!*<br>' + nbToStr(data.bCost);
		data.bLvl++;
	}
}

function timerBonus() {
	if(bonusTimer > 1) {
		bonusTimer--;
		btBonus.innerHTML = '*!* BONUS *!*<br>' + bonusTimer + 's';
		myBonus = setTimeout(timerBonus, 1000);
	}
	else {
		data.bMult = 1;
		btMultiply.innerHTML = 'x' + nbToStr(data.multiplier * data.bMult) + ' multiplier<br>Next (+' + nbToStr(data.mLvl) + ') : ' + nbToStr(data.mCost);
		bonusTimer = 30;
		myBonus = setTimeout(timerWait, 1000);
		btBonus.innerHTML = '*!* Wait *!*<br>' + bonusTimer + 's';
	}
}

function activateBonus() {
	if(data.score >= data.bCost) {
		myBonus = setTimeout(timerBonus, 1000);
		if(myBonus != 0) {
			bonusTimer = data.bTimer;
			data.score -= data.bCost;
			btDisplay.innerHTML = nbToStr(data.score);
			data.bMult = 2 * ((100 + data.bLvl)/100);
			btMultiply.innerHTML = 'x' + nbToStr(data.multiplier * data.bMult) + ' multiplier<br>Next (+' + nbToStr(data.mLvl) + ') : ' + nbToStr(data.mCost);
			btBonus.innerHTML = '*!* BONUS *!*<br>' + bonusTimer + 's';
		}
	}
}

function checkInterval() {
	btDisplay.innerHTML = nbToStr(data.score);

	if(!btAutoClic.disabled && data.score < data.aCost) {
		btAutoClic.disabled = true;
	}
	else if (btAutoClic.disabled && data.score >= data.aCost) {
		btAutoClic.disabled = false;
	}

	if(!btMultiply.disabled && data.score < data.mCost) {
		btMultiply.disabled = true;
	}
	else if (btMultiply.disabled && data.score >= data.mCost) {
		btMultiply.disabled = false;
	}

	if(bonusTimer != 0) {
		if(!btBonus.disabled) {
			btBonus.disabled = true;
		}
	}
	else if(!btBonus.disabled && data.score < data.bCost) {
		btBonus.disabled = true;
	}
	else if (btBonus.disabled && data.score >= data.bCost) {
		btBonus.disabled = false;
	}
}

function getPosition(element)
{
	var left = 0;
	var top = 0;
	//On récupère l'élément
	var e = document.getElementById(element);
	//Tant que l'on a un élément parent
	while (e.offsetParent != undefined && e.offsetParent != null)
	{
		//On ajoute la position de l'élément parent
		left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
		top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
		e = e.offsetParent;
	}
	return new Array(left,top);
}

function calcDist(item1, item2) {
	var diffX = Math.abs(item1[0] - item2[0]);
	var diffY = Math.abs(item1[1] - item2[1]);
	return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

function myMove() {
    var elem = document.getElementById("critical");
    var posX = 0;
    var posY = 0;
    do {
	    var pasX = (Math.random() * 2) - 1;
	    var pasY = (Math.random() * 2) - 1;
	}while(Math.sqrt(Math.pow(pasX, 2) + Math.pow(pasY, 2)) <= 0.75);
    var id = setInterval(frame, 5);
    function frame() {
    	var distance = calcDist(myPos['clicker'], myPos['critical']);
    	if(distance > btClic.offsetHeight/2 - btCritic.offsetHeight/2) {
		    posX = (Math.random() * btClic.offsetHeight) - btClic.offsetHeight/2;
		    posY = (Math.random() * btClic.offsetHeight) - btClic.offsetHeight/2;
		    do {
			    pasX = (Math.random() * 2) - 1;
			    pasY = (Math.random() * 2) - 1;
			}while(Math.sqrt(Math.pow(pasX, 2) + Math.pow(pasY, 2)) <= 0.75);
    	}
    	//btCritic.innerHTML = distance;
    	//btClic.innerHTML = myPos['critical'] + '<br>' + myPos['clicker'];
        posX += pasX;
        posY += pasY;
        elem.style.left = myPos['clicker'][0] + posX + 'px';
        elem.style.top = myPos['clicker'][1] + posY + 'px';
        myPos['clicker'] = [btClic.offsetLeft + btClic.offsetWidth/2, btClic.offsetTop + btClic.offsetHeight/2];
		myPos['critical'] = [btCritic.offsetLeft + btCritic.offsetWidth/2, btCritic.offsetTop + btCritic.offsetHeight/2];
    }
}


/***********************************************************************************
/* Ce qui suit sert à mettre en place un autoclicker autonome pour cookie clicker **
/***********************************************************************************
*
// Sert à récupérer la position d'un élément
* @author Patrick Poulain
* @see http://petitchevalroux.net
* @licence GPL
*
function getPosition(element)
{
	var left = 0;
	var top = 0;
	//On récupère l'élément
	var e = document.getElementById(element);
	//Tant que l'on a un élément parent
	while (e.offsetParent != undefined && e.offsetParent != null)
	{
		//On ajoute la position de l'élément parent
		left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
		top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
		e = e.offsetParent;
	}
	return new Array(left,top);
}
var myPos = getPosition("bigCookie");


// Simule un évènement de type clic sur le cookie
function simulateClick() {
	var evt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
	});
	var cb = document.getElementById("bigCookie"); 
	var canceled = cb.dispatchEvent(evt);
}

// Permet de mettre fin à l'autoclic quand on évolue
var testtt = document.getElementById("legacyButton");
testtt.onmousedown = function(){clearInterval(myAutoClic)};

// Lance l'autoclic
var myAutoClic = setInterval(simulateClick, 10);
*/