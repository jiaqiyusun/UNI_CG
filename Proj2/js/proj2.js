var camera, scene, renderer;
var material, geometry, mesh;

var wires = true;

class Entity extends THREE.Object3D{
    constructor(){
        super();
        this.velocity = new THREE.Vector3();
		this.aceleration = new THREE.Vector3();
		this.maxvel = new THREE.Vector3();
		this.minvel = new THREE.Vector3();
		this.width = 0;
		this.height = 0;
		this.radius = 0;
    }
}

function addStickVertical(obj, x, y, z){
    'use strict';
    material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 8);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateZ(Math.PI/2);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addStickHorizontal(obj, x, y, z){
    'use strict';
    material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 8);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addHole(obj, x, y, z){
    'use strict';
    material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
    geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addTableWallShort(obj, x, y, z){
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    geometry= new THREE.CubeGeometry(20, 3, 0.2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI / 2);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addTableWallLong(obj, x, y, z){
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    geometry= new THREE.CubeGeometry(60, 3, 0.2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addTableWallBotton(obj, x, y, z){
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x006800, wireframe: true });
    geometry = new THREE.CubeGeometry(60, 0.5, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();
    
    addTableWallBotton(table, 0, -0.5, 0);

    addTableWallShort(table, 30, 0, 0);
    addTableWallShort(table, -30, 0, 0);
    addTableWallLong(table, 0, 0, 10);
    addTableWallLong(table, 0, 0, -10);

    addHole(table, 28, -0.2, 8);
    addHole(table, -28, -0.2, 8);
    addHole(table, 28, -0.2, -8);
    addHole(table, -28, -0.2, -8);
    addHole(table, 0, -0.2, 8);
    addHole(table, 0, -0.2, -8);

    addStickHorizontal(table, 15, 0.5, 14);
    addStickHorizontal(table, -15, 0.5, 14);
    addStickHorizontal(table, 15, 0.5, -14);
    addStickHorizontal(table, -15, 0.5, -14);
    addStickVertical(table, 34, 0.5, 0);
    addStickVertical(table, -34, 0.5, 0);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70, 
        window.innerWidth/window.innerHeight,
        1,
        1000);

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    createTable( 0, 0, 0);
}

function render() {
    'use strict';

    renderer.render(scene, camera);
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 65: //A
        case 97: //a
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
    }
    render();
}
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
}