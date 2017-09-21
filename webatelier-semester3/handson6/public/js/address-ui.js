/*
 * The ajaxFind function performs a GET request to the /address API and passes the result to the showSearchResults function
 * 
 * @param {String} parametersString The string containing the parameters to be send to the server
 */
function ajaxFind(parametersString){
	/* Task 3: Start */

	//create an ajax request

	//open an asynchronous connection to the server using GET method on the /address API passing the parameters

	//wait for the response from the server. When the response is received:
		//- correctly handle the errors based on the HTTP status returned by the called API
		//- call the showSearchResults passing the search results

	//send the request to the server
	
	/* Task 3: End */
}

/*
 * The find function get the form input value, create the parametersString, call the ajaxFind function to the /address API
 * to obtain the search results and call the addToHistory function to save the search in the browser's history
 *
 * @param {Event} e The onsubmit event
 */
function find(e){

	/* Task 3: Start */

	//get the form data

	//create the sting containing the parameters for the /address API

	//call ajaxFind to execute the search passing the string containing the parameters

	/* Task 3: End */

	/* Task 6: Start */

	//create and object containing the current state like state = { 'firstname' : firstname.value, 'lastname' : lastname.value}

	//set the currect search parameters in the history preceded by "/address/#", calling the addToHistory function

	/* Task 6: End */

}

/*
 * The showSearchResults function shows the search results inside the id="addresses" DOM element using the compiled contacts.dust view
 *
 * @param {JSON} results The unique identifier of the user
 */
function showSearchResults(results){

	/* Task 4: Start */

	//create the data object with the structure expected by the compiled contacts.dust view

    //render the search results using the compiled contacts.dust view.

    /* Task 4: End */

}

/*
 * The del function handles the ajax call to the /address API to DELETE a contact
 *
 * @param {Event} e The onsubmit event
 */
function del(e){

	/* Task 5: Start */

	//get the _id of the e.target element

	//create an ajax request

	//open an asynchronous connection to the server using DELETE method on the /address API passing the _id parameter

	//wait for the response from the server. When the response is received:
		//- correctly handle the errors based on the HTTP status returned by the called API
		//- call the removeDeletedContact passing the target element

	//send the request to the server

	/* Task 5: End */

}

/*
 * The removeDeletedContact function remove the deleted contact from the view
 *
 * @param {DOM} target The target DOM object
 */
function removeDeletedContact(target){

	/* Task 5: Start */

	//delete the target element's parent node

	//if there are no more contacts show the "You have no contacts!" string by calling the showSearchResults function

	/* Task 5: End */

}

/*
 * The addToHistory function push the @param{state} and the @param{url} in the history State
 *
 * @param {JSON String} state The current state of the search form's button
 * @param {String} url The current url with the hash fragment
 */
function addToHistory(state, url){
	/* Task 9: Start */
	
	/* Task 9: End */
}

/*
 * The updatePage function handles the update of the page when an onpopstate or onload event is fired.
 * The function gets the hash and the current state, calls the ajaxFind function to update the view 
 * and update the form's input value with the data retrieved from the hash
 *
 */
function updatePage(event) {

	//get reference to the hash and to the current state [DONE]
	var hash = document.location.hash;
	var currentState = JSON.parse(history.state);

	//get reference to the form's input buttons


  	if(hash){
  		//call the ajaxFind function passing the parameters retrieved from the hash
  		

  		//update the data in the form

  	} else {
  		//call the ajaxFind
  		

  		//update the data in the form
  		
  	}

  	
};

/* Task 4: Binding of the window.onpopstate and the windows.onload events of the search form to the updatePage(event) function */

//bind the window onpopstate event to the updatePage function
window.onpopstate = updatePage;

//bind the window onload event to the updatePage function
window.onload = updatePage;

/*
 *	The bindDelete function binds the onclick event of the .address-record i tags used to delete a contact to the del function
 *  Task 5: Binds the onclick event of the delete action
 */
function bindDelete(){
	var contacts = document.querySelectorAll(".address-record > i");
	for(var contact in contacts)
		contacts[contact].onclick = del;
}

//bind the onclick event of the search form to the find function and the .address-record i tags used to delete a contact (by calling the bindDelete function)
document.addEventListener('DOMContentLoaded', function() {
	/* Task 4: Binding of the onclick event of the search form to the find function */
	//document.getElementById("search").onsubmit = find;
	//document.getElementById("firstname").onkeyup = find;
	//document.getElementById("lastname").onkeyup = find;

	/* Task 5: Binding of the onclick event of the delete action by calling the bindDelete() function */
	//bindDelete();
})
