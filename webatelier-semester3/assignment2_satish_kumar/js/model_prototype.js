/**
* Constructor Artist
* @constructor
* @param {string} id The unique identifier of the artist. REQUIRED
* @param {string} name The full name of the artist or band. REQUIRED
* @param {string} genre The genre of the artist. Default: 'rock'. OPTIONAL
* @param {string} artwork The URL of the artwork picture for the artist.  Default: ''. OPTIONAL
* @param {Date} date_created The date the artist was created. Default: Date.now(). OPTIONAL
* @returns {Object} The newly created artist instance.
* @throws Error 100: if a required variable is undefined/null/empty.
* @throws Error 101: if a required variable is of an unexpected type.
* @throws Error 101: if an optional variable is of an unexpected type.
*/
function Artist(_id, name, genre, artwork, date_created){
	var _id=_id;
	if (_id === undefined){
		throw new Error(100);
	};

	if (name === undefined){
			throw new Error(100);
		};
	
	if (typeof _id != "string"){
		throw new Error(101);
	};

	var genre=genre || 'rock';
	if (typeof  genre!= "string"){
		throw new Error(101);
	};
	var date_created=date_created || "";
	if (typeof  date_created != "string"){
		throw new Error(101);
	};
	
	this.name=name;
	this.artwork=artwork || '';
		
	this.toJSON=function(x){
		return typeof x;
	};
	this.toObject=function(){
			// Why do you want to use 'JSON.<something>'
		return {
			"_id": _id,
			"artwork": artwork,
  			"date_created": date_created,
  			"genre": genre,
  			"name": name,
		};
			
	};
	this.getGenreString=function(){
		return genre;
	};
	this.getDateCreatedString=function(){
		return date_created;
	};
	this.getId=function(){
		return _id;
	};
	this.localToJSON = function(){
			return globalToJSON;
		};
		
	return this;
};

Artist.prototype.toJSON=function(){
		
	}	
Artist.prototype.toObject=function(){
	}


/**
* Constructor User.
* @constructor
* @param {string} id The unique identifier of the user. REQUIRED
* @param {string} userName The username of the user. REQUIRED
* @param {string} email The email address of the user. REQUIRED
* @param {string} password The password for the user account. REQUIRED
* @param {string} firstName The first name of the user. Default: username. OPTIONAL
* @param {string} lastName The last name of the user. Default: username. OPTIONAL
* @param {Date} date_created The date the user was created.  Default: Date.now(). OPTIONAL
* @param {Array} playlists The playlists of the user. Default: []. OPTIONAL
* @returns {Object} The newly created user instance
* @throws Error 100: if a required variable is undefined/null/empty.
* @throws Error 101: if a required variable is of an unexpected type.
* @throws Error 101: if an optional variable is of an unexpected type.
*/
function User(id, userName, email, password, firstName, lastName, date_created, playlists){
	this.firstName=firstName || userName;
	this.lastName=lastName || userName;
	this.email=email;
	var id=id;
	var userName=userName;
	var password=password;
	var date_created=date_created||"";
	var Playlists=playlists;
	if (id === undefined){
			throw new Error(100);
		};
	if (typeof id != "string"){
		throw new Error(101);
	};
	if (userName === undefined){
		throw new Error(100);
	};
	if (typeof userName != "string"){
		throw new Error(101);
	};
	if (email === undefined){
		throw new Error(100);
	};
	if (typeof email != "string"){
		throw new Error(101);
	};
	if (password === undefined){
			throw new Error(100);
	};
	if (typeof password != "string"){
			throw new Error(101);
	};
	if (typeof this.firstName != "string"){
		throw new Error(101);
	};
	if (typeof this.lastName != "string"){
		throw new Error(101);
	};
	
	if (typeof date_created != "string"){
		throw new Error(101);
	};
	if (typeof playlists === "string"){
		throw new Error(101);
	}
	this.sortPlaylistFunction=function(a,b){
		if (!a|| !b){
			return undefined;
		}
		if (a instanceof Playlists && b instanceof Playlists ){
			return a.name.localeCompare(b.name);
		}
		else {
			throw new Error(102);
		}
			
	};
	this.toObject=function(){
		return {
			"_id":id,
			"firstName":firstName,
			"lastName":lastName,
			"email":email,
			"userName":userName,
			"password":password,
			"date_created":date_created,
			"playlists":this.getPlaylistsString(),
		};
	};
	this.toJSON=function(){
		return this.toString();
	},
	this.getPlaylistsString=function(){
		var array = [];
		if (playlists === undefined){
			return JSON.stringify(array);
		}
		else{
			for (var i in playlists){
				array.push(playlists[i].getId());
			}
		}
		
		return JSON.stringify(array.sort());
	};
	this.getFullName=function(){
		return firstName+" "+lastName;
	};
	this.getId=function(){
		return id;
	};
	this.getUserName=function(){
		return userName;
	};
	this.getPassword=function(){
		return password;
	};
	this.getDateCreatedString=function() {
		return date_created;
	};
	this.playlistsCount=function(){
		 var count = 0;
		for (var i=0; i<playlists.length;i++){
			count = count +1;
		}
		return count;
	};
	this.addPlaylist=function(t){
		for (var i=0; i<playlists.length;i++){
			if (playlists[i] == t){
				throw new Error(103);
			}
			if (!(t instanceof Playlist)){
				throw new Error(102);
			}
		}
				
		playlists.push(t);
		
	};
	this.removePlaylist=function(t){
		if (!(t instanceof Playlist)){
			throw new Error(102);
		}
		for (var i=0; i<playlists.length;i++){
			if ( t === playlists[i]){
				playlists.splice(i, 1);
			}
		}
				
	};
	this.sortPlaylist=function(){

		playlists.sort();
	};
	this.localToJSON = function(){
			return globalToJSON;
		};

	
};
User.prototype.toObject=function(){
	
	}
User.prototype.toJSON=function(){
		
	}
User.prototype.sortPlaylistFunction=function(a,b){
	if (a == "undefined" || b == "undefined"){
		return undefined;
	}
	var _a = a instanceof Playlist;
	var _b = b instanceof Playlist;

	if (_a  && _b ){
		return a.name.localeCompare(b.name);
			
	}

	else {
		throw new Error(102);
		}
	}
User.prototype.getFullName=function(){
		
	}

/**
* Constructor Track.
* @constructor
* @param {string} id The unique identifier of the track. REQUIRED
* @param {string} name The song name. REQUIRED
* @param {Artist} artist The artist who performs or composed the track. REQUIRED
* @param {Number} duration The duration of the track in seconds. REQUIRED
* @param {string} file The url of the location of the mp3 file of the track. REQUIRED
* @param {Array} collections The collections this track is in. Default: []. OPTIONAL
* @param {Array} id3Tags An array of the id3Tags of the mp3 file of the track. Default: []. OPTIONAL
* @param {Date} release_date The date the track was released. Default: Date.now(). OPTIONAL
* @param {Date} date_created The date the track was created. Default: Date.now(). OPTIONAL
* @returns {Object} The newly created track instance
* @throws Error 100: if a required variable is undefined/null/empty.
* @throws Error 101: if a required variable is of an unexpected type.
* @throws Error 101: if an optional variable is of an unexpected type.
*/
function Track(id, name, artist, duration, file, collections, id3Tags, release_date, date_created){
	var collections = collections||[];
	var id = id;
	this.name = name;
	this.duration=duration;
	var artist = artist;
	var file = file;
	var id3Tags = id3Tags;
	var release_date=release_date||'';
	var date_created = date_created||'';
	if (id === undefined){
			throw new Error(100);
		};
	if (typeof id != "string"){
		throw new Error(101);
	};
	if (name === undefined){
		throw new Error(100);
	};
	if (typeof name != "string"){
		throw new Error(101);
	};
	if (artist === undefined){
		throw new Error(100);
	};
	if (!(artist instanceof Artist)){
			throw new Error(101);
	};
	if (duration === undefined){
			throw new Error(100);
	};
	if (typeof duration != "number"){
			throw new Error(101);
	};

	if (file === undefined){
			throw new Error(100);
	};
	if (typeof file != "string"){
			throw new Error(101);
	};
	if (typeof collections != typeof [] ){
			throw new Error(101);
	};
	if (typeof release_date=== typeof []){
		throw new Error(101);
	}
	if (typeof date_created=== typeof []){
		throw new Error(101);
	};
	if (typeof id3Tags === "string"){
		throw new Error(101);
	};
	this.sortTagsFunction=function(a,b){
		if (!a|| !b){
			return undefined;
		}
		if (a instanceof playlists && b instanceof playlists ){
			return a.name.localeCompare(b.name);
		}
		else {
			throw new Error(101);
		}
	};
	this.toObject=function(){
		return {
			"_id":this.getId(),
			"name":name,
			"duration":this.getDurationString(),
			"collections":JSON.stringify(collections),
			"file":file,
			"id3Tags":JSON.stringify(id3Tags.sort()),
			"release_date":release_date,
			"date_created":date_created || "",
			"artist":artist.getId(),
		}
	};
	this.toJSON=function(){
		return this.toString();
	};
	this.getDurationString=function(){
		return parseInt(this.duration / 60) + ":" + this.duration % 60;
		
	};
	this.getArtistString=function(){
		return artist.getId();
	};
	this.getCollectionsString = function(){
		var array =[];
		for (var i=0;i<collections.length; i++){
			array.push(collections[i].getId());
		}
		
		return JSON.stringify(array);
		
	};
	this.addCollection=function(a){
		for (var i=0;i<collections.length;i++){
			if (collections[i] == a){
				throw new Error(103);
			}
		}
		if (!(a instanceof AbstractSoundCollection)){
			throw new Error(102);
		}
		else {
			collections.push(a);
		}
	};
	this.getId3TagsString=function(){
		var array =[];
		if (id3Tags !== undefined){
			for (var i=0;i<id3Tags.length; i++){
				array.push(id3Tags[i]);
			}
		}
		return JSON.stringify(array);
	};
	this.getDateCreatedString=function(){
		return date_created;
	};
	this.getDateReleaseString = function(){
		return release_date;
	};
	this.getId = function(){
		return id;
	};
	this.getFile=function(){
		return file;
	};
	this.id3TagsCount=function(){
		return id3Tags.length;
	};
	this.addTag=function(s){
		
		for (var i=0;i<id3Tags.length;i++){
			if (id3Tags[i] == s){
				throw new Error(103);
			}
		}
		if (typeof s != "string"){
			throw new Error(102);
		}
		else {
			id3Tags.push(s);
		}
		this.sortTags();
	};
	this.removeTag = function(s){
		if (typeof s != "string"){
			throw new Error(102);
		}
		else {
			for (var i=0;i<id3Tags.length;i++){
				if (id3Tags[i]==s){
					id3Tags.splice(i,1);
				}
			}
		}
		this.sortTags();
	};
	this.sortTags=function(){
		id3Tags.sort();
	};
	this.removeCollection=function(a){
		if (!(a instanceof AbstractSoundCollection)){
			throw new Error(102);
		}
		for (var i=0; i<collections.length;i++){
			if ( a === collections[i]){
				collections.splice(i, 1);
			}
		}			
	};
	this.localToJSON = function(){
			return globalToJSON;
	};


	
};
Track.prototype.toObject=function(){};
Track.prototype.toJSON=function(){};
Track.prototype.sortTagsFunction=function(a,b){
	if (a == "undefined" || b == "undefined"){
		return undefined;
	}

	else if (typeof a === "string" && typeof b === "string"){
		return a.localeCompare(b);
	}
	else  {
		throw new Error(102);
	}

	
};
Track.prototype.getDurationString=function(){};
/**
* AbstractSoundCollection constructor
* @constructor
* @param {string} id The unique identifier of the abstractSoundCollection. REQUIRED
* @param {string} name The name of the abstractSoundCollection. REQUIRED
* @param {Array} tracks The tracks that this abstractSoundCollection contains. Default: [] OPTIONAL
* @param {Date} date_created The date the abstractSoundCollection was created. Default: Date.now() OPTIONAL
* @returns {Object} The newly created abstractSoundCollection instance
* @throws Error 100: if a required variable is undefined/null/empty.
* @throws Error 101: if a required variable is of an unexpected type.
* @throws Error 101: if an optional variable is of an unexpected type.
*/
function AbstractSoundCollection(id, name, tracks, date_created){
		var tracks=tracks;
		var date_created=date_created || "";
		var id=id;
		if (id === undefined){
			throw new Error(100);
		};
		if (typeof id != "string"){
			throw new Error(101);
		};
		if (name === undefined){
			throw new Error(100);
		};
		if (typeof name != "string"){
			throw new Error(101);
		};
		if (typeof date_created === typeof []){
			throw new Error(101);
		};
		if (typeof tracks === typeof ""){
			throw new Error(101);
		};

		this.name=name;
		this.sortTracksFunction=function(a,b){
			if (!a|| !b){
				return undefined;
			}
			if (a instanceof Track && b instanceof Track ){
				return a.name.localeCompare(b.name);
			}
			else {
				throw new Error(102);
			}
			
		};
			
		this.toObject=function(){
			return {
				"_id":id,
				"name":name,
				"tracks":JSON.stringify(tracks),
				"date_created":date_created,
			};
		};
		this.toJSON=function(){
			return this.toString();
		};
		this.getDateCreatedString=function(){
			return date_created;
		};
		this.getTracksString=function(){
			var array = [];
			if (typeof tracks === "undefined"){
				return JSON.stringify(array.sort());
			}
			for (var i=0; i<tracks.length;i++){
				array.push(tracks[i].getId());
					
			}
			return JSON.stringify(array.sort());
		};
		this.getId=function(){
			return id;
		};
		this.tracksCount=function(){
			return tracks.length;
		};
		this.addTrack=function(t){
			for (var i=0; i<tracks.length;i++){
				if (tracks[i] == t){
					throw new Error(103);
				}
				else if (typeof t !== typeof tracks[i]){
					throw new Error(102);
				}
			}
				
			tracks.push(t);
			t.addCollection(this);
		};
		this.removeTrack=function(t){
			if (typeof t !== typeof tracks[0]){
						
				throw new Error(102);
			}
			for (var i=0; i<tracks.length;i++){
					
				if ( t === tracks[i]){
						tracks.splice(i, 1);
						t.removeCollection(this);
					}

			}
			
				
		};
		this.sortTracks=function(){
			tracks.sort();
		};
		this.localToJSON = function(){
			return globalToJSON;
		};
		this.sortTracksByField=function(a,b,c){
			if (!(a instanceof AbstractSoundCollection)){
				throw new Error(104);
			}

			return a.name.localeCompare(b.name);
			
			
		};

		return this;


}

AbstractSoundCollection.prototype.toObject=function(){
		
	}
AbstractSoundCollection.prototype.toJSON=function(){
		
	}
AbstractSoundCollection.prototype.sortTracksFunction=function(a,b){
	
	if (a == "undefined" || b == "undefined"){
		return undefined;
	}
	var _a = a instanceof Track;
	var _b = b instanceof Track;
	if (_a  && _b ){
		return a.name.localeCompare(b.name);
			
	}

	else {
		throw new Error(102);
		}
	}

/**
* Playlist constructor.
* @constructor
* @param {string} id The unique identifier of the playlist. REQUIRED
* @param {string} name The name of the playlist. REQUIRED
* @param {Array} tracks The tracks that this playlist contains. OPTIONAL
* @param {Date} date_created The date the playlist was created. OPTIONAL
* @param {User} owner The owner of this playlist. REQUIRED
* @returns {Object} The newly created playlist instance
* @throws Error 100: if a required variable is undefined/null/empty.
* @throws Error 101: if a required variable is of an unexpected type.
* @throws Error 101: if an optional variable is of an unexpected type.
*/
function Playlist(id, name, tracks, date_created, owner){
	AbstractSoundCollection.call(this, id, name, tracks, date_created);
	var owner=owner;
	this.toObject=function(){
		return {
			"_id":id,
			"name":name,
			"tracks":JSON.stringify(tracks),
			"date_created":date_created,
			"owner":this.getOwnerString(),
		};
	};
	this.toJSON=function(){
		return this.toString();
	};
	this.getOwnerString=function(){
		return id;
	};
	
};
Playlist.prototype = Object.create(AbstractSoundCollection.prototype);
Playlist.prototype.constructor = Playlist;
Playlist.prototype.toObject=function(){

};
Playlist.prototype.toJSON=function(){
	
};
Playlist.prototype.sortTracksFunction=function(a,b){
	if (a == "undefined" || b == "undefined"){
		return undefined;
	}
	var _a = a instanceof Track;
	var _b = b instanceof Track;
	if (_a  && _b ){
		return a.name.localeCompare(b.name);
			
	}

	else {
		throw new Error(102);
		}
			
};
/**
* Album constructor.
* @constructor
* @param {string} id The unique identifier of the album. REQUIRED
* @param {string} name The name of the album. REQUIRED
* @param {Array} tracks The tracks that this album contains. OPTIONAL
* @param {Date} [date_created] The date the album was created. OPTIONAL
* @param {string} artist The artist who performs in this album. REQUIRED
* @param {string} artwork The URL of the artwork picture for the album. REQUIRED
* @param {Date} release_date The date the album was released. Default: Date.now(). OPTIONAL
* @param {string} label The record label of this album. Default: 'USI-INF records'. OPTIONAL
* @returns {Object} The newly created album instance
* @throws Error 100: if a required variable is undefined/null/empty.
* @throws Error 101: if a required variable is of an unexpected type.
* @throws Error 101: if an optional variable is of an unexpected type.
*/
function Album(id, name, tracks, date_created, artist, artwork, release_date, label){
	AbstractSoundCollection.call(this,id, name, tracks, date_created);
	var artist = artist;
	var release_date = release_date;
	this.artwork=artwork;
	this.label=label || 'USI-INF records';
	if (artist===undefined){
		throw new Error(100);
	};
	if (!(artist instanceof Artist)){
		throw new Error(101);
	};
	if (artwork===undefined){
		throw new Error(100);
	};
	if (typeof artwork != "string"){
			throw new Error(101);
		};
	if (typeof this.label !== "string"){
		throw new Error(101);
	};
	if (typeof release_date == typeof []){
		throw new Error(101);
	};
	this.toObject=function(){
		return{
			"_id":id,
			"name":name,
			"tracks":JSON.stringify(tracks),
			"date_created":date_created,
			"artist":artist.getId(),
			"artwork": artwork,
			"release_date":release_date,
			"label":label,
		}
	};
	this.toJSON=function(){
		return this.toString();
	};
	this.getArtistString=function(){
		return artist.getId();
	};
	this.getDateReleaseString=function(){
		return release_date;
	};

	
}
Album.prototype = Object.create(AbstractSoundCollection.prototype);
Album.prototype.toObject=function(){
	console.log('nono');
	return undefined;
}
Album.prototype.toJSON=function(){
	return undefined;
}
Album.prototype.sortTracksFunction=function(a,b){
	if (a == "undefined" || b == "undefined"){
		return undefined;
	}
	var _a = a instanceof Track;
	var _b = b instanceof Track;
	if (_a  && _b ){
		return a.name.localeCompare(b.name);
			
	}

	else {
		throw new Error(102);
		}
}