

function socket(name,socket){

    socket.emit('username', name);

    socket.on('is_online', (username) => {
        console.log(username+" HAS JOINEDDDDD")
    });

    socket.on('player_join',(socketId)=>{
        let data = {
            player : me,
            id : socketId
        }
        socket.emit('previous_player',data)
    });

    socket.on('previous_player',(player)=>{
        let playerNew = new Player(player['username'],player['id'])
        playerObjects.push(playerNew)
    });

    socket.on('player_move', function(data) {
        let player = scene.getMeshByID(data['id'])
        if(player){
            player.position = data['pos'];  
        } else{
            let player = BABYLON.Mesh.CreateBox(data['id'], 6, scene);
            var myMaterial = new BABYLON.StandardMaterial("my",scene);
            myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
            player.material=myMaterial;
            player.position = data['pos'];
        }
    });
    
    socket.on('player_shoot', function(data) {
        for(let i = 0 ; i < playerObjects.length;i++){
            if(playerObjects[i].id == data['hit'])
            {
                playerObjects[i].gotHit()
                let player1 = scene.getMeshByID(playerObjects[i].username);
            }
        }
    });
}

