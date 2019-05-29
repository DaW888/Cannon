class Net {
    constructor () {
        this.userArrayLen = 0;
        console.log('net');
        this.client = io();
        this.connection();
        // this.SETmousemove();
        // this.GETmousemove();
        this.GETcannonPos();
        this.GETbarrelPos();
        this.GETshotBullet();
    }
    
    connection(){
        this.client.on('onconnect', function(data){
            console.log(data.clientName);
            console.log(data.userArray);
            this.userArrayLen = data.userArray;
            if(data.userArrayLen == 2)
                main3d.createSecondUser();
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
            if(this.userArrayLen == 2)
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
            if(this.userArrayLen == 2)
                main3d.setSecBarrelPos(data);
        })
    }

    SETshotBullet(posBullet){
        this.client.emit('shotBullet', posBullet);
    }
    GETshotBullet(){
        this.client.on('shotBullet', data =>{
            console.log(data);
            if(this.userArrayLen == 2)
                main3d.setSecShotBullet(data);
        })
    }

    //TODO:
    // - tworzenie nowej armaty obok
    // - pobieranie w niej danych z getterów
}