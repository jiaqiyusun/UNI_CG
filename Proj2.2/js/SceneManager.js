class SceneManager {
    constructor(canvas) {

        this.clock = new THREE.Clock();

        this.screenDimensions = {
            width: canvas.width,
            height: canvas.height
        };

        this.ballsOnTable = 0;
        this.N = 15;

        this.scene = this.buildScene();
        this.renderer = this.buildRender(this.screenDimensions);
        this.cameras = this.buildCameras(this.screenDimensions);
        this.createSceneSubjects(this.scene);

        this.selectedCueStick = 0;
    }

    getRandomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");
        scene.add(new THREE.AxesHelper(10));

        return scene;
    }

    buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        document.body.appendChild(renderer.domElement);

        return renderer;
    }

    buildCameras({ width, height }) {
        var cameras = new Object()
        cameras['freeCamera'] = this.createFreeCamera(25, 25, 25, { width, height });
        this.currentCamera = cameras.freeCamera;
    
        cameras['camera1'] = this.createOrthographicCamera(0, 20, 0, { width, height });
        cameras['camera2'] = this.createPerspectiveCamera(0, 15, 15, { width, height });
        cameras['camera3'] = this.createPerspectiveCamera(0, 0, 0, { width, height })

        return cameras;
    }

    createControls(camera) {    
        this.controls = new THREE.OrbitControls(camera, this.renderer.domElement);
        this.controls.addEventListener('change', this.renderer);
    }

    createFreeCamera(x, y, z, { width, height }) {
        let freeCamera = this.createPerspectiveCamera(x, y, z, { width, height })
        this.createControls(freeCamera);

        return freeCamera;
    }

    createPerspectiveCamera(x, y, z, { width, height }) {
        let camera = new THREE.PerspectiveCamera(
            70,     // FOV
            width / height,     // Aspect Ratio
            1,      // Near plane
            1000        //Far plane
        );
    
        camera.position.set(x, y, z);
        camera.lookAt(this.scene.position);
        this.scene.add(camera);
        
        return camera;
    }

    createOrthographicCamera(x, y, z, { width, height }) {
        let camera = new THREE.OrthographicCamera(
            -(0.025 * width) / 2,     // left
            (0.025 * width) / 2,      // right
            (0.025 * height) / 2,    //top
            -(0.025 * height) / 2,     // bottom
            1,                                  // near
            1000,                               // far
        );
        
        camera.position.set(x, y, z);
        camera.lookAt(this.scene.position);
        this.scene.add(camera);
    
        return camera;
    }

    createSceneSubjects(scene) {
        this.sceneSubjects = {}
        this.sceneSubjects["snookerTable"] = new SnookerTable(scene, 0, 0, 0);
        this.sceneSubjects["cueStick4"] = new CueStick(4, scene, -7.5, 1, -8, "down");
        this.sceneSubjects["cueStick5"] = new CueStick(5, scene, 7.5, 1, -8, "down");
        this.sceneSubjects["cueStick6"] = new CueStick(6, scene, -7.5, 1, 8, "up");
        this.sceneSubjects["cueStick7"] = new CueStick(7, scene, 7.5, 1, 8, "up");

        for(let i = 0; i < this.N; i++) {
            let x = this.getRandomNumber(-13,13);
            let z = this.getRandomNumber(-6.5,6.5);
            let xVel = this.getRandomNumber(-5,5);
            let zVel = this.getRandomNumber(-5,5);

            if(this.canCreateBall(x, 0.5, z)) {
                this.sceneSubjects["ball"+i] = new Ball(i, scene, x, 0.5, z, xVel, zVel);
                this.ballsOnTable++;
            }
            else
                i--;
        }
    }

    update() {
        const clockDelta = this.clock.getDelta();
        
        for (var subject in this.sceneSubjects) {
            if(typeof this.sceneSubjects[subject].update === "function"){
                this.sceneSubjects[subject].update(clockDelta);
            }
        }

        if(this.ballsOnTable != this.N) {
            this.updateBallCamera();
        }

        for (let i = 0; i < this.ballsOnTable; i++) {
            this.ballInHole(this.sceneSubjects["ball"+i]);
            this.detectCollision(this.sceneSubjects["ball"+i]);
        }

        this.renderer.render(this.scene, this.currentCamera);
    };

    ballInHole(ball) {
        let temp = new  THREE.Vector3();

        for(let holePosition in this.sceneSubjects.snookerTable.holes) {
            holePosition = this.sceneSubjects.snookerTable.holes[holePosition];
            temp.fromArray(holePosition);
            if(ball.ball.position.distanceTo(temp) < 0.7) {
                ball.direction.set(0,-1,0);
                break;
            }
        }
    }

    detectCollision(ball) {
        this.detectCollisionTable(ball);
        this.detectCollisionBall(ball);
    }
    
    detectCollisionTable(ball) {
        if(ball.ball.position.x + 0.5 >= this.sceneSubjects.snookerTable.range.x) {
            ball.direction.x = -1;
            ball.xVel = Math.cos(0) * -1 * ball.totalVelocity;
        }
        else if(ball.ball.position.x - 0.5 <= -this.sceneSubjects.snookerTable.range.x) {
            ball.direction.x = 1;
            ball.xVel = Math.cos(0) * 1 * ball.totalVelocity;
        }
    
        if(ball.ball.position.z + 0.5 >= this.sceneSubjects.snookerTable.range.z) {
            ball.direction.z = -1;
            ball.zVel = Math.sin(Math.PI / 2) * -1 * ball.totalVelocity;
        }
        else if(ball.ball.position.z - 0.5 <= -this.sceneSubjects.snookerTable.range.z) {
            ball.direction.z = 1;
            ball.zVel = Math.sin(Math.PI / 2) * 1 * ball.totalVelocity;
         }
    }

    detectCollisionBall(ball1) {
        for(let i = ball1.id + 1; i < this.ballsOnTable; i++) {
            let ball2 = this.sceneSubjects["ball"+i];

            let normal = new THREE.Vector3()
            normal.copy(ball1.ball.position).sub(ball2.ball.position);
            let distance = normal.length();

            if(distance <= 1.0) {
                this.updateBallsDirection(ball1, ball2, normal, distance);
            }
        }
    }

    updateBallsDirection(ball1, ball2, normal, distance) {
        'use strict'
        //velocity
        let temp = ball1.totalVelocity;
        ball1.totalVelocity = ball2.totalVelocity;
        ball2.totalVelocity = temp;

        temp = ball1.xVel;
        ball1.xVel = ball2.xVel;
        ball2.xVel = temp;

        temp = ball1.zVel;
        ball1.zVel = ball2.zVel;
        ball2.zVel = temp;

        //translation
        normal.multiplyScalar(0.5 * distance - 0.5);

        ball1.ball.position.sub(normal);
        ball2.ball.position.add(normal);

        ball1.ball.position.y = 0.5;
        ball2.ball.position.y = 0.5;

        normal.normalize();

        let dir = new THREE.Vector3();
        dir.copy(ball1.direction).sub(ball2.direction);

        normal = normal.multiplyScalar(dir.dot(normal));

        ball1.direction.sub(normal);
        ball2.direction.add(normal);

        ball1.direction.y = 0;
        ball2.direction.y = 0;

    }

    onWindowResize() {
        const { width, height } = canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;
        
        this.renderer.setSize(width, height);

        this.resizePerspectiveCamera(this.cameras.freeCamera);
        this.resizeOrthographicalCamera(this.cameras.camera1);
        this.resizePerspectiveCamera(this.cameras.camera2);
        this.resizePerspectiveCamera(this.cameras.camera3);
    
    };

    resizePerspectiveCamera(camera) {
        if (this.screenDimensions.height > 0 && this.screenDimensions.width > 0) {
            camera.aspect = this.screenDimensions.width / this.screenDimensions.height;

            camera.updateProjectionMatrix();
        }
    }

    resizeOrthographicalCamera(camera) {    
        if (this.screenDimensions.height > 0 && this.screenDimensions.width > 0) {
            camera.left = -0.025 * this.screenDimensions.width / 2,     // left
            camera.right = 0.025 * this.screenDimensions.width / 2,      // right
            camera.top = 0.025 * this.screenDimensions.height / 2,    //top
            camera.bottom = -0.025 * this.screenDimensions.height / 2,     // bottom
    
            camera.updateProjectionMatrix();
        }
    }

    fireBall(scene, cueStick, ballNumber) {
        let ballDirection = new THREE.Vector3();
        cueStick.cueStick.getWorldDirection(ballDirection);

        switch (cueStick.id) {
            case 4:
                if (this.canCreateBall(-7.5, 0.5, -6.5)) {
                    this.sceneSubjects["ball"+ballNumber] = new Ball(ballNumber, scene, -7.5, 0.5, -6.5, ballDirection.x, ballDirection.z);
                    this.ballsOnTable++;
                }
                break;
            case 5:
                if (this.canCreateBall(7.5, 0.5, -6.5)) {
                    this.sceneSubjects["ball"+ballNumber] = new Ball(ballNumber, scene, 7.5, 0.5, -6.5, ballDirection.x, ballDirection.z);
                    this.ballsOnTable++;
                }
                break;
            case 6:
                if (this.canCreateBall(-7.5, 0.5, 6.5)) {
                    ballDirection.x *= -1;
                    ballDirection.z *= -1;
                    this.sceneSubjects["ball"+ballNumber] = new Ball(ballNumber, scene, -7.5, 0.5, 6.5, ballDirection.x, ballDirection.z);
                    this.ballsOnTable++;
                }
                break;
            case 7:
                if (this.canCreateBall(7.5, 0.5, 6.5)) {
                    ballDirection.x *= -1;
                    ballDirection.z *= -1;
                    this.sceneSubjects["ball"+ballNumber] = new Ball(ballNumber, scene, 7.5, 0.5, 6.5, ballDirection.x, ballDirection.z);
                    this.ballsOnTable++;
                }
                break;
        }
    }

    canCreateBall(x, y, z) {
        for(let i = 0; i < this.ballsOnTable; i++) {
            if(this.sceneSubjects["ball"+i].ball.position.distanceTo(new THREE.Vector3(x, y, z)) <= 1)
                return false;
        }
        return true;
    }

    selectCueStick(cueStickId) {
        if(cueStickId == this.selectedCueStick) {
            this.sceneSubjects["cueStick"+cueStickId].togleCueStick();
            this.selectedCueStick *= -1;
        }
        else if(this.selectedCueStick > 0) {
            this.sceneSubjects["cueStick"+this.selectedCueStick].togleCueStick();
            this.sceneSubjects["cueStick"+cueStickId].togleCueStick();
            this.selectedCueStick = cueStickId;
        }
        else {
            this.sceneSubjects["cueStick"+cueStickId].togleCueStick();
            this.selectedCueStick = cueStickId;
        }
            
    }

    updateBallCamera() {
        let ball = this.sceneSubjects["ball"+(this.ballsOnTable-1)];
        
        if(ball.totalVelocity != 0) {
            let camera3Position = new THREE.Vector3();

            camera3Position.copy(ball.ball.position);
            camera3Position.y = 1.5;
            camera3Position.sub(new THREE.Vector3(ball.direction.x + Math.sign(ball.direction.x), 0, ball.direction.z + Math.sign(ball.direction.z)));
    
            this.cameras.camera3.position.copy(camera3Position);

        }
        this.cameras.camera3.lookAt(ball.ball.position);
    }

    onKeyDown(key) {
        for (var subject in this.sceneSubjects)
            if(typeof this.sceneSubjects[subject].onKeyDown === "function")
                this.sceneSubjects[subject].onKeyDown(key);

        switch (key.keyCode) {
            // Camera
            case 48: //0
                this.currentCamera = this.cameras.freeCamera;
                break;
            case 49: //1
                this.currentCamera = this.cameras.camera1;
                break;
            case 50: //2
                this.currentCamera = this.cameras.camera2;
                break;
            case 51: //3
                if(this.ballsOnTable != this.N) {
                    this.currentCamera = this.cameras.camera3;
                }
                break;

            // CueStick
            case 52: //4
            case 53: //5
            case 54: //6
            case 55: //7
                this.selectCueStick(key.keyCode - 48);
                break;

            // fire ball
            case 32: //space
                if(this.selectedCueStick > 0)
                    this.fireBall(this.scene, this.sceneSubjects["cueStick" + this.selectedCueStick], this.ballsOnTable);
                break;

            
        }
    }

    
    onKeyUp(key) {
        for (var subject in this.sceneSubjects)
            if(typeof this.sceneSubjects[subject].onKeyUp === "function")
                this.sceneSubjects[subject].onKeyUp(key);

        switch (key.keyCode) {

        }
    }
}