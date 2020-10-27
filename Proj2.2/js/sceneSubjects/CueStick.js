class CueStick {
    constructor(id, scene, x, y, z, side) {
        this.id = id;
        this.side = side;
        this.selected = false;
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
        this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 20);
        this.cueStick = this.createCueStick(scene, x, y, z, side);
        this.rotation = {"leftRotation": false, "rightRotation": false};
    }

    createCueStick(scene, x, y, z, side) {
        let stick = new THREE.Mesh( this.geometry, this.material);
        let pivot = new THREE.Mesh();
        let cueStick = new THREE.Mesh();


        stick.position.set(0, -5, 0);
        pivot.add(stick);

        if(side == "down")
            pivot.rotateX(Math.PI/2);
        else if (side == "up")
            pivot.rotateX(Math.PI/-2);
        else if(side == "left")
            pivot.rotateZ(Math.PI/-2);
        else if(side == "right")
            pivot.rotateZ(Math.PI/2);
        
        cueStick.add(pivot);
        cueStick.position.set(x, y, z)

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

    update(time) {
        let cueStickRotation = 0;
        let YVector = new THREE.Vector3(0,1,0);

        if(this.selected) {
            if(this.rotation.leftRotation && -Math.PI/3 < this.cueStick.rotation.y)
                cueStickRotation -= 1;
            if(this.rotation.rightRotation && this.cueStick.rotation.y < Math.PI/3)
                cueStickRotation += 1;
            this.cueStick.rotateOnWorldAxis(YVector, cueStickRotation * time);
        }
    }

    onKeyDown(key) {
        switch (key.keyCode) {
            case 37:
                this.rotation.leftRotation = true;
                break;
            case 39:
                this.rotation.rightRotation = true;
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