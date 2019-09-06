

function socket(name,socket){

    socket.emit('username', {name:name,socketId:id});

    // socket.on('is_online', (username) => {
        
    // });

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

    socket.on('new_player',(player)=>{
        let playerNew = new Player(player['username'],player['id'])
        playerObjects.push(playerNew)  
    });

    socket.on('player_move', function(data) {
        let player = scene.getMeshByID(data['id'])
        if(player){
            player.position = data['pos'];  
        } else{
            let player = BABYLON.Mesh.CreateBox(data['id'], 6, scene);
            player.checkCollisions=true;
            var myMaterial = new BABYLON.StandardMaterial("my",scene);
            myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
            player.material=myMaterial;
            player.position = data['pos'];
        }
    });
    
    socket.on('player_delete', function(data) {
        let player = scene.getMeshByID(data)
        player.dispose();    
        for(var j=0;playerObjects.length;j++){
            if(playerObjects[j].id==data){
                var old = playerObjects.splice(j,j)
                break;
            }
        }
    });

    socket.on('player_shoot', function(data) {
        if(me.id == data['hit']){
            me.gotHit()
            if(me.health<=0){
                me.health=100;
                camera.position=new BABYLON.Vector3(5,100,-10);   
            }
        } else{
        for(let i = 0 ; i < playerObjects.length;i++){
            if(playerObjects[i].id == data['hit']){
                playerObjects[i].gotHit()
                let player1 = scene.getMeshByID(playerObjects[i].id);
                var myMaterial = new BABYLON.StandardMaterial("my",scene);
                if(playerObjects[i].health<=0){
                    playerObjects[i].health=100;
                    myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
                } else{
                    myMaterial.diffuseColor=new BABYLON.Color3(1,playerObjects[i].health/100,playerObjects[i].health/100);
                }
                player1.material=myMaterial;
            }
        }}
    });
}

