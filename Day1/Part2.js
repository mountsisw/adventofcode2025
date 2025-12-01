import { PuzzlePart } from "../aocFW.js";
export default class Part2 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.position = 50;
        this.pointedAtZero = 0;
    }
    processRecord(record) {
        let div = document.createElement("div");
        div.innerText = record;
        this.inputDisplay.appendChild(div);
        const clicks = Number(record.slice(1));
        const fullRotations = Math.floor(clicks / 100);
        this.pointedAtZero += fullRotations;
        const remainderClicks = clicks % 100;
        this.position += record[0] === 'L' ? -remainderClicks : remainderClicks;
        if (this.position < 0) {
            this.position = 100 + this.position;
            if (this.position + remainderClicks > 100)
                this.pointedAtZero++;
        }
        else if (this.position === 0) {
            this.pointedAtZero++;
        }
        else if (this.position >= 100) {
            this.position -= 100;
            this.pointedAtZero++;
        }
        const output = `${this.position} => ${this.pointedAtZero}`;
        div = document.createElement("div");
        div.innerText = output;
        this.outputDisplay.appendChild(div);
        return true;
    }
    calculateAnswer() {
        return this.pointedAtZero;
    }
}
//# sourceMappingURL=Part2.js.map