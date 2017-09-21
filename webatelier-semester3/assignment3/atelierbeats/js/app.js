window.onload = function(){
  window.model = window.data

    var artistFind = function(x){
      
    	for (var i = 0; i < model['artists'].length; i++){
    		  if ((model['artists'][i]._id) == x){
              return model['artists'][i].name;
    		  }
    	 }
    }
    var albumFind = function(x){
      for (var j = 0; j < model['albums'].length; j++){
        if (x[(x.length)-1] == model['albums'][j]._id)
          return model['albums'][j].name;
        }
      }
    var durationSet = function(x){
    	return parseInt(x / 60) + ":" + x % 60;
    }
    var librarydisplay = function(){
      var table = "<table class='flex-tracklist tracklist'>";
      table += "<tr class='fl-tl-row hidden-row'><th class='fl-tl-th tl-header'>"+"SONG"+"</th><th class='fl-tl-th'>"+"ARTIST"+"</td><th class='fl-tl-th tl-header'>"+"ALBUM"+"</th><th class='fl-tl-time fl-tl-th tl-header tl-time'>"+"TIME"+"</th></tr>";
    	for (var i = 0; i < model['tracks'].length; i++) {
    		table += "<tr  class='fl-tl-row tl-row' ><td class='fl-tl-cell'>"+model['tracks'][i].name+"</td><td class='fl-tl-cell '>"+artistFind(model['tracks'][i].artist)+"</td><td class='fl-tl-cell'>"+albumFind(model['tracks'][i].collections)+"</td><td class='fl-tl-time fl-tl-cell'>"+durationSet(model['tracks'][i].duration)+"</td></tr>";
    		// Add the created table to the HTML page
      }
      table += "</table>";
      if (document.getElementById("tracklist")){
        document.getElementById("tracklist").innerHTML= table;
      }
	   }
  
    librarydisplay();

 
  // implement the logic to render the views here. Ofcourse, you can call other functions
  // to avoid having a huge function
  if (document.getElementById("artists")){

    var bigBox = document.getElementById("artists");

     for (i=0;i< model['artists'].length;i++) {
     	
          var box = document.createElement("span");
          var captionbox = document.createElement('h4');
          var cation = document.createTextNode(model['artists'][i].name);
          var img = document.createElement('img');
          img.src =  model['artists'][i].artwork;
          box.appendChild(img);
          captionbox.appendChild(cation);
          box.appendChild(captionbox);
          img.setAttribute("class", "mo-image");
          box.setAttribute("class", "grid-list");
          captionbox.setAttribute("class", "mo-info mo-title");
          bigBox.appendChild(box);
        }
  }
  if (document.getElementById("albums")){
    var bigBox = document.getElementById("albums");
    for (i=0;i<model['albums'].length;i++) {
        var box = document.createElement("span");
        var captionbox = document.createElement('h4');
        var cation = document.createTextNode(model['albums'][i].name);
        var caption3 = document.createElement('h5');
        var artissName = artistFind(model["albums"][i].artist);
      
        var cation2 = document.createTextNode(artissName);
        var img = document.createElement('img');
        img.src = model['albums'][i].artwork;
        box.appendChild(img);
        caption3.appendChild(cation2);
        captionbox.appendChild(cation);
        captionbox.appendChild(caption3);
        box.appendChild(captionbox);
        caption3.setAttribute("class", "mo-info.subtitle");
        img.setAttribute("class", "mo-overlay mo-image");
        box.setAttribute("class", "grid-list");
        captionbox.setAttribute("class", "mo-info mo-title");
        bigBox.appendChild(box);
    }

  }

  //setup audio player
  setupPlayer();


  //example for setup playlist
  setupPlaylists();
}

/*
 * This functions renders the playlists inside the model
 * You are allowed to edit or delete this function
 */
 var playlistHeader = function(m){
 
    var imagelist = [];
    for (var i =0;i<m.length;i++){
      for (var j =0;j<model["albums"].length;j++){
        if (m[i].artist == model["albums"][j].artist){
          if (imagelist.length < 4){
            imagelist.push(model["albums"][j].artwork);
          }
        }
      }
    }
    var c=document.getElementById("playlistArtworkCanvas");
    var ctx=c.getContext("2d");
    function repeat(){
       var loadedImages=0;
        for (var i =0;i<2;i++){
          for (var j =0;j<2;j++){
          var iam = function(i,j){
            var iss = new Image();
            iss.onload = function() {
              ctx.drawImage(iss,100*i,j*100,100,100);
            }
           iss.src = imagelist[loadedImages];
        
           loadedImages++;
          
        }
        iam(i,j);
      }
    }
  }
  if (imagelist.length >0){
   repeat(); 
   }  
  

      
}


function setupPlaylists() {
  var playlists = {}
  model.playlists.forEach(function(playlist){
	    if (!playlists.hasOwnProperty(playlist._id))
	         playlists[playlist._id] = playlist;
  	});

  if (localStorage.playlists){
    var item = JSON.parse(localStorage.getItem('playlists'));
    
    console.log(item);
    
    for(var id in item){
      if (!playlists.hasOwnProperty(id)){
        playlists[id] = item[id];
      }
    }
  }

  var keys = Object.keys(playlists);
        keys.forEach(function(key){
            appendNewPlaylistToMenu(playlists[key])});
  
}
var createtable = function(lis){
  var ul = document.getElementById('playlists')
  ul.classList.remove("hidden");
  var table = "<table class='flex-tracklist tracklist'>";
      
    table += "<tr class='fl-tl-row hidden-row'><th class='fl-tl-th tl-header'>"+"SONG"+"</th><th class='fl-tl-th'>"+"ARTIST"+"</td><th class='fl-tl-th tl-header'>"+"ALBUM"+"</th><th class='fl-tl-time fl-tl-th tl-header tl-time'>"+"TIME"+"</th></tr>";
    for (var i = 0; i < lis.length; i++) {
      var artistss = artistFind(lis[i].artist) || '';
      table += "<tr  class='fl-tl-row tl-row' ><td class='fl-tl-cell'>"+lis[i].name+"</td><td class='fl-tl-cell '>"+artistss+"</td><td class='fl-tl-cell'>"+albumFind(lis[i].collections)+"</td><td class='fl-tl-time fl-tl-cell'>"+durationSet(lis[i].duration)+"</td></tr>";
    }
    table += "</table>";

    document.getElementById('playlistHeader').classList.remove("hidden");
    document.getElementById('tracklist').innerHTML= table;
}
  var playlistView = function(nm){
  var lis = [];
  for (var i = 0; i < model['playlists'].length; i++) {
    if (model['playlists'][i].name == nm){
      for (var j = 0; j < (model['playlists'][i].tracks).length; j++){
            for (var k = 0; k < model['tracks'].length; k++){
                if ((model['tracks'][k]._id) == (model['playlists'][i].tracks[j])){
                    lis.push(model['tracks'][k]);

                }
            }
      }
    }
  }
  playlistHeader(lis);
  createtable(lis);
}
function button(){
  var edits = event.target;
  edits.setAttribute('class','glyphicon glyphicon-ok');
  var playing = true; 
  

    edits.onclick= function(){
       if (playing === false){
          edits.setAttribute('class','glyphicon glyphicon-ok');
          var playlistName=event.target;
          console.log(playlistName);
         
          playing = true;
        }
      else{
        edits.setAttribute('class','glyphicon glyphicon-pencil');
        playing = false;
       
      }

}
  console.log(1);
}
/*
 * This functions appends a playlist in the nav bar
 * You are allowed to edit or delete this function
 */
function appendNewPlaylistToMenu(pl) {
  var callfunction = function(){
    var x = event.target;
    zr = x.innerText;
    playlistView(zr);
  }
 if (pl){
  var name = pl.name;
  var newHtml ='';
	newHtml += '<li><a class="hidden"><i class="nav-menu-icon fa fa-bars" id="'+pl._id +'"></i>' + name + '<i onclick=button() id="editors22" class="glyphicon glyphicon-pencil"></i></a></a></li>';
	document.getElementById('playlists').innerHTML += newHtml;
  var ul = document.getElementById('playlists');
  var li = ul.children;
  for(var n =0; n < li.length; n++){
        li[n].addEventListener('click',callfunction);
  }
}
}


/**
* This function setups the player. More specifically:
* - It should create an audio element and append it in the body
*
* - The audio element should load by default the first track of your library
*
* - When the track is paused and you click on the play button of exercise one,
*   it should play the current track and switch the icon of the button to 'pause'.
*   You don't need to use the checkbox hack for toggling the icons. You might as well
*   use Javascript.
*
* - When the track is playing and you click on the pause button of exercise one,
*   it should pause the current track and switch the icon of the button to 'pause'.
*
*
* Optionally:
* - When the track is playing the progress bar should be updated to reflect the progress
*
* - When the progress bar is clicked the current time of the player should skip to
*  the corresponding time (that is, if the click was on the 2/3 of the total width
*  of the bar, the track current time should be the 2/3 of the total duration). Also
*  the progress bar should be updated.
*
* - As the track is playing the elapsed time should be updated
*
* - Implement a volume bar that does what the progress bar does for sound but for volume.
*
* - When a track is clicked from the library, your player should start playing it
*
* - When a track finishes your player should play the next one
*/
function setupPlayer(){
  // your code goes here
  if (document.getElementById("tracklist")){

    var music = document.getElementById('play-pause');
    var audio = document.createElement('audio');
    audio.setAttribute('src',model.tracks[0].file);
    document.body.getElementsByClassName('pl-wrapper')[0].appendChild(audio);
    var playing = false;  
    var mins = 0;
      var seconds = 00;
    music.onclick = function(){
       if (playing === false){
          audio.play();
          music.setAttribute('class','btn btn-icon fa fa-pause');
          playing = true;
           tick();
        }
      else{
        audio.pause();
        music.setAttribute('class','btn btn-icon fa fa-play');
        playing = false;
        tick();
      }
      function tick() {
            if (playing === false){
              document.getElementById("time-elapsed").innerHTML = mins + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            }
            else {
                seconds++;

                document.getElementById("time-elapsed").innerHTML = mins + ":" + (seconds < 10 ? "0" : "") + String(seconds);
                if ((document.getElementById("time-elapsed").innerHTML) == (document.getElementById("time-total").innerHTML)){
                  return;
                }
                if( seconds < 59 ) {
                    mm = setTimeout(tick, 1000);
                
                } else {
                  seconds = 00;
                  mins++;
                    if(mins < 60){
                     mm = setTimeout(tick, 1000);}
                }
              }
          }
    }
 }  

}

   

