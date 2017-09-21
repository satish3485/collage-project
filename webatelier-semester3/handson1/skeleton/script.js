/*
 *  Task 2:
 *	array_equal compares two arrays and returns true if they are the same, otherwise false
 *
 */
function array_equal(a,b){
    //enter your code here
	if (a.length != b.length){
		return false
	}
	else {
		for (i = 0;i < a.length; i++){
			if (a[i] != b[i]){
				return false;
			}
		}

		return true;
	}
}

function refresh(){
	document.location.reload(true);
}


/*
 *  Task 5:
 *  create an array comparator that counts and logs the number of times it was called
 */
function create_array_equal(){
    //enter your code here
    var g = 0;
    return function equals(a,b){g++; console.log(g);
    	return array_equal(a,b)}
}

/*
 *  Task 6:
 *  create a function that return a function mult(num2) that accepts a parameter num2. 
 *  num2 can be either a number or a function.
 *  In case num2 is a function mult(num2) returns the result of the multiplication of num1 * num2(num1).
 *  Otherwise mult(num2) returns the result of the multiplication of num1 * num2.
 *  Use 0 as default value for num1 and num2.
 *
 *  Hint: use the following condition to check if num2 is a function if (typeof num2 === "function")
 */
function multiplier_factory(num1){
	num1 = num1||0;
	//enter your code here
	return function mult(num2){
		num2 = num2||0;
		if (typeof num2 == "function"){
			return num1*num2(num1);
		}
		else {
			return num1*num2;
		}
	}
	return multiplier_factory(0);
}