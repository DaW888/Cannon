class Cannon extends THREE.Object3D {
    constructor() {
        console.log('cannon');
        super();
        // const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        // const geometry = new THREE.CylinderGeometry(30, 30, 10, 32);
        // var cube = new THREE.Mesh(geometry, material);
        // console.log(this);
        // this.add(cube);
        this.barrel();
        this.wheels();
    }

    get getCannon(){
        return this;
    }
    
    get getBarrel(){
        return this.barrel;
    }

    set barrelRotation(angle){
        this.barrel.rotation.x = angle* Math.PI / 180;
    }

    barrel() {
        console.log('barrel');
        const geometry = new THREE.CylinderGeometry(12, 12, 80, 48);
        geometry.translate(0, 30, 0);
        const material = new THREE.MeshBasicMaterial({color: 0xff00ff});
        this.barrel = new THREE.Mesh(geometry, material);
        this.barrel.position.set(0, 10, 0);
        this.add(this.barrel);

    }

    wheels() {
        const geometry = new THREE.CylinderGeometry( 15, 15, 10, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        let wheel = new THREE.Mesh( geometry, material );
        wheel.position.set(-17 ,15, 0);
        wheel.rotateX(Math.PI/2);
        wheel.rotateZ(Math.PI/2);
        this.add(wheel);

        wheel = new THREE.Mesh( geometry, material );
        wheel.rotateX(Math.PI/2);
        wheel.rotateZ(Math.PI/2);
        wheel.position.set(17 ,15, 0);

        this.add(wheel);
        
    }
}