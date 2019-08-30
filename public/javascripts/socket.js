function socket(name,room){

    var socket = io.connect('/dynamic-' + room);

    socket.emit('username', name);

    socket.on('is_online', function(username) {
        console.log(username)
    });

    socket.on('username', function(username) {
        console.log(username)
    });
}