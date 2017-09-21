window.data = {
    "users" : [
        {
            "_id"          : "6m6b6",
            "firstName"    : "Masiar",
            "lastName"     : "Babazadeh",
            "userName"     : "masiar",
            "email"        : "masiar.babazadeh@usi.ch",
            "password"     : "ciao",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
            "playlists"    : [
              "p0", "p2"
            ]
        },

        {
            "_id"          : "1v2t3",
            "firstName"    : "Vasileios",
            "lastName"     : "Triglianos",
            "userName"     : "vassilis",
            "email"        : "vasileios.triglianos@usi.ch",
            "password"     : "ciao",
            "date_created" : "Sat Sep 27 2014 10:28:21 GMT+0200 (CEST)",
            "playlists"    : [
              "p1"
            ]
        }
    ],

    "playlists" : [
        {
            "_id"          : "p0",
            "owner"        : "6m6b6",
            "name"         : "Strong Stuff",
            "tracks"       : ["t0", "t1", "t4", "t5", "t6", "t7", "t8"],
            "date_created" : "Sat Sep 27 2014 11:18:51 GMT+0200 (CEST)"
        },

        {
            "_id"    : "p1",
            "owner"  : "1v2t3",
            "name"   : "Easy Going",
            "tracks" : ["t0", "t2", "t3", "t9"],
            "date_created" : "Sat Sep 27 2014 11:19:22 GMT+0200 (CEST)"
        },

        {
            "_id"    : "p2",
            "owner"  : "6m6b6",
            "name"   : "Relax",
            "tracks" : ["t1", "t2", "t6", "t9", "t10"],
            "date_created" : "Sat Sep 27 2014 11:20:42 GMT+0200 (CEST)"
        }
    ],

    "artists" : [
       {
           "_id"          : "a0",
           "name"         : "Iron Maiden",
           "genre"       : "New Wave of British Heavy Metal",
           "artwork"      : "./images/artists/iron-maiden.png",
           "date_created" : "Sat Sep 27 2014 10:39:20 GMT+0200 (CEST)"
       },

       {
           "_id"          : "a1",
           "name"         : "AC/DC",
           "genre"       : "Hard Rock",
           "artwork"      : "./images/artists/acdc.jpg",
           "date_created" : "Sat Sep 27 2014 10:40:40 GMT+0200 (CEST)"
       },

       {
           "_id"          : "a2",
           "name"         : "Metallica",
           "genre"       : "Thrash Metal",
           "artwork"      : "./images/artists/metallica.jpg",
           "date_created" : "Sat Sep 27 2014 10:41:20 GMT+0200 (CEST)"
       },

       {
           "_id"          : "a3",
           "name"         : "Slayer",
           "genre"       : "Thrash Metal",
           "artwork"      : "./images/artists/slayer.jpg",
           "date_created" : "Sat Sep 27 2014 10:41:43 GMT+0200 (CEST)"
       },

       {
           "_id"          : "a4",
           "name"         : "God is an Astronaut",
           "genre"       : "Post Rock",
           "artwork"      : "./images/artists/maxresdefault.jpg",
           "date_created" : "Sat Sep 27 2014 10:42:10 GMT+0200 (CEST)"
       }
   ],

    "albums" : [
        {
            "_id"          : "al0",
            "artist"       : "a0",
            "name"        : "Somewhere in Time",
            "artwork"      : "./images/albums/al0.jpg",
            "release_date" : "Mon Sep 29 1986 00:00:00 GMT+0100 (CET)",
            "label"        : "EMI"
        },

        {
            "_id"          : "al1",
            "artist"       : "a0",
            "name"        : "Seventh Son of a Seventh Son",
            "artwork"      : "./images/albums/al1.jpg",
            "release_date" : "Mon Apr 11 1988 00:00:00 GMT+0200 (CEST)",
            "label"        : "EMI"
        },

        {
            "_id"          : "al2",
            "artist"       : "a1",
            "name"        : "Back in Black",
            "artwork"      : "./images/albums/al2.jpg",
            "release_date" : "Fri Jul 25 1980 00:00:00 GMT+0100 (CET)",
            "label"        : "Albert/Atlantic Records"
        },

        {
            "_id"          : "al3",
            "artist"       : "a1",
            "name"        : "The Razors Edge",
            "artwork"      : "./images/albums/al3.jpg",
            "release_date" : "Mon Sep 24 1990 00:00:00 GMT+0200 (CEST)",
            "label"        : "Atco Records, Albert/EMI"
        },

        {
            "_id"          : "al4",
            "artist"       : "a2",
            "name"        : "Ride the Lightning",
            "artwork"      : "./images/albums/al4.jpg",
            "release_date" : "Fri Jul 27 1984 00:00:00 GMT+0200 (CEST)",
            "label"        : "Megaforce"
        },

        {
            "_id"          : "al5",
            "artist"       : "a2",
            "name"        : "Master of Puppets",
            "artwork"      : "./images/albums/al5.jpg",
            "release_date" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
            "label"        : "Elektra/Asylum"
        },

        {
            "_id"          : "al6",
            "artist"       : "a3",
            "name"        : "Reign in Blood",
            "artwork"      : "./images/albums/al6.png",
            "release_date" : "Tue Oct 07 1986 00:00:00 GMT+0100 (CET)",
            "label"        : "Def Jam"
        },

        {
            "_id"          : "al7",
            "artist"       : "a3",
            "name"        : "South of Heaven",
            "artwork"      : "./images/albums/al7.jpg",
            "release_date" : "Tue Jul 05 1988 00:00:00 GMT+0200 (CEST)",
            "label"        : "Def Jam"
        },

        {
            "_id"          : "al8",
            "artist"       : "a4",
            "name"        : "All Is Violent, All Is Bright",
            "artwork"      : "./images/albums/al8.jpg",
            "release_date" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
            "label"        : "Revive Records"
        },
    ],
        
    "tracks" : [
        {
            "_id"          : "t1",
            "artist"       : "a0",
            "name"        : "The Clairvoyant",
            "duration"     : 267,
            "file"         : "./tracks/TheClairvoyant.mp3",
            "id3Tags"      : "",
            "collections"   : ['p0', 'p2', 'al1'],
            "release_date" : "Mon Apr 11 1988 00:00:00 GMT+0200 (CEST)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t0",
            "artist"       : "a0",
            "name"        : "Caught Somewhere in Time",
            "duration"     : 442,
            "file"         : "tracks_folder/1.mp3",
            "id3Tags"      : "",
            "collections"   : ['p0', 'p1', 'al0'],
            "release_date" : "Mon Sep 29 1986 00:00:00 GMT+0100 (CET)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t2",
            "artist"       : "a1",
            "name"        : "Thunderstruck",
            "duration"     : 292,
            "file"         : "tracks_folder/3.mp3",
            "id3Tags"      : "",
            "collections"   : ['p1', 'p2', 'al2'],
            "release_date" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t3",
            "artist"       : "a1",
            "name"        : "Hells Bells",
            "duration"     : 310,
            "file"         : "tracks_folder/4.mp3",
            "id3Tags"      : "",
            "collections"   : ['p1', 'al3'],
            "release_date" : "Mon Sep 24 1990 00:00:00 GMT+0200 (CEST)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t4",
            "artist"       : "a2",
            "name"        : "The Call of Ktulu",
            "duration"     : 535,
            "file"         : "tracks_folder/5.mp3",
            "id3Tags"      : "",
            "collections"   : ['p0', 'al4'],
            "release_date" : "Fri Jul 27 1984 00:00:00 GMT+0200 (CEST)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t5",
            "artist"       : "a2",
            "name"        : "Master of Puppets",
            "duration"     : 515,
            "file"         : "tracks_folder/6.mp3",
            "id3Tags"      : "",
            "collections"   : ['p0', 'al5'],
            "release_date" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t6",
            "artist"       : "a2",
            "name"        : "Orion",
            "duration"     : 507,
            "file"         : "tracks_folder/7.mp3",
            "id3Tags"      : "",
            "collections"   : ['p0', 'p2', 'al5'],
            "release_date" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t7",
            "artist"       : "a3",
            "name"        : "Raining Blood",
            "duration"     : 298,
            "file"         : "tracks_folder/8.mp3",
            "id3Tags"      : "",
            "collections"   : ['p0', 'al7'],
            "release_date" : "Tue Oct 07 1986 00:00:00 GMT+0100 (CET)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t8",
            "artist"       : "a3",
            "name"        : "South of Heaven",
            "duration"     : 299,
            "file"         : "tracks_folder/8.mp3",
            "id3Tags"      : "",
            "collections"   : ['p0', 'al7'],
            "release_date" : "Tue Jul 05 1988 00:00:00 GMT+0200 (CEST)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t9",
            "artist"       : "a4",
            "name"        : "All Is Violent, All Is Bright",
            "duration"     : 255,
            "file"         : "tracks_folder/10.mp3",
            "id3Tags"      : "",
            "collections"   : ['p1', 'p2', 'al8'],
            "release_date" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },

        {
            "_id"          : "t10",
            "artist"       : "a4",
            "name"        : "A Deafening Distance",
            "duration"     : 229,
            "file"         : "tracks_folder/11.mp3",
            "id3Tags"      : "",
            "collections"   : ['p2', 'al8'],
            "release_date" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
            "date_created" : "Sat Sep 27 2014 10:26:46 GMT+0200 (CEST)"
        },
    ]
}
