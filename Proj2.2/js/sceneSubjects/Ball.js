class Ball {
    constructor(scene, x, y, z, xRandom, zRandom) {
        this.material = new THREE.MeshNormalMaterial({wireframe: false});
        this.geometry = new THREE.SphereGeometry(0.7, 20, 20);

        this.ball = this.createBall(scene, x, y, z);

        this.xVel = Math.cos(0) * 1;
        this.zVel = Math.sin(Math.PI * 3/2) * 1;
        this.direction = new THREE.Vector3(xRandom, 0, zRandom);
        this.lastCollision;
    }

    createBall(scene, x, y, z) {
        var ball = new THREE.Mesh(this.geometry, this.material);
        ball.position.set(x, y, z);
        scene.add(ball);

        return ball;
    }

    update(time) {
        let translation = new THREE.Vector3();
        const axis = new THREE.Vector3();

        // slowed movement
        this.xVel *= 0.999;
        this.zVel *= 0.999;

        let totalVelocity = Math.sqrt(this.xVel * this.xVel + this.zVel * this.zVel);

        if(this.direction.y == -1) {
            totalVelocity = 1;
        }
        
        if (totalVelocity < 0.1) {
            this.xVel = 0;
            this.zVel = 0;
            this.direction.x = 0;
            this.direction.z = 0;
            totalVelocity = 0;
        }

        

        // Translation
        this.direction.normalize();
        translation.copy(this.direction);
        this.ball.position.add(translation.multiplyScalar(time * totalVelocity * 10));

        // Rotation
        const angle = -totalVelocity / (Math.PI * 10) * Math.PI;
        axis.set(this.xVel, 0, this.zVel).normalize();
        axis.cross(THREE.Object3D.DefaultUp);
        this.ball.rotateOnWorldAxis(axis, angle);
    }

}