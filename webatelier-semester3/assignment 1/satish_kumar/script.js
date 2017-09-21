/**
 * JavaScript Exercise 2 - Skeleton
 */


/**
 * Exercise 1. a)	Scalar Product (10 points)
 * Implement a function scalar_product(a,c) which returns an array computed by
 * multiplying each element of its input array a with the input scalar value
 * c. (+5 Extra points if you use the map function to implement the scalar
 * product instead of a for loop).
 **/
function scalar_product(a,c) {
	if (typeof a ==='undefined' || typeof c ==='undefined'){
		return undefined;
	}
	else {
		for (var i=0;i<a.length;i++){
			a[i]=a[i]*c;
		}
		return a;
	}
}

/**
 * Exercise 1. b)	Inner Product (10 points)
 * Implement a function inner_product(a,b) which returns a value computed by
 * summing the products of each pair of elements of its input arrays a, b in
 * the same position
 **/
function inner_product(a,b) {
	var s = 0;
	if (typeof a ==='undefined' || typeof b ==='undefined'){
		return undefined;
	}
	else {
		if (a.length != b.length){
			return undefined;
		}
		else {
			for (var i=0;i<a.length;i++){
				
				s = a[i]*b[i] + s;
				
			}
			return s;
		}	
	}
}

/**
 * Exercise 1. c)	Itemize (5 points)
 * Implement a function itemize(s) which given a string s (which could also be
 * empty) returns the string surrounded by the HTML <li> element tags. (e.g.,
 * itemize(“X”) -> “<li>X</li>”).
 **/
var itemize = function(x) {
	if (typeof x != "string"){
		return undefined;
	}
	else {
		return '<li>'+x+'</li>'
	}
}

/**
 * Exercise 1. d)	MapReduce (15 points)
 * Implement a function mapreduce (f, a, seed) which maps all elements of the array
 * a through the function f and then returns a single value computed by adding all
 * mapped array elements together with the provided seed. The seed is an optional
 * parameter, which defaults to the empty string.
 **/

function mapReduce(f, a, seed) {
	
	for (var i=0;i<a.length;i++){
		if (typeof a[i] != "string"){
			a[i] = a[i].toString()
		}
		a[i]=f(a[i]);

	}
	for (var i=1;i<a.length;i++){
		if (typeof seed != "undefined"){
			for (i=0;i<a.length;i++){
				seed = seed + f(a[i]);
			}
		return seed;
		}
		else {
			if (typeof a[i] == "string"){
				a[0] = a[0]+a[i];
			}
			else {
				a[i] = a[i].toString();
				a[0] = a[0]+a[i];
				
			}
		}

	}
	return a[0];

}

/**
 * Exercise 1. e)	getNumberSequence (5 points)
 * Implement a function getNumberSequence(c) which given a positive integer will
 * return a string containing all numbers between 1 and the number c. The
 * numbers should be separated by “, “ (comma space).
 **/
function getNumberSequence(number) {
	var str ="";
	if (number <= 0){
		return "";
	}
	else {
		
		for (var i=1;i<=number;i++){
			if (str == ""){
				str = i;
			}
			else{
				str = str+", "+i;
			}

			
		}
		return str.toString();
	}
}

/**
 * Exercise 1. f)	Count (5 points)
 * Implement a function count(s) which inverts the getNumberSequence function.
 **/
function count(s) {
	if (s <= 0){
		return undefined;
	}
	else {
		var con = 0;
		var total = s.split(", ").length;
		for (var i=0;i<total;i++){
			con++;
		}
		return con;
	}
}

/**
 * Exercise 2. a)
 * Write a function letter_frequency(s) that calculates the number of occurrences of
 * letters in a given string, it returns an array indexed by the letter characters
 * found in the the string.
 **/
function letter_frequency(s) {
	if(s === undefined){
    return undefined
	}
	else{
		var letters = s.split(''),
        myobj = {},
        letter;

    	for (var i = 0, len = letters.length; i < len; i++) {
      	  letter = letters[i].toUpperCase();
     	   if (!myobj.hasOwnProperty(letter)) {
    	        myobj[letter] = 1;
    	    } else {
   	 	        myobj[letter]++;
    	    }
    }

    return myobj;
	}
}
/**
 * Exercise 2. b)
 * Write a function display_letter_frequency(a,dom) which display the output of the
 * letter frequency analysis in an HTML table generated within the dom element passed
 * as parameter. The output contains the string entered by the user and the letter
 * frequency analysis results next to each letter.
 **/
function display_letter_frequency(a,dom) {
	 var table = "<table>";
 	for ( var x in a) {
 		table += "<tr><td>" + x + "</td><td>" + a[x] + "</td></tr>";
 	}
 	table += "</table>";
 	dom.innerHTML = table;
	
}
    




	


/**
 * Exercise 2. c)
 * Implement the online_frequency_analysis(dom) function to link the provided input
 * text field in the test page with the table so that as a user types a text in the
 * input text field the table is updated to reflect the newly entered text. The
 * function is already set up as an event handler for the input text field, whose DOM
 * object is passed in its input parameter dom whenever the keyup event is triggered
 * by the user.
 **/
function online_frequency_analysis(dom) {
	display_letter_frequency(letter_frequency(dom.value), document
 	.getElementById("frequency_table"));
}

/**
 * Exercise 3. a)
 *
 **/
function player(initial_state){

	if(initial_state === undefined){
		initial_state = "pause";
	}
	var funct = function() {
		if (initial_state === "play"){
			initial_state = "pause";
			return "pause";
		}
		else {
			initial_state = "play";
			return "play";
		}
	
	}
	return funct;
}

/**
 * Exercise 4.
 * Write a function clock() which updates the dom element identified by “clock”
 * with the current time or the elapsed time in the HH:MM:SS format. It also returns 
 the function that will be used by the click event listener.
 **/
function clock() {
	var mm;
	var t;
	var clockers = 0;

	function clocker() {
		
		clockers = 0;

		var today=new Date();
    	var h=today.getHours();
    	var m=today.getMinutes();
    	var s=today.getSeconds();
    	h = checkTime(h);
    	m = checkTime(m);
    	s = checkTime(s);
    	document.getElementById("clock").innerHTML = "current time is " + h+":"+m+":"+s;
    	t = setTimeout(function(){clocker()},500);
	}
	
    function checkTime(i) {
    if (i<10) {
    	i = "0" + i};  // add zero in front of numbers < 10
    	return i;
	}
	
	
	function timer(){
		
		clockers = 1;
		function countdown() {
			
			var hour = 00;
    		var seconds = 00;
    		var mins = 00;

    		function tick() {
       	    	
        		seconds++;

        		document.getElementById("clock").innerHTML ="time elapsed is "+
				(hour < 10 ? "0" : "")+hour + ":" + (mins < 10 ? "0" : "")+mins + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        		if( seconds < 59 ) {
            		mm = setTimeout(tick, 1000);
        		
        		} else {
        			seconds = 00;
 					mins++;
            		if(mins < 60){
 						mm = setTimeout(tick, 1000);}
 					else {
 						hour++;
 						mins = 00;
               
               			mm = setTimeout(tick, 1000);
 
            	}
        	}
    	}
    	tick();
	}
	countdown();
}

clocker();

return function(){
	console.log(clockers);

	if (clockers == 1){
		clearTimeout(mm);
		clocker();

	}
	else {
		clearTimeout(t);
		timer();
	}
}

	
	
}


