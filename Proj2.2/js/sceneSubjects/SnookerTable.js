class SnookerTable {
    constructor(scene, x, y, z) {
        this.materials = new Object;
        this.materials["table"] = new THREE.MeshNormalMaterial({wireframe: false});
        this.materials["hole"] = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
        this.range = {};
        this.holes = [];
        this.table = this.createSnookerTable(x, y ,z);

        scene.add(this.table);
    }

    addHole(obj, x, y, z){
        'use strict';
        let geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 20);
        let mesh = new THREE.Mesh(geometry, this.materials["hole"]);
        mesh.position.set(x, y, z);
    
        obj.add(mesh);

        this.holes.push([x/2, 0.3, z/2]);
    }
    
    addWallShort(obj, x, y, z){
        'use strict';
        let geometry= new THREE.CubeGeometry(31, 3, 1);
        let mesh = new THREE.Mesh(geometry, this.materials["table"]);
        mesh.rotateY(Math.PI / 2);
        mesh.position.set(x, y, z);
    
        obj.add(mesh);
    }
    
    addWallLong(obj, x, y, z){
        'use strict';
        let geometry= new THREE.CubeGeometry(61, 3, 1);
        let mesh = new THREE.Mesh(geometry, this.materials["table"]);
        mesh.position.set(x, y, z);
    
        obj.add(mesh);
    }
    
    addWallBottom(obj, x, y, z){
        'use strict';
        let geometry = new THREE.CubeGeometry(61, 0.2, 31);
        let mesh = new THREE.Mesh(geometry, this.materials["table"]);
        mesh.position.set(x, y, z);
    
        obj.add(mesh);
    }
    
    createSnookerTable(x, y, z) {
        'use strict';
    
        var table = new THREE.Object3D();
        
        this.addWallBottom(table, 0, 0, 0);
    
        this.addWallShort(table, 30, 1.5, 0);
        this.addWallShort(table, -30, 1.5, 0);
        this.addWallLong(table, 0, 1.5, 15);
        this.addWallLong(table, 0, 1.5, -15);
    
        this.addHole(table, 28, 0, 13);
        this.addHole(table, -28, 0, 13);
        this.addHole(table, 28, 0, -13);
        this.addHole(table, -28, 0, -13);
        this.addHole(table, 0, 0, 13);
        this.addHole(table, 0, 0, -13);
        
        table.position.x = x;
        table.position.y = y;
        table.position.z = z;

        table.scale.set(0.5, 0.5, 0.5);

        this.range.x = 14.5;
        this.range.z = 7;
        
        return table;
    }
}