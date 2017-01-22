/**
 * @rsTeam02
 * roll n - dices => Control Unit
 */
class Controller {

    constructor() {
        this.view = new View();
        this.btnListener();
        this.numOfDice = 0;
        this.diceSet = [];
    }

    initDices() {
        this.resetPts();
        //n dice instances dependent on matrixSize
        for (let i = 0; i < this.numOfDice; i++) {
            this.diceSet[i] = new Dice();
            this.view.viewDice(this.diceSet[i].faces[Math.floor(Math.random() * 6)], i);
        }
    }

    //read string from input field
    getKeyInput() {
        let inputs = document.autoForm.numberM.value.split("x");
        return inputs;
    }

    btnListener() {
        document.getElementById("roll").addEventListener("click", () => {
            this.roll();
        });

        document.getElementById("generateBtn").addEventListener("click", () => {
            try {
                let info = document.getElementById("info");
                let mn = this.getKeyInput();
                if (mn.length !== 2 || isNaN(mn[0]) || mn[0] === "" || isNaN(mn[1]) || mn[1] === "") {
                    throw "input is not valid";
                } else {
                    this.view.createDiceMatrix(mn[0], mn[1]);
                    this.numOfDice = mn[0] * mn[1];
                    info.innerHTML = `Number of Dices: ${this.numOfDice}`;
                    this.initDices();
                }
            } catch (error) {
                info.innerHTML = error;
            }

        });
    }

    /*every dice has its own worker to calc random roll length, no shuffle of faces required 
    => different roll length, random dice results */
    roll() {
        this.resetPts();
        this.worker = [];
        for (let i = 0; i < this.numOfDice; i++) {
            this.worker[i] = new Worker("worker/webworkerRndLen.js");
        }

        for (let i = 0; i < this.worker.length; i++) {
            this.worker[i].onmessage = (event) => {
                let face = event.data[0] % 6;
                if (event.data[1]) {
                    this.view.ptsInfo(face + 1);
                }
                this.view.viewDice(this.diceSet[i].faces[face], i);
            }
        }
    }
    resetPts() {
        this.view.res = 0;
        this.view.ptsInfo(this.view.res);
    }
}