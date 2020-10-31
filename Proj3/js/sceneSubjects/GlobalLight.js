class GlobalLight {
	constructor(scene, x, y, z) {
		this.light = this.createGlobalLight(x, y, z);
		scene.add(this.light);

		const helper = new THREE.CameraHelper( this.light.shadow.camera );
		scene.add( helper );
	}

	createGlobalLight(x, y, z) {
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.castShadow = true;
		light.position.set(x, y, z);

		const d = 12.5;

		light.shadow.camera.left = - d;
		light.shadow.camera.right = d;
		light.shadow.camera.top = d;
		light.shadow.camera.bottom = - d;
		light.shadow.camera.far = 35;

		return light;
	}

	toggleLight() {
		if (this.light.color.getHexString() == "ffffff") {
			this.light.color.set(0x000000);
            this.light.castShadow = false;
        }
		else {
			this.light.color.set(0xffffff);
            this.light.castShadow = true;
        }
	}

	onKeyDown(key) {
    	switch (key.keyCode) {
			case 81: //Q
				this.toggleLight();
				break;
        }
    }

}