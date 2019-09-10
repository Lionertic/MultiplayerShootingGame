
class Player{
    constructor(name,id){
        this.username = name;
        this.health = 100;
        this.id = id;
    }

    setPosition(pos){
        this.pos = pos;
    }
    
    gotHit(){
        this.health -= 10;
        // console.log(this.username);
        // console.log(this.health);
        if(this.health<0)
        {
            console.log("dead")
            // this.dispose();
           
        }
    }

    
}
