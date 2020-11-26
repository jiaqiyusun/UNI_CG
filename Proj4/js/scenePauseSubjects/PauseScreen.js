class PauseScreen {
    constructor(scene, x, y, z) {
        this.pauseScreen = this.createPauseScreen(x, y, z);
        scene.add(this.pauseScreen);
    }

    createPauseScreen(x, y, z) {      
        const texture = new THREE.TextureLoader().load("images/pauseScreen.png");

        const pauseScreen = new THREE.Mesh(new THREE.PlaneGeometry(50, 25, 0), new THREE.MeshBasicMaterial({map: texture}));
        pauseScreen.visible = false;
        pauseScreen.position.set(x, y, z);

        return pauseScreen;
    }

    onKeyDown(key) {
        switch (key.keyCode) {
            case 83: //S
                this.pauseScreen.visible = !this.pauseScreen.visible;
                break;
            case 82: //R
                this.pauseScreen.visible = false;
                break;
        }
    }

}