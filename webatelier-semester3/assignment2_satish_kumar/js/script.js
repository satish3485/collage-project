// Exercise 3.a

var enumErrorCodes = {
  100: 'Variable is undefined/null/empty',
  101: 'Variable is of unexpected type',
  102: 'Type mismatch',
  103: 'Collection adding same element twice',
  104: "Field doesn't exist"
}
Object.freeze(enumErrorCodes);
/**
* @function void error(code : Number, notes : String)
* @param code: The error codeNumber that will be thrown by the function
* @param notes: Additional optional notes notified on screen
* @throws the function always throws an error with the input code
*/
function error(code,notes){
	for (var key in enumErrorCodes) {
   		if (key == code){
   			throw new Error(key);
   		}
   		
	}
};

// Exercise 3.b
function globalToJSON() {
	return JSON.stringify(this.toObject());
}