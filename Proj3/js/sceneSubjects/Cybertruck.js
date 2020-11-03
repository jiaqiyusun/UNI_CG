// https://threejsfundamentals.org/threejs/lessons/threejs-custom-geometry.html
class Cybertruck {

	constructor(scene, x, y, z) {

		this.materials = new Object;
        this.materials["cybertruckBasic"] = new THREE.MeshBasicMaterial({color: 0xc5c5c5});
        this.materials["cybertruckLambert"] = new THREE.MeshLambertMaterial({color: 0xc5c5c5});
		this.materials["cybertruckPhong"] = new THREE.MeshPhongMaterial({color: 0xc5c5c5});

		this.materials["lightsBasic"] = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.materials["lightsLambert"] = new THREE.MeshLambertMaterial({color: 0xff0000});
		this.materials["lightsPhong"] = new THREE.MeshPhongMaterial({color: 0xff0000});

		this.materials["glassesBasic"] = new THREE.MeshBasicMaterial({color: 0x000000});
        this.materials["glassesLambert"] = new THREE.MeshLambertMaterial({color: 0x000000});
		this.materials["glassesPhong"] = new THREE.MeshPhongMaterial({color: 0x000000});

		this.materials["wheelsBasic"] = new THREE.MeshBasicMaterial({color: 0x000000});
        this.materials["wheelsLambert"] = new THREE.MeshLambertMaterial({color: 0x000000});
		this.materials["wheelsPhong"] = new THREE.MeshPhongMaterial({color: 0x000000});
		
        this.rotation = new Object;
        this.rotation["leftRotation"] = false;
        this.rotation["rightRotation"] = false;

		this.cybertruckGeometry = this.createCybertruckGeometry();
		this.lightsGeometry = this.createLightsGeometry();
		this.glassesGeometry = this.createGlassesGeometry();
		this.wheels = this.createWheels();

		this.cybertruckMap = {}
		this.cybertruckMap['cybertruck'] = new THREE.Mesh(this.cybertruckGeometry, this.materials.cybertruckBasic);
		this.cybertruckMap['lights'] = new THREE.Mesh(this.lightsGeometry, this.materials.lightsBasic);
		this.cybertruckMap['glasses'] = new THREE.Mesh(this.glassesGeometry, this.materials.glassesBasic);

		this.cybertruck = this.cybertruckMap.cybertruck;
		this.cybertruck.add(this.cybertruckMap.lights);
		this.cybertruck.add(this.cybertruckMap.glasses);
		this.cybertruck.add(this.wheels.wheel1);
		this.cybertruck.add(this.wheels.wheel2);
		this.cybertruck.add(this.wheels.wheel3);
		this.cybertruck.add(this.wheels.wheel4);
		this.cybertruck.add(this.wheels.axis1);
		this.cybertruck.add(this.wheels.axis2);

		this.cybertruck.scale.set(2, 2, 2);
		this.cybertruck.position.set(x,y,z);
		scene.add(this.cybertruck);
	}
	
	toggleMaterialW() {
        if(this.cybertruckMap.cybertruck.material.type == "MeshBasicMaterial") {
			this.cybertruckMap.cybertruck.material = this.materials.cybertruckLambert;
			this.cybertruckMap.lights.material = this.materials.lightsLambert;
			this.cybertruckMap.glasses.material = this.materials.glassesLambert;
			this.wheels.wheel1.material = this.materials.wheelsLambert;
			this.wheels.wheel2.material = this.materials.wheelsLambert;
			this.wheels.wheel3.material = this.materials.wheelsLambert;
			this.wheels.wheel4.material = this.materials.wheelsLambert;
			this.wheels.axis1.material = this.materials.wheelsLambert;
			this.wheels.axis2.material = this.materials.wheelsLambert;
		}
        else {
            this.cybertruckMap.cybertruck.material = this.materials.cybertruckBasic;
			this.cybertruckMap.lights.material = this.materials.lightsBasic;
			this.cybertruckMap.glasses.material = this.materials.glassesBasic;
			this.wheels.wheel1.material = this.materials.wheelsBasic;
			this.wheels.wheel2.material = this.materials.wheelsBasic;
			this.wheels.wheel3.material = this.materials.wheelsBasic;
			this.wheels.wheel4.material = this.materials.wheelsBasic;
			this.wheels.axis1.material = this.materials.wheelsBasic;
			this.wheels.axis2.material = this.materials.wheelsBasic;
		}
    }

    toggleMaterialE() {
        if(this.cybertruckMap.cybertruck.material.type == "MeshLambertMaterial") {
			this.cybertruckMap.cybertruck.material = this.materials.cybertruckPhong;
			this.cybertruckMap.lights.material = this.materials.lightsPhong;
			this.cybertruckMap.glasses.material = this.materials.glassesPhong;
			this.wheels.wheel1.material = this.materials.wheelsPhong;
			this.wheels.wheel2.material = this.materials.wheelsPhong;
			this.wheels.wheel3.material = this.materials.wheelsPhong;
			this.wheels.wheel4.material = this.materials.wheelsPhong;
			this.wheels.axis1.material = this.materials.wheelsPhong;
			this.wheels.axis2.material = this.materials.wheelsPhong;
		}
        else if(this.cybertruckMap.cybertruck.material.type == "MeshPhongMaterial") {
			this.cybertruckMap.cybertruck.material = this.materials.cybertruckLambert;
			this.cybertruckMap.lights.material = this.materials.lightsLambert;
			this.cybertruckMap.glasses.material = this.materials.glassesLambert;
			this.wheels.wheel1.material = this.materials.wheelsLambert;
			this.wheels.wheel2.material = this.materials.wheelsLambert;
			this.wheels.wheel3.material = this.materials.wheelsLambert;
			this.wheels.wheel4.material = this.materials.wheelsLambert;
			this.wheels.axis1.material = this.materials.wheelsLambert;
			this.wheels.axis2.material = this.materials.wheelsLambert;
		}
    }
	
	update(time) {
        let rotation = 0;

        // Rotation
        if(this.rotation.leftRotation) {
            rotation -= 1;
        }
        if(this.rotation.rightRotation) {
            rotation += 1;

        }
        this.cybertruck.rotateY(rotation * time);
	}
	
	onKeyDown(key) {
        switch (key.keyCode) {
            // Materials
            case 69: //E
                this.toggleMaterialE();
                break;
            case 87: //W
                this.toggleMaterialW();
                break;

            // Rotation
            case 37: //<-
                this.rotation.leftRotation = true;
                break;
            case 39: //->
                this.rotation.rightRotation = true;
                break;
        }
    }

    onKeyUp(key) {
        switch (key.keyCode) {
            // Rotation
            case 37: //<-
                this.rotation.leftRotation = false;
                break;
            case 39: //->
                this.rotation.rightRotation = false;
                break;
        }
    }

	createWheels() {
		const wheel1 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.5, 50, 50), this.materials.wheelsBasic);
		wheel1.rotateX(Math.PI/2);
		wheel1.position.set(-3.5, -2.5, -2);

		const wheel2 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.5, 50, 50), this.materials.wheelsBasic);
		wheel2.rotateX(Math.PI/2);
		wheel2.position.set(-3.5, -2.5, 2);

		const wheel3 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.5, 50, 50), this.materials.wheelsBasic);
		wheel3.rotateX(Math.PI/2);
		wheel3.position.set(5, -2.5, -2);

		const wheel4 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.5, 50, 50), this.materials.wheelsBasic);
		wheel4.rotateX(Math.PI/2);
		wheel4.position.set(5, -2.5, 2);

		const axis1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 50, 50), this.materials.wheelsBasic);
		axis1.rotateX(Math.PI/2);
		axis1.position.set(-3.5, -2.5, 0);

		const axis2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 50, 50), this.materials.wheelsBasic);
		axis2.rotateX(Math.PI/2);
		axis2.position.set(5, -2.5, 0);


		const wheels = {}
		wheels['wheel1'] = wheel1;
		wheels['wheel2'] = wheel2;
		wheels['wheel3'] = wheel3;
		wheels['wheel4'] = wheel4;
		wheels['axis1'] = axis1;
		wheels['axis2'] = axis2;

		return wheels;
	}

	createGlassesGeometry() {
		const geometry = new THREE.Geometry();
		
		geometry.vertices.push(
			new THREE.Vector3(-1, 2, 1.7), // 0 -> 3 
			new THREE.Vector3(3, 1, 2.1), // 1 -> 4
			new THREE.Vector3(3, 0.5, 2.3), // 2 -> 5
			new THREE.Vector3(-4, 0.5, 2.3), // 3 -> 6 
			new THREE.Vector3(-1, 2, -1.7), // 4 -> 43 
			new THREE.Vector3(3, 1, -2.1), // 5 -> 44
			new THREE.Vector3(3, 0.5, -2.3), // 6 -> 45
			new THREE.Vector3(-4, 0.5, -2.3), // 7 -> 46
			new THREE.Vector3(-5.5, 0.2, 2), // 8 -> 80 
			new THREE.Vector3(-1.5, 2.2, 1), // 9 -> 81
			new THREE.Vector3(-1.5, 2.2, -1), // 10 -> 82
			new THREE.Vector3(-5.5, 0.2, -2), // 11 -> 83 
		)

		geometry.faces.push(
			new THREE.Face3(11, 8, 9),
			new THREE.Face3(11, 9, 10),
			new THREE.Face3(0, 3, 2),
			new THREE.Face3(0, 2, 1),
			new THREE.Face3(6, 7, 4),
			new THREE.Face3(5, 6, 4),
		)

		geometry.computeFaceNormals();

		return geometry;
	}

	createLightsGeometry() {
		const geometry = new THREE.Geometry();
		
		geometry.vertices.push(
			new THREE.Vector3(-6, 0, 2.5), // 0 -> 0 
			new THREE.Vector3(-8, -0.5, 2), // 1 -> 7
			new THREE.Vector3(-8, -1, 2), // 2 -> 8
			new THREE.Vector3(-6, -0.5, 2.5), // 3 -> 9
			new THREE.Vector3(-6, 0, -2.5), // 4 -> 40
			new THREE.Vector3(-8, -0.5, -2), // 5 -> 47
			new THREE.Vector3(-8, -1, -2), // 6 -> 48
			new THREE.Vector3(-6, -0.5, -2.5), // 7 -> 49
			new THREE.Vector3(8.5, 0, 2.5), // 8 -> 2
			new THREE.Vector3(8.5, -0.5, 2.5), // 9 -> 25
			new THREE.Vector3(8.5, 0, -2.5), // 10 -> 42
			new THREE.Vector3(8.5, -0.5, -2.5) // 11 -> 65
		)

		geometry.faces.push(
			new THREE.Face3(0, 1, 3),
			new THREE.Face3(7, 5, 4),
			new THREE.Face3(3, 1, 2),
			new THREE.Face3(6, 5, 7),
			new THREE.Face3(1, 5, 6),
			new THREE.Face3(1, 6, 2),
			new THREE.Face3(8, 9, 10),
			new THREE.Face3(10, 9, 11),
		)

		geometry.computeFaceNormals();

		return geometry;
	}
	
	createCybertruckGeometry() {
        const geometry = new THREE.Geometry();
        
		geometry.vertices.push(
			new THREE.Vector3(-6, 0, 2.5), // 0
			new THREE.Vector3(-1, 2.5, 1.5), // 1
			new THREE.Vector3(8.5, 0, 2.5), // 2
			new THREE.Vector3(-1, 2, 1.7), // 3
			new THREE.Vector3(3, 1, 2.1), // 4
			new THREE.Vector3(3, 0.5, 2.3), // 5
			new THREE.Vector3(-4, 0.5, 2.3), // 6
			new THREE.Vector3(-8, -0.5, 2), // 7
			new THREE.Vector3(-8, -1, 2), // 8
			new THREE.Vector3(-6, -0.5, 2.5), // 9
			new THREE.Vector3(-8, -2.5, 2), // 10
			new THREE.Vector3(-6, -3, 2.5), // 11
			new THREE.Vector3(-5.2, -3, 2.5), // 12
			new THREE.Vector3(-5.2, -1.9, 2.5), // 13
			new THREE.Vector3(-4.1, -0.8, 2.5), // 14
			new THREE.Vector3(-2.9, -0.8, 2.5), // 15
			new THREE.Vector3(-1.8, -1.9, 2.5), // 16
			new THREE.Vector3(-1.8, -3, 2.5), // 17
			new THREE.Vector3(3.3, -3, 2.5), // 18
			new THREE.Vector3(3.3, -1.9, 2.5), // 19
			new THREE.Vector3(4.4, -0.8, 2.5), // 20
			new THREE.Vector3(5.6, -0.8, 2.5), // 21
			new THREE.Vector3(6.7, -1.9, 2.5), // 22
			new THREE.Vector3(6.7, -3, 2.5), // 23
			new THREE.Vector3(8, -3, 2.5), // 24
			new THREE.Vector3(8.5, -0.5, 2.5), // 25
			new THREE.Vector3(8, -0.5, 2.5), // 26
			new THREE.Vector3(8, 0, 2.5), // 27
			new THREE.Vector3(-5, -3, 2.7), // 28
			new THREE.Vector3(-5, -2, 2.7), // 29
			new THREE.Vector3(-4, -1, 2.7), // 30
			new THREE.Vector3(-3, -1, 2.7), // 31
			new THREE.Vector3(-2, -2, 2.7), // 32
			new THREE.Vector3(-2, -3, 2.7), // 33
			new THREE.Vector3(3.5, -3, 2.7), // 34
			new THREE.Vector3(3.5, -2, 2.7), // 35
			new THREE.Vector3(4.5, -1, 2.7), // 36
			new THREE.Vector3(5.5, -1, 2.7), // 37
			new THREE.Vector3(6.5, -2, 2.7), // 38
			new THREE.Vector3(6.5, -3, 2.7), // 39
			new THREE.Vector3(-6, 0, -2.5), // 40
			new THREE.Vector3(-1, 2.5, -1.5), // 41
			new THREE.Vector3(8.5, 0, -2.5), // 42
			new THREE.Vector3(-1, 2, -1.7), // 43
			new THREE.Vector3(3, 1, -2.1), // 44
			new THREE.Vector3(3, 0.5, -2.3), // 45
			new THREE.Vector3(-4, 0.5, -2.3), // 46
			new THREE.Vector3(-8, -0.5, -2), // 47
			new THREE.Vector3(-8, -1, -2), // 48
			new THREE.Vector3(-6, -0.5, -2.5), // 49
			new THREE.Vector3(-8, -2.5, -2), // 50
			new THREE.Vector3(-6, -3, -2.5), // 51
			new THREE.Vector3(-5.2, -3, -2.5), // 52
			new THREE.Vector3(-5.2, -1.9, -2.5), // 53
			new THREE.Vector3(-4.1, -0.8, -2.5), // 54
			new THREE.Vector3(-2.9, -0.8, -2.5), // 55
			new THREE.Vector3(-1.8, -1.9, -2.5), // 56
			new THREE.Vector3(-1.8, -3, -2.5), // 57
			new THREE.Vector3(3.3, -3, -2.5), // 58
			new THREE.Vector3(3.3, -1.9, -2.5), // 59
			new THREE.Vector3(4.4, -0.8, -2.5), // 60
			new THREE.Vector3(5.6, -0.8, -2.5), // 61
			new THREE.Vector3(6.7, -1.9, -2.5), // 62
			new THREE.Vector3(6.7, -3, -2.5), // 63
			new THREE.Vector3(8, -3, -2.5), // 64
			new THREE.Vector3(8.5, -0.5, -2.5), // 65
			new THREE.Vector3(8, -0.5, -2.5), // 66
			new THREE.Vector3(8, 0, -2.5), // 67
			new THREE.Vector3(-5, -3, -2.7), // 68
			new THREE.Vector3(-5, -2, -2.7), // 69
			new THREE.Vector3(-4, -1, -2.7), // 70
			new THREE.Vector3(-3, -1, -2.7), // 71
			new THREE.Vector3(-2, -2, -2.7), // 72
			new THREE.Vector3(-2, -3, -2.7), // 73
			new THREE.Vector3(3.5, -3, -2.7), // 74
			new THREE.Vector3(3.5, -2, -2.7), // 75
			new THREE.Vector3(4.5, -1, -2.7), // 76
			new THREE.Vector3(5.5, -1, -2.7), // 77
			new THREE.Vector3(6.5, -2, -2.7), // 78
			new THREE.Vector3(6.5, -3, -2.7), // 79
			new THREE.Vector3(-5.5, 0.2, 2), // 80
			new THREE.Vector3(-1.5, 2.2, 1), // 81
			new THREE.Vector3(-1.5, 2.2, -1), // 82
			new THREE.Vector3(-5.5, 0.2, -2), // 83
			new THREE.Vector3(4, 1.2, 1.5), // 84
			new THREE.Vector3(4, 1.2, -1.5), // 85
			new THREE.Vector3(8.5, 0, -2), // 86
			new THREE.Vector3(8.5, 0, 2), // 87
			new THREE.Vector3(4, 0, -1.5), // 88
			new THREE.Vector3(4, 0, 1.5) // 89
			);

		geometry.faces.push(
			new THREE.Face3(25, 23, 24),
			new THREE.Face3(65, 64, 63),
			new THREE.Face3(65, 25, 64),
			new THREE.Face3(25, 24, 64),
			new THREE.Face3(23, 64, 24),
			new THREE.Face3(23, 63, 64),
			new THREE.Face3(22, 23, 25),
			new THREE.Face3(25, 26, 22),
			new THREE.Face3(65, 63, 62),
			new THREE.Face3(65, 62, 66),
			new THREE.Face3(21, 22, 26),
			new THREE.Face3(66, 62, 61),
			new THREE.Face3(21, 26, 27),
			new THREE.Face3(67, 66, 61),
			new THREE.Face3(20, 21, 27),
			new THREE.Face3(67, 61, 60),
			new THREE.Face3(17, 18, 19),
			new THREE.Face3(59, 58, 57),
			new THREE.Face3(16, 17, 19),
			new THREE.Face3(59, 57, 56),
			new THREE.Face3(16, 19, 20),
			new THREE.Face3(60, 59, 56),
			new THREE.Face3(15, 16, 20),
			new THREE.Face3(60, 56, 55),
			new THREE.Face3(15, 20, 27),
			new THREE.Face3(67, 60, 55),
			new THREE.Face3(0, 15, 27),
			new THREE.Face3(67, 55, 40),
			new THREE.Face3(0, 14, 15),
			new THREE.Face3(55, 54, 40),
			new THREE.Face3(0, 13, 14),
			new THREE.Face3(54, 53, 40),
			new THREE.Face3(0, 11, 13),
			new THREE.Face3(53, 51, 40),
			new THREE.Face3(11, 12, 13),
			new THREE.Face3(53, 52, 51),
			new THREE.Face3(9, 8, 11),
			new THREE.Face3(51, 48, 49),
			new THREE.Face3(8, 10, 11),
			new THREE.Face3(51, 50, 48),
			new THREE.Face3(58, 18, 17),
			new THREE.Face3(17, 57, 58),
			new THREE.Face3(40, 47, 7),
			new THREE.Face3(40, 7, 0),
			new THREE.Face3(0, 6, 1),
			new THREE.Face3(41, 46, 40),
			new THREE.Face3(8, 48, 50),
			new THREE.Face3(8, 50, 10),
			new THREE.Face3(1, 6, 3),
			new THREE.Face3(43, 46, 41),
			new THREE.Face3(1, 3, 4),
			new THREE.Face3(44, 43, 41),
			new THREE.Face3(1, 4, 2),
			new THREE.Face3(42, 44, 41),
			new THREE.Face3(4, 5, 2),
			new THREE.Face3(42, 45, 44),
			new THREE.Face3(6, 0, 5),
			new THREE.Face3(45, 40, 46),
			new THREE.Face3(5, 0, 2),
			new THREE.Face3(42, 40, 45),
			new THREE.Face3(10, 50, 11),
			new THREE.Face3(50, 51, 11),
			new THREE.Face3(11, 51, 52),
			new THREE.Face3(11, 52, 12),
			new THREE.Face3(13, 12, 28),
			new THREE.Face3(68, 52, 53),
			new THREE.Face3(13, 28, 29),
			new THREE.Face3(69, 68, 53),
			new THREE.Face3(14, 13, 29),
			new THREE.Face3(69, 53, 54),
			new THREE.Face3(14, 29, 30),
			new THREE.Face3(70, 69, 54),
			new THREE.Face3(14, 30, 31),
			new THREE.Face3(71, 70, 54),
			new THREE.Face3(15, 14, 31),
			new THREE.Face3(71, 54, 55),
			new THREE.Face3(15, 31, 32),
			new THREE.Face3(72, 71, 55),
			new THREE.Face3(15, 32, 16),
			new THREE.Face3(56, 72, 55),
			new THREE.Face3(16, 32, 33),
			new THREE.Face3(73, 72, 56),
			new THREE.Face3(16, 33, 17),
			new THREE.Face3(57, 73, 56),
			new THREE.Face3(30, 70, 71),
			new THREE.Face3(30, 71, 31),
			new THREE.Face3(29, 69, 70),
			new THREE.Face3(29, 70, 30),
			new THREE.Face3(28, 68, 69),
			new THREE.Face3(28, 69, 29),
			new THREE.Face3(12, 52, 68),
			new THREE.Face3(12, 68, 28),
			new THREE.Face3(31, 71, 72),
			new THREE.Face3(31, 72, 32),
			new THREE.Face3(32, 72, 73),
			new THREE.Face3(32, 73, 33),
			new THREE.Face3(33, 73, 57),
			new THREE.Face3(33, 57, 17),
			new THREE.Face3(19, 18, 34),
			new THREE.Face3(74, 58, 59),
			new THREE.Face3(19, 34, 35),
			new THREE.Face3(75, 74, 59),
			new THREE.Face3(20, 19, 35),
			new THREE.Face3(75, 59, 60),
			new THREE.Face3(20, 35, 36),
			new THREE.Face3(76, 75, 60),
			new THREE.Face3(20, 36, 37),
			new THREE.Face3(77, 76, 60),
			new THREE.Face3(21, 20, 37),
			new THREE.Face3(77, 60, 61),
			new THREE.Face3(21, 37, 38),
			new THREE.Face3(78, 77, 61),
			new THREE.Face3(21, 38, 22),
			new THREE.Face3(62, 78, 61),
			new THREE.Face3(22, 38, 39),
			new THREE.Face3(79, 78, 62),
			new THREE.Face3(22, 39, 23),
			new THREE.Face3(63, 79, 62),
			new THREE.Face3(18, 58, 74),
			new THREE.Face3(18, 74, 34),
			new THREE.Face3(34, 74, 75),
			new THREE.Face3(34, 75, 35),
			new THREE.Face3(35, 75, 76),
			new THREE.Face3(35, 76, 36),
			new THREE.Face3(36, 76, 77),
			new THREE.Face3(36, 77, 37),
			new THREE.Face3(37, 77, 78),
			new THREE.Face3(37, 78, 38),
			new THREE.Face3(38, 78, 79),
			new THREE.Face3(38, 79, 39),
			new THREE.Face3(39, 79, 63),
			new THREE.Face3(39, 63, 23),
			new THREE.Face3(80, 0 , 1),
			new THREE.Face3(81, 80, 1),
			new THREE.Face3(81, 1, 41),
			new THREE.Face3(41, 82, 81),
			new THREE.Face3(83, 82, 41),
			new THREE.Face3(40, 83, 41),
			new THREE.Face3(40, 0, 80),
			new THREE.Face3(40, 80, 83),
			new THREE.Face3(41, 85, 42),
			new THREE.Face3(42, 85, 86),
			new THREE.Face3(1, 2, 84),
			new THREE.Face3(84, 2, 87),
			new THREE.Face3(41, 1, 85),
			new THREE.Face3(85, 1, 84),
			new THREE.Face3(86, 88, 89),
			new THREE.Face3(86, 89, 87),
			new THREE.Face3(85, 88, 86),
			new THREE.Face3(89, 84, 87),
			new THREE.Face3(84, 89, 88),
			new THREE.Face3(84, 88, 85),
			new THREE.Face3(2, 27, 25),
			new THREE.Face3(65, 67, 42),
			new THREE.Face3(27, 26, 25),
			new THREE.Face3(65, 66, 67)
		  );

		geometry.computeFaceNormals();

		return geometry;
	}
}