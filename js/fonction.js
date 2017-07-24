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

function scoreInc() {
	data.score += data.multiplier;
}

function augmenterMultiplicateur() {
	if(data.score >= data.mCost) {
		data.score -= data.mCost;
		data.multiplier += data.mLvl;
		data.mLvl++;
		data.mCost *= 2;
			btMultiply.innerHTML = 'x' + nbToStr(data.multiplier) + ' multiplier<br>Next (+' + nbToStr(data.mLvl) + ') : ' + nbToStr(data.mCost);
	}
}

function activateAutoClic() {
	if(data.score >= data.aCost) {
		myAutoClic = setInterval(scoreInc, data.aTimer);
		if(myAutoClic != 0) {
			data.score -= data.aCost;
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
		data.bonus += 6 * data.bLvl;
		data.bTimer++;
		data.bClic += data.bLvl;
		data.bCost = Math.round(1.1 * data.bCost);
		btBonus.innerHTML = '*!* BONUS *!*<br>' + nbToStr(data.bCost);
		data.bLvl++;
	}
}

function timerBonus() {
	if(bonusTimer > 1) {
		bonusTimer--;
		btBonus.innerHTML = '*!* BONUS *!*<br>' + bonusTimer + 's';
		data.score += (data.bonus/data.bTimer);
		myBonus = setTimeout(timerBonus, 1000);
	}
	else {
		data.score += (data.bonus/data.bTimer);
		data.multiplier -= data.bClic;
			btMultiply.innerHTML = 'x' + nbToStr(data.multiplier) + ' multiplier<br>Next (+' + nbToStr(data.mLvl) + ') : ' + nbToStr(data.mCost);
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
			data.multiplier += data.bClic;
			btMultiply.innerHTML = 'x' + nbToStr(data.multiplier) + ' multiplier<br>Next (+' + nbToStr(data.mLvl) + ') : ' + nbToStr(data.mCost);
			btBonus.innerHTML = '*!* BONUS *!*<br>' + bonusTimer + 's';
		}
	}
}

function checkInterval() {
	btDisplay.innerHTML = nbToStr(Math.floor(data.score));

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
/*
/**
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

function simulateClick() {
	var evt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
		clientX: 250,
		clientY: 250
	});
	var cb = document.getElementById("bigCookie"); 
	var canceled = cb.dispatchEvent(evt);
}
var testtt = document.getElementById("legacyButton");
testtt.onmousedown = function(){clearInterval(myAutoClic)};

var myAutoClic = setInterval(simulateClick, 10);
*/