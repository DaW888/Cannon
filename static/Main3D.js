class Main3D{
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.generate3d();
    }

    generate3d() {
        // antialias: wygladzanie krawedzi elementow sceny
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0x000030);
        renderer.setSize(window.innerWidth, window.innerHeight);

        $('#root').append(renderer.domElement);
        
        var axes = new THREE.AxesHelper(1000);
        this.scene.add(axes);

        // PLANE
        var geometry1 = new THREE.PlaneGeometry(2000, 4000, 10);
        var material1 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            wireframe: true,
        });
        var plane1 = new THREE.Mesh(geometry1, material1);
        plane1.rotateX(Math.PI / 2);
        this.scene.add(plane1);

        var geometry = new THREE.PlaneGeometry(2000, 4000, 10);
        var material = new THREE.MeshBasicMaterial({
            color: 0x262626,
            side: THREE.DoubleSide,
        });
        var plane = new THREE.Mesh(geometry, material);
        plane.rotateX(Math.PI / 2);
        this.scene.add(plane);

        this.camera.position.set(0, 100, 2000);
        // this.camera.position.set(0, 80, 200);
        this.camera.lookAt(this.scene.position);

        this.cannonSet();
        this.bulletSet();
        console.log(this.scene);

        var render = () => {
            // dopasowanie wielkości rendera do dymanicznie zmienianej szerokości okna przeglądarki
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // rendering
            requestAnimationFrame(render);
            console.log('render leci');
            renderer.render(this.scene, this.camera);
        }
        render();

    }

    cannonSet(){
        var cannon = new Cannon();
        var can = cannon.getCannon;
        can.position.set(0, 0, 1750);
        this.scene.add(can);
    }

    bulletSet() {
        var bullet = new Bullet();
        var bul = bullet.getBullet;
        bul.position.set(0, 80, 1750);
        this.scene.add(bul);

    }
}