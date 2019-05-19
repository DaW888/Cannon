var express = require('express');
var app = express();
const PORT = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');
app.use(express.static('static'));
// tutaj wykonuje sie juz
// app.get("/", function(req,res){
//     res.sendFile(path.join(__dirname + "/index.html"))
// })

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/libs', express.static(path.join(__dirname, 'libs'))); // wazne kiedy mamy jakieś pliki poza folderem static

app.listen(PORT, function() {
    console.log('start servera na porcie ' + PORT);
});

// app.get('/hex', function(req, res) {
//     res.sendFile(path.join(__dirname + '/static/hex.html'));
// });

// app.post('/handlePost', (req, res) => {
//     console.log(req.body);
//     settingOfGame = req.body;
// });