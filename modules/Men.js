var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Men extends LiveForm {
    constructor(x, y) {
        super(x, y)
        this.multiply = 0;
        this.energy = 20;
        this.directions = [];
    }

    //թարմացնել շրջապատի կոորդինատները
    updateCoordinates() {
        this.directions = [
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        this.updateCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells); // 4,3

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];
            //շարժվում է
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        } else {
            var emptyCells = this.chooseCell(1);
            var cօord = random(emptyCells);
            if (cօord) {
                var x = cօord[0];
                var y = cօord[1];
                //շարժվում է
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 1;
                //ջնջում է ինքն իրեն խոտակերների զանգվածից
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
                var grassMen = new Grass(this.x, this.y);
                grassArr.push(grassMen);
            }
        }

    }
    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var predatorCells = this.chooseCell(3);
        var aaaaa = this.chooseCell(2);
        var final = predatorCells.concat(aaaaa);
        var coord = random(final);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            // սննդի զանգվածից ջնջում է կերված սնունդը
            for (var i in PredatorArr) {
                if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                }
            }
            // for (var i in eatersArr) {
            //     if (x == eatersArr[i].x && y == eatersArr[i].y) {
            //         eatersArr.splice(i, 1);
            //     }
            // }
            //եթե պատրաստ է բազմացմանը, բազմանում է

            // սննդի զանգվածից ջնջում է կերված սնունդը

        }
        if (this.multiply == 10) {
            this.mul()
            this.multiply = 0;
        } else {
            //եթե չկա հարմար սնունդ
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        //եթե կա բազմանում է
        if (coord) {
            var x = coord[0];
            var y = coord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր)
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var newMen = new Men(x, y);
            MenArr.push(newMen);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 4;
        }
    }
    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in MenArr) {
            if (this.x == MenArr[i].x && this.y == MenArr[i].y) {
                MenArr.splice(i, 1);
            }
        }
    }
}