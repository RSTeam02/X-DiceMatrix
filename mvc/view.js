/**
 * @rsTeam02
 * view for matrix, points => DOM
 */
class View {

    constructor() {
        this.res = 0;
    }

    createDiceMatrix(n, m) {
        let table = "";
        let diceNo = 0;
        for (let i = 0; i < m; i++) {
            table += "<tr>";
            for (let j = 0; j < n; j++) {
                table += `<td id=${diceNo}></td>`;
                diceNo++;
            }
            table += "</tr>";
        }
        $("#diceTable").html(table);
    }

    //output to dom
    viewDice(face, i) {
        $(`#${i}`).html(face);
    }

    ptsInfo(pts = 0) {
        this.res += pts;
        $("#pts").html(`${this.res} pts.`);
    }
}