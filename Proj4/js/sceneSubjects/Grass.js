class Grass {
    constructor(scene) {
        this.initialValues = {
            wireframe: false
        }

        const textureLoader = new THREE.TextureLoader();

        this.grassTexture = new textureLoader.load("images/grassTexture.png");
        this.grassTexture.wrapS = THREE.RepeatWrapping;
        this.grassTexture.wrapT = THREE.RepeatWrapping;
        this.grassTexture.repeat.set(10, 10);

        this.grassBumpMap = new textureLoader.load("images/grassBump.png");
        this.grassBumpMap.wrapS = THREE.RepeatWrapping;
        this.grassBumpMap.wrapT = THREE.RepeatWrapping;
        this.grassBumpMap.repeat.set(10, 10);

        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassTexture});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.grassTexture, bumpMap:this.grassBumpMap});

        this.grass = this.createGrass();

        scene.add(this.grass);
    }

    reset() {
        this.grass.material.wireframe = this.initialValues.wireframe;
        this.grass.material = this.materials.phong;
    }

    createGrass() {
        const grass = new THREE.Mesh(new THREE.BoxGeometry(100, 1, 100, 50, 0.5, 50), this.materials.phong);

        return grass;
    }

    toggleMaterialI() {
        if(this.grass.material.type == "MeshBasicMaterial")
            this.grass.material = this.materials.phong;
        else
            this.grass.material = this.materials.basic;
    }

    toggleWireframeW() {
        this.grass.material.wireframe = !this.grass.material.wireframe
    }

    onKeyDown(key) {
        switch (key.keyCode) {
            // Materials
            case 87: //W
                this.toggleWireframeW();
                break;
            case 73: //I
                this.toggleMaterialI();
                break;
        }
    }
}