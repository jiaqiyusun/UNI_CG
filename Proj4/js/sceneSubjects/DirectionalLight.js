class DirectionalLight {
	constructor(scene, x, y, z) {
		this.light = this.createLight(x, y, z);

		scene.add(this.light)
		// this.light.castShadow = true;
		// const helper = new THREE.CameraHelper( this.light.shadow.camera );
		// scene.add( helper );
	}

	createLight(x, y, z) {
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(x, y, z);
		
		return light;
	}

	toggleLight() {
		this.light.visible = !this.light.visible;
	}

	onKeyDown(key) {
    	switch (key.keyCode) {
			case 68: //D
				this.toggleLight();
				break;
        }
    }

}