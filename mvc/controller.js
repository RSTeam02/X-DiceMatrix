/**
 * @rsTeam02
 * roll n - dices => Control Unit
 */
class Controller {

    constructor() {
        this.view = new View();
        this.classRbSet = document.getElementsByClassName("rbSet");
        this.initSetting();
        this.btnListener();
        this.numOfDice = 0;
    }

    initDices() {
        this.resetPts();
        //n dice instances dependent on matrixSize
        for (let i = 0; i < this.numOfDice; i++) {
            this.view.viewDice(this.diceFace[Math.floor(Math.random() * 6)], i);
        }
    }

    initSetting() {
        (document.getElementById("dface").checked)
            ? this.diceFace = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"]
            : this.diceFace = "123456".split("");
    }

    //read string from input field
    getKeyInput() {
        let inputs = document.autoForm.numberM.value.split("x");
        return inputs;
    }

    btnListener() {
        for (let i = 0; i < this.classRbSet.length; i++) {
            this.classRbSet[i].addEventListener("click", () => {
                this.initSetting();
            });
        }

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
                this.view.viewDice(this.diceFace[face], i);
            }
        }
    }

    resetPts() {
        this.view.res = 0;
        this.view.ptsInfo();
    }
}