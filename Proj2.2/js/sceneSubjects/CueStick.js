class CueStick {
    constructor(id, scene, x, y, z, side) {
        this.id = id;
        this.selected = false;
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
        this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 20);
        this.cueStick = this.createCueStick(scene, x, y, z, side);
    }

    createCueStick(scene, x, y, z, side) {
        let cueStick = new THREE.Mesh( this.geometry, this.material);
        if(side == "long")
            cueStick.rotateX(Math.PI/2);
        if(side == "short")
            cueStick.rotateZ(Math.PI/2);
        cueStick.position.set(x,y,z);
        scene.add(cueStick);
    }

    togleCueStick() {
        if(this.material.color.getHex() == 0xff0000)
            this.material.color.set(0x00ff00);
        else
        this.material.color.set(0xff0000);
    }

    offCueStick() {
        this.material.color.set(0xff0000);
    }

    onKeyDown(key) {
        switch (key.keyCode) {
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
}