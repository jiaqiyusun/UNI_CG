// https://threejsfundamentals.org/threejs/lessons/threejs-custom-geometry.html
class Cybertruck {

	constructor(scene, x, y, z) {
		this.geometry = this.createCybertruckGeometry();
		this.mesh = new THREE.Mesh(this.geometry, new THREE.MeshNormalMaterial());

		this.mesh.position.set(x,y,z);
		scene.add(this.mesh);
	}
	
	update(time) {
		
	}
	
	createCybertruckGeometry() {
		// First let's make a cube with (Geometry).
        const geometry = new THREE.Geometry();
        
		geometry.vertices.push(
            new THREE.Vector3(-9.5, 3.7, -2), // 0
            new THREE.Vector3(-9.5, 3.7, 2), // 1
            new THREE.Vector3(-8.5, 3.8, -3), // 2
            new THREE.Vector3(-8.5, 3.8, 3), // 3
			new THREE.Vector3(-1, 6.5, -2), // 4
			new THREE.Vector3(-1, 6.5, 2), // 5
			new THREE.Vector3(10.2, 4.8, -3), // 6
			new THREE.Vector3(10.2, 4.8, 3), // 7
			new THREE.Vector3(10, 2.5, -3), // 8
			new THREE.Vector3(10, 2.5, 3), // 9
			new THREE.Vector3(8.6, 2.3, -3), // 10
			new THREE.Vector3(8.6, 2.3, 3), // 11
			new THREE.Vector3(7.5, 3.8, -3), // 12
			new THREE.Vector3(7.5, 3.8, 3), // 13
			new THREE.Vector3(5, 3.8, -3), // 14
			new THREE.Vector3(5, 3.8, 3), // 15
			new THREE.Vector3(3.9, 2.1, -3), // 16
			new THREE.Vector3(3.9, 2.1, 3), // 17
			new THREE.Vector3(-4, 1.9, -3), // 18
			new THREE.Vector3(-4, 1.9, 3), // 19
			new THREE.Vector3(-5.4, 3.7, -3), // 20
			new THREE.Vector3(-5.4, 3.7, 3), // 21
			new THREE.Vector3(-7.5, 3.7, -3), // 22
			new THREE.Vector3(-7.5, 3.7, 3), // 23
			new THREE.Vector3(-8.5, 2.5, -3), // 24
			new THREE.Vector3(-8.5, 2.5, 3), // 25
			new THREE.Vector3(-8.5, 3, -3), // 26
			new THREE.Vector3(-8.5, 3, 3), // 27
			new THREE.Vector3(-9.5, 2.9, -2), // 28
			new THREE.Vector3(-9.5, 2.9, 2), // 29
			new THREE.Vector3(-8.5, 1.3, -3), // 30
			new THREE.Vector3(-8.5, 1.3, 3), // 31
			new THREE.Vector3(-9.5, 1.3, -2), // 32
			new THREE.Vector3(-9.5, 1.3, 2), // 33
			new THREE.Vector3(-6, 4.5, -3), // 34
			new THREE.Vector3(-6, 4.5, 3), // 35
			new THREE.Vector3(-1, 6.1, -2.3), // 36
			new THREE.Vector3(-1, 6.1, 2.3), // 37
			new THREE.Vector3(3.5, 4.9, -2.8), // 38
			new THREE.Vector33(3.5, 4.9, 2.8), // 39
			new THREE.Vector3(3.5, 5.4, -2.8), // 40
			new THREE.Vector3(3.5, 5.4, 2.8), // 41
			new THREE.Vector3(3.5, 5.4, 2.8), // 42
			);

		geometry.faces.push(

		  );

		geometry.computeFaceNormals();

		return geometry;
	}
}