class Flag {
    constructor(scene, x, y, z) {
        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0x40e0d0});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0x40e0d0});

        this.flag = this.createFlag(x, y, z);

        scene.add(this.flag);
    }

    createFlag(x, y, z) {
        const flag = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 20, 20), this.materials.phong);
        const square = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.5), this.materials.phong);
        square.position.set(2.5, 7.5, 0);
    
        flag.add(square)
        flag.position.set(x, y, z);

        return flag;
    }

    toggleMaterialI() {
        if(this.flag.material.type == "MeshBasicMaterial")
            this.flag.material = this.materials.phong;
        else
            this.flag.material = this.materials.basic;
    }

    toggleWireframeW() {
        this.flag.material.wireframe = !this.flag.material.wireframe
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

    update(time) {
        this.flag.rotateY(time);
    }
}