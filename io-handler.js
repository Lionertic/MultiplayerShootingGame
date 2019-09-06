module.exports = (io) => {
    io.of(/^\/dynamic-\d+$/).on('connection', (socket) => {
        
        let currentNamespace = socket.nsp;
        console.log("A client has joined in namespace " + socket.nsp.name);

        socket.on('username', (data) => {
            socket.username = data['name'];
            socket.playerId = data['socketId'];
            let val = {
                username : socket.username,
                id : data['socketId']
            }
            currentNamespace.emit('new_player', val)
            currentNamespace.emit('player_join',socket.id)
        });

        socket.on('player_move', (data) => {
            socket.broadcast.emit('player_move', data)
        });

        socket.on('player_shoot', (data) => {
            currentNamespace.emit('player_shoot', data)
        });

        socket.on('disconnect', () => {
            currentNamespace.emit('player_delete', socket.playerId)
        });

        socket.on('previous_player',(data)=>{
            socket.broadcast.to(data['id']).emit('previous_player',data['player']);
        })
    });
};