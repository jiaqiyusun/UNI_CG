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
        cameras['freeCamera'] = this.createFreeCamera(15, 15, 15, { width, height });
        this.currentCamera = cameras.freeCamera;
    
        cameras['camera1'] = this.createOrthographicCamera(0, 0, 20, { width, height });
        cameras['camera2'] = this.createOrthographicCamera(0, 20, 0, { width, height });
        cameras['camera3'] = this.createOrthographicCamera(20, 0, 0, { width, height });

        return cameras;
    }

    createControls(camera) {    
        this.controls = new THREE.OrbitControls(camera, this.renderer.domElement);
        this.controls.addEventListener('change', this.renderer);
    }

    createFreeCamera(x, y, z, { width, height }) {
        var freeCamera = new THREE.PerspectiveCamera(
            70,     // FOV
            width / height,     // Aspect Ratio
            1,      // Near plane
            1000        //Far plane
        );
    
        freeCamera.position.set(x, y, z);
        freeCamera.lookAt(this.scene.position);
        this.scene.add(freeCamera);
    
        this.createControls(freeCamera);
    
        return freeCamera;
    }

    createOrthographicCamera(x, y, z, { width, height }) {
        var camera = new THREE.OrthographicCamera(
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
        const sceneSubjects = [
            new Mobile(scene, 0, 6, 0)
        ];

        return sceneSubjects;
    }

    update() {
        const clockDelta = this.clock.getDelta();

        for (let i = 0; i < this.sceneSubjects.length; i++)
            this.sceneSubjects[i].update(clockDelta);

        this.renderer.render(this.scene, this.currentCamera);
    };

    onWindowResize() {
        const { width, height } = canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;
        
        this.renderer.setSize(width, height);

        this.resizeFreeCamera();
        this.resizeOrthographicalCamera(this.cameras.camera1);
        this.resizeOrthographicalCamera(this.cameras.camera2);
        this.resizeOrthographicalCamera(this.cameras.camera3);
    
    };

    resizeFreeCamera() {
        if (this.screenDimensions.height > 0 && this.screenDimensions.width > 0) {
            this.cameras.freeCamera.aspect = this.screenDimensions.width / this.screenDimensions.height;
            this.cameras.freeCamera.updateProjectionMatrix();
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

    // TODO - abstracao de dados, SceneManager nao tem de saber como é que o Mobile funciona internamente
    onKeyDown(key) {
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
                this.currentCamera = this.cameras.camera3;
                break;
    
            // Wireframe
            case 52: //4
                this.sceneSubjects[0].material.wireframe = !this.sceneSubjects[0].material.wireframe
                break;
    
            // Rotation
            case 81: //Q
            case 113: //q
                this.sceneSubjects[0].mobileRotationHash.mobileLeftRotation = true;
                break;
            case 87: //W
            case 119: //w
                this.sceneSubjects[0].mobileRotationHash.mobileRightRotation = true;
                break;
    
            case 65: //A
            case 97: //a
                this.sceneSubjects[0].mobileRotationHash.mobileSecondPieceLeftRotation = true;
                break;
            case 68: //D
            case 100: //d
                this.sceneSubjects[0].mobileRotationHash.mobileSecondPieceRightRotation = true;
                break;
    
            case 90: //Z
            case 122: //z
                this.sceneSubjects[0].mobileRotationHash.mobileThirdPieceLeftRotation = true;
                break;
            case 67: //C
            case 99: //c
                this.sceneSubjects[0].mobileRotationHash.mobileThirdPieceRightRotation = true;
                break;
    
            // Translation
            case 37: // leftArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileLeftTranslation = true;
                break;
            case 38: // upArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileFrontTranslation = true;
                break;
            case 39: // rightArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileRightTranslation = true;
                break;
            case 40: // downArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileBackTranslation = true;
                break;
    
        }
    }   
    
    
    onKeyUp(key) {
        switch (key.keyCode) {
            // Rotation
            case 81: //Q
            case 113: //q
                this.sceneSubjects[0].mobileRotationHash.mobileLeftRotation = false;
                break;
            case 87: //W
            case 119: //w
                this.sceneSubjects[0].mobileRotationHash.mobileRightRotation = false;
                break;
    
            case 65: //A
            case 97: //a
                this.sceneSubjects[0].mobileRotationHash.mobileSecondPieceLeftRotation = false;
                break;
            case 68: //D
            case 100: //d
                this.sceneSubjects[0].mobileRotationHash.mobileSecondPieceRightRotation = false;
                break;
    
            case 90: //Z
            case 122: //z
                this.sceneSubjects[0].mobileRotationHash.mobileThirdPieceLeftRotation = false;
                break;
            case 67: //C
            case 99: //c
                this.sceneSubjects[0].mobileRotationHash.mobileThirdPieceRightRotation = false;
                break;
    
            // Translation
            case 37: // leftArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileLeftTranslation = false;
                break;
            case 38: // upArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileFrontTranslation = false;
                break;
            case 39: // rightArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileRightTranslation = false;
                break;
            case 40: // downArrow
                this.sceneSubjects[0].mobileTranslationHash.mobileBackTranslation = false;
                break;
        }
    }
}