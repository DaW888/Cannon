class Bullet extends THREE.Mesh {
    constructor(bulletColor = 0xffff00) {
        const geometry = new THREE.SphereGeometry( 10, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: bulletColor} );
        super(geometry, material);
        this.position.set(setting.xOfFirstCannon, 20, 0);
    }

    get getBullet() {
        return this;
    }

    setPosition(barrRot, canRot){
        let x = 70 * Math.cos(barrRot) * Math.cos(canRot) + setting.xOfFirstCannon;
        let y = -70 * Math.sin(barrRot) + 10;
        let z = -70 * Math.cos(barrRot) * Math.sin(canRot) - 1750;
        this.position.set(x, y, z);
        console.log(this.position);
        return this.position;

    }
}