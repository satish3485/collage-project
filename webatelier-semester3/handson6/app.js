/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dustjs = require('adaro');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// connect to mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// dustjs view engine setup
app.engine('dust', dustjs.dust());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');

//configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//address router
var addressRouter = require('./routes/address');
//Use the address router for requests at /address
app.use('/address', addressRouter);

//When login on chat, send back the clientside code
app.get('/chat', function(req, res){
  res.render("chat",{});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Task 7
io.on('connection', function(socket){
  console.log('a user connected');
  
  //handle disconnection (6.1)
  socket.on('disconnect', function(){
    console.log('user disconnected');
  })
  
  //handle chat message, send it back (6.2)
  socket.on('chat-message',function(e){
    socket.emit('chat-message',e);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});