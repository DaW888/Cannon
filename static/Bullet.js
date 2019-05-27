class Bullet extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry( 10, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        super(geometry, material);
        this.position.set(setting.xOfFirstCannon, 20, 0);
    }

    get getBullet() {
        return this;
    }

    setPosition(){
        const barrRot = $('#barrelRotation').val()*Math.PI/180 - Math.PI/2;
        const canRot = $('#cannonRotation').val()*Math.PI/180 - Math.PI/2;


        const x = 70 * Math.cos(barrRot) * Math.cos(canRot) + setting.xOfFirstCannon;
        const y = -70 * Math.sin(barrRot) + 10;
        const z = -70 * Math.cos(barrRot) * Math.sin(canRot) - 1750;
        this.position.set(x, y, z);
        console.log(this.position);
        return this.position;

    }
}