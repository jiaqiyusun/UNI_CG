class Ball {
    constructor(scene, x, y, z) {
        this.initialValues = {
            x: x,
            y: y,
            z: z,
            ballStep: 0,
            isBallJumping: false,
            wireframe: false
        }

        const textureLoader = new THREE.TextureLoader();

        this.ballBumpMap = new textureLoader.load("images/ballBump.png");
        
        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0xffffff});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0xffffff, bumpMap: this.ballBumpMap});

        this.isBallJumping = this.initialValues.isBallJumping;
        this.ballStep = this.initialValues.ballStep;

        this.ball = this.createBall(this.initialValues.x, this.initialValues.y, this.initialValues.z);

        scene.add(this.ball);
    }

    reset() {
        this.ball.position.set(this.initialValues.x, this.initialValues.y, this.initialValues.z);
        this.ball.material.wireframe = this.initialValues.wireframe;
        this.ball.material = this.materials.phong;
        this.ballStep = this.initialValues.ballStep;
        this.isBallJumping = this.initialValues.isBallJumping;
    }

    createBall(x, y, z) {
        const ball = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20), this.materials.phong);
        ball.position.set(x, y, z);

        return ball;
    }

    toggleMaterialI() {
        if(this.ball.material.type == "MeshBasicMaterial")
            this.ball.material = this.materials.phong;
        else
            this.ball.material = this.materials.basic;
    }

    toggleWireframeW() {
        this.ball.material.wireframe = !this.ball.material.wireframe
    }

    onKeyDown(key) {
        switch (key.keyCode) {
            // Materials
            case 87: //W
                this.toggleWireframeW();
                break;
            case 73: //I
                this.toggleMaterialI();
                break;
            case 66: //B
                this.isBallJumping = !this.isBallJumping;
                break;
        }
    }

    update(time) {
        if (this.isBallJumping) {
            this.ballStep += time;
            this.ball.position.y = Math.abs(30 * (Math.sin(this.ballStep))) + 1.5;
            this.ball.position.z = 10 * (Math.cos(this.ballStep)) - 10;
        }
    }
}