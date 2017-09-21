window.onload = function() {	
	if(Modernizr.webworkers) {
		//Task 4
	} else {
		console.log('Oops, open a WebWorker enabled browser');
	}
}