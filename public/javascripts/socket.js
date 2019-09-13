

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
            var box = BABYLON.Mesh.CreateBox(data['id']+"Box", 10.0, scene);box.scaling.x = 0.6;box.scaling.y=0.1;
            box.scaling.z=0.1
            box.position.y=box.position.y+5
            player.checkCollisions=true;
             box.parent=player
            var myMaterial = new BABYLON.StandardMaterial("my",scene);
            myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
            box.material=myMaterial;
            
            player.position = data['pos'];
        }
    });
    
    socket.on('player_delete', function(data) {
        let player = scene.getMeshByID(data)
        player.dispose();    
        for(var j=0;j<playerObjects.length;j++){
            if(playerObjects[j].id==data){
                var old = playerObjects.splice(j,j)
                break;
            }
        }
    });

    socket.on('player_shoot', function(data) {
        
        if(me.id == data['hit'])
        {
            me.gotHit()
            if(me.health<=0)
            {
                me.health=100;
                for(var j=0;j<playerObjects.length;j++)
                {
                    if  (playerObjects[j].id == data['id'] )
                    {
                        playerObjects[j].score+=10;
                        console.log(playerObjects[j].username+' score ->' + playerObjects[j].score)
                        if(playerObjects[i].score==100)
                        {
                            alert("gameover")
                        }
                    }
                }
                camera.position=new BABYLON.Vector3(5,100,-10);
                // me.score-=5;
            }
        }
        else
        {
            for(let i = 0 ; i < playerObjects.length;i++)
            {
                if(playerObjects[i].id == data['hit']){
                    playerObjects[i].gotHit()
                    let player1 = scene.getMeshByID(playerObjects[i].id);
                    let player1Health = scene.getMeshByID(playerObjects[i].id+"Box");
                    
                    var myMaterial = new BABYLON.StandardMaterial("my",scene);
                    if(playerObjects[i].health<=0){
                        playerObjects[i].health=100;
                        myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
                    } else{
                        myMaterial.diffuseColor=new BABYLON.Color3(1,playerObjects[i].health/100,playerObjects[i].health/100);
                    }
                    player1Health.material=myMaterial;
                    console.log(player1Health);

                }
        }}
    });
}

