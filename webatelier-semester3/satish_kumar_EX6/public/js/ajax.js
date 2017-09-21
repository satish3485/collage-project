/* AJAX */

/* The doRequest function handles AJAX calls to the server.

 * Exercise 3a: BEGIN

 * The function must check that:
 *  - all the arguments are passed when called
 *  - method has one of the following value: "GET", "POST", "PUT", "DELETE"
 *  - the data (data parameter) is in JSON format
 * If a check fails the function must throw an error.

 * Exercise 3a: END

 * Exercise 3b: BEGIN

 * The function must open a connection to the server according to the method and url parameters
 * The function must correctly set the Request Headers according to the headers parameter, 
 * additionally to the ones needed by the JSON interaction according to the method parameter
 * The function must correctly set the data to be sent according to the data parameter

 * Exercise 3b: END

 * Exercise 3c: BEGIN

 * The function must call the callback function when the response is ready, passing the JSON object parsed from the response, if there is one,
 * or return in case of errors.

 * Exercise 3c: END

 * 
 * @param {String} method The method of the AJAX request. One of: "GET", "POST", "PUT", "DELETE".
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be null if there are no headers.
 * @param {JSON} data The data in the JSON format to be sent to the server. It must be null if there are no data.
 * @param {Function} callback The function to call when the response is ready.
 */
function IsJsonString(s) {
   if(s) {
 	s = JSON.stringify(s)
 	if(!s){
 		throw new Error("data not valid")
 	}
 }
 
}
 function doJSONRequest(method, url, headers, data, callback){
	
	if (arguments.length != 5){
		throw new Error("argument is missing");
	}

	if (["GET", "POST", "PUT", "DELETE"].indexOf(method) < 0){
		throw new Error("method is not correct ");
	}

	IsJsonString(data); 	
	data = JSON.stringify(data)

	var xhr = new XMLHttpRequest();

	xhr.open(method,url,true);

	if (["POST", "PUT"].indexOf(method) > -1){
		xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
	}

	xhr.setRequestHeader("Accept", "application/json");
	if (headers.Authorization){
		xhr.setRequestHeader("Authorization", headers.Authorization);
	}


	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200){
						
				callback(JSON.parse(xhr.responseText));
		}
		return
	}

	if (data){
		xhr.send(data)
	}

}
var durationSet = function(x){
      return parseInt(x / 60) + ":" + x % 60;
    }
function show2(e){
	e.preventDefault();
	doJSONRequest('GET',"/tracks",{},null,show);
}

function show3(e){
	e.preventDefault();
	doJSONRequest('GET',"/artists",{},null,show22);
}


function show4(e){
	e.preventDefault();
	doJSONRequest('GET',"/albums",{},null,show222);
}



var show22 = function(results){
	
	
	// {#data}
	
	var data = {
        "title": "artists", 
        "tracks221" : results
    }
 
	dust.render("library", data, function(err, out) {
    	var addresses = document.getElementById("tracklist");
	 	addresses.innerHTML = out;
	});
	document.getElementById("hiddens").style.display = "none";
}
var show222 = function(results){
	
	
	// {#data}
	
	var data = {
        "title": "albums", 
        "tracks221" : results
    }
 
	dust.render("library", data, function(err, out) {
    	var addresses = document.getElementById("tracklist");
	 	addresses.innerHTML = out;
	});
	document.getElementById("hiddens").style.display = "none";
}

var show = function(results){
	

	// {#data}
	console.log(results)
	var data = {
        "title": "tracks", 
        "tracks22" : results
    }
    for(var i =0; i <results.length; i++){
    	results[i].duration = durationSet(results[i].duration)
    }
    	
	dust.render("library", data, function(err, out) {
    	var addresses = document.getElementById("tracklist");
	 	addresses.innerHTML = out;

	});
	
}
document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById("tracklists")){
	document.getElementById("tracklists").onclick = show2;
}
	if (document.getElementById("artists")){
	document.getElementById("artists").onclick = show3;
}
	if (document.getElementById("albums")){
	document.getElementById("albums").onclick = show4;
}
	

})

/* AJAX */