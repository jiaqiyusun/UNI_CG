class Ball {
    constructor(scene, x, y, z) {
        const textureLoader = new THREE.TextureLoader();

        this.ballBumpMap = new textureLoader.load("images/ballBump.png");
        
        this.materials = new Object;
        this.materials["basic"] = new THREE.MeshBasicMaterial({color: 0xffffff});
        this.materials["phong"] = new THREE.MeshPhongMaterial({color: 0xffffff, bumpMap: this.ballBumpMap});

        this.ballJumping = false;
        this.ballStep = 0;

        this.ball = this.createBall(x, y, z);

        scene.add(this.ball);
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
                this.ballJumping = !this.ballJumping;
                break;
        }
    }

    update(time) {
        if (this.ballJumping) {
            this.ballStep += time;
            this.ball.position.y = Math.abs(30 * (Math.sin(this.ballStep))) + 1.5;
            this.ball.position.z = 10 * (Math.cos(this.ballStep)) - 10;
        }
    }
}