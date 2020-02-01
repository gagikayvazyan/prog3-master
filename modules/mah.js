var LiveForm = require("./LiveForm");
var random = require("./random.js");

// մահի կլաս
module.exports = class mah extends LiveForm {
    constructor(x, y) {
        super(x,y)
        this.multiply = 0;
        this.energy = 20;
        this.directions =[];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell() {
        this.getNewDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    go() {
        this.multyplay++;
        this.getNewDirections();
        if (this.multyplay % 2 == 0) {
            var emptyCells = this.chooseCell();
            var coord = random(emptyCells);
            if (coord) {
                matrix[coord[1]][coord[0]] = 5;
                matrix[this.y][this.x] = 0;
                this.x = coord[0];
                this.y = coord[1];
                this.getNewDirections();
                var cells = this.chooseCell();
                for (var i in cells) {
                    var x = cells[i][0];
                    var y = cells[i][1];
                    matrix[y][x] = 0;
                    for (var i in eatersArr) {
                        if (x == eatersArr[i].x && y == eatersArr[i].y) {
                            eatersArr.splice(i, 1);
                            break;
                        }
                    }
                    for (var i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                    for (var i in predatorArr) {
                        if (x == predatorArr[i].x && y == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            break;
                        }
                    }
                    for (var i in menArr) {
                        if (x == menArr[i].x && y == menArr[i].y) {
                            menArr.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
    }
 }


