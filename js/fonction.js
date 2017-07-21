function scoreInc(data, myDisplay) {
	data.score += data.multiplier;
	myDisplay.innerHTML = data.score;
}

function augmenterMultiplicateur(data) {
	if(data.score >= data.mCost) {
		data.score -= data.mCost;
		data.multiplier += 1;
		data.mCost *= 2;
		multiply.innerHTML = 'x' + data.multiplier + ' multiplier<br>Next : ' + data.mCost;
		myDisplay.innerHTML = data.score;
	}
}

function simulateClick() {
	var evt = new MouseEvent('click', {
		'view': window,
		'bubbles': true,
		'cancelable': true
	});
	var cb = document.getElementById("clicker"); 
	var canceled = cb.dispatchEvent(evt);
}