/**
 * @rsTeam02
 * roll n - dices => Control Unit
 */
class Controller {

    constructor() {
        this.view = new View();
        $("#cont2").hide();
        this.initSetting();
        this.getKeyInput();
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
        this.diceFace = (document.getElementById("dface").checked)
            ? ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"]
            : [..."123456"];
    }

    //read string from input field
    getKeyInput() {
        let xySlider = document.getElementsByClassName("xy");
        for (var i = 0; i < xySlider.length; i++) {
            xySlider[i].addEventListener("input", () => {
                this.displayDices();
            });
        }
    }

    displayDices() {
        this.view.createDiceMatrix($("#x").val(), $("#y").val());
        this.numOfDice = $("#x").val() * $("#y").val();
        $("#info").html(`Number of Dices: ${this.numOfDice}`);
        this.initDices();
    }

    btnListener() {
        let classRbSet = document.getElementsByClassName("rbSet");
        for (let i = 0; i < classRbSet.length; i++) {
            classRbSet[i].addEventListener("click", () => {
                this.initSetting();
            });
        }
        
        $('.link').click(function () {
            $(".cont").hide();
        })

        $('#game').click(function () {
            $("#cont1").show();

        });
        $('#test').click(function () {
            $("#cont2").show();
            var test = new TestWorker();
            test.testRun();
        });

        $("#roll").click(() => {
            this.roll();
        });
     
    }

    /*every dice has its own worker to calc random roll length, no shuffle of faces required 
    => different roll length, random dice results */
    roll() {
        this.resetPts();
        let worker = [];
        for (let i = 0; i < this.numOfDice; i++) {
            worker[i] = new Worker("worker/webworkerRndLen.js");
        }

        for (let i = 0; i < worker.length; i++) {
            worker[i].onmessage = (event) => {
                let face = event.data.cnt % 6;
                if (event.data.finished) {
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