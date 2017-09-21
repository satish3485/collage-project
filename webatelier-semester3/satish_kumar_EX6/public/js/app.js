
function getArtistNameById(id, artistsArray){
	for(var i in artistsArray){
		for(var p in artistsArray[i]){
			if(p == "_id" && artistsArray[i][p] == id){
				return artistsArray[i]["name"]; //  Returning the name of the artist with _id = id
			}
		}
	}
}


function getAlbumById(id, albumsArray){
	for(var i in albumsArray){
		for(var p in albumsArray[i]){
			if(p == "_id" && albumsArray[i][p] == id){
				return albumsArray[i];
			}
		}
	}
}

function getAlbumPictureByIds(ids, albumsArray){
	for(var i in ids){
		// Assuming that every album's ID starts with "a"
		if(ids[i][0] === "a"){
			return getAlbumById(ids[i], albumsArray).artwork;
		}	
	}
}

function getFirstAlbumName(ids, albumsArray){
	for(var i in ids){
		// Assuming that every album's ID starts with "a"
		if(ids[i][0] === "a"){
			return getAlbumById(ids[i], albumsArray).name;
		}
	}
}

function getFormattedDuration(d){
	var m = parseInt(d / 60);
	var s = parseInt(d % 60)
	if(('' + s).length == 1){
		s = "0" + s;
	}
	return  m + ":" + s;
}


function searchSongObjectBySongName(name){
	var modelSongs = window.model.tracks;

	for(var i in modelSongs){
		if(modelSongs[i].name == name){
			return modelSongs[i];
		}
	}
}

function searchSongObjectBySongAlbumName(n){
	var modelSongs = window.model.tracks;
	var modelAlbums = window.model.albums;

	function searchSongObjectByAlbumId(aId){
		for(var i in modelSongs){
			var collections = modelSongs[i].collections;
			for(var j in collections){
				if(collections[j] == aId){
					return modelSongs[i];
				}
			}
		}
	}

	for(var i in modelAlbums){
		if(modelAlbums[i].name == n){
			return searchSongObjectByAlbumId(modelAlbums[i]._id);
		}
	}

}

function onTrackDragStart(e){
	var node = e.target
	var song = null;

	if(node.nodeName.toUpperCase() == "A"){ // it's a link
		if(node.className == "track-name-link"){ // some hacks
			var songName = node.id;
			song = searchSongObjectBySongName(songName);

		} else { // node.className == "track-album-link"
			var albumName = node.id;
			song = searchSongObjectBySongAlbumName(albumName);
		}
	} else { // div		
		var songName = node.childNodes[0].childNodes[0].id;
		song = searchSongObjectBySongName(songName);
	}

	song = JSON.stringify(song);
	e.dataTransfer.setData("song", song);
}

function onPlaylistDragOver(e){
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}
} 

// There's a bug in displaying the drag tracks if I first drag them from another playlist
// but if then I drag on track from the library and try to display the new changed playlist,
// it looks ok...
// TODO: make it work with default playlists loaded from window.model
function onPlaylistDrop(e){
	if (e.preventDefault) {
		e.preventDefault(); // Prevents browser redirect
	}

	var song = JSON.parse(e.dataTransfer.getData("song"));
	var playlists = JSON.parse(localStorage.playlists);

	if(e.target.nodeName.toUpperCase() == "SPAN"){
		var playlistName = e.target.textContent;

		for(var id in playlists){
			if(playlists[id].name == playlistName){
				// Does not check for not for repeatitions
				playlists[id].tracks.push(song._id)
			}
		}
	}

	localStorage.playlists = JSON.stringify(playlists);
}

function renderTracks(domObj, tracksArray){
	var PROP = {"name": "song", "artist": "artist", "collections": "album", "duration": "time"};	

	var s = "<div class='library'>";

	(function renderTableHeadings(){
		s += "<div class='fl-tl-row fl-tl-thead'>";
		for(var i in PROP){
			if(i == "duration"){
				s += "<div class='fl-tl-cell fl-tl-th fl-tl-time'>" + PROP[i] + "</div>";
			} else {
				s += "<div class='fl-tl-cell fl-tl-th'>" + PROP[i] + "</div>";
			}
		}
		s += "</div>";
	})();
	

	(function renderTableBody(){

		for(var i in tracksArray){

			s += "<div class='fl-tl-row' draggable='true' ondragstart='onTrackDragStart(event)'>"
			var track = tracksArray[i];

			for(var p in PROP){

				var value = track[p]; // value of property p
				if(p == "artist"){
					// track[p] is the id of the artist of this track.
					value = getArtistNameById(track[p], window.model.artists)
					s += "<div class='fl-tl-cell fl-tl-artist'>" + value + "</div>";

				} else if(p == "collections"){
					value = getFirstAlbumName(track[p], window.model.albums);
					s += "<div class='fl-tl-cell fl-tl-album'><a href='#' id='" + value + "' class='track-album-link'>" + value + "</a></div>";

				} else if(p == "duration"){
					value = getFormattedDuration(track[p]);
					s += "<div class='fl-tl-cell fl-tl-time'>" + value + "</div>";

				} else { // name
					s += "<div class='fl-tl-cell fl-tl-name'><a href='#' id='" + value + "' class='track-name-link'>" + value + "</a></div>";
				}
			}

			s += "</div>";
		}

	})();

	s += "</div>"

	domObj.innerHTML = s;
}


function renderArtists(domObj, artistsArray){
	
	var s = "<div class='artists'><ul class='grid-list'>";
	
	for(var i in artistsArray){
		s += "<li> \
				<div class='media-object'> \
					<div class='mo-image'>\
						<img class='mo-overlay' src='" + artistsArray[i]["artwork"] + "'/>\
						<div class='mo-overlay'></div>\
					</div>\
					<div class='mo-info'>\
						<p class='mo-title'>" + artistsArray[i]["name"] + "</p>\
					</div>\
				</div>\
			</li>";
	}

	s += "</ul></div>";
	domObj.innerHTML = s;
}


function renderAlbums(domObj, albumsArray){

	var s = "<div class='albums'><ul class='grid-list'>";
	
	for(var i in albumsArray){
		s += "<li> \
				<div class='media-object'> \
					<div class='mo-image'>\
						<img class='mo-overlay' src='" + albumsArray[i]["artwork"] + "'/>\
						<div class='mo-overlay'></div>\
					</div>\
					<div class='mo-info'>\
						<p class='mo-title'>" + albumsArray[i]["name"] + "</p>\
						<p class='mo-subtitle'>" + getArtistNameById(albumsArray[i]["artist"], window.model.artists) + "</p>\
					</div>\
				</div>\
			</li>";
	}

	s += "</ul></div>";
	domObj.innerHTML = s;
}

window.onload = function(){
  // Making a deep copy because I need to use the original value of window.data,
  // that also means that I change window.model,
  // even if it might not the best thing to do, mostly because of performance...
  window.model = JSON.parse(JSON.stringify(window.data));

  if(window.tracklist){
  	
	  renderTracks(window.tracklist, window.model.tracks);

	  (function addClickEventListeners(){
	  	var albumsLinks = document.getElementsByClassName("track-album-link");
	  	var namesLinks = document.getElementsByClassName("track-name-link");

	  	for(var i in albumsLinks){
	  		albumsLinks[i].onclick = onTrackAlbumClick;
	  	}

	  	for(var i in namesLinks){
	  		namesLinks[i].onclick = onTrackNameClick;
	  	}
	  })();
	
	  //setup audio player
	  setupPlayer();

  } else if(window.artists){
	  renderArtists(window.artists, window.model.artists);

  } else if(window.albums){
  	renderAlbums(window.albums, window.model.albums);

  }

  // implement the logic to render the views here. Ofcourse, you can call other functions
  // to avoid having a huge function

  //example for setup playlist
  setupPlaylists();

  document.getElementById("create-pl-btn").addEventListener("click", onNewPlaylistClick);

}


/*
 * This functions renders the playlists inside the model
 * You are allowed to edit or delete this function
 */
function setupPlaylists() {

	var playlists = {}

	model.playlists.forEach(function(playlist){
	    if (!playlists.hasOwnProperty(playlist._id))
	    playlists[playlist._id] = playlist;

  	});


	(function addLocalStoragePlaylists(){
	  	if(localStorage.playlists === undefined){
	    	localStorage.playlists = JSON.stringify({});
	  	} 

	  	var localStoragePlaylists = JSON.parse(localStorage.playlists);
	  	
	  	for(var id in localStoragePlaylists){
	  		// id could be undefined for some reason...
	  		// No need to check "!playlists.hasOwnProperty(id)",
	  		// otherwise changes to playlists loaded from window.model.playlists 
	  		// will not be shown on reloading
	  		if(id){  
	  			playlists[id] = localStoragePlaylists[id];
	  		}
	  	}		
	})();	

  	var keys = Object.keys(playlists);

	keys.forEach(function(key){
	   appendNewPlaylistToMenu(playlists[key]);
	});
}


function getPlaylistByName(name){

	var playlists = window.model.playlists;
	for(var i in playlists){
		if(playlists[i].name == name){
			return playlists[i];
		}
	}

	// Searching on local storage too
	var localStoragePlaylists = JSON.parse(localStorage.playlists);

	if(localStoragePlaylists){
		for(var i in localStoragePlaylists){
			if(localStoragePlaylists[i].name == name){
				return localStoragePlaylists[i];
			}
		}
	}
}

function getTrackById(id){
	// Using original data because I override window.model
	// In order to replace previous tracks array with a new.
	// Why am I doing this?
	// In a nutshell, it's because fuzzyFind uses window.model to search stuff...
	// So, window.model would represent the current displayed data...
	var tracks = window.data.tracks; 

	for(var i in tracks){
		if(tracks[i]._id == id){
			return tracks[i];
		}
	}
}

function createArrayOfTracks(playlistObj){
	var tracksArray = [];
	var tracks = playlistObj.tracks;

	for(var i in tracks){
		var a = getTrackById(tracks[i]);
		tracksArray.push(a)
	}
	return tracksArray;
}

function showPlaylist(e){
	// window.location.replace("./library.html");

	window.playlistHeader.className = "";
	var name = "";

	// e.target could be a span or a list, depending where we click ;)
	if(e.target.nodeName.toUpperCase() == "SPAN"){
		name = e.target.textContent;
	} else {
		name = e.target.childNodes[1].textContent;
	}

	var playlist = getPlaylistByName(name);
	var trackObjs = createArrayOfTracks(playlist);

	/* 
	Overriding the default tracks because the fuzzyFind uses window.model to find stuff.
	For now, it is the easiest and fastest solution, but we can still access model.data,
	because I made a deep copy (maybe not a good idea in terms of performance)...
	*/
	window.model["tracks"] = trackObjs;

	function drawArtworks(){
		var canvas = document.getElementById("playlistArtworkCanvas");
		var context = canvas.getContext("2d"); // where to draw...
		context.clearRect(0, 0, canvas.width, canvas.height);
		var SIZE = 100;
		var LEN = trackObjs.length;
		var sources = [];

		for(var i=0; i<4 && i<trackObjs.length; i++){
			sources.push(getAlbumPictureByIds(trackObjs[i].collections, window.model.albums));
		}

		(function loadAndDrawImages(){
			var n = 0;

			function draw(img, x, y, w, h){
				return function(){
					context.drawImage(img, x, y, w, h);
				}
			}

			for(var i=0; i<2 && n < LEN; i++){
				
				for(var j=0; j<2 && n < LEN; j++){
					var img = new Image();
					img.onload = draw(img, j*SIZE, i*SIZE, SIZE, SIZE);					
					img.src = sources[n];
					n++;
				}
			}
		})();
	}

	(function writePlaylistName(){
		document.getElementsByClassName("playlist-info-name")[0].innerHTML = name;
	})();

	drawArtworks();
	renderTracks(window.tracklist, window.model.tracks);
}


/** Gets the next id available based on the playlists in window.model. */
function getNumberOfNextPlaylistId(){
	var next = 0;

	function getPlaylistNumberById(id){
		return parseInt(id.substring(1));
	}

	(function searchInWindowModelPlaylists(){
		var playlists = window.model.playlists;

		if(playlists.length === 0){
			next = 0;
		} else {
			next = getPlaylistNumberById(playlists[playlists.length - 1]._id);
		}		
	})();


	(function searchInLocalStoragePlaylist(){
		var localStoragePlaylists = []
		
		if(localStorage.playlists){
			localStoragePlaylists = JSON.parse(localStorage.playlists);
		}

	  	for(var id in localStoragePlaylists){
	  		if(id && getPlaylistNumberById(id) > next){ 
	  			next = getPlaylistNumberById(id);
	  		}
	  	}	

  	})();


  	next++;
  	return next;
}

function getNextPlaylistId(){
	return "p" + getNumberOfNextPlaylistId();
}

function getNextPlaylistName(){
	return "Playlist " + getNumberOfNextPlaylistId();
}

function getNextPlaylistOwner(){
	return "Owner " + getNumberOfNextPlaylistId();
}


function onNewPlaylistClick(e){
	var p = playlist(getNextPlaylistId(), getNextPlaylistName(), getNextPlaylistOwner());
	window.model.playlists.push(p);
	appendNewPlaylistToMenu(p);
}


function changePlaylistName(id, newName, input){
	var modelPlaylists = window.model.playlists;
	var localStoragePlaylists = JSON.parse(localStorage.playlists);
	var changed = false;

	if(localStoragePlaylists.hasOwnProperty(id)){
		var p = localStoragePlaylists[id]
		p.name = newName;
		localStoragePlaylists[id] = p;
		localStorage.playlists = JSON.stringify(localStoragePlaylists);
		changed = true;
	}

	for(var i in modelPlaylists){
		if(modelPlaylists[i]._id == id){
			modelPlaylists[i].name = newName;
			changed = true;
		}
	}

	if(changed){
		var p = document.getElementById(id);	
		var span = p.getElementsByTagName('span')[0];
		span.textContent = newName;
		input.style.display = "none";
		input.value = "";
	}

}


function onEditInputKeyUp(e){
	var input = e.target;

   	var key = e.which || e.keyCode;   

    if (key === 13) { // 13 is ENTER
    	if(!input.value){
    		alert("Empty strings are not accepted!");
    	} else {
    		changePlaylistName(input.parentNode.id, input.value, input)
    	}
    } else if (key === 27){ // ESC
    	input.style.display = "none";
    }

}

function onPlaylistEditButtonClick(e){
	var playlistId = e.target.parentNode.id;
	var input = document.getElementById(playlistId).getElementsByTagName('input')[0];
	input.style.display = "inline-block";
	input.focus()
	input.addEventListener("keyup", onEditInputKeyUp);

}

/*
 * This functions appends a playlist in the nav bar
 * You are allowed to edit or delete this function
 */
function appendNewPlaylistToMenu(pl) {
	var name = pl.name;
	var id = pl._id;
	var newHtml ='';
	newHtml += '<li id="'+ id + '"><a href="#" onclick="showPlaylist(event)" ondragover="onPlaylistDragOver(event)" ondrop="onPlaylistDrop(event)"><i class="nav-menu-icon fa fa-bars"></i><span>' + name + '</span></a><input type="text" class="pl-name-input"><a href="#" class="edit-btn glyphicon glyphicon-pencil" onclick="onPlaylistEditButtonClick(event)"></a></li>';
	document.getElementById('playlists').innerHTML += newHtml;

	savePlaylist(pl);
}

/** DONE EVERYTHING, EVEN IF PROBABLY NOT IN THE BEST WAY BECAUSE OF LACK OF TIME.
*
* This function setups the player. More specifically:
* - It should create an audio element and append it in the body (DONE)
*
* - The audio element should load by default the first track of your library (DONE)
*
* - When the track is paused and you click on the play button of exercise one,
*   it should play the current track and switch the icon of the button to 'pause'.
*   You don't need to use the checkbox hack for toggling the icons. You might as well
*   use Javascript. (DONE)
*
* - When the track is playing and you click on the pause button of exercise one,
*   it should pause the current track and switch the icon of the button to 'pause'. (DONE)
*
*
* Optionally:
* - When the track is playing the progress bar should be updated to reflect the progress (DONE)
*
* - When the progress bar is clicked the current time of the player should skip to
*  the corresponding time (that is, if the click was on the 2/3 of the total width
*  of the bar, the track current time should be the 2/3 of the total duration). Also
*  the progress bar should be updated. (DONE)
*
* - As the track is playing the elapsed time should be updated (DONE)
*
* - Implement a volume bar that does what the progress bar does for sound but for volume. (DONE)
*
* - When a track is clicked from the library, your player should start playing it (DONE, but missing song's files)
*
* - When a track finishes your player should play the next one (DONE)
*/


// HELPER (SOMETIME STUPID) FUNCTIONS...

/** Gets the track object with name == trackName. */
function getTrackByTrackName(trackName){
	var tracks = window.model.tracks;
	for(var i in tracks){
		if(tracks[i].name == trackName){
			return tracks[i];
		}
	}	
}


/* Functions that return DOMs. */

/** 
Returns the DOM object corresponding to the library (collection of tracks),
which has a class "library" (actually it should be an ID...) 
*/
function getLibrary(){
	return document.getElementsByClassName("library")[0];
}

/** 
Returns the DOM object corresponding to HTML 5 audio element created in setupPlayer.
This function returns null if that object has not yet been created (or it has been removed?)
*/

function getAudioId(){
	return "track-audio";
}

function getAudio(){
	return document.getElementById(getAudioId());
}

function getAudioExpectedParent(){
	return document.getElementsByClassName("pl-wrapper")[0];
}

function getPlayPauseButton(){
	return document.getElementById("play-pause");
}

function getTimelineRail(){
	return document.getElementById("pl-timeline-rail");
}

function getVolumeRail(){
	return document.getElementById("pl-volume-rail");
}

/* Other */

function findNodeIndex(parent, childNode){
	return Array.prototype.indexOf.call(parent.childNodes, childNode);
}

function getNumberOfProperties(obj){
	return Object.keys(obj).length;
}

/* 
Functions that return info about a track by passing its index n in the library. 
The index corresponds to its position in childNodes of the DOM object called library.
*/

function getTrack(n, prop){
	// n is the index of the nth track in the current library
	// If an invalid index is passed, n is set to 1.
	n = n || 1; // Default track is the first.
	if (typeof n !== "number" || n < 1 || n >= getLibrary().childNodes.length){
		n = 1;
	}

	/*
	Possible values: 
		0: track's name, 
		1: track's artist, 
		2: track's album, 
		3: track's duration
	*/
	prop = prop || 0;

	if(typeof prop !== "number" || prop < 0 || prop >= getLibrary().childNodes[n].childNodes.length){
		prop = 0;
	}

	return getLibrary().childNodes[n].childNodes[prop].firstChild.innerHTML;
}


function getFile(n, prop){
  	return getTrackByTrackName(getTrack(n, prop)).file;	
}

function getDuration(n, prop){
  	return getTrackByTrackName(getTrack(n, prop)).duration;		
}

function getArtist(n, prop){
	return getArtistNameById(getTrackByTrackName(getTrack(n, prop)).artist, window.model.artists);
}

function getAlbumPicture(n, prop){
	var ids = getTrackByTrackName(getTrack(n, prop)).collections;
	return getAlbumPictureByIds(ids, window.model.albums);
}

/* Helper-style functions (to the event listeners below). */

function setPlayLabel(){
	getPlayPauseButton().className = "btn btn-icon fa fa-play";
}

function setPauseLabel(){
	getPlayPauseButton().className = "btn btn-icon fa fa-pause";	
}

function setTimelineBarWidth(newWidth){
	document.getElementById("pl-timeline-bar").style.width = newWidth + "px";
}

function setVolumeBarWidth(newWidth){
  	document.getElementById("pl-volume-bar").style.width = newWidth + "px";
}

function getTimelineRailWidth(){
	return getTimelineRail().offsetWidth;
}

function getVolumeRailWidth(){
	return getVolumeRail().offsetWidth;
}

function setVolumeLabel(newVolume){
	setVolumeBarWidth(newVolume * getVolumeRailWidth());	
}


function setTrackArtistLabel(newLabel){
	document.getElementsByClassName("pl-track-artist")[0].innerHTML = newLabel;
}

function setTrackTitleLabel(newLabel){
	document.getElementsByClassName("pl-track-title")[0].innerHTML = newLabel;	
}

function setTrackAlbumPicture(picPath){
	document.getElementById("track-album-pic").style.backgroundImage = "url('" + picPath + "')";
}

function setTrackTotalTime(totalTime){
	document.getElementById("time-total").innerHTML = totalTime;
}


/** Event listeners */

/* Called when the user clicks on the play/pause button. */
function onPlayPause(e){
	var audio = getAudio();
	
	function isPlaying() {
	    return !audio.paused && !audio.ended && 0 < audio.currentTime;
	}

	function play(){
		audio.play();
		setPauseLabel();
	}

	function pause(){
		audio.pause();
		setPlayLabel();
	}

	if(!isPlaying()){
		play();
	} else {
		pause();
	}
}

/** Called when the user clicks the time line of the song. */
function onTimelineRailClick(e){
	var rect = e.target.getBoundingClientRect();
	var width = getTimelineRailWidth();
	var clickedPoint = e.pageX - rect.left;
	
	if(clickedPoint < 0){ // Because of some small negative numbers...
		clickedPoint = 0;
	}

	var audio = getAudio(); // Redundant
	audio.currentTime = audio.duration * clickedPoint / width;
	setTimelineBarWidth(clickedPoint);
}

/** Called when the user clicks the volume's rail. */
function onVolumeRailClick(e){
	var rect = e.target.getBoundingClientRect();
	var width = getVolumeRailWidth();
	var clickedPoint = e.pageX - rect.left;
	
	if(clickedPoint < 0){
		clickedPoint = 0;
	}

	var audio = getAudio(); // Redundant
	audio.volume = 1 * clickedPoint / width;
	setVolumeBarWidth(clickedPoint);
}

// TODO
function onTrackAlbumClick(e){
	console.log(e.target.parentNode.parentNode)

	console.log("onTrackAlbumClick");
}

// TODO: When a song is changed, 
// the timeline bar is not reset, even if I set its width to 0...
// NOT SURE YET WHY THIS IS HAPPENING...
function onTrackNameClick(e){
	// Searching the index of the row in its parent's childNodes
	var index = findNodeIndex(e.target.parentNode.parentNode.parentNode, e.target.parentNode.parentNode);
	setupPlayer(index);
}


/** Called only when library.html is loaded. */
function setupPlayer(n){
	// Checking if the index n is "correct" and if not it is set to 1.
	if(!n || typeof n !== "number" || n >= getLibrary().childNodes){
		n = 1;
	}

	function resetControls(){
		setTimelineBarWidth(0);
		setPlayLabel();		
	}

	// A new audio object is created whenever the song is changed.
	if(getAudio()){
		getAudioExpectedParent().removeChild(getAudio());
		resetControls();
	}

	var audio = document.createElement("audio");
	audio.setAttribute("id", getAudioId());
  	audio.src = getFile(n);
  	audio.volume = 0.5;
  	setVolumeLabel(audio.volume); // Sets the volume label given the current volume (0.5)
  	
  	setTrackArtistLabel(getArtist(n));
  	setTrackTitleLabel(getTrack(n));
  	setTrackAlbumPicture(getAlbumPicture(n));
  	setTrackTotalTime(getFormattedDuration(getDuration(n)));

  	/** Called to update the timeline bar and the timer passing. */
  	audio.ontimeupdate = function(e){
  		document.getElementById("time-elapsed").innerHTML = getFormattedDuration(audio.currentTime);
  		setTimelineBarWidth(getTimelineRailWidth() * audio.currentTime / audio.duration);
  	}

  	/** 
	* Whenever the current song ends, setupPlayer is called again with n + 1.
	* Note that if n is greater than the maximum number of tracks, then it is set to 1 (first track).
  	*/
  	audio.onended = function(e){
  		setupPlayer(n + 1); 
  	}

  	// Insertin the audio element in its theoretically expected position into the tree.
  	getAudioExpectedParent().insertBefore(audio, document.getElementById("pl-controls"));

}