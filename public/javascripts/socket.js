

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
    
    socket.on('player_delete', function(data) {
        
        let player = scene.getMeshByID(data)
        // console.log(player)
        player.dispose();    
        // console.log(player)
    });

    socket.on('player_shoot', function(data) {
        if(me.id == data['hit'])
        {
            me.gotHit()
            if(me.health<=0)
            {
                me.health=100;
                camera.position=new BABYLON.Vector3(5,100,-10);  
                
            }
        }
        for(let i = 0 ; i < playerObjects.length;i++){
            console.log(data)
            console.log(playerObjects[i].id)
            console.log(data['hit'])
            if(playerObjects[i].id == data['hit'])
            {
                   console.log("!!")
                playerObjects[i].gotHit()
                let player1 = scene.getMeshByID(playerObjects[i].id);
                // console.log(playerObjects[i].username)
                var myMaterial = new BABYLON.StandardMaterial("my",scene);
                if(playerObjects[i].health<=0)
                {
                    myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
                }
                else
                {
                    myMaterial.diffuseColor=new BABYLON.Color3(1,playerObjects[i].health/100,playerObjects[i].health/100);
                }
                player1.material=myMaterial;
            }
        }
        
    });
}

