class SpotLight {
	constructor(id, scene, x, y, z) {
        this.id = id;

        this.target = this.createTarget();
        scene.add(this.target);

        this.light = this.createLight(this.target);
        
        this.spotLight = this.createSpotLight(this.light, x, y, z);
        scene.add(this.spotLight);

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
		light.castShadow = true;

        light.target = target;

        light.shadow.camera.far = 55;
        light.shadow.camera.fov = 40;

        return light;
    }
    
    createSpotLight(light, x, y, z) {
        const spotLight = new THREE.Mesh(new THREE.SphereGeometry(2, 10, 10), new THREE.MeshNormalMaterial());
        const cone = new THREE.Mesh(new THREE.ConeGeometry(2, 5, 20, 20), new THREE.MeshNormalMaterial());
        cone.position.set(0, 3, 0);
        spotLight.add(cone);
        spotLight.add(light);
        spotLight.position.set(x, y, z);
        spotLight.lookAt(0, 60,0);

        return spotLight;
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
			case 48 + this.id: //id
				this.toggleLight();
				break;
        }
    }

}