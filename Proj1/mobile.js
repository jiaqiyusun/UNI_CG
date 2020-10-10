/* Global Variables */
var scene, currentCamera, renderer, cameras;

var geometry, material, mesh, pendulumGeometry;

var mobilePiecesHash, mobileRotationHash, mobileTranslationHash;

var clock;

var controls;


/* Functions */
function createControls(camera) {
    'use strict';

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);
}


function render() {
    'use strict';

    renderer.render(scene, currentCamera);
}


function createRenderer() {
    'use strict';

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}


function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));

    createCameras();
    
    material = new THREE.MeshNormalMaterial({wireframe: false});

    createMobile(0, 6, 0);
}


function createFreeCamera(x, y, z) {
    'use strict';

    var freeCamera = new THREE.PerspectiveCamera(
        70,     // FOV
        window.innerWidth / window.innerHeight,     // Aspect Ratio
        1,      // Near plane
        1000        //Far plane
    );

    freeCamera.position.set(x, y, z);
    freeCamera.lookAt(scene.position);
    scene.add(freeCamera);

    createControls(freeCamera);

    return freeCamera;
}


function createOrthographicCamera(x, y, z) {
    'use strict';

    var camera = new THREE.OrthographicCamera(
        -(0.025 * window.innerWidth) / 2,     // left
        (0.025 * window.innerWidth) / 2,      // right
        (0.025 * window.innerHeight) / 2,    //top
        -(0.025 * window.innerHeight) / 2,     // bottom
        1,                                  // near
        1000,                               // far
    );
    
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
    scene.add(camera);

    return camera;
}


function createCameras() {
    'use strict';

    cameras['freeCamera'] = createFreeCamera(15, 15, 15);
    currentCamera = cameras.freeCamera;

    cameras['camera1'] = createOrthographicCamera(0, 0, 20);
    cameras['camera2'] = createOrthographicCamera(0, 20, 0);
    cameras['camera3'] = createOrthographicCamera(20, 0, 0);
}


function animate() {
    'use strict';

    updateMobile();
    render();
    requestAnimationFrame(animate);
}


function updateMobile() {
    //mobilePiecesHash.mobile.position.set(10,10,10);
    'use strict';

    var clockDelta = clock.getDelta();

    var mobileRotation = 0, mobileSecondPieceRotation = 0, mobileThirdPieceRotation = 0;
    var mobileTranslation = new THREE.Vector3();

    // Rotation
    if(mobileRotationHash.mobileLeftRotation) {
        mobileRotation -= 1;
    }
    if(mobileRotationHash.mobileRightRotation) {
        mobileRotation += 1;
    }
    if(mobileRotationHash.mobileSecondPieceLeftRotation) {
        mobileSecondPieceRotation -= 1;
    }
    if(mobileRotationHash.mobileSecondPieceRightRotation) {
        mobileSecondPieceRotation += 1;
    }
    if(mobileRotationHash.mobileThirdPieceLeftRotation) {
        mobileThirdPieceRotation -= 1;
    }
    if(mobileRotationHash.mobileThirdPieceRightRotation) {
        mobileThirdPieceRotation += 1;
    }
    mobilePiecesHash.mobile.rotateY(mobileRotation * clockDelta);
    mobilePiecesHash.mobileSecondPiece.rotateY(mobileSecondPieceRotation * clockDelta);
    mobilePiecesHash.mobileThirdPiece.rotateY(mobileThirdPieceRotation * clockDelta);

    // Translation
    if(mobileTranslationHash.mobileLeftTranslation) {
        mobileTranslation.x -= 1;
    }
    if(mobileTranslationHash.mobileRightTranslation) {
        mobileTranslation.x += 1;
    }
    if(mobileTranslationHash.mobileFrontTranslation) {
        mobileTranslation.z -= 1;
    }
    if(mobileTranslationHash.mobileBackTranslation) {
        mobileTranslation.z += 1;
    }
    mobileTranslation.normalize();
    mobilePiecesHash.mobile.position.add(mobileTranslation.multiplyScalar(clockDelta * 10));
}


function createMobile(x, y, z) {
    'use strict';

    var mobile = new THREE.Object3D();

    createMobileLayer(mobile, 0, 0, 0, "cone");

    createMobileSecondPiece(mobile);

    mobile.position.set(x, y, z);

    scene.add(mobile);
    mobilePiecesHash['mobile'] = mobile;
}


function createMobileSecondPiece(obj) {
    'use strict';

    var mobileSecondPiece = new THREE.Object3D();

    createMobileLayer(mobileSecondPiece, 0, -3, 0, "cube");
    mobileSecondPiece.position.set(4.5,0,0);

    createMobileThirdPiece(mobileSecondPiece);

    obj.add(mobileSecondPiece);
    mobilePiecesHash['mobileSecondPiece'] = mobileSecondPiece;
}


function createMobileThirdPiece(obj) {
    'use strict';

    var mobileThirdPiece = new THREE.Object3D();

    createMobileLayer(mobileThirdPiece, 0, -6, 0, "ball");
    mobileThirdPiece.position.set(-4.5,0,0);

    obj.add(mobileThirdPiece);
    mobilePiecesHash['mobileThirdPiece'] = mobileThirdPiece;
}


function createMobileLayer(obj, x, y, z, pendulumType) {
    'use strict';

    var layer = new THREE.Object3D();

    // vertical stick
    geometry = new THREE.CylinderGeometry(0.1, 0.1, 3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -1.5, 0);

    layer.add(mesh);

    // long horizontal stick
    geometry = new THREE.CylinderGeometry(0.1, 0.1, 14);
    mesh = new THREE.Mesh(geometry, material);

    mesh.rotateZ(Math.PI / 2);
    mesh.position.set(0, -3, 0);

    layer.add(mesh);

    // pendulums
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
    createPendulumOnLayer(-7, layer);
    createPendulumOnLayer(-2, layer);
    createPendulumOnLayer(2, layer);
    createPendulumOnLayer(7, layer);

    layer.position.set(x,y,z);

    obj.add(layer);
}


function createPendulumOnLayer(x, obj) {
    geometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, -3.5, 0);
    obj.add(mesh);

    mesh = new THREE.Mesh(pendulumGeometry, material);
    mesh.position.set(x, -4.5, 0)
    mesh.rotateZ(Math.PI);
    mesh.scale.set(1,1,0.5);
    obj.add(mesh);
}


function init() {
    'use strict';

    initHashs();

    createRenderer();
    createScene();

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    clock = new THREE.Clock(true);

    render();
}


function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    resizeFreeCamera();
    resizeOrthographicalCamera(cameras.camera1);
    resizeOrthographicalCamera(cameras.camera2);
    resizeOrthographicalCamera(cameras.camera3);

    render();
}


function resizeOrthographicalCamera(camera) {
    'use strict';

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.left = -0.025 * window.innerWidth / 2,     // left
        camera.right = 0.025 * window.innerWidth / 2,      // right
        camera.top = 0.025 * window.innerHeight / 2,    //top
        camera.bottom = -0.025 * window.innerHeight / 2,     // bottom

        camera.updateProjectionMatrix();
    }
}


function resizeFreeCamera() {
    'use strict';

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        cameras.freeCamera.aspect = window.innerWidth / window.innerHeight;
        cameras.freeCamera.updateProjectionMatrix();
    }
}


function onKeyDown(key) {
    'use strict';

    switch (key.keyCode) {
        // Camera
        case 48: //0
            currentCamera = cameras.freeCamera;
            break;
        case 49: //1
            currentCamera = cameras.camera1;
            break;
        case 50: //2
            currentCamera = cameras.camera2;
            break;
        case 51: //3
            currentCamera = cameras.camera3;
            break;

        // Wireframe
        case 52: //4
            material.wireframe = !material.wireframe
            break;

        // Rotation
        case 81: //Q
        case 113: //q
            mobileRotationHash.mobileLeftRotation = true;
            break;
        case 87: //W
        case 119: //w
            mobileRotationHash.mobileRightRotation = true;
            break;

        case 65: //A
        case 97: //a
            mobileRotationHash.mobileSecondPieceLeftRotation = true;
            break;
        case 68: //D
        case 100: //d
            mobileRotationHash.mobileSecondPieceRightRotation = true;
            break;

        case 90: //Z
        case 122: //z
            mobileRotationHash.mobileThirdPieceLeftRotation = true;
            break;
        case 67: //C
        case 99: //c
            mobileRotationHash.mobileThirdPieceRightRotation = true;
            break;

        // Translation
        case 37: // leftArrow
            mobileTranslationHash.mobileLeftTranslation = true;
            break;
        case 38: // upArrow
            mobileTranslationHash.mobileFrontTranslation = true;
            break;
        case 39: // rightArrow
            mobileTranslationHash.mobileRightTranslation = true;
            break;
        case 40: // downArrow
            mobileTranslationHash.mobileBackTranslation = true;
            break;

    }
}   


function onKeyUp(key) {
    'use strict';

    switch (key.keyCode) {
        // Rotation
        case 81: //Q
        case 113: //q
            mobileRotationHash.mobileLeftRotation = false;
            break;
        case 87: //W
        case 119: //w
            mobileRotationHash.mobileRightRotation = false;
            break;

        case 65: //A
        case 97: //a
            mobileRotationHash.mobileSecondPieceLeftRotation = false;
            break;
        case 68: //D
        case 100: //d
            mobileRotationHash.mobileSecondPieceRightRotation = false;
            break;

        case 90: //Z
        case 122: //z
            mobileRotationHash.mobileThirdPieceLeftRotation = false;
            break;
        case 67: //C
        case 99: //c
            mobileRotationHash.mobileThirdPieceRightRotation = false;
            break;

        // Translation
        case 37: // leftArrow
            mobileTranslationHash.mobileLeftTranslation = false;
            break;
        case 38: // upArrow
            mobileTranslationHash.mobileFrontTranslation = false;
            break;
        case 39: // rightArrow
            mobileTranslationHash.mobileRightTranslation = false;
            break;
        case 40: // downArrow
            mobileTranslationHash.mobileBackTranslation = false;
            break;
    }
}


function initHashs() {
    'use strict';

    cameras = new Object;

    mobilePiecesHash = new Object;

    mobileRotationHash = new Object;
    mobileRotationHash['mobileLeftRotation'] = false;
    mobileRotationHash['mobileRightRotation'] = false;
    mobileRotationHash['mobileSecondPieceLeftRotation'] = false;
    mobileRotationHash['mobileSecondPieceRightRotation'] = false;
    mobileRotationHash['mobileThirdPieceLeftRotation'] = false;
    mobileRotationHash['mobileThirdPieceRightRotation'] = false;

    mobileTranslationHash = new Object;
    mobileTranslationHash['mobileFrontTranslation'] = false;
    mobileTranslationHash['mobileBackTranslation'] = false;
    mobileTranslationHash['mobileLeftTranslation'] = false;
    mobileTranslationHash['mobileRightTranslation'] = false;
}

