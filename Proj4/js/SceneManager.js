// reset
class SceneManager {
    constructor(canvas) {
        this.clock = new THREE.Clock();

        this.screenDimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.viewSize = 35;

        this.isScenePaused = false;

        this.scene = this.buildScene();
        this.scenePause = this.buildScenePause();
        this.sceneBackground = this.buildSceneBackground();
        this.renderer = this.buildRender(this.screenDimensions);
        this.cameras = this.buildCameras(this.screenDimensions);
        this.sceneSubjects = this.createSceneSubjects(this.scene);
        this.scenePauseSubjects = this.createScenePauseSubjects(this.scenePause);
    }

    buildSceneBackground() {
        const sceneBackground = new THREE.Scene();

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            "images/cubemap/px.png",
            "images/cubemap/nx.png",
            "images/cubemap/py.png",
            "images/cubemap/ny.png",
            "images/cubemap/pz.png",
            "images/cubemap/nz.png",
        ]);
        sceneBackground.background = texture;
        // sceneBackground.add(new THREE.AxesHelper(10));

        return sceneBackground;
    }

    buildScene() {
        const scene = new THREE.Scene();
        // scene.add(new THREE.AxesHelper(10));

        return scene;
    }

    buildScenePause() {
        const scene = new THREE.Scene();

        return scene
    }

    buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true});
        renderer.autoClear = false;
        
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        document.body.appendChild(renderer.domElement);

        return renderer;
    }

    buildCameras({ width, height }) {
        const aspect = width / height;

        var cameras = new Object()
        cameras['mainCamera'] = this.createFreeCamera(25, 25, 25, aspect);
        cameras['pauseCamera'] = this.createOrthographicCamera(0, 0, 50, aspect);
        this.currentCamera = cameras.mainCamera;
        
        return cameras;
    }

    createControls(camera) {    
        this.controls = new THREE.OrbitControls(camera, this.renderer.domElement);
    }

    createFreeCamera(x, y, z, { width, height }) {
        let freeCamera = this.createPerspectiveCamera(x, y, z, { width, height })
        this.createControls(freeCamera);

        return freeCamera;
    }

    createPerspectiveCamera(x, y, z, aspect) {
        let camera = new THREE.PerspectiveCamera(
            70,     // FOV
            aspect,     // Aspect Ratio
            1,      // Near plane
            1000        //Far plane
        );
        camera.position.set(x, y, z);

        return camera;
    }

    createOrthographicCamera(x, y, z, aspect) {
        const camera = new THREE.OrthographicCamera(
            this.viewSize * aspect / -2,   // left
            this.viewSize * aspect / 2,   // right
            this.viewSize / 2,              //top
            this.viewSize / -2,          // bottom
            1,                                  // near
            1000,                               // far
        );
        camera.position.set(x, y, z);
    
        return camera;
    }

    createSceneSubjects(scene) {
        const sceneSubjects = {};
        sceneSubjects["directionalLight"] = new DirectionalLight(scene, 10, 10, 0);
        sceneSubjects["pointLight"] = new PointLight(scene, 0, 30, 0);
        sceneSubjects["flag"] = new Flag(scene, 0, 10, -10);
        sceneSubjects["ball"] = new Ball(scene, 0, 1.5, 0);
        sceneSubjects["grass"] = new Grass(scene, 0, 0, 0);

        return sceneSubjects;
    }

    createScenePauseSubjects(scene) {
        const scenePauseSubjects = {};
        scenePauseSubjects["pauseScreen"] = new PauseScreen(scene, 0, 0, 0);
        
        return scenePauseSubjects;
    }

    update() {
        let clockDelta = this.clock.getDelta();
        if(this.isScenePaused) {
            clockDelta = 0;
        }
        
        for (var subject in this.sceneSubjects) {
            if(typeof this.sceneSubjects[subject].update === "function"){
                this.sceneSubjects[subject].update(clockDelta);
            }
        }

        for (var subject in this.scenePauseSubjects) {
            if(typeof this.scenePauseSubjects[subject].update === "function"){
                this.scenePauseSubjects[subject].update(clockDelta);
            }
        }

        this.controls.update();

        this.renderer.clear();
        this.renderer.render(this.sceneBackground, this.currentCamera);
        this.renderer.render(this.scene, this.currentCamera);
        this.renderer.clearDepth();
        this.renderer.render(this.scenePause, this.cameras.pauseCamera);
    };

    onWindowResize() {
        this.screenDimensions.width = window.innerWidth;
        this.screenDimensions.height = window.innerHeight;
        
        this.renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);

        const aspect = this.screenDimensions.width / this.screenDimensions.height;
        this.resizePerspectiveCamera(this.cameras.mainCamera, aspect);
        this.resizeOrthographicalCamera(this.cameras.pauseCamera, aspect);
    };

    resizePerspectiveCamera(camera, aspect) {
        if (this.screenDimensions.height > 0 && this.screenDimensions.width > 0) {
            camera.aspect = aspect;

            camera.updateProjectionMatrix();
        }
    }

    resizeOrthographicalCamera(camera, aspect) {    
        if (this.screenDimensions.height > 0 && this.screenDimensions.width > 0) {            
            camera.left = this.viewSize * aspect / -2,     // left
            camera.right = this.viewSize * aspect / 2,      // right
            camera.top = this.viewSize / 2,    //top
            camera.bottom = this.viewSize / -2,     // bottom
    
            camera.updateProjectionMatrix();
        }
    }

    reset() {
        for (var subject in this.sceneSubjects)
            if(typeof this.sceneSubjects[subject].reset === "function")
                this.sceneSubjects[subject].reset();

        this.controls.reset();
    }

    onKeyDown(key) {
        for (var subject in this.sceneSubjects)
            if(typeof this.sceneSubjects[subject].onKeyDown === "function")
                this.sceneSubjects[subject].onKeyDown(key);

        for (var subject in this.scenePauseSubjects)
            if(typeof this.scenePauseSubjects[subject].onKeyDown === "function")
                this.scenePauseSubjects[subject].onKeyDown(key);

        switch (key.keyCode) {
            case 83: //S
                this.isScenePaused = !this.isScenePaused;
                break;
            case 82: //R
                if(this.isScenePaused) {
                    this.reset();
                    this.isScenePaused = false;
                }
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