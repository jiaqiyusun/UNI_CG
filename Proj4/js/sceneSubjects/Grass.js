class Grass {
    constructor(scene) {
        const textureLoader = new THREE.TextureLoader();

        this.grassTexture = new textureLoader.load("images/grassTexture.png");
        this.grassTexture.wrapS = THREE.RepeatWrapping;
        this.grassTexture.wrapT = THREE.RepeatWrapping;
        this.grassTexture.repeat.set(10, 10);

        this.grassBumpMap = new textureLoader.load("images/grassBump.png");
        this.grassBumpMap.wrapS = THREE.RepeatWrapping;
        this.grassBumpMap.wrapT = THREE.RepeatWrapping;
        this.grassBumpMap.repeat.set(10, 10);

        // this.grassNormalMap = new textureLoader.load("bumpMap/grassNormal.png");
        // this.grassNormalMap.wrapS = THREE.RepeatWrapping;
        // this.grassNormalMap.wrapT = THREE.RepeatWrapping;
        // this.grassNormalMap.repeat.set(10, 10);

        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassTexture});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.grassTexture, bumpMap:this.grassBumpMap});

        this.floor = this.createFloor();

        scene.add(this.floor);
    }

    createFloor() {
        const floor = new THREE.Mesh(new THREE.BoxGeometry(100, 1, 100, 50, 0.5, 50), this.materials.phong);

        return floor;
    }

    toggleMaterialI() {
        if(this.floor.material.type == "MeshBasicMaterial")
            this.floor.material = this.materials.phong;
        else
            this.floor.material = this.materials.basic;
    }

    toggleWireframeW() {
        this.floor.material.wireframe = !this.floor.material.wireframe
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