//Task 5 

function onFormSubmit(event){
	var username = event.target.username.value;
	var password = event.target.password.value;

	if(username != password){
		/*
		* http://www.w3schools.com/jsref/event_preventdefault.asp
		* Prevents the submission of the form.
		*/
		event.preventDefault(); 
		event.target.parentNode.style.background = "red"; //  Change the color of the parent node.
	}
}