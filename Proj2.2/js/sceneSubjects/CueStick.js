class CueStick {
    constructor(id, scene, x, y, z, side) {
        this.id = id;
        this.selected = false;
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
        this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 20);
        this.cueStick = this.createCueStick(scene, x, y, z, side);
        this.rotation = {"leftRotation": false, "rightRotation": false};
    }

    createCueStick(scene, x, y, z, side) {
        let cueStick = new THREE.Mesh( this.geometry, this.material);
        if(side == "long")
            cueStick.rotateX(Math.PI/2);
        if(side == "short")
            cueStick.rotateZ(Math.PI/2);
        cueStick.position.set(x,y,z);
        scene.add(cueStick);

        return cueStick;
    }

    togleCueStick() {
        if(this.material.color.getHex() == 0xff0000)
            this.material.color.set(0x00ff00);
        else
            this.material.color.set(0xff0000);
        this.selected = !this.selected;
    }

    offCueStick() {
        this.material.color.set(0xff0000);
        this.selected = false;
    }

    update(time) {
        // let cueStickRotation = 0;
        // let cueStickPositionVector = new THREE.Vector3();
        // let YVector = new THREE.Vector3(0, 1, 0);

        // if(this.selected) {
        //     if(this.rotation.leftRotation){
        //         cueStickRotation -= 1;
        //     }
        //     if(this.rotation.rightRotation) {
        //         cueStickRotation += 1;
        //     }

        //     cueStickPositionVector.copy(this.cueStick.position);
        //     this.cueStick.position.set(0,0,cueStickPositionVector.z / 2);
        //     this.togleCueStick()
        //     this.cueStick.rotateOnWorldAxis(YVector, cueStickRotation * time);
        //     this.cueStick.position.copy(cueStickPositionVector);
        // }
    }

    onKeyDown(key) {
        switch (key.keyCode) {
            case 37:
                this.rotation.leftRotation = true;
                break;
            case 39:
                this.rotation.rightRotation = true;
                break;
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                if(this.id != key.keyCode - 48)
                    this.offCueStick();
                else
                    this.togleCueStick();
                break;
        }
    }

    onKeyUp(key) {
        switch (key.keyCode) {
            case 37:
                this.rotation.leftRotation = false;
                break;
            case 39:
                this.rotation.rightRotation = false;
                break;
        }
    }
}