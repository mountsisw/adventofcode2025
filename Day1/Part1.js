import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.position = 50;
        this.pointedAtZero = 0;
    }
    processRecord(record) {
        let div = document.createElement("div");
        div.innerText = record;
        this.inputDisplay.appendChild(div);
        if (record[0] === 'L')
            this.position -= Number(record.slice(1));
        else if (record[0] === 'R')
            this.position += Number(record.slice(1));
        let output = this.position.toString();
        if (this.position % 100 === 0) {
            this.pointedAtZero++;
            output += ` => ${this.pointedAtZero}`;
        }
        output += "\n";
        div = document.createElement("div");
        div.innerText = output;
        this.outputDisplay.appendChild(div);
        return true;
    }
    calculateAnswer() {
        return this.pointedAtZero;
    }
}
//# sourceMappingURL=Part1.js.map