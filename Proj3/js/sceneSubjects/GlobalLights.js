class GlobalLight {
	constructor(scene, x, y, z) {
		this.light = new THREE.DirectionalLight(0xffffff, 1);
		this.light.castShadow = true;
		this.light.position.set(x, y, z);

		const d = 12.5;

		this.light.shadow.camera.left = - d;
		this.light.shadow.camera.right = d;
		this.light.shadow.camera.top = d;
		this.light.shadow.camera.bottom = - d;
		this.light.shadow.camera.far = 25;

		scene.add(this.light);

		const helper = new THREE.CameraHelper( this.light.shadow.camera );
		scene.add( helper );
	}

	toggleLight() {
		if (this.light.color.getHexString() == "ffffff")
			this.light.color.set(0x000000);
		else
			this.light.color.set(0xffffff);
	}

	onKeyDown(key) {
    	switch (key.keyCode) {
			case 81: //Q
				this.toggleLight();
				break;
        }
    }

}