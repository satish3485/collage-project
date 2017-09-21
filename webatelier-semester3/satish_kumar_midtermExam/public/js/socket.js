var socket = io.connect('http://localhost:3000')

// socket.on('change-track', function(data) {
// 	if(window.location.hash.indexOf('library') != -1 || window.location.hash == '') {
// 		var container = document.getElementById('tracks-list');

//         if(container && container.firstChild){
//         	if(container.firstChild.id != "playlistHeader"){


//         	 // drawLibrary(null, false);
//           }
//          }
// 			// drawLibrary(null, false);
		
// 	}
// })

// socket.on('change-album', function(data) {
// 	if(window.location.hash.indexOf('albums') != -1 || window.location.hash == '') {
// 		 drawAlbums(null, false);
// 	}
// })

// socket.on('change-artist', function(data) {
// 	if(window.location.hash.indexOf('artists') != -1 || window.location.hash == '') {
// 		drawArtists(null, false);
// 	}
// })
// socket.on('change-changeOrder', function(data) {
	
// 	if(window.location.hash.indexOf('#') != -1 || window.location.hash == '') {
// 		var container = document.getElementById('tracks-list');
//         if(container && container.firstChild){
//         if(container.firstChild.id == "playlistHeader"){
		
// 				onPlaylistClicked(temprary);
// 			}
// 	}
// 	}
// })
// socket.on('Delete-Activity', function(data) {
// 	if(window.location.hash.indexOf('#') != -1 || window.location.hash == '') {
// 		var container = document.getElementsByClassName('fl-tl-th fl-tl-artist');
//        if(container[0]){
//         if(container[0].innerHTML == "Action"){
// 				drawActivity(event);
//           }
//          }
			
// 	}
// })

function checkes(){
	var mr = document.getElementById("checkbox");
	checker = mr.getAttribute('value');
	if(checker == "checked"){
		return true;
	}
	return false;
}
// socket.on('clientNumber', function(clientNumber) {
// 	var m = document.getElementById("connectedClients");
// 	if(m){
// 	m.innerHTML = clientNumber;
// 	}
	
// })

// socket.on('play', function(data,clientNumber) {

// 	if(checkes()|| clientNumber == 1){
// 		play();
// 	}
	
	
// })
// socket.on('pause', function(data,clientNumber) {

// 	if(checkes()|| clientNumber == 1){
// 		pause();
// 	}
	

// })
// socket.on('playSameSong', function(data,clientNumber) {

// 	if(checkes()|| clientNumber == 1){
// 		playTrackById2(data);
// 	}


// })
// socket.on('seekBar', function(wStyle,time,clientNumber) {
// 	 	if(checkes()|| clientNumber == 1){
// 		seekbarChange(wStyle,time)
// 	}
	

// })
// socket.on('mode.change', function(data,clientNumber) {

// 	 	if(checkes()|| clientNumber == 1){
// 		modeChange();
		
		
// 	}
// 	})

// socket.on('go.back.n', function(data,clientNumber) {

// 		gobackn();
		
		
	
// 	})
socket.on('drawer2', function(data) {
	if(checkes()){
 		Draw(data.x, data.y, data.isDown)
	}
		
		
	
 	})

