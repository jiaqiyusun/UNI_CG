class Mobile {
    constructor(scene, x, y, z) {        
        this.material = new THREE.MeshNormalMaterial({wireframe: false});
        
        this.mobileRotationHash = new Object;
        this.mobileRotationHash['mobileLeftRotation'] = false;
        this.mobileRotationHash['mobileRightRotation'] = false;
        this.mobileRotationHash['mobileSecondPieceLeftRotation'] = false;
        this.mobileRotationHash['mobileSecondPieceRightRotation'] = false;
        this.mobileRotationHash['mobileThirdPieceLeftRotation'] = false;
        this.mobileRotationHash['mobileThirdPieceRightRotation'] = false;
        
        this.mobileTranslationHash = new Object;
        this.mobileTranslationHash['mobileFrontTranslation'] = false;
        this.mobileTranslationHash['mobileBackTranslation'] = false;
        this.mobileTranslationHash['mobileLeftTranslation'] = false;
        this.mobileTranslationHash['mobileRightTranslation'] = false;
        
        this.mobile = this.createMobile(x, y ,z);
        scene.add(this.mobile);
    }

    createMobile(x, y ,z) {
        'use strict';
    
        var mobile = new THREE.Object3D();
            
        this.createMobileLayer(mobile, 0, 0, 0, "cone");
    
        this.createMobileSecondPiece(mobile);
    
        mobile.position.set(x, y, z);

        return mobile
    }

    createMobileSecondPiece(obj) {
        'use strict';
    
        var mobileSecondPiece = new THREE.Object3D();
    
        this.createMobileLayer(mobileSecondPiece, 0, -3, 0, "cube");
        mobileSecondPiece.position.set(4.5,0,0);
    
        this.createMobileThirdPiece(mobileSecondPiece);
    
        obj.add(mobileSecondPiece);
        this.mobileSecondPiece = mobileSecondPiece;
    }

    createMobileThirdPiece(obj) {
        'use strict';
    
        var mobileThirdPiece = new THREE.Object3D();
    
        this.createMobileLayer(mobileThirdPiece, 0, -6, 0, "ball");
        mobileThirdPiece.position.set(-4.5,0,0);
    
        obj.add(mobileThirdPiece);
        this.mobileThirdPiece = mobileThirdPiece;
    }

    createMobileLayer(obj, x, y, z, pendulumType) {
        'use strict';
    
        var layer = new THREE.Object3D();
    
        // vertical stick
        var geometry = new THREE.CylinderGeometry(0.1, 0.1, 3);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(0, -1.5, 0);
    
        layer.add(mesh);
    
        // long horizontal stick
        geometry = new THREE.CylinderGeometry(0.1, 0.1, 14);
        mesh = new THREE.Mesh(geometry, this.material);
    
        mesh.rotateZ(Math.PI / 2);
        mesh.position.set(0, -3, 0);
    
        layer.add(mesh);
    
        // pendulums
        var pendulumGeometry;
        if(pendulumType == "cone") {
            pendulumGeometry = new THREE.ConeGeometry(0.5, 1);
        }
    
        else if(pendulumType == "cube") {
            pendulumGeometry = new THREE.BoxGeometry(1,1,1);
        }
    
        else if(pendulumType == "ball") {
            pendulumGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        }
    
        // four small vertical stick with pendulum
        this.createPendulumOnLayer(-7, layer, pendulumGeometry);
        this.createPendulumOnLayer(-2, layer, pendulumGeometry);
        this.createPendulumOnLayer(2, layer, pendulumGeometry);
        this.createPendulumOnLayer(7, layer, pendulumGeometry);
    
        layer.position.set(x,y,z);
    
        obj.add(layer);
    }

    createPendulumOnLayer(x, obj, pendulumGeometry) {
        'use strict';
    
        var geometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2);
    
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, -3.5, 0);
        obj.add(mesh);
    
        mesh = new THREE.Mesh(pendulumGeometry, this.material);
        mesh.position.set(x, -4.5, 0);
        mesh.rotateZ(Math.PI);
        mesh.scale.set(1,1,0.5);
        obj.add(mesh);
    }

     update(time) {
        'use strict';

        var mobileRotation = 0, mobileSecondPieceRotation = 0, mobileThirdPieceRotation = 0;
        var mobileTranslation = new THREE.Vector3();

        // Rotation
        if(this.mobileRotationHash.mobileLeftRotation) {
            mobileRotation -= 1;
        }
        if(this.mobileRotationHash.mobileRightRotation) {
            mobileRotation += 1;
        }
        if(this.mobileRotationHash.mobileSecondPieceLeftRotation) {
            mobileSecondPieceRotation -= 1;
        }
        if(this.mobileRotationHash.mobileSecondPieceRightRotation) {
            mobileSecondPieceRotation += 1;
        }
        if(this.mobileRotationHash.mobileThirdPieceLeftRotation) {
            mobileThirdPieceRotation -= 1;
        }
        if(this.mobileRotationHash.mobileThirdPieceRightRotation) {
            mobileThirdPieceRotation += 1;
        }
        this.mobile.rotateY(mobileRotation * time);
        this.mobileSecondPiece.rotateY(mobileSecondPieceRotation * time);
        this.mobileThirdPiece.rotateY(mobileThirdPieceRotation * time);

        // Translation
        if(this.mobileTranslationHash.mobileLeftTranslation) {
            mobileTranslation.x -= 1;
        }
        if(this.mobileTranslationHash.mobileRightTranslation) {
            mobileTranslation.x += 1;
        }
        if(this.mobileTranslationHash.mobileFrontTranslation) {
            mobileTranslation.z -= 1;
        }
        if(this.mobileTranslationHash.mobileBackTranslation) {
            mobileTranslation.z += 1;
        }
        mobileTranslation.normalize();
        this.mobile.position.add(mobileTranslation.multiplyScalar(time * 10));
    }

    onKeyDown(key) {
        'use strict'
        switch (key.keyCode) {
            // Wireframe
            case 52: //4
                this.material.wireframe = !this.material.wireframe
                break;
    
            // Rotation
            case 81: //Q
                this.mobileRotationHash.mobileLeftRotation = true;
                break;
            case 69: //E
                this.mobileRotationHash.mobileRightRotation = true;
                break;
    
            case 65: //A
                this.mobileRotationHash.mobileSecondPieceLeftRotation = true;
                break;
            case 68: //D
                this.mobileRotationHash.mobileSecondPieceRightRotation = true;
                break;
    
            case 90: //Z
                this.mobileRotationHash.mobileThirdPieceLeftRotation = true;
                break;
            case 67: //C
                this.mobileRotationHash.mobileThirdPieceRightRotation = true;
                break;
    
            // Translation
            case 37: // leftArrow
                this.mobileTranslationHash.mobileLeftTranslation = true;
                break;
            case 38: // upArrow
                this.mobileTranslationHash.mobileFrontTranslation = true;
                break;
            case 39: // rightArrow
                this.mobileTranslationHash.mobileRightTranslation = true;
                break;
            case 40: // downArrow
                this.mobileTranslationHash.mobileBackTranslation = true;
                break;
    
        }
    }

    onKeyUp(key) {
        'use strict'
        switch (key.keyCode) {
                // Rotation
                case 81: //Q
                    this.mobileRotationHash.mobileLeftRotation = false;
                    break;
                case 69: //E
                    this.mobileRotationHash.mobileRightRotation = false;
                    break;
        
                case 65: //A
                    this.mobileRotationHash.mobileSecondPieceLeftRotation = false;
                    break;
                case 68: //D
                    this.mobileRotationHash.mobileSecondPieceRightRotation = false;
                    break;
        
                case 90: //Z
                    this.mobileRotationHash.mobileThirdPieceLeftRotation = false;
                    break;
                case 67: //C
                    this.mobileRotationHash.mobileThirdPieceRightRotation = false;
                    break;
        
                // Translation
                case 37: // leftArrow
                    this.mobileTranslationHash.mobileLeftTranslation = false;
                    break;
                case 38: // upArrow
                    this.mobileTranslationHash.mobileFrontTranslation = false;
                    break;
                case 39: // rightArrow
                    this.mobileTranslationHash.mobileRightTranslation = false;
                    break;
                case 40: // downArrow
                    this.mobileTranslationHash.mobileBackTranslation = false;
                    break;
            }
    }
}