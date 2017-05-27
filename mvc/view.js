/**
 * @rsTeam02
 * view for matrix, points => DOM
 */
class View {

    constructor() {
        this.res = 0;
    }

    createDiceMatrix(n, m) {
        let row = document.getElementById("diceTable");
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
        row.innerHTML = table;
    }

    //output to dom
    viewDice(face, i) {
        document.getElementById(`${i}`).innerHTML = face;
    }

    ptsInfo(pts = 0) {
        this.res += pts;
        document.getElementById("pts").innerHTML = `${this.res} pts.`;
    }
}