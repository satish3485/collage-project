function shouldExist(name, val, shouldBeArray){
  shouldBeArray = shouldBeArray || false;
  if ("undefined" == typeof val 
      || val === null
      || val.toString === ''){
    throw new Error( name + " should exist and not be empty")
  }

  if(shouldBeArray
     && !(val instanceof Array)){
    throw new Error( name + " should be an Array");
  }
}

/**
* Creates a user object.
* @constructor
* @param {string} _id The unique identifier of the user
* @param {string} userName The username of the user
* @param {string} email The email address of the user
* @param {string} password The password for the user account
* @param {string} [firstName] The first name of the user. Default: username
* @param {string} [lastName] The last name of the user. Default: username
* @param {Date} [date_created] The date the user was created.  Default: Date.now()
* @param {Array} [playlists] The playlists of the user. Default: []
* @returns {Object} The newly created user instance
*/
function user(_id, userName, email, password, firstName, lastName, date_created, playlists){
  //required
  shouldExist("_id", _id);
  shouldExist("userName", userName);
  shouldExist("email", email);
  shouldExist("password", password);

  //defaults
  firstName = firstName || userName;
  lastName = lastName || userName;
  date_created = date_created || Date.now();
  playlists = playlists || [];

  return {
    "_id"          : _id,
    "firstName"    : firstName,
    "lastName"     : lastName,
    "userName"     : userName,
    "email"        : email,
    "password"     : password,
    "date_created" : date_created,
    "playlists"    : playlists
  };
}

/**
* Creates a track object.
* @constructor
* @param {string} _id The unique identifier of the track
* @param {string} name The song name
* @param {string} artist The artist who performs or composed the track. It should be the `_id` of an artist object.
* @param {Number} duration The duration of the track in seconds
* @param {string} file The url of the location of the mp3 file of the track
* @param {Array} [collections] The collections this track is in. Default: []
* @param {Array} [id3Tags] An array of the id3Tags of the mp3 file of the track. Default: []
* @param {Date} [release_date] The date the track was released. Default: Date.now()
* @param {Date} [date_created ]The date the track was created. Default: Date.now()
* @returns {Object} The newly created track instance
*/
function track(_id, name, artist, duration, file, collections, id3Tags, release_date, date_created){
  //required
  shouldExist("_id", _id);
  shouldExist("name", name);
  shouldExist("artist", artist);
  shouldExist("file", file);
  shouldExist("duration", duration);

  //defaults
  collections = collections || [];
  id3Tags = id3Tags || [];
  release_date = release_date || Date.now();
  date_created = date_created || Date.now();
 
  return {
    "_id"          : _id,
    "artist"       : artist,
    "name"         : name,
    "duration"     : duration,
    "file"         : file,
    "collections"   : collections,
    "id3Tags"      : id3Tags,
    "release_date" : release_date,
    "date_created" : date_created
  };
}

/**
* Creates an artist object.
* @constructor
* @param {string} _id The unique identifier of the artist
* @param {string} name The full name of the artist or band
* @param {string} [genre] The genre of the artist. Default: 'rock'
* @param {string} [artwork] The URL of the artwork picture for the artist.  Default: ''
* @param {Date} [date_created] The date the artist was created. Default: Date.now()
* @returns {Object} The newly created artist instance
*/
function artist(_id, name, genre, artwork, date_created){
  //required
  shouldExist("_id", _id);
  shouldExist("name", name);

  //defaults
  genre = genre || 'rock';
  artwork = artwork || '';
  date_created = date_created || Date.now();

  return {
    "_id"          : _id,
    "name"         : name,
    "genre"        : genre,
    "artwork"      : artwork,
    "date_created" : date_created
  };
}

/**
* Creates an abstractSoundCollection object.
* @constructor
* @param {string} _id The unique identifier of the abstractSoundCollection
* @param {string} name The name of the abstractSoundCollection
* @param {string[]} tracks The tracks that this abstractSoundCollection contains. They should be `_id`s of track objects.
* @param {Date} [date_created] The date the abstractSoundCollection was created. Default: Date.now()
* @returns {Object} The newly created abstractSoundCollection instance
*/
function abstractSoundCollection(_id, name, tracks, date_created){
  //required
  shouldExist ("_id", _id);
  shouldExist ("name", name);

  //defaults
  date_created = date_created || Date.now();
  tracks = tracks || [];

  return {
    "_id"          : _id,
    "name"         : name,
    "tracks"       : tracks,
    "date_created" : date_created,
  };
}

/**
* Creates an album object.
* @constructor
* @param {string} _id The unique identifier of the album
* @param {string} name The name of the album
* @param {string} artist The artist who performs in this album. It should be the `_id` of an artist object.
* @param {string} artwork The URL of the artwork picture for the album
* @param {string[]} tracks The tracks that this album contains. They should be `_id`s of track objects.
* @param {Date} [date_created] The date the album was created. Default: Date.now()
* @param {Date} [release_date] The date the album was released. Default: Date.now()
* @param {string} [label] The record label of this album. Default: 'USI-INF records'
* @returns {Object} The newly created album instance
*/
function album(_id, name, artist, artwork, tracks, date_created, release_date, label){
  //super
  var that = abstractSoundCollection(_id, name, tracks, date_created);

  //required
  shouldExist("artwork", artwork);
  shouldExist("artist", artist);

  //defaults
  release_date = release_date || Date.now();
  label = label || 'USI-INF records';

  that.artist = artist;
  that.artwork = artwork;
  that.release_date = release_date;
  that.label = label;
  return that;
}

/**
* Creates a playlist object.
* @constructor
* @param {string} _id The unique identifier of the playlist
* @param {string} name The name of the playlist
* @param {string} owner The owner of this playlist. It should be the `_id` of a user object.
* @param {string[]} tracks The tracks that this playlist contains. They should be `_id`s of track objects.
* @param {Date} [date_created] The date the playlist was created. Default: Date.now()
* @returns {Object} The newly created playlist instance
*/
function playlist(_id, name, owner, tracks, date_created){
  //super
  var that = abstractSoundCollection(_id, name, tracks, date_created);

  //required
  shouldExist("owner", owner);

  that.owner = owner;
  return that;
}


/**
* saves a playlist in localStorage
* - Each playlist is an object with the same schema as model playlists. That is, it has
* the following properties: _id, owner, name, tracks, date_created.
*
* - The playlist is stored in localStorage.playlists[_id]
*
* @param {playlist} pl The playlist instance to save
*/



function getCount(){
  var player = 1;
  if (localStorage.playlists){

    var item = JSON.parse(localStorage.getItem('playlists'));;
    var setter = Object.keys(item).length ;
  }
  else {
    var setter = player;
  }
  return setter;
}



function getId(){
  var setter = 0;
 
  if (localStorage.playlists){
    var item = JSON.parse(localStorage.getItem('playlists'));

    setter = (model['playlists'].length)+ Object.keys(item).length ;
  }
  else {
    setter = model['playlists'].length ;
  }
  return setter;
}

function callSavePlaylist(e){
   var count = getCount();
  var s = getId()+1;
  console.log(s,count);
  var pl = playlist('pl-'+s, 'newplaylist' +"  "+ count, 'owner', 'tracks', 'date_created');
  savePlaylist(pl);
  savePlaylist22(pl);
  count++;
}





function savePlaylist(pl){
  var a = {};
   // Parse the serialized data back into an aray of objects
    if (localStorage.playlists){
      a = JSON.parse(localStorage.getItem('playlists'));
    }
    a[pl._id] = pl;

    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('playlists', JSON.stringify(a));
    


}
function savePlaylist22(pl2){
   var count = getCount(model['playlists']);
    var callfunction = function(){
      var x = event.target;    
      zr = x.innerText;
      playlistView(zr);
      
   }
   var name = pl2.name;
  pl2._id = getId()+1;
  var newHtml ='';
  newHtml += '<li><a class="hidden"><i class="nav-menu-icon fa fa-bars" id="'+pl2._id +'"></i>' + 'newplaylist '+" "+count+' <i onclick=button() id="editors22" class="glyphicon glyphicon-pencil"></li>';

  document.getElementById('playlists').innerHTML += newHtml;

  var ul = document.getElementById('playlists');

  var li = ul.children;

  for(var n =0; n < li.length; n++){
        li[n].addEventListener('click',callfunction);
        // li[n].setAttribute('class')
        

    }


}
var ele = document.getElementById('create-pl-btn');
ele.addEventListener("click", callSavePlaylist);
 
  
 
/**
* This function helps us search the library.
* It iterates over the arr of  objects. For each object it checks if the
* 'prop' in property has term as a substring, . For example, by searching
* "clair", I might find "The Clairvoyant".
* @param {Array}  arr  Array of objects to search
* @param {String} prop The property to be searched inside the objects
* @param {String} term The term that has to match for the search to succeed
* @returns {Array} An array of matching objects
*/
function fuzzyFind(arr, prop, term){
  var tracklistss = [];
  
  if (arr){
    for (var i = 0; i<arr.length;i++){

      var count =  (arr[i][prop].toUpperCase()).indexOf(term.toUpperCase());
      if (count != -1){
        tracklistss.push(arr[i]);
        
      }
    }
  }
  return tracklistss;

}
var durationSet = function(x){
      return parseInt(x / 60) + ":" + x % 60;
    }
var albumFind = function(x){
    for (var j = 0; j < model['albums'].length; j++){
      
        if (x[(x.length)-1] == model['albums'][j]._id)
          return model['albums'][j].name;
      }
     
      
    }
var artistFind = function(x){
  
  for (var i = 0; i < model['artists'].length; i++){
    if ((model['artists'][i]._id) == x){
      return model['artists'][i].name;
    }
  }
}
function search(){

  
      var text = document.getElementById('main-search').value;
      var tracker = fuzzyFind(model["tracks"],"name",text);
      
      var table = "<table class='flex-tracklist tracklist'>";
  
      table += "<tr class='fl-tl-row hidden-row'><th class='fl-tl-th tl-header'>"+"SONG"+"</th><th class='fl-tl-th'>"+"ARTIST"+"</td><th class='fl-tl-th tl-header'>"+"ALBUM"+"</th><th class='fl-tl-time fl-tl-th tl-header tl-time'>"+"TIME"+"</th></tr>";
      for (var i = 0; i < tracker.length; i++) {
           table += "<tr  class='fl-tl-row tl-row' ><td class='fl-tl-cell'>"+tracker[i].name+"</td><td class='fl-tl-cell '>"+artistFind(tracker[i].artist)+"</td><td class='fl-tl-cell'>"+albumFind(tracker[i].collections)+"</td><td class='fl-tl-cell'>"+albumFind(tracker[i].collections)+"</td><td class='fl-tl-time fl-tl-cell'>"+durationSet(tracker[i].duration)+"</td></tr>";
    
      }
      if (document.getElementById("tracklist")){
        document.getElementById("tracklist").innerHTML= table;
      }
      if (document.getElementById("albums")){
        document.getElementById("albums").innerHTML= table;
      }
      if (document.getElementById("artists")){
        document.getElementById("artists").innerHTML= table;
      }
    
  
  
}