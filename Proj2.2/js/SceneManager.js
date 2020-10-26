// TODO

// METER A BOLA A COLIDIR COM BOLA
// RODAR O TACO SELECIONADO
// METER LIMITES NA ROTACAO DO TACO SELECIONADO
// METER UMA BOLA NO TACO SELECIONADO
// DISPARAR A BOLA

class SceneManager {
    constructor(canvas) {

        this.clock = new THREE.Clock();

        this.screenDimensions = {
            width: canvas.width,
            height: canvas.height
        };

        this.scene = this.buildScene();
        this.renderer = this.buildRender(this.screenDimensions);
        this.cameras = this.buildCameras(this.screenDimensions);
        this.sceneSubjects = this.createSceneSubjects(this.scene);

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
        const sceneSubjects = {}
        sceneSubjects["snookerTable"] = new SnookerTable(scene, 0, 0, 0);
        sceneSubjects["cueStick4"] = new CueStick(4, scene, -7.5, 0.2, -13, "long");
        sceneSubjects["cueStick5"] = new CueStick(5, scene, 7.5, 0.2, -13, "long");
        sceneSubjects["cueStick6"] = new CueStick(6, scene, -7.5, 0.2, 13, "long");
        sceneSubjects["cueStick7"] = new CueStick(7, scene, 7.5, 0.2, 13, "long");
        sceneSubjects["cueStick8"] = new CueStick(8, scene, -20.5, 0.2, 0, "short");
        sceneSubjects["cueStick9"] = new CueStick(9, scene, 20.5, 0.2, 0, "short");
        for(let i = 0; i < 15; i++)
            sceneSubjects["ball"+i] = new Ball(scene, this.getRandomNumber(-14,14), 0.75, this.getRandomNumber(-7.5,7.5), this.getRandomNumber(-5,5), this.getRandomNumber(-5,5));

        return sceneSubjects;
    }

    update() {
        const clockDelta = this.clock.getDelta();

        for (let i = 0; i < 15; i++) {
            this.detectCollision(this.sceneSubjects["ball"+i]);
        }

        for (var subject in this.sceneSubjects) {
            if(typeof this.sceneSubjects[subject].update === "function"){
                this.sceneSubjects[subject].update(clockDelta);
            }
        }
        this.renderer.render(this.scene, this.currentCamera);
    };

    detectCollision(ball) {
        var inHole = false;
        for (var wall in this.sceneSubjects.snookerTable.walls) {
            if (wall !== ball.lastCollision && this.checkCollision(ball.ball, this.sceneSubjects.snookerTable.walls[wall])) {
                for (var hole in this.sceneSubjects.snookerTable.holes) {
                    if (this.checkCollision(ball.ball, this.sceneSubjects.snookerTable.holes[hole])) {
                        inHole = true;
                    }
                }
                this.updateBallDirection(ball, wall, inHole);
                ball.lastCollision = wall;
            }

        }
    }

    checkCollision(obj1, obj2) {
        obj1.updateMatrixWorld();
        obj2.updateMatrixWorld();
        obj1.geometry.computeBoundingSphere();
        obj2.geometry.computeBoundingBox();
        var box1 = obj1.geometry.boundingSphere.clone();
        box1.applyMatrix4(obj1.matrixWorld);
        var box2 = obj2.geometry.boundingBox.clone();
        box2.applyMatrix4(obj2.matrixWorld);

        return box1.intersectsBox(box2);
    }

    updateBallDirection(ball, wall, inHole) {
        // METER EM FUNCOES DA BALL
        
        if (inHole) {
            ball.direction.set(0, -1, 0);
            ball.zVel = 0;
            ball.xVel = 0;
            return;
        }

        if (wall === 'down' || wall === 'up') {
            ball.direction.z *= -1;
            ball.zVel *= -1;
        }

        if (wall === 'right' || wall === 'left') {
            ball.direction.x *= -1;
            ball.xVel *= -1;
        }
    }

    onWindowResize() {
        const { width, height } = canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;
        
        this.renderer.setSize(width, height);

        this.resizePerspectiveCamera(this.cameras.freeCamera);
        this.resizeOrthographicalCamera(this.cameras.camera1);
        this.resizePerspectiveCamera(this.cameras.camera2);
    
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

            // CueStick
            case 52: //4
                this.selectedCueStick = 4;
                break;
            case 53: //5
                this.selectedCueStick = 5;
                break;
            case 54: //6
                this.selectedCueStick = 6;
                break;
            case 55: //7
                this.selectedCueStick = 7;
                break;
            case 56: //8
                this.selectedCueStick = 8;
                break;
            case 57: //9
                this.selectedCueStick = 9;
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