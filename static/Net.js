class Net {
    constructor () {
        this.userNr = 0;
        console.log('net');
        this.client = io();
        this.connection();
        // this.SETmousemove();
        // this.GETmousemove();
        this.GETcannonPos();
        this.GETbarrelPos();
        this.GETshotBullet();
    }

    get getUserNr(){
        return this.userNr;
    }
    
    connection(){
        this.client.on('onconnect', (data) =>{
            console.log(data.clientName);
            console.log(data.userNr);
            this.userNr = data.userNr;
            // if(data.userNr == 2)
            //     main3d.createSecondUser();
            main3d.cannonSet(data.userNr);
        })

        this.client.on('connectSecond', (data) => {
            console.log(data.second);
            console.log('client NR: '+this.userNr);
            main3d.createSecondUser(this.userNr);
        })
    }
    
    // SETmousemove(){
    //     $(document).on('mousemove', e =>{
    //         this.client.emit('mousePosition', {
    //             x: e.clientX,
    //             y: e.clientY
    //         })
    //     })
    // }

    // GETmousemove(){
    //     this.client.on("mousePosition", data =>{
    //         console.log(data.x + " == " + data.y);
    //     })
    // }

    SETcannonPos(cannonRotationY, bulletPos){
        this.client.emit('cannonPos', {
            cannonRotationY, bulletPos
        })
    }
    GETcannonPos(){
        this.client.on('cannonPos', data =>{
            console.log(data);
            // if(this.userArrayLen == 2)
                main3d.setSecCannonPos(data);
        })
    }

    SETbarrelPos(barrelRotation, bulletPos){
        this.client.emit('barrelPos', {
            barrelRotation, bulletPos
        })
    }
    GETbarrelPos(){
        this.client.on('barrelPos', data =>{
            console.log(data);
            // if(this.userArrayLen == 2)
                main3d.setSecBarrelPos(data);
        })
    }

    SETshotBullet(posBullet){
        this.client.emit('shotBullet', posBullet);
    }
    GETshotBullet(){
        this.client.on('shotBullet', data =>{
            console.log(data);
            // if(this.userArrayLen == 2)
                main3d.setSecShotBullet(data);
        })
    }

    //TODO:
    // - tworzenie nowej armaty obok
    // - pobieranie w niej danych z getterów
}