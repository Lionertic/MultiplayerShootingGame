var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var io = require('socket.io')();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.sockets.on('connection', function(socket) {
  socket.on('username', function(username) {
    socket.username = username;
    console.log("user entered" + username);
    io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on('disconnect', function(username) {
    console.log("user left" + username);
    io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  });

  socket.on('chat_message', function(message) {
    console.log(message);
    io.emit(message.toString(),message.toString());
    io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });
});

module.exports = app;
