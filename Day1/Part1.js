import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.position = 50;
        this.pointedAtZero = 0;
        this.turns = new Array();
    }
    processRecord(record) {
        this.turns.push([record, record[0], Number(record.slice(1))]);
        return true;
    }
    calculateAnswer() {
        for (const [record, direction, clicks] of this.turns) {
            let div = document.createElement("div");
            div.innerText = record;
            this.inputDisplay.appendChild(div);
            if (direction === 'L')
                this.position -= clicks;
            else if (direction === 'R')
                this.position += clicks;
            let output = this.position.toString();
            if (this.position % 100 === 0) {
                this.pointedAtZero++;
                output += ` => ${this.pointedAtZero}`;
            }
            output += "\n";
            div = document.createElement("div");
            div.innerText = output;
            this.outputDisplay.appendChild(div);
        }
        return this.pointedAtZero;
    }
}
//# sourceMappingURL=Part1.js.map