var line1,line2,line3,line4,xc=750,yc=375,zc,camera,crossMove=false,i=0,crossRecoil;
var advancedTexture
xc=$(window).width()/2;
yc=$(window).height()/2;

function newPlayer(pos)
{
    BABYLON.SceneLoader.ImportMesh("", "Scenes/", "dummy3.babylon", scene, function (newMeshes) {
       });
}
function createMap()
{
    var boundry1 = BABYLON.Mesh.CreatePlane("b1", 200.0, scene);
    boundry1.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry1.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry1.material.diffuseTexture = new BABYLON.Texture("textures/leftwall.jpg", scene);
    boundry1.position = new BABYLON.Vector3(5, -10, 80);
    boundry1.checkCollisions=true;

    var boundry2 = BABYLON.Mesh.CreatePlane("b2", 200.0, scene);
    boundry2.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry2.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry2.material.diffuseTexture = new BABYLON.Texture("textures/rightwall.jpg", scene);
    boundry2.position = new BABYLON.Vector3(5, -10, -110);
    boundry2.rotation = new BABYLON.Vector3(-Math.PI, 0, 0);
    boundry2.checkCollisions=true;

    var boundry3 = BABYLON.Mesh.CreatePlane("b3", 200.0, scene);
    boundry3.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry3.material.diffuseColor = new BABYLON.Color3.White();
    boundry3.position = new BABYLON.Vector3(100, -10, -10);
    boundry3.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry3.material.diffuseTexture = new BABYLON.Texture("textures/backwall.jpg", scene);
    boundry3.rotation = new BABYLON.Vector3(Math.PI, -Math.PI/2, 0);
    boundry3.checkCollisions=true;

    var boundry4 = BABYLON.Mesh.CreatePlane("b4", 200.0, scene);
    boundry4.material = new BABYLON.StandardMaterial("groundMat", scene);
    boundry4.material.diffuseColor = new BABYLON.Color3.White();
    boundry4.position = new BABYLON.Vector3(-93, -10, -10);
    boundry4.material = new BABYLON.StandardMaterial("Mat", scene);
    boundry4.material.diffuseTexture = new BABYLON.Texture("textures/backwall.jpg", scene);
    boundry4.rotation = new BABYLON.Vector3(Math.PI, Math.PI/2, 0);
    boundry4.checkCollisions=true;

    var brick1 = BABYLON.Mesh.CreateBox("br1", 15, scene);
    brick1.scaling.x=3
    brick1.scaling.y=2.1
    brick1.scaling.z=.5
    brick1.material = new BABYLON.StandardMaterial("Mat", scene);
    brick1.position = new BABYLON.Vector3(80, -9, -60); 
    brick1.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick1.checkCollisions=true;

    var brick2 = BABYLON.Mesh.CreateBox("br1", 15, scene);
    brick2.scaling.x=3
    brick2.scaling.y=2.1
    brick2.scaling.z=.5
    brick2.material = new BABYLON.StandardMaterial("Mat", scene);
    brick2.position = new BABYLON.Vector3(80, -9, 40); 
    brick2.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick2.checkCollisions=true;

    var brick3 = BABYLON.Mesh.CreateBox("br1", 15, scene);
    brick3.scaling.x=3
    brick3.scaling.y=2.1
    brick3.scaling.z=.5
    brick3.material = new BABYLON.StandardMaterial("Mat", scene);
    brick3.position = new BABYLON.Vector3(-71, -9, -60); 
    brick3.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick3.checkCollisions=true;

    var brick4 = BABYLON.Mesh.CreateBox("br1", 15, scene);
    brick4.scaling.x=3
    brick4.scaling.y=2.1
    brick4.scaling.z=.5
    brick4.material = new BABYLON.StandardMaterial("Mat", scene);
    brick4.position = new BABYLON.Vector3(-71, -9, 40); 
    brick4.material.diffuseTexture = new BABYLON.Texture("textures/brick.jpg", scene);
    brick4.checkCollisions=true;

    var cbrick1 = BABYLON.Mesh.CreateBox("br1", 15, scene);
    cbrick1.scaling.x=4
    cbrick1.scaling.y=2.1
    cbrick1.scaling.z=1
    cbrick1.material = new BABYLON.StandardMaterial("Mat", scene);
    cbrick1.position = new BABYLON.Vector3(1, -1, 10); 
    cbrick1.material.diffuseTexture = new BABYLON.Texture("textures/brick1.jpg", scene);
    cbrick1.checkCollisions=true;

    var cbrick1 = BABYLON.Mesh.CreateBox("br1", 15, scene);
    cbrick1.scaling.x=4
    cbrick1.scaling.y=2.1
    cbrick1.scaling.z=1
    cbrick1.material = new BABYLON.StandardMaterial("Mat", scene);
    cbrick1.position = new BABYLON.Vector3(1, -1, -35); 
    cbrick1.material.diffuseTexture = new BABYLON.Texture("textures/brick1.jpg", scene);
    cbrick1.checkCollisions=true;


}

function jump()
{
        camera.cameraDirection.y = 3;
}

function crossInit(){

    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    line1 = new BABYLON.GUI.Line();

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

BABYLON.FreeCameraMouseInput.prototype.attachControl = function (element, noPreventDefault) {

    var _this = this;
    var engine = this.camera.getEngine();
    if (!this._pointerInput) {
        this._pointerInput = function (p, s) {
            var evt = p.event;
            if (engine.isInVRExclusivePointerMode) {
                return;
            }
            if (!_this.touchEnabled && evt.pointerType === "touch") {
                return;
            }
            if (p.type !== BABYLON.PointerEventTypes.POINTERMOVE && _this.buttons.indexOf(evt.button) === -1) {
                return;
            }
            var srcElement = (evt.srcElement || evt.target);
            if (p.type === BABYLON.PointerEventTypes.POINTERDOWN && srcElement) {
                try {
                    srcElement.setPointerCapture(evt.pointerId);
                }
                catch (e) {
                    //Nothing to do with the error. Execution will continue.
                }
                _this.previousPosition = {
                    x: evt.clientX,
                    y: evt.clientY
                };
                if (!noPreventDefault) {
                    evt.preventDefault();
                    element.focus();
                }
            }
            else if (p.type === BABYLON.PointerEventTypes.POINTERUP && srcElement) {
                try {
                    srcElement.releasePointerCapture(evt.pointerId);
                }
                catch (e) {
                    //Nothing to do with the error.
                }
                _this.previousPosition = null;
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            }
            else if (p.type === BABYLON.PointerEventTypes.POINTERMOVE) {
                if (!_this.previousPosition || engine.isPointerLock) {
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
                _this.previousPosition = {
                    x: evt.clientX,
                    y: evt.clientY
                };
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            }
        };
    }
    this._onMouseMove = function (evt) {
        if (engine.isInVRExclusivePointerMode) {
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
        if (!noPreventDefault) {
            evt.preventDefault();
        }
    };
    this._observer = this.camera.getScene().onPointerObservable.add(this._pointerInput, BABYLON.PointerEventTypes.POINTERDOWN | BABYLON.PointerEventTypes.POINTERUP | BABYLON.PointerEventTypes.POINTERMOVE);
    element.addEventListener(BABYLON.Tools.GetPointerPrefix() +"move", this._onMouseMove, false);

};

var canvas = document.getElementById("renderCanvas");


createScene = function () {
    var scene = new BABYLON.Scene(engine);canvas.requestPointerLock();
    crossInit();
    // Lights
    // var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-5, 100, -14), scene);
    var light2 = new BABYLON.PointLight("Oi", new BABYLON.Vector3(98,100,-108), scene);
    var light3 = new BABYLON.PointLight("O", new BABYLON.Vector3(-90,100,-108), scene);
    var light4 = new BABYLON.PointLight("O", new BABYLON.Vector3(-90,100,78), scene);
    var light5 = new BABYLON.PointLight("Oi", new BABYLON.Vector3(98,100,78), scene);
    light2.intensity=0.5;
    light3.intensity=0.5;
    light4.intensity=0.5;
    light5.intensity=0.5;



    //lights end
    // create camera
    // var nwpos=randomSpawn();
    // alert(nwpos)
    createMap();
    camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(5,-9,-10), scene);
    camera.attachControl(canvas, true);
    // camera.cameraDirection.x=nwpos[0]
    // camera.cameraDirection.y=nwpos[1]
    // camera.cameraDirection.z=nwpos[2]

    //create camera end
    //Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 200.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material = new BABYLON.StandardMaterial("Mat", scene);
    ground.material.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
    ground.position = new BABYLON.Vector3(5, -10, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    //ground end
  
    
    
    //red dot
    var dot = BABYLON.MeshBuilder.CreateSphere("rdot",{segments:0,diameter:.1,scene});
    // camera.lockedTarget=dot;

    // dot.position = newPosition;
    // // dot.position=


    //gravity
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    //gravity end
    // Enable Collisions
    scene.collisionsEnabled = true;
    //enable col end
    //camera stuff
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.speed = 1.5;
    camera.ellipsoid = new BABYLON.Vector3(2, 4, 2);
    camera.angularSensibility=5000;
    //camera stuff end
    //collisions
    ground.checkCollisions = true;
    // box.checkCollisions=true;

    //collisions end
    //movement
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    camera.keysLeft.push(65);
    //movement end
    ground.receiveShadows = true;

   

    document.body.onkeyup = function(e)
    {
        if(e.keyCode == 16){
            // alert("jey")
            camera.speed=1.5;
        }
    };
    document.body.onkeydown=function(e)
    {
        // console.log(camera.position.x)
        // console.log(camera.position.y)
        // console.log(camera.position.z)
        if(e.keyCode == 32)
        {
            if(camera.cameraDirection.y<=.1)
            {
                console.log("jump");
                jump();
            }
        }
        if(e.keyCode == 16)
        {
            camera.speed=2.5;
        }
    };
    scene.onPointerUp = function(e)
    {
      crossMove=false;
    }
    scene.onPointerDown = function (evt) 
    {
     // crossMove=true;
      var nextBulletTime = new Date().getTime();
      const currentTime = new Date().getTime();
     
      
        console.log("Asdf")
        scene.actionManager = new BABYLON.ActionManager(scene);
       // if(currentTime>nextBulletTime)
        //{
        // var forward = new BABYLON.Vector3(camera.cameraDirection.x,camera.cameraDirection.y,camera.cameraDirection.z);
        // console.log(camera.getDirection(forward))
        var direction = camera.getTarget().subtract(camera.position)
        const bullet = BABYLON.Mesh.CreateBox(`${currentTime}bullet`,0.5, scene);
        nextBulletTime = new Date().getTime() + 200;
        bullet.position = camera.getFrontPosition(1);
        const bulletAction = scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnEveryFrameTrigger, function (evt) {
            bullet.position.addInPlace(direction);
            console.log(bullet.position)
        }));
        setTimeout(()=>{
            scene.actionManager.unregisterAction(bulletAction);
            // bullet.dispose();
        }, 500)
    
    //}

      canvas.requestPointerLock();
    };
    
    setInterval(recoil,100)

    function recoil()
    {
        if(!crossMove)
        {
            crossReset()
        }
        else
        {
            // yc-=5;
            if(i==0)
            {
                i++;
                // xoff=15
                camera.cameraDirection.x=0.1
                camera.cameraDirection.y=0.1
                camera.cameraDirection.z=0.1


            }
            else
            {
                i--;
                camera.cameraDirection.x=-0.1
                camera.cameraDirection.y=-0.1
                camera.cameraDirection.z=-0.1
                // xoff=-15
            }
            crossShoot(xc,yc);
        }
    }

    scene.registerBeforeRender(function () {
    });

    engine.runRenderLoop(function () {
    });

    return scene;
};
function crossReset(){

  xc=$(window).width()/2;
  yc=$(window).height()/2;
    cross(xc,yc)
}
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});