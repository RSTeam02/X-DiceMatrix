/**
 * @rsTeam02
 * roll n - dices => Control Unit
 */
class Controller {

    constructor() {
        this.view = new View();
        $("#result").html("Random Result of 0 Dices: 0");
        $("#testRes").html("Expected Test Result: 0");
        this.showHideHl();
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
        //hover effect, nav highlight, content switching
        $('.link').hover((event) => {
            $(event.currentTarget).html(`<b>${$(event.currentTarget).text()}</b>`);
        }, (event) => {
            $(event.currentTarget).html($(event.currentTarget).text());
        }).click((event) => {
            this.showHideHl(event);
            $(event.currentTarget)
                .css("font-weight", "bold")
                .html($(event.currentTarget).text());
        });

        $("#rollBtn").click(() => {
            this.roll();
        });

        $("#testBtn").click(() => {
            new TestWorker().testRun();
        });
    }

    showHideHl(event = undefined) {
        let classCont = document.getElementsByClassName("cont");
        let classLink = document.getElementsByClassName("link");
        let currId = (event === undefined) ? "game" : event.currentTarget.id;

        for (let i = 0; i < classLink.length; i++) {
            if (currId === classLink[i].id) {
                $(classCont[i]).show();
            } else {
                $(classLink[i])
                    .css("font-weight", "normal")
                    .html($(classLink[i]).text());
                $(classCont[i]).hide();
            }
        }
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