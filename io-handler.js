module.exports = (io) => {
    io.of(/^\/dynamic-\d+$/).on('connection', (socket) => {
        let currentNamespace = socket.nsp;
        console.log("A client has joined in namespace " + socket.nsp.name);

        socket.on('username', (username) => {
            socket.username = username;
            console.log(username);
            currentNamespace.emit('username', socket.username + 'has joined')
        });

        socket.on('player_move', (data) => {
            currentNamespace.emit('player_move', data)
        });

        socket.on('player_shoot', (data) => {
            currentNamespace.emit('player_shoot', data)
        });

        socket.on('disconnect', (username) => {
            console.log(username);
            currentNamespace.emit('is_online', socket.username + 'has left')
        });
    });
};