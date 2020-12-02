class Flag {
    constructor(scene, x, y, z) {
        this.initialValues = {
            x: x,
            y: y,
            z: z,
            angle: 0,
            wireframe: false
        }

        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0x40e0d0});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0x40e0d0});

        this.flagMeshs = this.createFlagMeshs(x, y, z);

        scene.add(this.flagMeshs.flag);
    }

    reset() {
        this.materials.basic.wireframe = this.initialValues.wireframe;
        this.materials.phong.wireframe = this.initialValues.wireframe;
        this.flagMeshs.square.material = this.materials.basic;
        this.flagMeshs.stick.material = this.materials.phong;
        this.flagMeshs.flag.rotation.y = this.initialValues.angle;
    }

    createFlagMeshs(x, y, z) {
        const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 20, 20), this.materials.phong);
        const square = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.5), this.materials.phong);
        square.position.set(2.5, 7.5, 0);
        
        const flag = new THREE.Mesh;
        flag.add(stick);
        flag.add(square);
        flag.position.set(x, y, z);

        const flagMeshs = {}
        flagMeshs["stick"] = stick
        flagMeshs["square"] = square
        flagMeshs["flag"] = flag

        return flagMeshs;
    }

    toggleMaterialI() {
        if(this.flagMeshs.stick.material.type == "MeshBasicMaterial") {
            this.flagMeshs.stick.material = this.materials.phong;
            this.flagMeshs.square.material = this.materials.phong;
        }
        else {
            this.flagMeshs.stick.material = this.materials.basic;
            this.flagMeshs.square.material = this.materials.basic;
        }

    }

    toggleWireframeW() {
        this.materials.basic.wireframe = !this.materials.basic.wireframe
        this.materials.phong.wireframe = !this.materials.phong.wireframe
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
        this.flagMeshs.flag.rotateY(time);
    }
}