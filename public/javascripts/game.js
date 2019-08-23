var line1,line2,xc,yc,zc,camera;

var a;
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
        //if (!engine.isPointerLock) {
        //    return;
        //}
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

    var myPoints = [
        new BABYLON.Vector3(0, -0.5, 0),
        new BABYLON.Vector3(0, +0.5,0 )
    ];
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var line = new BABYLON.GUI.Line();
    line.x1 = 750;
    line.y1 = 350;
    line.x2 = 750;
    line.y2 = 400;
    line.lineWidth = 2;
    line.color = "white";
    advancedTexture.addControl(line);

    var line2 = new BABYLON.GUI.Line();
    line2.x1 = 725;
    line2.y1 = 375;
    line2.x2 = 775;
    line2.y2 = 375;
    line2.lineWidth = 2;
    line2.color = "white";
    advancedTexture.addControl(line2);
};

var canvas = document.getElementById("renderCanvas");

createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Lights
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);
    //lights end
    // create camera
    camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
    camera.attachControl(canvas, true);
    //create camera end
    //Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 110.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(.3, .3, .3);
    // ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, -10, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    //ground end
    var box = BABYLON.Mesh.CreateBox("crate", 2, scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseTexture = new BABYLON.Texture("textures/crate.jpg", scene);
    box.material.diffuseTexture.hasAlpha = true;
    box.position = new BABYLON.Vector3(5, -9, -10);
    //house materials

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
    camera.speed = 0.5;
    camera.ellipsoid = new BABYLON.Vector3(1, 2, 1);
    camera.angularSensibility=4000;
    //camera stuff end


    //collisions
    ground.checkCollisions = true;
    box.checkCollisions=true;

    //collisions end
    //movement
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    camera.keysLeft.push(65);
    //movement end



    ground.receiveShadows = true;



    function jump(){
        camera.cameraDirection.y = 2;
    }

    document.body.onkeyup = function(e){
        //     const cameraForwardRay = camera.getForwardRay(10);
        // const newPosition = camera.position.add(cameraForwardRay.direction.scale(cameraForwardRay.length));
        // dot.position = newPosition;
        if(e.keyCode == 32){
            //your code
            console.log("jump");
            setTimeout(jump(), 1000);
        }
        if(e.keyCode == 16){
            // alert("jey")
            camera.speed=0.5;
        }


    };
    document.body.onkeydown=function(e){
        //     const cameraForwardRay = camera.getForwardRay(10);
        // const newPosition = camera.position.add(cameraForwardRay.direction.scale(cameraForwardRay.length));
        // dot.position = newPosition;
        if(e.keyCode == 16){
            camera.speed=1;
        }
    };
    scene.onPointerDown = function (evt) {
        const cameraForwardRay = camera.getForwardRay(10);
        const newPosition = camera.position.add(cameraForwardRay.direction.scale(cameraForwardRay.length));
        // alert(newPosition);
        canvas.requestPointerLock();
        // }
    };


    // scene.onPointerMove = function (e) {
    //     // console.log(e);
    //     // switch (e.keyCode) {
    //     //     case 70:
    //     //     console.log("70 F ");
    //     //     if (!engine.isFullscreen) {
    //     //         engine.switchFullscreen(true); //true = requestPointerLock.
    //     //     }
    //     //     else if(!engine.isPointerLock && canvas.requestPointerLock){
    //             canvas.requestPointerLock();
    //     //     }
    //     // }
    // }

    scene.registerBeforeRender(function () {
    });

    engine.runRenderLoop(function () {
    });



    return scene;
};

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
var no = prompt('Please tell me your name');
var socket = io.connect('/dynamic-' + no);

socket.on('is_online', function(username) {
    console.log(username)
});
socket.on('username', function(username) {
    console.log(username)
});

socket.on('hello', function () {
    console.log('fun')
});
var username = prompt('Please tell me your name');
socket.emit('username', username);

function listen(socket,msg) {
    console.log(msg);
    socket.on(msg.toString(), function () {
        alert('data');
        console.log('data')
    });

    socket.on('chat_message', function(msg){
        $('#messages').append($('<li>').html(msg));
    });
}