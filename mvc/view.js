/**
 * @rsTeam02
 * view for matrix, points => DOM
 */
export class View {

    constructor() {
        this.res = 0;
    }

    createDiceMatrix(n, m, stop=false) {
        let table = "";
        let btn = "";
        let diceNo = 0;
        let stopBtn="";
        for (let i = 0; i < m; i++) {
            table += "<tr>";
            for (let j = 0; j < n; j++) {
                stopBtn = (stop) ?`<td><input type="button" value="stop" id="stop${diceNo}" class="stopSet"></td>`:"";
                table += `<td id=${diceNo}></td>${stopBtn}`;
                diceNo++;
            }
            table += "</tr>";
        }
        $("#diceTable").html(table);
    }

    //output to dom
    viewDice(face, i) {
        $(`#${i}`).html(`${face}`);
    }

    ptsInfo(pts = 0) {
        this.res+= pts;
        $("#pts").html(`${this.res} pts.`);
    }
}
