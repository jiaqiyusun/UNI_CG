class Podium {
    constructor(scene, camera, x, y, z) {
        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0x40e0d0});
        this.materials["lambert"] = new THREE.MeshLambertMaterial({color: 0x40e0d0});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0x40e0d0});

        this.rotation = new Object;
        this.rotation["leftRotation"] = false;
        this.rotation["rightRotation"] = false;

        this.podium = this.createPodium(x, y, z);

        this.podium.add(camera);
        camera.lookAt(0,11.5,0);

        scene.add(this.podium);
    }

    createPodium(x, y, z) {
        const podium = new THREE.Mesh(new THREE.CylinderGeometry(20, 25, 3, 20), this.materials.basic);
        podium.position.set(x, y, z);

        return podium;
    }

    toggleMaterialW() {
        if(this.podium.material.type == "MeshBasicMaterial")
            this.podium.material = this.materials.lambert;
        else
            this.podium.material = this.materials.basic;
    }

    toggleMaterialE() {
        if(this.podium.material.type == "MeshLambertMaterial")
            this.podium.material = this.materials.phong;
        else if(this.podium.material.type == "MeshPhongMaterial")
            this.podium.material = this.materials.lambert;
    }

    update(time) {
        let rotation = 0;

        // Rotation
        if(this.rotation.leftRotation) {
            rotation -= 1;
        }
        if(this.rotation.rightRotation) {
            rotation += 1;

        }
        this.podium.rotateY(rotation * time);
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

            // Rotation
            case 37: //<-
                this.rotation.leftRotation = true;
                break;
            case 39: //->
                this.rotation.rightRotation = true;
                break;
        }
    }

    onKeyUp(key) {
        switch (key.keyCode) {
            // Rotation
            case 37: //<-
                this.rotation.leftRotation = false;
                break;
            case 39: //->
                this.rotation.rightRotation = false;
                break;
        }
    }
}