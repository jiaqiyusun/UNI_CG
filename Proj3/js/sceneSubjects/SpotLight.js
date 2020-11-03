class SpotLight {
	constructor(id, scene, x, y, z) {
        this.id = id;

        this.target = this.createTarget();
        scene.add(this.target);

        this.light = this.createLight(this.target);

        this.lightBulb = this.createLightBulb();
        
        this.lamp = this.createLamp(this.light, x, y, z);
        scene.add(this.lamp);

		// const helper = new THREE.CameraHelper( this.light.shadow.camera );
		// scene.add( helper );
    }

    createTarget() {
        const target = new THREE.Object3D();
        target.position.set(0,12,0);

        return target;
    }

    createLight(target) {
        const light = new THREE.SpotLight(0xffffff, 1);
        light.target = target;

        return light;
    }

    createLightBulb() {
        const lightBulb = new THREE.Mesh(new THREE.SphereGeometry(2, 10, 10), new THREE.MeshBasicMaterial({color: 0xffffff}));

        return lightBulb;
    }
    
    createLamp(light, x, y, z) {
        const lamp = new THREE.Object3D();
        const cone = new THREE.Mesh(new THREE.ConeGeometry(2, 5, 20, 20), new THREE.MeshNormalMaterial());
        cone.position.set(0, 3, 0);
        lamp.add(this.lightBulb);
        lamp.add(cone);
        lamp.add(light);
        lamp.position.set(x, y, z);
        lamp.lookAt(0, 60,0);

        return lamp;
    }

	toggleLight() {
		if (this.light.color.getHexString() == "ffffff") {
			this.light.color.set(0x000000);
            this.lightBulb.material.color.set(0x3F3F3F);
        }
		else {
			this.light.color.set(0xffffff);
            this.lightBulb.material.color.set(0xffffff);
        }
	}

	onKeyDown(key) {
    	switch (key.keyCode) {
			case 48 + this.id: //id
                this.toggleLight();
				break;
        }
    }

}