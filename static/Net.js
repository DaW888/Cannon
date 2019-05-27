class Net {
    constructor () {
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
        })
    }

    SETshotBullet(posBullet){
        this.client.emit('shotBullet', posBullet);
    }
    GETshotBullet(){
        this.client.on('shotBullet', data =>{
            console.log(data);
        })
    }

    //TODO:
    // - tworzenie nowej armaty obok
    // - pobieranie w niej danych z getterów
}