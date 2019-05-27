class Main3D{
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.generate3d();
    }

    generate3d() {
        // antialias: wygladzanie krawedzi elementow sceny
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0x000030);
        renderer.setSize(window.innerWidth, window.innerHeight);

        $('#root').append(renderer.domElement);

        const axes = new THREE.AxesHelper(1000);
        this.scene.add(axes);

        // PLANE
        const geometry1 = new THREE.PlaneGeometry(2000, 4000, 10);
        const material1 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            wireframe: true,
        });
        const plane1 = new THREE.Mesh(geometry1, material1);
        plane1.rotateX(Math.PI / 2);
        this.scene.add(plane1);

        const geometry = new THREE.PlaneGeometry(2000, 4000, 10);
        const material = new THREE.MeshBasicMaterial({
            color: 0x262626,
            side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotateX(Math.PI / 2);
        this.scene.add(plane);

        this.camera.position.set(0, 100, -2000);
        // this.camera.position.set(0, 80, 200);
        this.camera.lookAt(this.scene.position);

        this.cannonSet();
        console.log(this.scene);

        let velocity = $('#velocity').val();
        $('#velocity').on('input', ()=>{
            velocity = $('#velocity').val();
            console.log(velocity);

        })

        let gravity = $('#gravity').val();
        $('#gravity').on('input', ()=>{
            gravity = $('#gravity').val();
            console.log(gravity);
        })

        let shot = false;
        const dir = new THREE.Vector3();
        let t;
        $('#shot').click(()=>{
            shot = true;
            this.can.getBarrel.getWorldDirection(dir);
            const start = this.bul.getBullet.position;
            console.log(dir);
            t = 0;
        })

        const render = () => {
            // dopasowanie wielkości rendera do dymanicznie zmienianej szerokości okna przeglądarki
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

            if(shot){
                t += 0.1;
                const angle = (90 - $('#barrelRotation').val()) * Math.PI / 180;
                const x = t * velocity * Math.cos(angle) * dir.x + setting.xOfFirstCannon;
                const y = t * velocity * Math.sin(angle) - ((gravity * t * t) / 2) + 80;
                const z = t * velocity * Math.cos(angle) * dir.z - 1750;

                this.bul.position.set(x,y,z);
                net.SETshotBullet(this.bul.position); //! do zrobienia

                if(this.bul.position.y <= 0){
                    shot = false;
                }
            }

            // rendering
            requestAnimationFrame(render);
            console.log('render leci');
            renderer.render(this.scene, this.camera);
        }
        render();

    }

    cannonSet(){
        const cannon = new Cannon();
        this.can = cannon.getCannon;
        this.can.position.set(setting.xOfFirstCannon, 0, -1750);
        this.scene.add(this.can);

        const bullet = new Bullet();
        this.bul = bullet.getBullet;
        this.bul.position.set(setting.xOfFirstCannon, 80, -1750);
        this.scene.add(this.bul);


        $('#cannonRotation').on('input', ()=>{
            this.can.rotation.y = $('#cannonRotation').val()*Math.PI/180;
            let bulletPos = this.bul.setPosition();
            net.SETcannonPos(this.can.rotation.y, bulletPos);

        })

        $('#barrelRotation').on('input', ()=>{
            this.can.barrelRotation = $('#barrelRotation').val();
            let bulletPos = this.bul.setPosition();
            net.SETbarrelPos($('#barrelRotation').val(), bulletPos);
        })
    }

}