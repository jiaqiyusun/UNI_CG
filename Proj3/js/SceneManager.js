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
        scene.background = new THREE.Color(0x000000);
        scene.add(new THREE.AxesHelper(10));
        this.buildFloor(scene);

        return scene;
    }

    buildFloor(scene) {
        scene.add(new THREE.Mesh(new THREE.BoxGeometry(100, 1, 100), new THREE.MeshNormalMaterial()));
    }

    buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true});
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        document.body.appendChild(renderer.domElement);

        return renderer;
    }

    buildCameras({ width, height }) {
        var cameras = new Object()
        cameras['freeCamera'] = this.createFreeCamera(25, 25, 25, { width, height });
        cameras['camera4'] = this.createPerspectiveCamera(0, 50, 50, { width, height });
        cameras['camera5'] = this.createOrthographicCamera(0, 11, 40, { width, height });
        
        this.currentCamera = cameras.freeCamera;
        
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
        sceneSubjects["globalLight"] = new GlobalLight(scene, 0, 35, 0);
        sceneSubjects["spotLight1"] = new SpotLight(1, scene, 25 * Math.sin(2 * Math.PI/3), 25, 25 * Math.cos(2 * Math.PI/3));
        sceneSubjects["spotLight2"] = new SpotLight(2, scene, 25 * Math.sin(4 * Math.PI/3), 25, 25 * Math.cos(4 * Math.PI/3));
        sceneSubjects["spotLight3"] = new SpotLight(3, scene, 25 * Math.sin(2 * Math.PI), 25, 25 * Math.cos(2 * Math.PI));
        sceneSubjects["podium"] = new Podium(scene, this.cameras.camera5, 0, 1, 0);
        sceneSubjects["cybertruck"] = new Cybertruck(scene, 0, 9.5, 0);

        return sceneSubjects;
    }

    update() {
        const clockDelta = this.clock.getDelta();
        
        for (var subject in this.sceneSubjects) {
            if(typeof this.sceneSubjects[subject].update === "function"){
                this.sceneSubjects[subject].update(clockDelta);
            }
        }

        this.renderer.render(this.scene, this.currentCamera);
    };

    onWindowResize() {
        const { width, height } = canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;
        
        this.renderer.setSize(width, height);

        this.resizePerspectiveCamera(this.cameras.freeCamera);
        this.resizeOrthographicalCamera(this.cameras.camera5);
        this.resizePerspectiveCamera(this.cameras.camera4);    
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
            case 52: //4
                this.currentCamera = this.cameras.camera4;
                break;
            case 53: //5
                this.currentCamera = this.cameras.camera5;
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