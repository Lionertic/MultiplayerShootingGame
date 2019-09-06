// import { log } from "util";
var gun;
var particleSystem;
xc=$(window).width()/2;
yc=$(window).height()/2;

function createMap()
{
    ground = BABYLON.Mesh.CreateBox("ground", 200.0, scene);
    ground.scaling.y=0.1
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material = new BABYLON.StandardMaterial("Mat", scene);
    ground.material.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
    ground.position = new BABYLON.Vector3(5, -25, -15);
    ground.checkCollisions = true;

    boundry1 = BABYLON.Mesh.CreateBox("b1", 200.0, scene);
    boundry1.scaling.z=0.1
    boundry1.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry1.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry1.material.diffuseTexture = new BABYLON.Texture("textures/leftwall.jpg", scene);
    boundry1.position = new BABYLON.Vector3(5, -10, 85);
    boundry1.checkCollisions=true;

    boundry2 = BABYLON.Mesh.CreateBox("b2", 200.0, scene);
    boundry2.scaling.z=0.1
    boundry2.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry2.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry2.material.diffuseTexture = new BABYLON.Texture("textures/rightwall.jpg", scene);
    boundry2.position = new BABYLON.Vector3(5, -10, -110);
    boundry2.rotation = new BABYLON.Vector3(-Math.PI, 0, 0);
    boundry2.checkCollisions=true;

    boundry3 = BABYLON.Mesh.CreateBox("b3", 200.0, scene);
    boundry3.scaling.z=0.1
    boundry3.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry3.material.diffuseColor = new BABYLON.Color3.White();
    boundry3.position = new BABYLON.Vector3(110, -10, -10);
    boundry3.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry3.material.diffuseTexture = new BABYLON.Texture("textures/backwall.jpg", scene);
    boundry3.rotation = new BABYLON.Vector3(Math.PI, -Math.PI/2, 0);
    boundry3.checkCollisions=true;

    boundry4 = BABYLON.Mesh.CreateBox("b4", 200.0, scene);
    boundry4.scaling.z=0.1
    boundry4.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry4.material.diffuseColor = new BABYLON.Color3.White();
    boundry4.position = new BABYLON.Vector3(-100, -10, -10);
    boundry4.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry4.material.diffuseTexture = new BABYLON.Texture("textures/backwall.jpg", scene);
    boundry4.rotation = new BABYLON.Vector3(Math.PI, Math.PI/2, 0);
    boundry4.checkCollisions=true;

    brick1 = BABYLON.Mesh.CreateBox("br1", 15, scene);
    brick1.scaling.x=3
    brick1.scaling.y=2.1
    brick1.scaling.z=.5
    brick1.material = new BABYLON.StandardMaterial("Mat", scene);
    brick1.position = new BABYLON.Vector3(80, -9, -60); 
    brick1.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick1.checkCollisions=true;

    brick2 = BABYLON.Mesh.CreateBox("br2", 15, scene);
    brick2.scaling.x=3
    brick2.scaling.y=2.1
    brick2.scaling.z=.5
    brick2.material = new BABYLON.StandardMaterial("Mat", scene);
    brick2.position = new BABYLON.Vector3(80, -9, 40); 
    brick2.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick2.checkCollisions=true;

    brick3 = BABYLON.Mesh.CreateBox("br3", 15, scene);
    brick3.scaling.x=3
    brick3.scaling.y=2.1
    brick3.scaling.z=.5
    brick3.material = new BABYLON.StandardMaterial("Mat", scene);
    brick3.position = new BABYLON.Vector3(-71, -9, -60); 
    brick3.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick3.checkCollisions=true;

    brick4 = BABYLON.Mesh.CreateBox("br4", 15, scene);
    brick4.scaling.x=3
    brick4.scaling.y=2.1
    brick4.scaling.z=.5
    brick4.material = new BABYLON.StandardMaterial("Mat", scene);
    brick4.position = new BABYLON.Vector3(-71, -9, 40); 
    brick4.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick4.checkCollisions=true;

    cbrick1 = BABYLON.Mesh.CreateBox("cbr1", 15, scene);
    cbrick1.scaling.x=4
    cbrick1.scaling.y=2.1
    cbrick1.scaling.z=1
    cbrick1.material = new BABYLON.StandardMaterial("Mat", scene);
    cbrick1.position = new BABYLON.Vector3(1, -1, 10); 
    cbrick1.material.diffuseTexture = new BABYLON.Texture("textures/brick1.jpg", scene);
    cbrick1.checkCollisions=true;

    cbrick2 = BABYLON.Mesh.CreateBox("cbr2", 15, scene);
    cbrick2.scaling.x=4
    cbrick2.scaling.y=2.1
    cbrick2.scaling.z=1
    cbrick2.material = new BABYLON.StandardMaterial("Mat", scene);
    cbrick2.position = new BABYLON.Vector3(1, -1, -35); 
    cbrick2.material.diffuseTexture = new BABYLON.Texture("textures/brick1.jpg", scene);
    cbrick2.checkCollisions=true;
}

function jump()
{
        camera.cameraDirection.y = 3;
}

function crossInit()
{
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    line1 = new BABYLON.GUI.Line();
    var gun_body;
    gun =BABYLON.SceneLoader.ImportMesh("", "scenes/", "gun.babylon", scene, function (meshes) {          
        
          
          var scalingFactor = new BABYLON.Vector3(0.01, 0.01, 0.01);
          
          gun_body=meshes[1]
          console.log(gun_body)
            
        for (var i=0; i<meshes.length;i++){
           
            //  meshes[i].scaling=scalingFactor;
            meshes[i].rotate(camera.getFrontPosition(0), 7 * Math.PI / 6.5, BABYLON.Space.LOCAL);
            meshes[i].parent=camera
            // meshes[i].translate(new BABYLON.Vector3(2, 6, -30), 3, BABYLON.Space.LOCAL);

            // meshes[i].collisionsEnabled=true;
            // meshes[i].checkCollisions=true;
        }
       gun_body.scaling=scalingFactor  
    gun_body.position= new BABYLON.Vector3(0.5,-1,5);
    // gun_body.rotation.x = -Math.PI/2;
    // gun_body.rotation.y = Math.PI;
    // gun_body.parent = camera;
// 
    });
    // gun_body.position= new BABYLON.Vector3(0.25,-0.4,1);

    advancedTexture.addControl(line1);
    line2 = new BABYLON.GUI.Line();
    advancedTexture.addControl(line2);
    line3 = new BABYLON.GUI.Line();
    advancedTexture.addControl(line3);
    line4 = new BABYLON.GUI.Line();
    advancedTexture.addControl(line4);
    line1.lineWidth=line2.lineWidth=line3.lineWidth=line4.lineWidth=2

    cross(xc,yc)
}

function crossShoot(x,y)
{
    line1.x1 = x;
    line1.y1 = y-25;
    line1.x2 = x;
    line1.y2 = y-15;

    line2.x1 = x;
    line2.y1 = y+15;
    line2.x2 = x;
    line2.y2 = y+25;

    line3.x1 = x-25;
    line3.y1 = y;
    line3.x2 = x-15;
    line3.y2 = y;

    line4.x1 = x+15;
    line4.y1 = y;
    line4.x2 = x+25;
    line4.y2 = y;
}

function cross(x,y)
{
  line1.x1 = x;
  line1.y1 = y-25;
  line1.x2 = x;
  line1.y2 = y-10;

  line2.x1 = x;
  line2.y1 = y+10;
  line2.x2 = x;
  line2.y2 = y+25;

  line3.x1 = x-25;
  line3.y1 = y;
  line3.x2 = x-10;
  line3.y2 = y;

  line4.x1 = x+10;
  line4.y1 = y;
  line4.x2 = x+25;
  line4.y2 = y;
}

function randomSpawn()
{
 var s_x = Math.random()*10;
 var s_y = Math.random()*10;
 var s_z = Math.random()*10;
 var pos = new Array()
 pos.push(Math.random()*10)
 pos.push(Math.random()*10)
 pos.push(Math.random()*10)
 return pos;
}

BABYLON.FreeCameraMouseInput.prototype.attachControl = function (element, noPreventDefault)
{
    var _this = this;
    var engine = this.camera.getEngine();
    if (!this._pointerInput)
    {
        this._pointerInput = function (p, s)
        {
            var evt = p.event;
            if (engine.isInVRExclusivePointerMode)
            {
                return;
            }
            if (!_this.touchEnabled && evt.pointerType === "touch")
            {
                return;
            }
            if (p.type !== BABYLON.PointerEventTypes.POINTERMOVE && _this.buttons.indexOf(evt.button) === -1)
            {
                return;
            }
            var srcElement = (evt.srcElement || evt.target);
            if (p.type === BABYLON.PointerEventTypes.POINTERDOWN && srcElement)
            {
                try
                {
                    srcElement.setPointerCapture(evt.pointerId);
                }
                catch (e) {}
                _this.previousPosition =
                {
                    x: evt.clientX,
                    y: evt.clientY
                };
                if (!noPreventDefault)
                {
                    evt.preventDefault();
                    element.focus();
                }
            }
            else if (p.type === BABYLON.PointerEventTypes.POINTERUP && srcElement)
            {
                try
                {
                    srcElement.releasePointerCapture(evt.pointerId);
                }
                catch (e) {}
                _this.previousPosition = null;
                if (!noPreventDefault)
                {
                    evt.preventDefault();
                }
            }
            else if (p.type === BABYLON.PointerEventTypes.POINTERMOVE)
            {
                if (!_this.previousPosition || engine.isPointerLock) 
                {
                    return;
                }
                var offsetX = evt.clientX - _this.previousPosition.x;
                if (_this.camera.getScene().useRightHandedSystem)
                    offsetX *= -1;
                if (_this.camera.parent && _this.camera.parent._getWorldMatrixDeterminant() < 0)
                    offsetX *= -1;
                _this.camera.cameraRotation.y += offsetX / _this.angularSensibility;
                var offsetY = evt.clientY - _this.previousPosition.y;
                _this.camera.cameraRotation.x += offsetY / _this.angularSensibility;
                _this.previousPosition =
                {
                    x: evt.clientX,
                    y: evt.clientY
                };
                if (!noPreventDefault)
                {
                    evt.preventDefault();
                }
            }
        };
    }
    this._onMouseMove = function (evt)
    {
        if (engine.isInVRExclusivePointerMode) 
        {
            return;
        }

        var offsetX = evt.movementX || evt.mozMovementX || evt.webkitMovementX || evt.msMovementX || 0;
        if (_this.camera.getScene().useRightHandedSystem)
            offsetX *= -1;
        if (_this.camera.parent && _this.camera.parent._getWorldMatrixDeterminant() < 0)
            offsetX *= -1;
        _this.camera.cameraRotation.y += offsetX / _this.angularSensibility;
        var offsetY = evt.movementY || evt.mozMovementY || evt.webkitMovementY || evt.msMovementY || 0;
        _this.camera.cameraRotation.x += offsetY / _this.angularSensibility;
        _this.previousPosition = null;
        if (!noPreventDefault)
        {
            evt.preventDefault();
        }
    };
    this._observer = this.camera.getScene().onPointerObservable.add(this._pointerInput, BABYLON.PointerEventTypes.POINTERDOWN | BABYLON.PointerEventTypes.POINTERUP | BABYLON.PointerEventTypes.POINTERMOVE);
    element.addEventListener(BABYLON.Tools.GetPointerPrefix() +"move", this._onMouseMove, false);
};

var canvas = document.getElementById("renderCanvas");

document.body.onkeyup = function(e)
{
    if(e.keyCode == 16)
    {
        camera.speed=1.5;
    }
};

document.body.onkeydown = function(e)
{
    // if(e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 65 ){
    //     sendLocationIO()
    // }
    // console.log(camera.position);
    
    if(e.keyCode == 13){
        canvas.requestPointerLock();
        camera.position.y=-6.95
        // sendLocationIO()
    }

   
    if(e.keyCode == 32){
        if(camera.cameraDirection.y<=.1){
            jump();
            // sendLocationIO()
        }
    }
    if(e.keyCode == 16){
        camera.speed=2.5;
    }
};

function shoot1()
{
    var direction =camera.getTarget().subtract(camera.position)
    
    particleSystem.emitter = camera.getFrontPosition(3);
    particleSystem.createDirectedSphereEmitter(.1, direction);
    // particleSystem.direction1 = direction;
    var distance = camera.getFrontPosition(1);
    var ray = new BABYLON.Ray(distance, direction, 250);
    rayHelper = new BABYLON.RayHelper(ray);		
    var hit = scene.pickWithRay(ray);
    if (hit.pickedMesh){
        sendMouseClickEvent(hit.pickedMesh.id)
    }
} 

function recoil()
{
    if(!crossMove)
    {
        crossReset()
    }
    else
    {
        if(i==0)
        {
            i++;
            camera.cameraDirection.x=0.01
            camera.cameraDirection.y=0.01
            camera.cameraDirection.z=0.01
        }
        else
        {
            i--;
            camera.cameraDirection.x=-0.01
            camera.cameraDirection.y=-0.01
            camera.cameraDirection.z=-0.01
        }
        crossShoot(xc,yc);
    }
}

function crossReset()
{
  xc=$(window).width()/2;
  yc=$(window).height()/2;
    cross(xc,yc)
}

createScene = function ()
{
    var scene = new BABYLON.Scene(engine);
    crossInit();
    
    var light2 = new BABYLON.PointLight("Oi", new BABYLON.Vector3(98,100,-108), scene);
    var light3 = new BABYLON.PointLight("O", new BABYLON.Vector3(-90,100,-108), scene);
    var light4 = new BABYLON.PointLight("O", new BABYLON.Vector3(-90,100,78), scene);
    var light5 = new BABYLON.PointLight("Oi", new BABYLON.Vector3(98,100,78), scene);
    light2.intensity=0.5;
    light3.intensity=0.5;
    light4.intensity=0.5;
    light5.intensity=0.5;
    
    createMap();

    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    scene.collisionsEnabled = true;

    camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(5,-9,-10), scene);
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    camera.speed = 1.5;
    camera.ellipsoid = new BABYLON.Vector3(3, 6, 3);
    camera.angularSensibility=5500;
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    camera.keysLeft.push(65);
    camera.position.y=100;
    camera.applyGravity = true;








  

















    scene.onPointerUp = function(e)
    {
        crossMove=false;
        clearInterval(sid);
        // rayHelper.dispose()
        particleSystem.stop()
    }





    scene.onPointerDown = function (evt) 
    {
        canvas.requestPointerLock();
        sid = setInterval(shoot1,50);
        // crossMove=true;
        particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
   
    // the starting object, the emitter
    // particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.5, -0.5); // Starting all from
    // particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5); // To...
    particleSystem.disposeOnStop = true;
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.05;
    particleSystem.emitRate = 1000;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1;
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    particleSystem.gravity = new BABYLON.Vector3(0, -5, 0);

  //  particleSystem.createSphereEmitter(2);

    // Start the particle system
    particleSystem.start();


    };
    
    setInterval(recoil,100)
    setInterval(sendLocationIO,5)
    
    scene.registerBeforeRender(function () {});

    engine.runRenderLoop(function () {});
    
    
    return scene;
};

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();
engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

window.addEventListener("resize", function () {
    engine.resize();
});

function sendLocationIO(){
    let playerMove = {
        id : me.id,
        pos : camera.getFrontPosition(0)
    }
    socketIO.emit('player_move',playerMove)
}

function sendMouseClickEvent(id){
    let playerShoot = {
        id : me.id,
        hit : id
    }
    socketIO.emit('player_shoot',playerShoot)
}


// socket.on('cam', (data) => {
//     console.log("sucess cam");
    
// });

function abc(){
    camera.position= new BABYLON.Vector3(5,100,-10)    
}
