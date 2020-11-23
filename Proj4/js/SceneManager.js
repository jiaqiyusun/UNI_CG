// ver o problema do OrbitsControl
class SceneManager {
    constructor(canvas) {

        this.clock = new THREE.Clock();

        this.screenDimensions = {
            width: canvas.width,
            height: canvas.height
        };

        this.sceneBackground = this.BuildSceneBackground();
        this.scene = this.buildScene();
        this.renderer = this.buildRender(this.screenDimensions);
        this.cameras = this.buildCameras(this.screenDimensions);
        this.sceneSubjects = this.createSceneSubjects(this.scene);
    }

    BuildSceneBackground() {
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
        scene.background = new THREE.Color(0x000000);
        // scene.add(new THREE.AxesHelper(10));

        return scene;
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
        var cameras = new Object()
        cameras['freeCamera'] = this.createFreeCamera(25, 25, 25, { width, height });

        this.currentCamera = cameras.freeCamera;
        
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

    createPerspectiveCamera(x, y, z, { width, height }) {
        let camera = new THREE.PerspectiveCamera(
            70,     // FOV
            width / height,     // Aspect Ratio
            1,      // Near plane
            1000        //Far plane
        );
    
        camera.position.set(x, y, z);  

        return camera;
    }

    createOrthographicCamera(x, y, z, { width, height }) {
        const camera = new THREE.OrthographicCamera(
            -(0.025 * width) / 2,     // left
            (0.025 * width) / 2,      // right
            (0.025 * height) / 2,    //top
            -(0.025 * height) / 2,     // bottom
            1,                                  // near
            1000,                               // far
        );
        
        camera.position.set(x, y, z);
    
        return camera;
    }

    createSceneSubjects(scene) {
        const sceneSubjects = {}
        sceneSubjects["directionalLight"] = new DirectionalLight(scene, 10, 10, 0);
        sceneSubjects["pointLight"] = new PointLight(scene, 0, 30, 0);
        sceneSubjects["flag"] = new Flag(scene, 0, 10, -10);
        sceneSubjects["ball"] = new Ball(scene, 0, 1.5, 0);
        sceneSubjects["grass"] = new Grass(scene, 0, 0, 0);
        return sceneSubjects;
    }

    update() {
        const clockDelta = this.clock.getDelta();
        
        for (var subject in this.sceneSubjects) {
            if(typeof this.sceneSubjects[subject].update === "function"){
                this.sceneSubjects[subject].update(clockDelta);
            }
        }

        this.controls.update();
        this.renderer.clear();
        this.renderer.render(this.sceneBackground, this.currentCamera);
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.currentCamera);
    };

    onWindowResize() {
        const { width, height } = canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;
        
        this.renderer.setSize(width, height);

        this.resizePerspectiveCamera(this.cameras.freeCamera);   
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