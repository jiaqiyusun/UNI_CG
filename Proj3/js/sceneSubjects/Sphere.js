class Sphere {
    constructor(scene, x, y, z) {
        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0x40e0d0});
        this.materials["lambert"] = new THREE.MeshLambertMaterial({color: 0x40e0d0});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0x40e0d0});

        this.rotation = new Object;
        this.rotation["leftRotation"] = false;
        this.rotation["rightRotation"] = false;

        this.sphere = this.createSphere(x, y, z);
        this.sphere.castShadow = true;

        scene.add(this.sphere);
    }

    createSphere(x, y, z) {
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 50, 50), this.materials.basic);
        sphere.position.set(x, y, z);

        return sphere;
    }

    toggleMaterialW() {
        if(this.sphere.material.type == "MeshBasicMaterial")
            this.sphere.material = this.materials.lambert;
        else
            this.sphere.material = this.materials.basic;
    }

    toggleMaterialE() {
        if(this.sphere.material.type == "MeshLambertMaterial")
            this.sphere.material = this.materials.phong;
        else if(this.sphere.material.type == "MeshPhongMaterial")
            this.sphere.material = this.materials.lambert;
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
        this.sphere.rotateY(rotation * time);
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