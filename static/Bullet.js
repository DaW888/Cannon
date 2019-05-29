class Bullet extends THREE.Mesh {
    constructor(bulletColor = 0xffff00, xOfCannon = setting.xOfFirstCannon) {
        const geometry = new THREE.SphereGeometry( 10, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: bulletColor} );
        super(geometry, material);
        this.xOfCannon = xOfCannon;
        this.position.set(xOfCannon, 20, 0);
    }

    get getBullet() {
        return this;
    }

    get getBulletPos(){
        return this.position;
    }

    setPosition(barrRot, canRot){
        let x = 70 * Math.cos(barrRot) * Math.cos(canRot) + this.xOfCannon;
        let y = -70 * Math.sin(barrRot) + 10;
        let z = -70 * Math.cos(barrRot) * Math.sin(canRot) - 1750;
        this.position.set(x, y, z);
        console.log(this.position);
        return this.position;

    }

    set setSecBullPos(pos){
        console.log(pos);
        this.position.set(pos.x, pos.y, pos.z);
    }
}