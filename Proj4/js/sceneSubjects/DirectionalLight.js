class DirectionalLight {
	constructor(scene, x, y, z) {
		this.initialValues = {
            x: x,
            y: y,
            z: z,
		}
		
		this.light = this.createLight(this.initialValues.x, this.initialValues.y, this.initialValues.z);

		scene.add(this.light);
	}

	reset() {
		this.light.position.set(this.initialValues.x, this.initialValues.y, this.initialValues.z);
		this.light.visible = true;
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