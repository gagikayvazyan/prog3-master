//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

//! Requiring modules  --  START
var GrassEater = require("./modules/GrassEater.js");
var Grass = require('./modules/Grass')
var Predator = require("./modules/predator.js");
var Men = require("./modules/Men");
let random = require('./modules/random');
var Mah = require('./modules/mah');
//! Requiring modules  --  END

//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
MenArr = [];
mahArr = [];
matrix = [];
grassHashiv = 0;

//! Setting global arrays  -- END

//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, MenArg, MahArg) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < MenArg; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < MahArg; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(50, 2, 5, 7, 9,2);
//! Creating MATRIX -- END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                PredatorArr.push(predator);
            }else if (matrix[y][x] == 4) {
                var men = new Men(x, y);
                MenArr.push(men);
            }else if (matrix[y][x] == 5) {
                var mah = new Mah(x, y);
                mahArr.push(mah);
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (PredatorArr[0] !== undefined) {
        for (var i in PredatorArr) {
            PredatorArr[i].eat();
        }
    }
    if (MenArr[0] !== undefined) {
        for (var i in MenArr) {
            MenArr[i].eat();
        }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)