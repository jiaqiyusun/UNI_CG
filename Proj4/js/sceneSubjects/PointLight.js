class PointLight {
	constructor(scene, x, y, z) {
		this.initialValues = {
            x: x,
            y: y,
            z: z
		}

		this.light = this.createLight(this.initialValues.x, this.initialValues.y, this.initialValues.z);

		scene.add(this.light)
	}

	reset() {
		this.light.position.set(this.initialValues.x, this.initialValues.y, this.initialValues.z);
		this.light.visible = true;
	}

	createLight(x, y, z) {
		const light = new THREE.PointLight(0xffffff, 1, 100);
		light.position.set(x, y, z);

		return light;
	}

	toggleLight() {
		this.light.visible = !this.light.visible;
	}

	onKeyDown(key) {
    	switch (key.keyCode) {
			case 80: //P
				this.toggleLight();
				break;
        }
    }

}