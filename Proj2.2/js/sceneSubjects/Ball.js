class Ball {
    constructor(id, scene, x, y, z, xRandom, zRandom) {
        this.id = id;
        this.material = new THREE.MeshNormalMaterial({wireframe: false});
        this.geometry = new THREE.SphereGeometry(0.5, 20, 20);

        this.ball = this.createBall(scene, x, y, z);

        this.direction = new THREE.Vector3(xRandom, 0, zRandom);

        this.xVel = Math.cos(0) * Math.sign(xRandom);
        this.zVel = Math.sin(Math.PI/2) * Math.sign(zRandom);
        this.totalVelocity = Math.sqrt(this.xVel * this.xVel + this.zVel * this.zVel);
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

        if(this.direction.y == -1) {
            this.totalVelocity = 1;
        }

        else {
            // slowed movement
            this.xVel *= 0.995;
            this.zVel *= 0.995;

            this.totalVelocity *= 0.995
        
            if (this.totalVelocity < 0.05) {
                this.totalVelocity = 0;
                this.xVel = 0;
                this.zVel = 0;
                this.direction.x = 0;
                this.direction.z = 0;
            }

            // Rotation
            const angle = -this.totalVelocity / (Math.PI * 10) * Math.PI;
            axis.set(this.xVel, 0, this.zVel).normalize();
            axis.cross(THREE.Object3D.DefaultUp);
            this.ball.rotateOnWorldAxis(axis, angle);
        }  

        // Translation
        this.direction.normalize();
        translation.copy(this.direction);
        this.ball.position.add(translation.multiplyScalar(time * this.totalVelocity * 10));

    }

}