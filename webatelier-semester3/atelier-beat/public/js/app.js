/* Setup on Page Load */
//<!-- build:remove -->
var currentTracks;
var currentArtists;
var currentAlbums;
var currentuserId;
var activities;
var mode;
var playlistTrack;
var currentUser;

window.onload = function(){
  var che = document.getElementById('username');
  if(!che){
   
  load();
  }
  // updatePage();
}

function load(){
  cookiesControl()
  bindMenu();

  updatePage();

  setupPlaylists();
  
  setupSearch();
  
  setupPlayer();
  userNameOnTop();
  modeChange();
}

function bindMenu(){

  var menu = document.querySelectorAll("#main-menu > li > a");
  
  for (var elem = 0; elem < menu.length; ++elem) {
    //console.log(menu[elem])
    if(menu[elem].getAttribute("href").indexOf("library.html") > -1){
      menu[elem].onclick = function(e){
        drawLibrary(e);
         // setupPlayer();
         
    
          }   
      }
    
    else if(menu[elem].getAttribute("href").indexOf("artists.html") > -1)
      menu[elem].onclick = drawArtists;
    else if(menu[elem].getAttribute("href").indexOf("albums.html") > -1)
      menu[elem].onclick = drawAlbums;
  else if(menu[elem].getAttribute("href").indexOf("Activity.html") > -1)
      menu[elem].onclick = drawActivity;
  }

 
}

function gobackn(){
   document.cookie = "userId=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;";
  document.cookie = "userName=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;"
  window.location.href ='/'
}  

function cookiesControl(){
  var zz = document.cookie.split('=');
  currentuserId = zz[1].split(';')[0];
  // if(currentuserId==""){
  //   window.location.href = '/';
  // }
  currentUser = zz[2]
}
function logIn2(){
  dust.render("login", null, function(err, out) {

      var content = document.getElementsByTagName("body");
      // console.log(content)
      content.innerHTML = out;

      });
}


function loginUser(e){
  e.preventDefault();
  document.cookie = "userId=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;";
  document.cookie = "userName=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;"
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var datas = {
          'username' : username,
          'passwords':password,
        }
       doJSONRequest("PUT", "/users/Checker/"+username, null, datas, redirect);
  function redirect(datam){
   
    if(datam.redirec) {
      currentuserId = datam._id;
      currentUser = datam.username;
      document.cookie = "userId="+datam._id +"; expires=Wed, 09 Jun 2021 10:18:14 GMT ;";
      document.cookie = "userName="+datam.username+"; expires=Wed, 09 Jun 2021 10:18:14 GMT ;"
      window.location.href = '/';
      
      
    }
   }
     }
//             }
//           }
// }
function logout(){
  document.cookie = "userId=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;";
  document.cookie = "userName=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;"
  window.location.href = '/';
}
var mmm;
function checkUsers(usee){

  doJSONRequest("GET", "/users", null, null, rend);
         
          function rend(user){
             for (var i = 0; i < user.length; i++) {
              if(user[i].userName == usee){
                trues();
                
                return;
              }
              else if(i == user.length-1){
                falses();
              }
             }
            
        }
}

function trues(){
  backgcolor('username');

}
function falses(){
  backgcolor2('username');

}
function backgcolor(boxx){
  var box = document.getElementById(boxx);
  removeClass(box, 'form-color');
  addClass(box, 'bcakcolor');

}
function backgcolor2(boxx){
  var box = document.getElementById(boxx);
 

  removeClass(box, 'bcakcolor');
  addClass(box, 'form-color');

}
function signup2(e){
   e.preventDefault();
  var firstname = document.getElementById("firstname");
  if(firstname){
    firstname= firstname.value;
  
  if(firstname == ""){
    
    backgcolor('firstname');
  }
  if (firstname != ""){
    backgcolor2('firstname');
  }
  
}
  var lastname = document.getElementById("lastname");
   if(lastname){
    lastname= lastname.value;
    
  if(lastname == ""){
  
    backgcolor('lastname');
  }
   if (lastname != ""){
    backgcolor2('lastname');
  }
}
  var username = document.getElementById("username");
  if(username){
    username = username.value;
    if(username ==""){
      backgcolor('username');
      }
      else {

      checkUsers(username);
    }
  }
  var email = document.getElementById("email");
  if(email){
    email = email.value;
      if(!checkEmail(email)){
        backgcolor('email');
      }
      else {
        backgcolor2('email');
      }
  }
  var password = document.getElementById("password");
  if(password){
    password = password.value;
    if(password==""){
      backgcolor('password');

    }
    else{
      backgcolor2('password');
    }
  }
  var repeatPassword = document.getElementById("repeatPassword");
  if(repeatPassword){
    repeatPassword = repeatPassword.value;
    if(repeatPassword==""){
      backgcolor('repeatPassword');

    }
    else{
      backgcolor2('repeatPassword');
    }
  }
  if(password != repeatPassword){
    backgcolor('repeatPassword');
  }
  var mc = document.querySelectorAll(".form-signup > input");
  console.log(mc[0].className.split(' ')[mc[0].className.split(' ').length-1])
  for (var elem = 0; elem < mc.length; ++elem) {
    if(mc[elem].className.split(' ')[mc[elem].className.split(' ').length-1] == 'bcakcolor'){
      
      return;
    }
  }
  var data = {
    
    'firstName': firstname,
    'lastName':lastname,
    'userName':username,
    'email' : email,
    'password' : password,
   
  }
  doJSONRequest("POST", "/users", null, data, rendss);
  function rendss(){
    window.location.href = '/';
  }
  

}

function checkEmail(email) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
    
      email.focus;
      return false;
  }
  return true;
}
var timeout;

document.onmousemove = resetTimer;
document.onclick = resetTimer;

function resetTimer() {
  bindAlbumLink();
  bindArtistLink();

  clearTimeout(timeout);
  timeout = setTimeout(function(){goback();}, 10*60*1000);
}
function goback(){
  document.cookie = "userId=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;";
  document.cookie = "userName=; expires=Wed, 09 Jun 2021 10:18:14 GMT ;"
  window.location.href='/';
}
function userNameOnTop(){
  var userna = document.getElementById('userna');
  if(userna){
    userna.innerHTML = currentUser;
  }
}

// function playlistLink2(e){
//   var target=e.target;
//   var container = document.getElementById('tracks-list');
//   if(!container){
    
//     document.cookie = "OnclickPlaylist="+e+"; expires=Wed, 09 Jun 2021 10:18:14 GMT ;";

//    // window.location.href = '/library';
//   }
  
// }
// function playlistLink(){
//   var playlists = document.querySelectorAll("#playlists li");
//   for (var elem = 0; elem < playlists.length; ++elem) {
//     playlists[elem].onclick = onPlaylistClicked;
// }
// }
// var zzz =document.cookie.split('=');
//   for (var i = 0; i < zzz.length; i++) {
//     if(zzz[i]==""){
//       zzz.splice(i,1);
//     }
//     if(zzz[i]){
//         zzz[i].split(';')
//       }
//     if(zzz[i].target){
//       onPlaylistClicked(zzz[i].target)
//     }
//     console.log(zzz[i])
//   };

// console.log('========')











function playSong(){
  playTrackById(arrayforplaylist[0])

  increseMin("tracks/"+arrayforplaylist[0]);
}
function modeChange(){
  
  doJSONRequest("GET", "/users", null, null, rend);
          function rend(user){
            
            for(var i=0; i<user.length; i++){
              if(user[i]._id == currentuserId){
               
                currentuserId = user[i]._id;
                if(document.getElementById('shufflePlay')){
                    document.getElementById('shufflePlay').innerHTML = user[i].mode;
              }
                mode = user[i].mode;
              
             }
            }
          }
}

function makeSongArray(){
  arrayforplaylist = [];
  var cont = document.getElementById('content');
  if(cont){
  if(cont.firstChild.firstChild){
    if(cont.firstChild.firstChild.getAttribute('id') == 'playlistHeader'){
      // console.log('=======================',cont.firstChild.firstChild.getAttribute('id'))
      arrayforplaylist = playlistTrack;
  }
  else {
    for (var i = 0; i < currentTracks.length; i++) {
      arrayforplaylist.push(currentTracks[i]._id)
    }
  } 
}
else{
  for (var i = 0; i < currentTracks.length; i++) {
      arrayforplaylist.push(currentTracks[i]._id)
    };
  }
  } 
  // console.log(arrayforplaylist) 
}
function shufflePlay(){
  if(mode=="Suffle"){
    mode = "notSuffle";
    makeSongArray();
  }
  else{
    mode = "Suffle";
    makeSongArray();
  }
  var data = {
        'mode':mode,
        
        }
      doJSONRequest("PUT", 'users/'+currentuserId+'/mode', null, data, fun);
  function fun(){
    document.getElementById('shufflePlay').innerHTML = mode;
  };
}



//<!-- /build -->

/* UI */
function drawActivity (e) {
	// body...
	e.preventDefault();

	doJSONRequest("GET", 'users/'+currentuserId+'/Activity', null, null, fun);
  function fun(data){
 
    var activityData = buildActivityData(data);
   
    var act = {
      "active": activityData,
    }
    dust.render("activate", act, function(err, out) {

      var content = document.getElementById("content");

      content.innerHTML = out;

      });
  	
  // 	var container = document.getElementById('tracks-list');
      
  //   var newHtml = '<div class="fl-tl-thead fl-tl-row"><div class="fl-tl-th fl-tl-name">num</div><div class="fl-tl-th fl-tl-artist">Action</div><div class="fl-tl-th fl-tl-album">target</div><div class="fl-tl-th fl-tl-time">Date</div></div>';
  //     var i=0;
  //     data.forEach(function(track){
       
  //       newHtml+= '<div id="'+ track._id +'"" class="fl-tl-row forbind" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'
  //       newHtml += '<div class="fl-tl-cell fl-tl-name"><span class="hidden"><input type="int" name="order" maxlength="4" size="4" class=""><br></span>'+ i + '</div>\n';
  //       newHtml+= '<div class="fl-tl-cell fl-tl-artist"><span  onClick="drawer(event)" data-for='+track._id+' '+ 'href='+track.target+'>'+track.Action+'</span></div>\n';
  //       newHtml+= '<div class="fl-tl-cell fl-tl-album"><span  onClick="drawer(event)" data-for='+track._id+' '+ 'href='+track.target+'>'+track.name+'</span></div>\n';
  //       //newHtml+= '<div class="fl-tl-cell fl-tl-artist">'+ track.target +'</div>\n';
  //       newHtml+= '<div class="fl-tl-th222 fl-tl-tt">'+track.timestamp+'</div>\n';
		// newHtml+= '<div class="fl-tl-th2222 fl-tl-delete"><a href='+track._id+'>&times;</a></div></div>\n';
  //       i++;
  //     })

      
  //     container.innerHTML = newHtml;
    bindActivityDelete();
  };
  
}
function buildActivityData(data){
  var activityDatas = [];

  for(track in data){

    var newTracksData = {};
  
    newTracksData.name = data[track].name;
    newTracksData._id = data[track]._id;
   
    newTracksData.target = data[track].target;
    newTracksData.timestamp = data[track].timestamp;
    newTracksData.Action = data[track].Action;
    activityDatas.push(newTracksData);

  }

  return activityDatas;

}

function drawer(e){
	var target = e.target;
	var linker = target.getAttribute('href').split('/');
	if(linker[0] == "playlists"){
		onPlaylistClicked(target);
		
	}
	if(linker[0] == 'player'){
		
		playTrackById(linker[1]);
	
	}
	

}
function putActivity(Action,target,_id,name){

	  var data = {
      	'Action':Action,
      	'target': target,
      	'date' : Date.now,
      	"_id" : _id,
        "name" : name,
      	}
      doJSONRequest("PUT", 'users/'+currentuserId+'/Activity', null, data, fun);
  function fun(){
  	bindActivityDelete();
  };

}
function bindActivityDelete(){
  var tracks = document.querySelectorAll(".fl-tl-th2222 a");

  for (var elem = 0; elem < tracks.length; ++elem) {
   
    tracks[elem].onclick = deleteActivity;
  }
}

function deleteActivity(e){

  var href;
  var target = e.target;
  if(e && e.target){
    e.preventDefault();
    var ider = target.getAttribute('href');
    href = 'users/'+currentuserId+'/Activity/'+ider;
  }
  doJSONRequest("DELETE", href, null, null, removeTrack);
  
    //execute the AJAX call to the delete a single album
    

    function removeTrack(){

      var toDelete = target.parentNode.parentNode;
      var parent = document.getElementById("tracks-list");
      var name = findOne(currentTracks,"_id",href.split('/')[3]).name
      // console.log(name);
      parent.removeChild(toDelete);
      putActivity("deleteActivity",href,href.split('/')[3],name);
      bindActivityDelete();
    }

  }

/* Library */

function drawLibrary(e, addHistory){

  if(e && e.target){
    e.preventDefault();
  }

  addLibraryToHistory(addHistory);

  doJSONRequest("GET", "/albums", null, null, function(albums){
    currentAlbums = albums;
    doJSONRequest("GET", "/artists", null, null, function(artists){
      currentArtists = artists;
      //execute the AJAX call to the get tracks
      doJSONRequest("GET", "/tracks", null, null, renderTracks);
       
    });
  });

  function renderTracks(tracks){

    currentTracks = tracks;
    
    
    var tracksData = buildTracksData(tracks);

    var data = {
      "tracks" : tracksData
    };
   
    dust.render("tracks", data, function(err, out) {

      var content = document.getElementById("content");
      if(content){
      content.innerHTML = out;
}
      bindAlbumLink();

      bindArtistLink();

      bindTracksDelete();

      bindEditTrackName();

      // setupPlayer();
      bindAlbumlink4();
      
      makeSongArray();
      
    playSong();
  // if (audiocontrol == 0){
  //    playTrackById(currentTracks[0]._id);
  //    audiocontrol =1;
  //   }

  // var playlisthead = document.getElementById('playlistHeader');
  //     console.log(playlisthead);
  //     addClass(playlisthead, 'hidden');

      
      //add one event listener for all tracks using event delegation
      // document.addEventListener('click', function(event){
        
      //   if(event.target.classList.contains('fl-tl-file-link')){
      //     // prevent anchor element from following link
          
      //     event.preventDefault();

      //     //  var href = event.target.getAttribute('href');
      //     // for (var elem = 0; elem < tracks.length; ++elem) {
      //     //   if('tracks/'+tracks[elem]._id == href ){
      //     //     if (min == undefined){
      //     //      min = tracks[elem].min;
      //     //       var data = {
      //     //           'min':(min*1)+1
      //     //         }
      //     //         doJSONRequest("PUT",href, null, data, def);
      //     //         function def(){};

      //     //       }
      //     //    }
      //     // }

      //     playTrackById(event.target.dataset.tid);
      //      console.log(event.target.dataset.tid+'-------')
      //   }
      
      // })

    });

  }

  
}

function buildTracksData(tracks){

  var tracksData = [];

  for(track in tracks){

    var newTracksData = {};
    newTracksData.artist = {};
    newTracksData.album = {};

    newTracksData.name = tracks[track].name;
    newTracksData._id = tracks[track]._id;
    newTracksData.duration = formatTime(tracks[track].duration);

    newTracksData.artist._id = tracks[track].artist._id;
    newTracksData.artist.name = tracks[track].artist.name;

    newTracksData.album._id = tracks[track].album._id;
    newTracksData.album.name = tracks[track].album.name;
    newTracksData.min = tracks[track].min;
    newTracksData.mid = tracks[track].mid;
    newTracksData.max = tracks[track].max;
    tracksData.push(newTracksData);

  }

  return tracksData;

}

function addLibraryToHistory(addHistory){
  if((("undefined" == typeof addHistory)
    || (addHistory === null))
    || addHistory==true){

    var state = {
      'function' : 'drawLibrary'
    };

    addToHistory(JSON.stringify(state), "/#library");
  }
}

//NOTE: Still used by setupSearch
function createHTMLLibrary(tracks){
  var newHtml = "";
  tracks.forEach(function(track){
    var artist = findOne(model.artists, "_id", track.artist);
    var album = findOne(model.albums, "_id", track.album);

    newHtml+= '<div id="'+ track._id +'"" class="fl-tl-row" draggable="true" ondragstart="drag(event)">';
    newHtml+= '<div class="fl-tl-cell fl-tl-name"><a href="#">'+ track.name + '</a></div>\n';
    newHtml+= '<div class="fl-tl-cell fl-tl-artist"><a href="artists/'+ encodeURI(artist.name)+ '">'+ artist.name +'</a></div>\n';
    newHtml+= '<div class="fl-tl-cell fl-tl-album"><a href="albums/'+ encodeURI(album.name)+ '">'+ album.name +'</a></div>\n';
    newHtml+= '<div class="fl-tl-cell fl-tl-name"><a href="#">'+ track.min + '</a></div>\n';
    newHtml+= '<div class="fl-tl-cell fl-tl-name"><a href="#">'+ track.mid + '</a></div>\n';
    newHtml+= '<div class="fl-tl-cell fl-tl-name"><a href="#">'+ track.max + '</a></div>\n';
    newHtml+= '<div class="fl-tl-cell fl-tl-time">'+ formatTime(track.duration) + '</div>\n';
    newHtml+= '</div>\n';
  })

  return newHtml;
}

function bindTracksDelete(){
  var tracks = document.querySelectorAll(".fl-tl-delete a");

  for (var elem = 0; elem < tracks.length; ++elem) {
    tracks[elem].onclick = deleteTrack;
  }
}

function deleteTrack(e){

  var href;
  var target = e.target;
  if(e && e.target){
    e.preventDefault();
    href = target.getAttribute("href");
  }
  var Act = findOne(currentTracks,"_id",href.split('/')[1]).name;
  putActivity("deleteTrack",href,href.split('/')[1],Act);
    //execute the AJAX call to the delete a single album
    doJSONRequest("DELETE", href, null, null, removeTrack);

    function removeTrack(){

      var toDelete = target.parentNode.parentNode;
      var parent = document.getElementById("tracks-list");

      parent.removeChild(toDelete);

    }

  }

  function bindEditTrackName(){

    var tracksName = document.querySelectorAll("#tracks-list > div > div.fl-tl-name > span + .edit-btn");

    for (var elem = 0; elem < tracksName.length; ++elem) {
      tracksName[elem].onclick = editTrackName;
    }

  }

  function editTrackName(e){

    if(e && e.target){
      e.preventDefault();
    }

    var target = e.target;

    //console.log(target);

    var editable = target.previousSibling;
    
    //console.log(editable.contentEditable);
    //console.log(editable.contentEditable ==  "false");

    if(editable.contentEditable == "false" || editable.contentEditable == "inherit"){ //we have to enable the editing

      editable.contentEditable = "true";

      removeClass(target.firstChild, "fa-pencil");

      removeClass(target.firstChild, "fl-tl-pencil");

      addClass(target.firstChild, "fa-check");

      addClass(target.firstChild, "fl-tl-check");

      //set the cursor on the editable element
      var s = window.getSelection(),
      r = document.createRange();
      r.setStart(editable, 0);
      r.setEnd(editable, 0);
      s.removeAllRanges();
      s.addRange(r);

    } else { //we have to save the modified name

      var href = editable.getAttribute("href");

      //send the data to the server
      var newName = editable.innerText;

      var updatedTrack = {
        'name' : newName
      }

      
      doJSONRequest("PUT", href, null, updatedTrack, disableEditing);

      function disableEditing(){
        
        editable.contentEditable = "false";

        removeClass(target.firstChild, "fa-check");

        removeClass(target.firstChild, "fl-tl-check");

        addClass(target.firstChild, "fa-pencil");

        addClass(target.firstChild, "fl-tl-pencil");

      }

    }

  }

  /* Library */

  /* Artists */

  function drawArtists(e, addHistory){
    
    if(e && e.target){
      e.preventDefault();
    }

    addArtistsToHistory(addHistory);

  //execute the AJAX call to get the artists
  doJSONRequest("GET", "/artists", null, null, renderArtists);

  function renderArtists(artists){
    //create the data object with the structure expected by the compiled view
    var data = {
      "artists" : artists
    }

    dust.render("artists", data, function(err, out) {

      var content = document.getElementById("content");

      content.innerHTML = out;

      bindArtistLink();

      bindArtistDelete();
      

    });

    //console.log(artists);
  }

}

function addArtistsToHistory(addHistory){
 if((("undefined" == typeof addHistory)
  || (addHistory === null))
  || addHistory==true){
  var state = {
    'function' : 'drawArtists'
  };

  addToHistory(JSON.stringify(state), "/#artists");
}
}

function drawArtist(e, addHistory){

  var href;

  if(e && e.target){
    e.preventDefault();
    href = e.target.getAttribute("href");
  } else {
    href = e;
  }

  addArtistToHistory(href, addHistory)

    //execute the AJAX call to the get a single artist
    doJSONRequest("GET", href, null, null, renderArtist);

    function renderArtist(artist){

        //we need the artist's tracks
        doJSONRequest("GET", "/tracks?filter=" + encodeURIComponent(JSON.stringify({'artist' : artist._id})), null, null, renderShowArtist);

        function renderShowArtist(tracks){

          var artistData = [];
          var artistTracks = buildTracksData(tracks);

          artistData.artwork = artist.artwork;
          artistData._id = artist._id;
          artistData.name = artist.name;
          artistData.genre = artist.genre;

          var data = {
            "artist" : artistData,
            "tracks" : artistTracks
          };

          dust.render("artist", data, function(err, out) {

            var content = document.getElementById("content");

            content.innerHTML = out;

            bindArtistLink();

            bindAlbumLink();

            bindTracksDelete();

            bindEditTrackName();

          });
        }

      }
    }

    function addArtistToHistory(href, addHistory){
      if((("undefined" == typeof addHistory)
        || (addHistory === null))
        || addHistory==true){
        var state = {
          'function' : 'drawArtist',
          'href'   : href
        };

        addToHistory(JSON.stringify(state), "/#" + href);
      }
    }

    function bindArtistLink(){
      var artists = document.querySelectorAll(".artist-link");

      for (var elem = 0; elem < artists.length; ++elem) {
        //console.log(artists[elem])
        artists[elem].onclick = drawArtist;
      }
    }

    function bindArtistDelete(){
      var artists = document.querySelectorAll(".delete-btn");

      for (var elem = 0; elem < artists.length; ++elem) {
      //console.log(albums[elem])
      artists[elem].onclick = deleteArtist;
    }
  }

  function deleteArtist(e){

    var href;
    var target = e.target;

    if(e && e.target){
      e.preventDefault();
      href = target.getAttribute("href");
    }

    //execute the AJAX call to the delete a single album
    doJSONRequest("DELETE", href, null, null, removeArtist);

    function removeArtist(){

      //console.log(responseText);

      //console.log(target);

      var toDelete = target.parentNode.parentNode;
      var parent = document.getElementById("artists-list");

      parent.removeChild(toDelete);

    }

  }

  /* Artists */

  /* Albums */

  function drawAlbums(e, addHistory){
    if(e && e.target)
      e.preventDefault();

    addAlbumsToHistory(addHistory);

  //execute the AJAX call to the get albums
  doJSONRequest("GET", "/albums", null, null, renderAlbums);

  function renderAlbums(albums){

    var albumData = [];
  count =0;
  for(album in albums){
    if(albums[album].like=="no"){
      count=count+1;
    }
   
  }
    if(count == albums.length){
    
      for(album in albums){
        
        var newAlbumData = {};
        newAlbumData.artist = {};

        newAlbumData.artwork = albums[album].artwork;
        newAlbumData._id = albums[album]._id;
        newAlbumData.name = albums[album].name;
        newAlbumData.artist._id = albums[album].artist._id;
        newAlbumData.artist.name = albums[album].artist.name;
        newAlbumData.like = albums[album].like;
        albumData.push(newAlbumData);
      
      }
      
    
    var data = {
      "albums" : albumData,
    
    };


    dust.render("albums", data, function(err, out) {

      var content = document.getElementById("content");

      content.innerHTML = out;

      bindAlbumLink();

      bindAlbumDelete();

      bindArtistLink();
      bindAlbumlink2();
      bindAlbumlink3();
    
    });
}
 else{
      m=1;
      showsss();
      
    } 

}

}

function addAlbumsToHistory(addHistory){
  if((("undefined" == typeof addHistory)
    || (addHistory === null))
    || addHistory==true){
    var state = {
      'function' : 'drawAlbums'
    };

    addToHistory(JSON.stringify(state), "/#albums");
  }
}

function drawAlbum(e, addHistory){
  var href;

  if(e && e.target){
    e.preventDefault();
    href = e.target.getAttribute("href");
  } else {
    href = e;
  }

  addAlbumToHistory(href, addHistory);

    //console.log(target.getAttribute("href"));

    //execute the AJAX call to the get a single album
    doJSONRequest("GET", href, null, null, renderAlbum);

    function renderAlbum(album){

        //we need the album's tracks
        doJSONRequest("GET", "/tracks?filter=" + encodeURIComponent(JSON.stringify({'album' : album._id})), null, null, renderShowAlbum);

        function renderShowAlbum(tracks){
          
          var albumData = [];
          var albumTracks = buildTracksData(tracks);
          
          albumData.artist = {};
          
          albumData.artwork = album.artwork;
          albumData._id = album._id;
          albumData.name = album.name;
          albumData.label = album.label;
          albumData.dateReleased = album.dateReleased.split("T")[0];
          albumData.artist._id = album.artist._id;
          albumData.artist.name = album.artist.name;
          albumData.like = album.like;
          

          var data = {
            "album" : albumData,
            "tracks" : albumTracks
          };
          
          dust.render("album", data, function(err, out) {

            var content = document.getElementById("content");

            content.innerHTML = out;

            bindAlbumLink();

            bindArtistLink();

            bindTracksDelete();

            bindEditTrackName();
            bindAlbumlink2();
            bindAlbumlink3();
          });

        }
     

      }
    }

    function addAlbumToHistory(href, addHistory){
      if((("undefined" == typeof addHistory)
        || (addHistory === null))
        || addHistory==true){
        var state = {
          'function' : 'drawAlbum',
          'href'   : href
        };

        addToHistory(JSON.stringify(state), "/#" + href);
      }
    }

    function bindAlbumLink(){
      var albums = document.querySelectorAll(".album-link");
      
      for (var elem = 0; elem < albums.length; ++elem) {
      //console.log(albums[elem])
      albums[elem].onclick = drawAlbum;
    }
    
  }
  function bindAlbumlink2(){
    var albums2 = document.querySelectorAll(".glyphiconss");
      for (var elem = 0; elem < albums2.length; ++elem) {
      
      albums2[elem].onclick = showss;
  }
 }
function bindAlbumlink3(){
    var albums3 = document.querySelectorAll(".glyphiconsss");
      for (var elem = 0; elem < albums3.length; ++elem) {
      
      albums3[elem].onclick = showsss;
  }
  clicker();
 }
  function bindAlbumDelete(){
    var albums = document.querySelectorAll(".delete-btn");

    for (var elem = 0; elem < albums.length; ++elem) {
      // console.log(albums[elem])
      albums[elem].onclick = deleteAlbum;
    }
  }

  function deleteAlbum(e){

    var href;
    var target = e.target;

    if(e && e.target){
      e.preventDefault();
      href = target.getAttribute("href");

    }

    //execute the AJAX call to the delete a single album
    doJSONRequest("DELETE", href, null, null, removeAlbum);

    function removeAlbum(){

      var toDelete = target.parentNode.parentNode;
      var parent = document.getElementById("albums-list");

      parent.removeChild(toDelete);

    }

  }
  
  function showss(e){
    var href;
    var like;
    var target = e.target;
    
    if(e && e.target){
      e.preventDefault();
      href = target.getAttribute("href");
      like=target.getAttribute("like");
      
    }
   
    
    if(like=="yes"){
      like = "no";
     
    
    }
    else {
      like = "yes";
    }
    var data = {
      'like':like,
      }
   
   
    doJSONRequest("PUT",href, null, data, disableEditing);
     function disableEditing(){
      m=1;
      showsss();

      }

}
function clicker(){
     var content2 = document.getElementById("favorite");
   if(content2){
      if (m==0){
          
            removeClass(content2.firstChild, "yes2");
          addClass(content2.firstChild, "glyphiconsss");
        }
    else{
          removeClass(content2.firstChild, "glyphiconsss");
          addClass(content2.firstChild, "yes2");
          
        
        }
  
      }
}
var m = 0;
function showsss(){
   
  doJSONRequest("GET", "/albums", null, null, renderAlbums);

  function renderAlbums(albums){

    var albumData = [];

    for(album in albums){
        if (m == 0){
          if (albums[album].like == "yes"){
              var newAlbumData = {};
              newAlbumData.artist = {};

              newAlbumData.artwork = albums[album].artwork;
              newAlbumData._id = albums[album]._id;
              newAlbumData.name = albums[album].name;
              newAlbumData.artist._id = albums[album].artist._id;
              newAlbumData.artist.name = albums[album].artist.name;
              newAlbumData.like = albums[album].like;
              albumData.push(newAlbumData);

          }
             
        }
        else {
          var newAlbumData = {};
              newAlbumData.artist = {};

              newAlbumData.artwork = albums[album].artwork;
              newAlbumData._id = albums[album]._id;
              newAlbumData.name = albums[album].name;
              newAlbumData.artist._id = albums[album].artist._id;
              newAlbumData.artist.name = albums[album].artist.name;
              newAlbumData.like = albums[album].like;
              albumData.push(newAlbumData);
        }

    
      }
   
    if (m==0){
        m = 1;
         
       } 
      else{
        m=0;
       
       
      }
    
    

    var data = {
      "albums" : albumData,
    
    };

    dust.render("albums", data, function(err, out) {

      var content = document.getElementById("content");

      content.innerHTML = out;

      bindAlbumLink();

      bindAlbumDelete();

      bindArtistLink();
     bindAlbumlink2();
    bindAlbumlink3();
      
    });
 
  }

}
  /* Albums */

  /* UI */

  /* History Navigation */

  /*
 * The addToHistory function push the @param{state} and the @param{url} in the history State
 *
 * @param {JSON String} state The current state of the search form's button
 * @param {String} url The current url as long with the hash
 */
 function addToHistory(state, url){

  history.pushState(state, null, url);

  //console.log("Added to history: " + url + ", state: " + state);

}

/*
 * The updatePage function handles the update of the page when an onpopstate or onload event is fired.
 * The function gets the hash and the current state, calls the ajaxFind function to update the view
 * and update the form's input value with the data retrieved from the hash
 *
 * @param {JSON String} state The current state of the search form's button
 * @param {String} url The current url as long with the hash
 */
 function updatePage(event) {

  //get reference to the hash and to the current state
  var hash = document.location.hash;
  if(event && event.state)
    var currentState = JSON.parse(event.state);

  if(currentState){

    //console.log(hash);
    //console.log(currentState);

    if(currentState.function == 'drawLibrary')
      drawLibrary(null, false);
    else if(currentState.function == 'drawArtist')
      drawArtist(currentState.href, false);
    else if(currentState.function == 'drawAlbum')
      drawAlbum(currentState.href, false);
    else if(currentState.function == 'drawAlbums')
      drawAlbums(null, false);
    else if(currentState.function == 'drawArtists')
      drawArtists(null, false);

  } else if(hash){

    //console.log(hash);
    //console.log(currentState);

    if(hash.indexOf("library") > -1)
      drawLibrary(null, false);
    else if(hash.indexOf("#artists/") > -1)
      drawArtist(hash.replace("#",""), false);
    else if(hash.indexOf("#albums/") > -1)
      drawAlbum(hash.replace("#",""), false);
    else if(hash.indexOf("albums") > -1)
      drawAlbums(null, false);
    else if(hash.indexOf("artists") > -1)
      drawArtists(null, false);

  } else {
    drawLibrary(null, false);
  }

}

//bind the window onpopstate event to the updatePage function
window.onpopstate = updatePage;

/* History Navigation */

/* Search */

function setupSearch(){
  var searchBox = document.getElementById("main-search");
  if(searchBox){
  searchBox.addEventListener("input", function(){
    var split = this.value.split(" ");

    result = fuzzyFind(model.tracks, "name", this.value);

    if(this.value.trim() === ""){
      drawLibrary();
      return;
    }


    var container = document.getElementById('tracks-list');
    var classList = container.classList;

    var newHtml = '<div class="fl-tl-thead fl-tl-row">\n\
    <div class="fl-tl-th fl-tl-name">Song</div>\n\
    <div class="fl-tl-th fl-tl-artist">Artist</div>\n\
    <div class="fl-tl-th fl-tl-album">Album</div>\n\
    <div class="fl-tl-th fl-tl-time">Time</div>\n\
    </div>';

    newHtml += createHTMLLibrary(result);

    container.innerHTML = newHtml;
  })
}
}

function find(arr, prop, val){
  var res = [];
  arr.forEach(function(item){
    if("undefined" !== item[prop]
      && item[prop] === val){
      res.push(item)
  }
});
  return res;
}

function findOne(arr, prop, val){

  for (var i=0, l=arr.length; i<l; i++){
    var item = arr[i];
    if("undefined" !== item[prop]
      && item[prop] === val){
      return item;
    }
  }
}

function findFirstAlbumInCollection(model, prop, array) {
  console.log(model, prop, array);
  for(var key in array) {
    for (var i=0, l=model.length; i<l; i++){
      var item = model[i];
      if("undefined" !== item[prop]
          && item[prop] === array[key]){
        return item;
      }
    }
  }

  return undefined
}

/* Search */

/* Playlist: Not working after the switch to AJAX */
function setupPlaylists(){

  loadPlaylistsFromLocalStorage();

  var createPlBtn = document.getElementById("create-pl-btn");
  if(createPlBtn){
  createPlBtn.addEventListener('click', function(){

    localStorage.pl_cnt =  localStorage.pl_cnt || 0;
    // var cnt = localStorage.pl_cnt;
    var cnt=0;
      for (var elem = 0; elem < document.querySelectorAll("#playlists > li").length; ++elem) {
          cnt++;
  }
  
    var _id = "pl-"+cnt
    var name = 'New Playlist ' + (++cnt);
    var newPlaylist =  playlist(_id, name, currentuserId, []);
    var data ={

      'name' : name,
      'tracks' : [],
      'dateCreated' : Date.now,
      'specialId' : _id,
    }
   
      doJSONRequest("PUT", 'users/'+currentuserId+'/playlists', null, data, fun);
  function fun(){};

  putActivity("createNewPlaylist", 'playlists/'+encodeURI(name), _id,name);
  // console.log(currentUsers[1].playlists)
    //update localStorage counter
    // localStorage.pl_cnt = cnt;

    //persist to localStorage
    // savePlaylist(newPlaylist);
    appendNewPlaylistToMenu(newPlaylist);
  })
}
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn') ) {
      return onEditPlaylistClicked(e.target,e)
    }

    if (e.target.classList.contains('pl-name-input') ) {
      return e.preventDefault();
    }

    if (e.target.classList.contains('pl-name') ) {
      
      sum =0;
      console.log(e.target)
      e.preventDefault();
      onPlaylistClicked(e.target)
    }

    //the click was outside an edit element, close currently edited ones
    var currentlyEditing = document.querySelectorAll('#playlists > li.edit .edit-btn');
    for (var i = currentlyEditing.length - 1; i >= 0; i--) {
      onEditPlaylistClicked(currentlyEditing[i],e);
    };

  });
}


function allowDrop(evt) {
  evt.preventDefault();
}

function drag(evt) {
  evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
  // console.log(evt.currentTarget.id)
}

function drop(evt) {
  evt.preventDefault();
  var trackId = evt.dataTransfer.getData("text/plain");
  var playlistId = evt.currentTarget.id
  
  addTrackToPlaylist(playlistId, trackId)
}

function addTrackToPlaylist(playlistId, trackId){

  var playlists =  JSON.parse(localStorage.playlists);
  var pl = playlists[playlistId];
  doJSONRequest("GET", "/tracks", null, null, funs);
  function funs(track){

    for (var i = 0; i < track.length; i++) {
      if(track[i]._id = trackId){
        pl = track[i];
      }
    };
  
  if(pl){
  var data ={
      'tracks' : trackId,
      'playlistId' : playlistId,

    }
   
      doJSONRequest("PUT", 'users/'+currentuserId+'/playlists/'+playlistId, null, data, fun);
  function fun(){};
  // console.log(playlistId,trackId)
  // var pl = playlists[playlistId];
  
  // // putter(trackId,pl.tracks.length);
  // if(typeof pl === "undefined"){
  //   throw new Error("playlist doesn't exist in localStorage")
  // }

  // var track = findOne(currentTracks, "_id", trackId);
  // if(typeof track === "undefined" || track === null){
  //   throw new Error("track doesn't exist in the model")
  // }

  // pl.tracks.push(trackId);

  // //persist
  // playlists[playlistId]= pl;
  // localStorage.playlists = JSON.stringify(playlists);
}
else{

  var track = temprary.dataset["for"];

    var data ={
      'tracks' : trackId,
      'playlistId' : playlistId,
      'trackId'  : track,
    }
   
      doJSONRequest("PUT", 'users/'+currentuserId+'/playlists/'+track+'/dragAndDrop', null, data, fun);
  function fun(){};
}
}
}
function generatePlaylistArtwork(id) {
  
  var canvas = document.getElementById('playlistArtworkCanvas')
  var ctx = canvas.getContext('2d')

   emptyPlaylistArtwork()

  var w2 = canvas.width/2
  var h2 = canvas.height/2

  var images = artworks;

  for(var i in images) {

    var tempImage = new Image()
    tempImage.pos = i
    tempImage.onload = function(evt) {
      var pos = this.pos
      var x = (pos/2 >=1) ? w2: 0;
      var y = (pos%2 ==1) ? h2: 0;
      ctx.drawImage(evt.target,x,y , w2, h2);
    }
    //load image
    tempImage.src = images[i];
  };
}
function emptyPlaylistArtwork() {
  var canvas = document.getElementById('playlistArtworkCanvas')
  var ctx = canvas.getContext('2d')

  ctx.fillStyle="#F0F0F0";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.stroke();
}
var artworks = [];
function get4PlaylistImages(id){
  // var pp = JSON.parse(localStorage.playlists)
  // console.log(pp)
  // if(!pp[id]) throw new Error('No playlist for id: ' + id);
  var tracks;
  doJSONRequest("GET", '/users/'+currentuserId+'/playlists/'+id, null, null, renderTra);
    function renderTra(tracksm){

        // var p = pp[id]
       
        tracks = tracksm;
        
        if(!tracks.length) return;

        var seen = {};
        artworks = [];
        for(var i in tracks){
          if(artworks.length == 4) return artworks;
          
          var t = findOne(currentTracks, "_id", tracks[i]);
          if(!t) throw new Error('No track for id: ' + tracks[i]);

          var album = findOne(currentTracks,'_id', t._id)
          album = album.album.artwork;
          
          if(! album) continue;

          // if(seen[album._id]) continue;

          // seen[album._id] = true;
          artworks.push(album);
        }
      
        generatePlaylistArtwork(id);
    }  

}
var temprary;
var sum =0;
function onPlaylistClicked(link){

  // localStorage.playlists = localStorage.playlists || JSON.stringify({});
  // var playlists =  JSON.parse(localStorage.playlists);
  var id = link.dataset["for"];
  //console.log(id);

   doJSONRequest("GET", '/users/'+currentuserId+'/playlists/'+id, null, null, renderTrackmm);
    function renderTrackmm(tracksm){
         var tracks = tracksm;
         
         var container = document.getElementById('tracks-list');
      //     if(!container){
      //   window.location.href = '/library';
      // }
      if(!container){
        
        var newHtml = '<section class="flex-tracklist" id="tracks-list"></section>'
        var containerss = document.getElementById('content');
        containerss.innerHTML = newHtml;
        
      }
      var container = document.getElementById('tracks-list');
     
        var newHtml = '<section id="playlistHeader"><div class="canvas-container"><canvas width="200" height="200" style="border: 1px dashed gray; background-color:transparent;" id="playlistArtworkCanvas"></canvas></div><div class="playlist-info"><div class="playlist-info-name">'+ decodeURI(name) +'</div><div class="playlist-info-track-num">'+tracks.length +' '+'tracks</div></div><hr></section>';
      temprary=link;

      if(container){
        var classList = container.classList;
      }
      var name = link.getAttribute('href').split('/')[1];
      // console.log(tracks)
      
      
      newHtml += '<div class="fl-tl-thead fl-tl-row">\n\
      <div class="fl-tl-th fl-tl-name">Num</div>\n\
      <div class="fl-tl-th fl-tl-name">Song</div>\n\
      <div class="fl-tl-th fl-tl-artist">Artist</div>\n\
      <div class="fl-tl-th fl-tl-album">Album</div>\n\
      <div class="fl-tl-th fl-tl-artist">min</div>\n\
      <div class="fl-tl-th fl-tl-album">mid</div>\n\
      <div class="fl-tl-th fl-tl-artist">max</div>\n\
      <div class="fl-tl-th fl-tl-time">Time</div>\n\
      </div>';
      var i=0;
      tracks.forEach(function(track){
        track = findOne(currentTracks, "_id", track);
        
   
        var artist = findOne(currentArtists, "_id", track.artist._id);
        
        var album = findOne(currentAlbums, "_id", track.album._id);
        
        newHtml+= '<div id="'+ track._id +'"" class="fl-tl-row forbind" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'
        newHtml += '<div class="fl-tl-cell fl-tl-album fl-tl-cell2"><span class="hidden"><input type="int" name="order" maxlength="4" size="4" class=""><br></span>'+ i + '</div>\n';
        newHtml+= '<div class="fl-tl-cell fl-tl-name"><span class="fl-tl-file-link" data-tid='+track._id+' '+ 'href='+"tracks/"+track._id+'>'+track.name+'</span></div>\n';
        newHtml+= '<div class="fl-tl-cell fl-tl-artist"><a href="#artists/'+ encodeURI(track.artist._id)+ '">'+ artist.name +'</a></div>\n';
        newHtml+= '<div class="fl-tl-cell fl-tl-album"><a href="#albums/'+ encodeURI(track.album._id)+ '">'+ album.name +'</a></div>\n';
        newHtml+= '<div class="fl-tl-cell fl-tl-album">'+track.min+'</div>\n';
        newHtml+= '<div class="fl-tl-cell fl-tl-album">'+track.mid +'</div>\n';
        newHtml+= '<div class="fl-tl-cell fl-tl-album">'+track.max +'</div>\n';
        newHtml+= '<div class="fl-tl-cell fl-tl-time">'+ formatTime(track.duration) + '</div>\n';
        newHtml+= '</div>\n';
        i++;
    
      })

      container.innerHTML = newHtml;

      bindplaylistsong();
      
      get4PlaylistImages(id);
      if (sum == 0){
        forplaylist(tracks);
        sum =1;
      }
      playlistTrack = tracks;

      bindAlbumlink4();
      bindTracksforchangeOrder();
  // bindTracksforchangeOrder2();

}
}
function bindTracksforchangeOrder(){
  var trackfororder = document.querySelectorAll(".fl-tl-cell2");
   
  for (var elem = 0; elem < trackfororder.length; ++elem) {
    trackfororder[elem].onclick = orderforplaylist;
  }
}
// function bindTracksforchangeOrder2(){
//   var trackfororder2 = document.querySelectorAll(".forbind");
   
//   for (var elem = 0; elem < trackfororder2.length; ++elem) {
//     trackfororder2[elem].onclick = order1;
//   }
// }
// function order1(e){
//   arra = [];
//   onPlaylistClicked(e.target);
// }
// function putter(trackId,len){
//       var updatedTrack = {
//         'num' : len,
//       }
      
//       doJSONRequest("PUT", 'tracks/'+trackId, null, updatedTrack, fun);
//   function fun(){};
// }
// function sorteds(ss){
//   var arraa = [];
//   for (var i = 0; i < ss.length; i++) {
//           arraa.push(findOne(currentTracks, "_id", ss[i]));
//   };

//   for (var i = 0; i < arraa.length; i++) {
//       for (var j = 0; j < arraa.length; j++) {
//         if(arraa[i].num < arraa[j].num){
//           var trackChanger = arraa[i];
//           arraa[i] =arraa[j];
//           arraa[j] = trackChanger;
//         }
//     };
//   };
//   return arraa;
// }

function orderforplaylist(e){

  var target = e.target;
  var id = temprary.dataset["for"];
  var z = target.firstChild;
    if(z){
    if(z.classList == "hidden"){
        removeClass(target.firstChild, "hidden");
    }
    else if(z.classList == " hidden"){
      removeClass(target.firstChild, "hidden");
    }
    else{
      addClass(target.firstChild, "hidden");
      var idTemp = e.target.parentNode.getAttribute('id');
      var position = target.firstChild.firstChild.value;
      if(position != ''){
     
 
      var data ={
      'trackNumber' : idTemp,
      'trackId' : id,
      'link' : temprary,
      'position' : position,
      }
   
       doJSONRequest("PUT", 'users/'+currentuserId+'/playlists/'+id+'/changeOrder', null, data, fun);
   function fun(){
      
   };
          
      
     }
	}
  bindTracksforchangeOrder();
    }
  
}
// var arra=[];
// function orderthetrack(idTemp,d){
//   arra =[];
//   var arra2 =[];
//   localStorage.playlists = localStorage.playlists || JSON.stringify({});
//   var playlists =  JSON.parse(localStorage.playlists);
//   var id = temprary.dataset["for"];
//   var playlist = playlists[id];
//   var tracks = playlist.tracks;
//   if(d >= 0 && d <= tracks.length){
//   for (var j = 0; j < tracks.length; j++) {
//           arra.push(findOne(currentTracks, "_id", tracks[j]));
//   };
//  console.log(arra);
//   for (var i = 0; i < arra.length; i++) {

//     if(arra[i]._id == idTemp){
//       var ter = arra[i];
      
//       arra.splice(i, 1)
      
//     }
        
//   };
//   // console.log(arra);
//   arra.splice(d, 0, ter);
//   console.log(arra);
//   for (var k = 0; k < arra.length; k++) {
      
        
//   };
//   // arra = sorter(arra);
//   onPlaylistClicked(temprary);
// }
// else {
//   bindTracksforchangeOrder();
//   return;
// //   // ----------------------------------------------------------------------------------
// }
// }
// function sorter(ss){
//   for (var i = 0; i < ss.length; i++) {
//       for (var j = 0; j < ss.length; j++) {
//         if(ss[i].num < ss[j].num){
//           var trackChanger = ss[i];
//           ss[i] =ss[j];
//           ss[j] = trackChanger;
//         }
//     };
//     return ss;
//   }
// }

var arrayforplaylist =[];
function forplaylist(tracks){
  arrayforplaylist =[];
  arrayforplaylist=tracks;   
}


function bindplaylistsong() {
  // body...
  var albums3 = document.querySelectorAll(".fl-tl-file-link");
          for (var elem = 0; elem < albums3.length; ++elem) {
           number =1;
          albums3[elem].onclick = increseMinplaylist;
          
      }
}
function increseMinplaylist(e){

  if(audio.getAttribute("src")){
    var i = audio.getAttribute("src");
    i = i.split('/')[1].split('.')[0];
  }
  else{
    var i = 0;
  }
      var href;
      var datatid;

    if(e){
      var target = e.target;

    
    
      href = target.getAttribute("href");
      datatid = target.getAttribute("data-tid");
    
    
  }
  else {
  
    href = 'tracks/'+currentTracks[i-1]._id;
     datatid = currentTracks[i-1]._id;
  }
 
    playTrackById(datatid);
//     doJSONRequest("GET", "/tracks", null, null, renderTrack);
//     function renderTrack(tracks){
//       for (var elem = 0; elem < tracks.length; ++elem) {
      
//             if('tracks/'+tracks[elem]._id == href ){
              
//                min = tracks[elem].min;
//                 var data2 = {
//                     'min':(min*1)+1,
                    
//                   }

//                   doJSONRequest("PUT",href, null, data2, def);
//                   function def(){
//                       // render();
//                       numbe=0;
//                   };

                
//              }
//           }
            
// }
}

function client(e){
  e.preventDefault();
}

 
var playlist_name;
function onEditPlaylistClicked(btn,e){
  var id = btn.dataset["for"];
 e.preventDefault();
  var el = document.getElementById(id);
  var input = document.getElementById(id);
  input = input.querySelector('input')
  
  if(el.classList.contains("edit")){
    el.classList.remove('edit')
    btn.innerHTML = '<i class="fa fa-pencil" ></i>'
    var input = document.getElementById(id);
    input = input.querySelector('input')

    var nameLink =  document.getElementById(id).firstChild;
     //return on empty string
     if(input.value.trim() == '') return;

     nameLink.innerHTML = '<i class="nav-menu-icon fa fa-bars"></i> ' + input.value;
     nameLink.href = "playlists/" + encodeURI(input.value)
     
     //persist change
   
     var data ={
      'name': input.value,
      'playlistId': id,

     }
      doJSONRequest("PUT", 'users/'+currentuserId+'/playlists/'+id, null, data, fun);
  function fun(){
      // window.location.href = '/library'
      // onPlaylistClicked(temprary);
      var change_name = document.getElementById(playlist_name);
      change_name.innerHTML = input.value;
      change_name.setAttribute('id',input.value)
      // console.log(changen.firstChild)
  };
     // var playlists =  JSON.parse(localStorage.playlists);
     // playlists[id]["name"] = input.value;
     // localStorage.playlists = JSON.stringify(playlists);
   }else{
    playlist_name = input.value; 
    console.log(playlist_name)
    el.classList.add('edit')
    btn.innerHTML = '<i class="fa fa-check" ></i>'
    input.focus();
  }
}

function loadPlaylistsFromLocalStorage(){
  // localStorage.playlists = localStorage.playlists || JSON.stringify({});
  doJSONRequest("GET", "/users/"+currentuserId+"/playlist", null, null, renderTra);
  function renderTra(playlis){
 
  
      var playlists =  playlis;
      //merge localStorage playlists with model playlists
      /*
      model.playlists.forEach(function(playlist){
        if (!playlists.hasOwnProperty(playlist._id))
          playlists[playlist._id] = playlist;
      });
    */

    var keys = Object.keys(playlists);

    var newHtml ='';
    keys.forEach(function(key){
      
      appendNewPlaylistToMenu(playlists[key]);
    });

  //persist playlists
  // localStorage.playlists = JSON.stringify(playlists);
}
}

function appendNewPlaylistToMenu(pl){
  var id = pl._id;
  var name = pl.name;
  var newHtml ='';
  newHtml += '  <li id="' + id + '" ondrop="drop(event)" ondragover="allowDrop(event)">';
  newHtml += '    <a class="pl-name" data-for="' + id + '" href="playlists/' + encodeURI(name) + '">';
  newHtml += '      <i class="nav-menu-icon fa fa-bars"></i>'+'<i id='+'"'+ name +'"'+' >'+name+'</i>';
  newHtml += '    </a>';
  newHtml += '    <a class="edit-btn" data-for="' + id + '" href="#"><i class="fa fa-pencil"></i></a>';
  newHtml += '    <input  class="pl-name-input" id="'+id+'" name="' + id + '" type="text" value="' + name + '">';
  newHtml += '  </li>';
  if(document.getElementById('playlists')){
  document.getElementById('playlists').innerHTML += newHtml;
}

}
/* Playlist: Not working after the switch to AJAX */

/* Player */
function showSort(){
 
  doJSONRequest("GET", "/tracks", null, null, renderTrack);
    function renderTrack(tracks){
          currentTracks = tracks;

            var tracksData = buildTracksData(tracks);
            for (var i = 0; i < tracksData.length; i++) {
                for (var j = 0; j < tracksData.length; j++) {
                  if(tracksData[i].min > tracksData[j].min){
                    var trackChanger = tracksData[i];
                    tracksData[i] =tracksData[j];
                    tracksData[j] = trackChanger;
                  }
              };
            };
           sorted(tracksData);

            
 }
}
 function showSort2(){
 
  doJSONRequest("GET", "/tracks", null, null, renderTrack);
    function renderTrack(tracks){
          currentTracks = tracks;

            var tracksData = buildTracksData(tracks);
            for (var i = 0; i < tracksData.length; i++) {
                for (var j = 0; j < tracksData.length; j++) {
                  if(tracksData[i].mid > tracksData[j].mid){
                    var trackChanger = tracksData[i];
                    tracksData[i] =tracksData[j];
                    tracksData[j] = trackChanger;
                  }
              };
            };
           sorted(tracksData);

            
 }
}
 function showSort3(){
  
 
  doJSONRequest("GET", "/tracks", null, null, renderTrack);
    function renderTrack(tracks){
          currentTracks = tracks;

            var tracksData = buildTracksData(tracks);
            for (var i = 0; i < tracksData.length; i++) {
                for (var j = 0; j < tracksData.length; j++) {
                  if(tracksData[i].max > tracksData[j].max){
                    var trackChanger = tracksData[i];
                    tracksData[i] =tracksData[j];
                    tracksData[j] = trackChanger;
                  }
              };
            };
           sorted(tracksData);

            
 }
}
 function sorted(tracksData){  
            var data = {
              "tracks" : tracksData
            };         
            dust.render("tracks", data, function(err, out) {

              var content = document.getElementById("content");
               
              content.innerHTML = out;

              bindAlbumLink();

              bindArtistLink();

              bindTracksDelete();

              bindEditTrackName();

              // setupPlayer();
              
              bindAlbumlink4();
                  
                  
            });
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
//---------------------------countmin--------------------------------------------------
var min;
var songNum = 0;
 function findpage(){
    var container = document.getElementById('tracks-list');
        
        if(container.firstChild.id == "playlistHeader"){
              
              return true;
          }
          else{
            return false;
          }
  }
function render(){
    doJSONRequest("GET", "/tracks", null, null, renderTrack);
    function renderTrack(tracks){
          currentTracks = tracks;

            var tracksData = buildTracksData(tracks);

            var data = {
              "tracks" : tracksData
            };
            
            dust.render("tracks", data, function(err, out) {

              var content = document.getElementById("content");
              var x = findpage();
              
              if (x == false){
                  content.innerHTML = out;
              }
              else{
                onPlaylistClicked(temprary);
              }

              
              bindAlbumLink();

              bindArtistLink();

              bindTracksDelete();

              bindEditTrackName();

              // setupPlayer();
              
              bindAlbumlink4();
                  
                  
            });
}
}

function bindAlbumlink4(){
    var albums3 = document.querySelectorAll(".fl-tl-file-link");
      for (var elem = 0; elem < albums3.length; ++elem) {
      number =1;
      albums3[elem].onclick = increaseMin2;
  }

 }

 function increaseMin2(e){

    if(audio.getAttribute("src")){
    var i = audio.getAttribute("src");
    i = i.split('/')[1].split('.')[0];
  }
  else{
    var i = 0;
  }
      var href;
      var datatid;

    if(e){
      var target = e.target;

    
    
      href = target.getAttribute("href");
      datatid = target.getAttribute("data-tid");
    
    
  }
  else {
  
    href = 'tracks/'+currentTracks[i-1]._id;
     datatid = currentTracks[i-1]._id;
  }
    // console.log(datatid);
    playTrackById(datatid);
    increseMin(href)
 }
function increseMin(href){
  //   // if(arrayforplaylist.length == 0){
  //   //   for (var i = 0; i < currentTracks.length; i++) {
  //   //       arrayforplaylist.push(currentTracks[i]._id);

  //   //     }
  //   // }
    
  // if(audio.getAttribute("src")){
  //   var i = audio.getAttribute("src");
  //   i = i.split('/')[1].split('.')[0];
  // }
  // else{
  //   var i = 0;
  // }
  //     var href;
  //     var datatid;

  //   if(e){
  //     var target = e.target;

    
    
  //     href = target.getAttribute("href");
  //     datatid = target.getAttribute("data-tid");
    
    
  // }
  // else {
  
  //   href = 'tracks/'+currentTracks[i-1]._id;
  //    datatid = currentTracks[i-1]._id;
  // }
  //   // console.log(datatid);
  //   playTrackById(datatid);
    
  //   // for (var j = 0; j < arrayforplaylist.length; j++) {
  //   //    if(arrayforplaylist[j]==datatid){
  //   //         arrayforplaylist.splice(0, j+1);
  //   //    }
  //   //  };
    
    doJSONRequest("GET", "/tracks", null, null, renderTrack);
    function renderTrack(tracks){
      for (var elem = 0; elem < tracks.length; ++elem) {
      
            if('tracks/'+tracks[elem]._id == href ){
              
               min = tracks[elem].min;
                var data2 = {
                    'min':(min*1)+1,
                    
                  }

                  doJSONRequest("PUT",href, null, data2, def);
                  function def(){
                      render();
                      numbe=0;
                  };

                
             }
          }
            
}
}

//---------------------------countmin--------------------------------------------------
  var number=0;
  var numbe=0;
  var audiocontrol =0;
function setupPlayer(){
  // Buttons

  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("full-screen");
  var volumeOff = document.getElementById("volume-off");
  var volumeUp = document.getElementById("volume-up");
  var nextButton = document.getElementById("next");
  var previousButton = document.getElementById("previous");

  // Sliders
  var seekRail = document.getElementById("pl-timeline-rail");
  var seekBar = document.getElementById("pl-timeline-bar");
  var volumeRail = document.getElementById("pl-volume-rail");
  var volumeBar = document.getElementById("pl-volume-bar");

  //Labels
  var timeElapsed = document.getElementById("time-elapsed");
  var timeTotal = document.getElementById("time-total");

  // Audio element
  audio = document.createElement('audio');

  var timess;
  // every time the metadata are loaded for a track update the progress bar
  audio.addEventListener("loadedmetadata",function(){
    //set total time
    timeTotal.innerHTML = formatTime(Math.floor(audio.duration));
    
    //set volume
    volumeBar.style.width = (audio.volume * 100) + "%";
  });

  document.body.appendChild(audio);
  if (currentTracks){
       if (audiocontrol == 0){
            playTrackById(currentTracks[0]._id);
            audiocontrol =1;
        }
    }
  
  //------------------------------------countMid----------------------------------------
  
  function increaseMid(){
    var mid;
    var i = audio.getAttribute("src");
    i = i.split('/')[1].split('.')[0];
    i = i-1;
      
    
    
    var href = 'tracks/'+currentTracks[i]._id;
    doJSONRequest("GET", "/tracks", null, null, renderTrack);
    function renderTrack(tracks){
      for (var elem = 0; elem < tracks.length; ++elem) {
      
            if(tracks[elem]._id == currentTracks[i]._id){
              
               mid = tracks[elem].mid;
                var data2 = {
                    'mid':parseInt(mid)+1,
                    
                  }

                  doJSONRequest("PUT",href, null, data2, def);
                  function def(){
                      render();

                  };

                
             }
          }
            
}

  }

  //--------------------------------------------------------------------------------------
 
//------------------------------------countMax----------------------------------------
  function increseMax(){
    var max;
    var i = audio.getAttribute("src");
    i = i.split('/')[1].split('.')[0];
    i = i-1;
      
   
    var href = 'tracks/'+currentTracks[i]._id;
    doJSONRequest("GET", "/tracks", null, null, renderTrack);
    function renderTrack(tracks){
      for (var elem = 0; elem < tracks.length; ++elem) {
      
            if(tracks[elem]._id == currentTracks[i]._id){
                
               max = tracks[elem].max;
                var data2 = {
                    'max':parseInt(max)+1,
                    
                  }

                  doJSONRequest("PUT",href, null, data2, def);
                  function def(){
                      render();
                      numbe=0;

                  };

                
             }
          }
            
}

  }


  //--------------------------------------------------------------------------------------
  // Event listener for the play/pause button



  // Event listeners for the previous/next buttons
  if(nextButton){
  nextButton.addEventListener("click", function() {
    if(! currentPlayingTrack) return;
    var currentIdx =  currentTracks.indexOf(currentPlayingTrack);

    if(currentIdx == -1) {
      return console.log("invalid currentTrack");
    }

    var nextIdx = (++currentIdx < currentTracks.length) ? currentIdx : 0
    playTrackById( currentTracks[nextIdx]._id);
  });

   previousButton.addEventListener("click", function() {
    if(! currentPlayingTrack) return;
    var currentIdx = currentTracks.indexOf(currentPlayingTrack);

    if(currentIdx == -1) {
      return console.log("invalid currentTrack");
    }

    var prevIdx = (--currentIdx > 0) ? currentIdx : (currentTracks.length -1)
    playTrackById( currentTracks[prevIdx]._id);
  });

  // Event listener for the seek bar
  seekRail.addEventListener("click", function(evt) {
    var frac = (evt.offsetX / seekRail.offsetWidth)
    seekBar.style.width = (frac * 100) + "%";
        var zz = (frac * 100) + "%";
          var time = audio.duration * frac;
    // Calculate the new time
    
    // console.log(audio.duration,timer(timeTotal.innerHTML),'------------------',time,'---------------',frac)
      audio.currentTime = time;
      socket.emit('seekBar',zz,time);
    });
    
    // Update the seek bar as the track plays
    audio.addEventListener("timeupdate", function() {
      // Calculate the slider value
      // console.log(songNum,'=========',arrayforplaylist.length)
      var value = (100 / audio.duration) * audio.currentTime;
      if (value==100){
        increseMax();
        
          // var i = audio.getAttribute("src");
          // i = i.split('/')[1].split('.')[0];
        // playTrackById( currentTracks[i-1]._id);
        // increseMin();
        // console.log(i);
          if(mode == "notSuffle"){
              playTrackById( arrayforplaylist[songNum+1]);
              increseMin('tracks/'+arrayforplaylist[songNum]);          }
          else {
            // console.log(Math.floor((Math.random() * arrayforplaylist.length-1) + 1))
            var x = Math.floor(Math.random() * (arrayforplaylist.length - 1));
            
            playTrackById( arrayforplaylist[x]);
           
            increseMin('tracks/'+arrayforplaylist[x]);
            arrayforplaylist.splice(x, 1);
            if(arrayforplaylist.length == 0){
              makeSongArray();

            }        
          }
       
      }
      if (parseInt(value)==0 && number == 0){
        increseMin2();
        number=1;
        
        
      }
      
      if (parseInt(value)>50 && numbe == 0){
        increaseMid();
        numbe=1;
        
      
      }

      // Update the seek bar
      seekBar.style.width = value + "%";

      // Update the elapsed time
      timeElapsed.innerHTML = formatTime(Math.floor(audio.currentTime));
    });
  
    // Event listener for the volume bar
    volumeRail.addEventListener("click", function(evt) {
      var frac = (evt.offsetX / volumeRail.offsetWidth)
      volumeBar.style.width = (frac * 100) + "%";

      audio.volume = frac;
    });

    //Click listener for volume buttons
    volumeOff.addEventListener("click", function(evt) {
      volumeBar.style.width = "0%";
      audio.volume = 0;

      volumeOff.classList.add("active");
      volumeUp.classList.remove("active");
    });

    volumeUp.addEventListener("click", function(evt) {
      volumeBar.style.width = "100%";
      audio.volume = 1;

      volumeUp.classList.add("active");
      volumeOff.classList.remove("active");
    });
  }
}
  addeventlistne();
  function addeventlistne(){
    var playButton = document.getElementById("play-pause");
    if(playButton){
      playButton.addEventListener("click", function() {
    
    if (audio.paused == true) {
      play()
    
    } else {
      pause()
    
    }

    
  });
    }
  }
  var m = document.getElementById("checkbox");
  if(m){
  var checker = m.getAttribute('value');

  m.addEventListener("click", function(){
    // var m = document.getElementById("checkbox");
    
    console.log(checker)
    if(checker == "checked"){
      m.setAttribute("value","unChecked");
     

    }
    else{
      m.setAttribute("value","checked");

    }
    checker = m.getAttribute('value');
  })
}
  function checkConnection(){
    if(checker == "checked"){
      
      return true;
    }
  
    return false

  }

  function seekbarChange(wStyle,time){
    var seekBar = document.getElementById("pl-timeline-bar");
  seekBar.style.width = wStyle;
  audio.currentTime = time;
}
var playPause = true;
  function play(){
    // Play the track
    audio.play();
    if (playPause == true && checkConnection()){
    socket.emit('play',{})
    }
    // Update the button icon to 'Pause'
    var playButton = document.getElementById("play-pause");
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause');
    playPause = false;
  }

  function pause(){
    // Pause the track
    audio.pause();
    if(playPause == false && checkConnection()){
    socket.emit('pause',{})
  }
    // Update the button icon to 'Play'
    var playButton = document.getElementById("play-pause");
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
    playPause = true;
  }

  function playTrackById(trackId){
    increseMin();
    if(checker == "checked" && checkConnection()){
    socket.emit('playSameSong',trackId);
  }
      playTrackById2(trackId);  
  }

  function playTrackById2(trackId){

    for (var ijj = 0; ijj < arrayforplaylist.length; ijj++) {
      if(arrayforplaylist[ijj]==trackId){
        if(arrayforplaylist.length-1 > ijj){
          songNum = ijj;
        }
        else{
            songNum = -1;
        }
        
      }
    };
    if(findOne(currentTracks,"_id",trackId)){
    var Act = findOne(currentTracks,"_id",trackId).name
    putActivity("play",'player/'+trackId,trackId,Act);
       }
    var track = findOne(currentTracks, "_id", trackId);
    
    if(! track) return console.log("playTrackById(): Track not found!")

    currentPlayingTrack = track;

    var artist = findOne(currentArtists, "_id", track.artist._id);
    var album = findOne(currentAlbums, "_id", track.album._id);

    var plTrackArtist = document.querySelector('.pl-track-artist');
    plTrackArtist.href = 'artists/' + artist.name;
    plTrackArtist.innerHTML = artist.name

    var plTrackTitle = document.querySelector('.pl-track-title');
    plTrackTitle.href = 'albums/' + album.name;
    plTrackTitle.innerHTML = currentPlayingTrack.name;

    var moImage = document.querySelector('.pl-artwork .mo-image');
    moImage.style.backgroundImage = "url(" + album.artwork + ")"

    audio.src = track.file;
    play();
  }
  function timer(tim){
            var ti = tim.split(':');
             for (var i = 0; i <1.; i++) {
                var tt=(ti[0]*60) + ti[1]*1;
                
                  return tt;
              };
            }

    
  
  
   

//<!-- /build -->
