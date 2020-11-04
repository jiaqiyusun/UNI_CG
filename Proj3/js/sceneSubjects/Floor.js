class Floor {
    constructor(scene) {
        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0xE62272});
        this.materials["lambert"] = new THREE.MeshLambertMaterial({color: 0xE62272});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0xE62272});

        this.floor = this.createFloor();

        scene.add(this.floor);
    }

    createFloor() {
        const floor = new THREE.Mesh(new THREE.BoxGeometry(100, 1, 100, 50, 0.5, 50), this.materials.basic);

        return floor;
    }

    toggleMaterialW() {
        if(this.floor.material.type == "MeshBasicMaterial")
            this.floor.material = this.materials.lambert;
        else
            this.floor.material = this.materials.basic;
    }

    toggleMaterialE() {
        if(this.floor.material.type == "MeshLambertMaterial")
            this.floor.material = this.materials.phong;
        else if(this.floor.material.type == "MeshPhongMaterial")
            this.floor.material = this.materials.lambert;
    }

    onKeyDown(key) {
        switch (key.keyCode) {
            // Materials
            case 69: //E
                this.toggleMaterialE();
                break;
            case 87: //W
                this.toggleMaterialW();
                break;
        }
    }
}