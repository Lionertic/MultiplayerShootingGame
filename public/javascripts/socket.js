function socket(name,socket){

    socketIO.emit('username', name);
    socket.on('is_online', (username) => {
        console.log(username)
    });

    socket.on('username', (data) => {
        if(data !== name){
            let player = new Player(data);
            playerObjects.push(player)
        }
    });

    socket.on('player_move', function(data) {
        if(data['name'] !== name){
            let player = scene.getMeshByID(data['name'])
            if(player){
                player.position = data['pos'];
            } else{
               let player = BABYLON.Mesh.CreateBox(data['name'], 2, scene);
               player.position = data['pos'];
            }
        }
    });
    
    socket.on('player_shoot', function(data) {
        for(let i = 0 ; i < playerObjects.length;i++){
            if(playerObjects[i].username == data['id']){
                playerObjects[i].gotHit()
                break;
            }
        }
    });
}