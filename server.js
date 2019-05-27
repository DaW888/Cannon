const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static('static'));

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/libs', express.static(path.join(__dirname, 'libs'))); // wazne kiedy mamy jakieś pliki poza folderem static

http.listen(PORT, function() {
    console.log('start servera na porcie ' + PORT);
});

app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html');
})


//SOCKET.IO
const userArray = [];

io.on('connection', function(client){
    console.log(client.id);
    userArray.push(client.id);

    client.emit("onconnect", {
        clientName: client.id
    })
    client.on('disconnect', () => {
        console.log('rozlazony');
    })
    // client.on('mousePosition',(data) => {
    //     console.log(data.x, data.y);
    //     io.sockets.emit("mousePosition", {x: data.x, y:data.y});
    // })

    client.on('cannonPos', (data) => {
        // console.log(data);
        io.sockets.emit('cannonPos', data);
    })

    client.on('barrelPos', (data) => {
        io.sockets.emit('barrelPos', data);
    })

    client.on('shotBullet', (data) => {
        io.sockets.emit('shotBullet', data);
    })
})

// app.get('/hex', function(req, res) {
//     res.sendFile(path.join(__dirname + '/static/hex.html'));
// });

// app.post('/handlePost', (req, res) => {
//     console.log(req.body);
//     settingOfGame = req.body;
// });