/**
* Constructor artist
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
**/
function artist(id, name, genre, artwork, date_created){
	
	var field = "artist";
	if (id === undefined){
		throw new Error(100);
	};

	if (name === undefined){
			throw new Error(100);
		};
	
	if (typeof id != "string"){
		throw new Error(101);
	};
	
	var id = id;
	var genre=genre||"rock";
	if (typeof genre != "string"){
		throw new Error(101);
	};
	if (typeof name != "string"){
		throw new Error(101);
	};
	
	var date_created=date_created||"";
	if (typeof date_created != "string"){
		throw new Error(101);
	};
	return {
		name:name,
		artwork:artwork||"",
		gettype:function(){
			return field; 
		},
		toJSON:function(){
			return this.toString();
		},
		toObject:function(){
			return {
			
				"_id":id,
				"artwork":artwork,
				"date_created":date_created,
				"genre":genre,
				"name":name,
			}
		},
		getGenreString:function(){
		return genre;
		},
		getDateCreatedString:function(){
			return date_created;
		},
		getId:function(){
			return id;
		},
	}
}

/**
* Constructor user.
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
function user(id, userName, email, password, firstName, lastName, date_created, playlists){
	id=id;

	userName=userName;
	password=password;
	date_created=date_created||"";
	playlists=playlists;
	firstName=firstName || userName;
	lastName=lastName || userName;
	var field = "user";
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
	if (typeof firstName != "string"){
		throw new Error(101);
	};
	if (typeof lastName != "string"){
		throw new Error(101);
	};
	
	if (typeof date_created != "string"){
		throw new Error(101);
	};
	if (typeof playlists === "string"){
		throw new Error(101);
	}
	return {
		gettype:function(){
			return field;
		},
		firstName:firstName,
		lastName:lastName,
		email:email,
	
		sortPlaylistFunction:function(a,b){
			if (!a && !b){
				return undefined;
			}
			if (typeof a.gettype != "function" || typeof b.gettype != "function" )  {
				throw new Error(102);
			}
			else {
				return a.name.localeCompare(b.name);
			}
		},
			
	
		toObject:function(){
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
		},
		toJSON:function(){
			return this.toString();
		},
		getPlaylistsString:function(){
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
		},
		getFullName:function(){
			return firstName+" "+lastName;
		},
		getId:function(){
			return id;
		},
		getUserName:function(){
			return userName;
		},
		getPassword:function(){
			return password;
		},
		getDateCreatedString:function() {
			return date_created;
		},
		playlistsCount:function(){
			 var count = 0;
			for (var i=0; i<playlists.length;i++){
				count = count +1;
			}
			return count;
		},
		addPlaylist:function(a){
			for (var i=0;i<playlists.length;i++){
			if (playlists[i] == a){
				throw new Error(103);
			}
			}
			if (a.gettype == undefined||(a.gettype() != "abstractSoundCollection" && a.gettype2() != "playlist")){
				throw new Error(102);
			}
			else {
				playlists.push(a);
			}
		},
		removePlaylist:function(t){
			
			if (t.gettype == undefined||(t.gettype() != "abstractSoundCollection" && t.gettype2() != "playlist")){
				throw new Error(102);
			}
			for (var i=0; i<playlists.length;i++){
				if ( t === playlists[i]){
					playlists.splice(i, 1);
				}
			}
					
		},
		sortPlaylist:function(){

			playlists.sort();
		},
	}
	return this;
}


/**
* Constructor track.
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
function track(id, name, artist, duration, file, collections, id3Tags, release_date, date_created){
	var field = "track";
	collections = collections||[];
	id = id;
	artist = artist;
	file = file;
	id3Tags = id3Tags;
	release_date=release_date||'';
	date_created = date_created||'';
	var m = {};
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
	// if (!(artist instanceof Artist)){
	// 		throw new Error(101);
	// };
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
	if (artist.gettype == undefined || artist.gettype() != "artist"){
		throw new Error(101);
	};
	m.gettype=function() {
		return field;
	};
	m.name =name;
	m.duration=duration;
	m.sortTagsFunction=function(a,b){
		if (!a && !b){
			return undefined;
		}
		if (typeof a != "string" || typeof b != "string" )  {
			throw new Error(102);
		}
		else {
			return a.localeCompare(b);
		}
			
	};
	m.toObject=function(){
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
	m.toJSON=function(){
		return this.toString();
	};
	m.getDurationString=function(){
		return parseInt(this.duration / 60) + ":" + this.duration % 60;
	
	};
	m.getArtistString=function(){
		return artist.getId();
	};
	m.getCollectionsString=function(){
		var array =[];
		for (var i=0;i<collections.length; i++){
			array.push(collections[i].getId());
		}
	
		return JSON.stringify(array);
	
	};
	m.addCollection=function(a){

		for (var i=0;i<collections.length;i++){
			if (collections[i] == a){
				throw new Error(103);
			}
		}
		if (a.gettype == undefined || a.gettype() != "abstractSoundCollection"){
			throw new Error(102);
		}
		else {
			collections.push(a);
		}
	};
	m.getId3TagsString=function(){
		var array =[];
		if (id3Tags !== undefined){
			for (var i=0;i<id3Tags.length; i++){
				array.push(id3Tags[i]);
			}
		}
		return JSON.stringify(array);
	};
	m.getDateCreatedString=function(){
		return date_created;
	};
	m.getDateReleaseString=function(){
		return release_date;
	};
	m.getId=function(){
		return id;
	};
	m.getFile=function(){
		return file;
	};
	m.id3TagsCount=function(){
		return id3Tags.length;
	};
	m.addTag=function(s){
	
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
	m.removeTag=function(s){
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
	m.sortTags=function(){
		id3Tags.sort();
	};
	m.removeCollection=function(a){
		if (a.gettype == undefined || a.gettype() != "abstractSoundCollection"){
			throw new Error(102);
		}
		for (var i=0; i<collections.length;i++){
			if ( a === collections[i]){
				collections.splice(i, 1);
			}
		}			
	};

	return m;
}


/**
* abstractSoundCollection constructor
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
function abstractSoundCollection(id, name, tracks, date_created){
		
		var tracks=tracks;
		var date_created=date_created || "";
		var id=id;
		var field ="abstractSoundCollection";
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
		return {
			
			gettype:function(){
				return field;

			},
			name:name,
			sortTracksFunction:function(a,b){
				
				if (!a && !b){
					return undefined;
				}
				if (typeof a.gettype != "function" || typeof b.gettype != "function" )  {
					throw new Error(102);
				}
				else {
					return a.name.localeCompare(b.name);
				}
				
			},
			
			
			toObject:function(){
				return {
					"_id":id,
					"name":name,
					"tracks":JSON.stringify(tracks),
					"date_created":date_created,
				};
			},
			toJSON:function(){
				return this.toString();
			},
			getDateCreatedString:function(){
				return date_created;
			},
			getTracksString:function(){
				var array = [];
				if (typeof tracks === "undefined"){
					return JSON.stringify(array.sort());
				}
				for (var i=0; i<tracks.length;i++){
					array.push(tracks[i].getId());
					
				}
				return JSON.stringify(array.sort());
			},
			getId:function(){
				return id;
			},
			tracksCount:function(){
				return tracks.length;
			},
			addTrack:function(t){
				if (typeof t.gettype != "function")  {
					
					throw new Error(102);
				}
				if (t.gettype() =="track"){
					
					for (var i=0; i<tracks.length;i++){
						if (tracks[i] === t){
							throw new Error(103);
						}
					}
					
				}
					
				tracks.push(t);
				t.addCollection(this);
			},
			removeTrack:function(t){
				if (typeof t !== typeof tracks[0]){
						
					throw new Error(102);
				}
				for (var i=0; i<tracks.length;i++){
					
					if ( t === tracks[i]){
							tracks.splice(i, 1);
							t.removeCollection(this);
					}
				}
			
			},
			sortTracks:function(){
				tracks.sort();
			},
	}
return this;

}

/**
* playlist constructor.
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
function playlist(id, name, tracks, date_created, owner){

	var n = new abstractSoundCollection(id, name, tracks, date_created);
	var field2 = "playlist";
	n.owner = owner;
 	if (owner == undefined){
 		throw new Error(100);
 	};
 	n.gettype2= function(){
 		return field2;
 	};
 	
	n.toObject = function(){
			return {
				"_id":id,
				"name":name,
				"tracks":JSON.stringify(tracks),
				"date_created":date_created,
				"owner":this.getOwnerString(),
			};
	};

	n.toJSON = function(){
			return this.toString();
		};
	n.getOwnerString=function(){
			return id;
	
	};

	return n;
}


/**
* album constructor.
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
function album(id, name, tracks, date_created, artist, artwork, release_date, label){
	var o = abstractSoundCollection(id, name, tracks, date_created);
	// artist = artist;
	release_date = release_date || Date.now().toString();
	o.artwork=artwork;
	
	label=label || 'USI-INF records';
	if (artist===undefined){
		throw new Error(100);
	};
	// if (!(artist instanceof Artist)){
	// 	throw new Error(101);
	// };
	if (artwork===undefined){
		throw new Error(100);
	};
	if (typeof artwork != "string"){
			throw new Error(101);
		};
	
	if (typeof release_date == typeof []){
		throw new Error(101);
	};
	if (typeof label != "string"){
		throw new Error(101);
	};
	o.label=label;
	// o.gettype=function(){
	// 	return field;
	// }
	if (typeof release_date != "string"){
		throw new Error(101);
	};

	// console.log(artist.gettype())
	if (artist.gettype == undefined || artist.gettype() != "artist"){
		throw new Error(101);
	};
	o.toObject=function(){
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
	o.toJSON=function(){
		return this.toString();
	};
	o.getArtistString=function(){
		return artist.getId();
	};
	o.getDateReleaseString=function(){
		return release_date;
	};
	return o;
}