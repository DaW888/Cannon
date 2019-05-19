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

    barrel() {
        console.log('barrel');
        const geometry = new THREE.CylinderGeometry(12, 12, 80, 48);
        const material = new THREE.MeshBasicMaterial({color: 0xff00ff});
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(0, 40, 0);
        // cylinder.position.set(1000, 20, 2000);

        this.add(cylinder);

    }

    wheels() {
        const geometry = new THREE.CylinderGeometry( 15, 15, 10, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        let wheel = new THREE.Mesh( geometry, material );
        wheel.position.set(-17 ,15, 10);
        wheel.rotateX(Math.PI/2);
        wheel.rotateZ(Math.PI/2);
        this.add(wheel);

        wheel = new THREE.Mesh( geometry, material );
        wheel.rotateX(Math.PI/2);
        wheel.rotateZ(Math.PI/2);
        wheel.position.set(17 ,15, 10);

        this.add(wheel);
        


    }
}