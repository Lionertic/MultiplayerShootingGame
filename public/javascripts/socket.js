function socket(name,socket){
    socket.emit('username', name);

    socket.on('is_online', function(username) {
        console.log(username)
    });

    socket.on('username', function(username) {
        console.log(username)
    });

    socket.on('player_move', function(data) {
        console.log(data)
    });
    
    socket.on('player_shoot', function(data) {
        console.log(data)
    });
}