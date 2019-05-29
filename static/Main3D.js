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

        // this.cannonSet(); //! cannon set old
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
            // const start = this.bul.getBullet.position;
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
                let userNr = net.getUserNr;
                let xPosBullet = setting.xOfFirstCannon;
                if(userNr == 2)
                    xPosBullet = setting.xOfSecondCannon;
                const x = t * velocity * Math.cos(angle) * dir.x + xPosBullet;
                const y = t * velocity * Math.sin(angle) - ((gravity * t * t) / 2) + 80;
                const z = t * velocity * Math.cos(angle) * dir.z - 1750;

                this.bul.position.set(x,y,z);
                let bulletPos = this.bul.getBulletPos;
                net.SETshotBullet(bulletPos);

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

    cannonSet(userNr){
        console.log(userNr);

        // Cannon Create
        if(userNr == 1){
            const cannon = new Cannon();
            this.can = cannon.getCannon;
            this.can.position.set(setting.xOfFirstCannon, 0, -1750);
        }
        else{
            const cannon = new Cannon(0xffff00);
            this.can = cannon.getCannon;
            this.can.position.set(setting.xOfSecondCannon, 0, -1750);
            this.scene.add(this.can);
        }

        this.scene.add(this.can);


        // Bullet Create
        if(userNr == 1){
            const bullet = new Bullet();
            this.bul = bullet.getBullet;
            this.bul.position.set(setting.xOfFirstCannon, 80, -1750);
        }
        else{
            const bullet = new Bullet(0xff00ff, setting.xOfSecondCannon);
            this.bul = bullet.getBullet;
            this.bul.position.set(setting.xOfSecondCannon, 80, -1750);
            this.scene.add(this.bul);
        }
        this.scene.add(this.bul);



        $('#cannonRotation').on('input', ()=>{
            this.can.rotation.y = $('#cannonRotation').val()*Math.PI/180;
            let barrRot = parseInt($('#barrelRotation').val())*Math.PI/180 - Math.PI/2;
            let canRot = parseInt($('#cannonRotation').val())*Math.PI/180 - Math.PI/2;
            
            let bulletPos = this.bul.setPosition(barrRot, canRot);
            net.SETcannonPos(this.can.rotation.y, bulletPos);

        })

        $('#barrelRotation').on('input', (e)=>{
            this.can.barrelRotation = parseInt($('#barrelRotation').val());
            // console.log(e.target.value);
            let barrRot = parseInt($('#barrelRotation').val())*Math.PI/180 - Math.PI/2;
            let canRot = parseInt($('#cannonRotation').val())*Math.PI/180 - Math.PI/2;
            let bulletPos = this.bul.setPosition(barrRot, canRot);
            console.log(barrRot, canRot);
            net.SETbarrelPos(parseInt($('#barrelRotation').val()), bulletPos);
        })
    }

    createSecondUser(thisUserNr){
        if(thisUserNr == 1) {
            const cannon = new Cannon(0xffff00);
            this.secCan = cannon.getCannon;
            this.secCan.position.set(setting.xOfSecondCannon, 0, -1750);
        }
        else {
            const cannon = new Cannon();
            this.secCan = cannon.getCannon;
            this.secCan.position.set(setting.xOfFirstCannon, 0, -1750);
        }

        this.scene.add(this.secCan);

        if(thisUserNr == 1) {
            const bullet = new Bullet(0xff00ff, setting.xOfSecondCannon);
            this.secBul = bullet.getBullet;
            this.secBul.position.set(setting.xOfSecondCannon, 80, -1750);
        }
        else {
            const bullet = new Bullet();
            this.secBul = bullet.getBullet;
            this.secBul.position.set(setting.xOfFirstCannon, 80, -1750);
        }

        this.scene.add(this.secBul);
    }

    setSecCannonPos(data){
        console.log('ustawiam pozycje cannon + '+ data.cannonRotationY)
        this.secCan.rotation.y = data.cannonRotationY;
        // this.secBul.position.set(data.bulletPos);
        this.secBul.setSecBullPos = data.bulletPos;
    }
    setSecBarrelPos(data){
        this.secCan.barrelRotation = data.barrelRotation;
        // this.secBul.position.set(data.bulletPos);
        this.secBul.setSecBullPos = data.bulletPos;
    }
    setSecShotBullet(data){
        // this.secBul.position.set(data.posBullet);
        console.log(data);
        this.secBul.setSecBullPos = data.bulletPos;
    }

}