class GlobalLight {
	constructor(scene, x, y, z) {
		this.light = this.createLight();

		this.lightBulb = this.createLightBulb();

		this.lamp = this.createLamp(this.light, x, y, z);
		scene.add(this.lamp)
		
		// const helper = new THREE.CameraHelper( this.light.shadow.camera );
		// scene.add( helper );
	}

	createLamp(light, x, y, z) {
		const lamp = new THREE.Object3D();
        const support = new THREE.Mesh(new THREE.CylinderGeometry(12.5, 12.5, 1, 50, 50), new THREE.MeshNormalMaterial());
        support.position.set(0, 1, 0);
        lamp.add(support);
        lamp.add(this.lightBulb);
        lamp.add(light);
        lamp.position.set(x, y, z);

        return lamp;
	}

	createLightBulb() {
		const lightBulb = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 2, 50, 50), new THREE.MeshBasicMaterial({color: 0xffffff}));

		return lightBulb;
	}

	createLight() {
		const light = new THREE.DirectionalLight(0xffffff, 0.5);

		return light;
	}

	toggleLight() {
		if (this.light.visible) {
            this.lightBulb.material.color.set(0x3F3F3F);
        }
		else {
            this.lightBulb.material.color.set(0xffffff);
		}
		
		this.light.visible = !this.light.visible;
	}

	onKeyDown(key) {
    	switch (key.keyCode) {
			case 81: //Q
				this.toggleLight();
				break;
        }
    }

}