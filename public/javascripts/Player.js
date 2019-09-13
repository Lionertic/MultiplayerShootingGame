
class Player{
    constructor(name,id){
        this.username = name;
        this.health = 100;
        this.id = id;
        this.score=0;
    }

    constructor(name,id,health,score){
        this.username = name;
        this.health = health;
        this.id = id;
        this.score=score;
    }

    setPosition(pos){
        this.pos = pos;
    }
    
    gotHit(){
        this.health -= 5;
        if(this.health<0)
        {
            console.log("dead")       
        }
    }
}
