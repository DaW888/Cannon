class Bullet extends THREE.Mesh {
    constructor() {
        var geometry = new THREE.SphereGeometry( 10, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        super(geometry, material);
        this.position.set(0, 20, 0);
    }

    get getBullet() {
        return this;
    }
}