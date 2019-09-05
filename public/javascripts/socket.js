

function socket(name,socket){

    socketIO.emit('username', name);
    // nam=name
    socket.on('is_online', (username) => {
        console.log(username+" HAS JOINEDDDDD")
    });

    socket.on('username', (data) => {
        // if(data == name)
        {
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
               let player = BABYLON.Mesh.CreateBox(data['name'], 6, scene);
            var myMaterial = new BABYLON.StandardMaterial("my",scene);

               myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
               player.material=myMaterial;
               player.position = data['pos'];
            }
        }
        var me;
         for(var j=0;j<playerObjects.length;j++)
        {
        
         if(playerObjects[j].username==name)
         {
                me=playerObjects[j].health;
               // console.log(name);
                break;
         }
     }
    
        if(me<=0)
        {
            // let player = scene.getMeshByID(playerObjects[j].username)
            // var myMaterial = new BABYLON.StandardMaterial("my",scene);
            // myMaterial.diffuseColor=new BABYLON.Color3(1,1,1);
            // player.material=myMaterial;
            playerObjects[j].health=100;
            abc();

            
        }
    });
    
    socket.on('player_shoot', function(data) {
        for(let i = 0 ; i < playerObjects.length;i++){
            
                if(playerObjects[i].username == data['id'])
                {
                    playerObjects[i].gotHit()
                    let player1 = scene.getMeshByID(playerObjects[i].username);
                    console.log(player1);
                    
                    // var myMaterial = new BABYLON.StandardMaterial("my",scene);
                    // myMaterial.diffuseColor=new BABYLON.Color3(1,playerObjects[i].health/100,playerObjects[i].health/100);
                    // player1.material=myMaterial;

                // console.log(playerObjects[i].username);
                //  console.log(playerObjects[i].health);
                }

              
        }
    });
}



// freePlayer();
