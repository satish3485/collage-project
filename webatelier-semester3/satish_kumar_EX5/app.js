var config = require('./config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dustjs = require('adaro');
var app = express();
var methodOverride = require('method-override')
var mongoose = require("mongoose");

// Connect to MongoDB here
mongoose.connect("mongodb://localhost/atelierbeats-dev")

// Register model definition here

// dustjs view engine setup
app.engine('dust', dustjs.dust());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust'); // Using dust as template engine

//configure app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
})); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

// Model for the root
var model = {
    title: "AtelierBeats API Server",
    links: [{
        rel: "albums",href: "http://localhost:3000/albums"}, 
        {
        rel: "artists",href: "http://localhost:3000/artists"}, 
    {
        rel: "playlists",href: "http://localhost:3000/playlists"}, 
    {
        rel: "tracks", href: "http://localhost:3000/tracks"}, 
        {
            rel: "users",href: "http://localhost:3000/users"}, ]
}

// Root handler
app.get("/", function (req, res) {
    if (req.accepts("text/html")) {
        res.render("index", model);
    } else {
        res.json(model);
    }
})

// Initialize routers here

var routes = require("./routes/index");

app.use("/albums", routes.myAlbums);
app.use("/artists", routes.myArtists);
app.use("/playlists", routes.myPlaylists);
app.use("/tracks", routes.myTracks);
app.use("/users", routes.myUsers);

// app is exported as a module so that we can require if from other modules
module.exports = app;