class Player{
    constructor(name){
        this.username = name;
        this.health = 100;
    }

    setPosition(pos){
        this.pos = pos;
    }
    
    gotHit(){
        this.health -= 1;
    }
}