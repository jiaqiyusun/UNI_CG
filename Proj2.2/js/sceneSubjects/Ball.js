class Ball {
    constructor(scene, x, y, z) {
        this.material = new THREE.MeshNormalMaterial({wireframe: false});
        this.geometry = new THREE.SphereGeometry(0.7, 20, 20);

        this.ball = this.createBall(scene, x, y, z);

        this.xVel = 0;
        this.zVel = 0;;
    }

    createBall(scene, x, y, z) {
        var ball = new THREE.Mesh(this.geometry, this.material);
        ball.position.set(x, y, z);
        scene.add(ball);

        return ball;
    }

    update(clockDelta) {
        var translation = new THREE.Vector3();
        const axis = new THREE.Vector3();

        translation.z -= 1;
        this.zVel = Math.sin(Math.PI * 3/2) * 1;

        // if (this.translation.back) {
        //     translation.z += 1;
        //     this.zVel = Math.sin(Math.PI / 2) * 1;
        // }
        // if (this.translation.left) {
        //     translation.x -= 1;
        //     this.xVel = Math.cos(Math.PI) * 1;
        // }
        // if (this.translation.right) {
        //     translation.x += 1;
        //     this.xVel = Math.cos(0) * 1;
        // }

        translation.normalize();
        this.ball.position.add(translation.multiplyScalar(clockDelta * 10));
        const totalVelocity = Math.sqrt(this.xVel * this.xVel + this.zVel * this.zVel);
        const angle = -totalVelocity / (Math.PI * 10) * Math.PI;
        
        axis.set(this.xVel, 0, this.zVel).normalize();
        axis.cross(THREE.Object3D.DefaultUp);
        this.ball.rotateOnWorldAxis(axis, angle);
    }

    onKeyDown(key) {
        switch (key.keyCode) {
            case 37:
                this.translation.left = true;
                break;
            case 38:
                this.translation.front = true;
                break;
            case 39:
                this.translation.right = true;
                break;
            case 40:
                this.translation.back = true;
                break;
        }
    }

    onKeyUp(key) {
        switch (key.keyCode) {
            case 37:
                this.translation.left = false;
                break;
            case 38:
                this.translation.front = false;
                break;
            case 39:
                this.translation.right = false;
                break;
            case 40:
                this.translation.back = false;
                break;
        }
    }
}