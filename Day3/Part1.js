import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.batteries = new Array();
    }
    processRecord(record) {
        const first = Number(record[0]);
        const middle = new Array();
        for (let index = 1; index < record.length - 1; index++)
            middle.push(Number(record[index]));
        const last = Number(record[record.length - 1]);
        this.batteries.push([first, middle, last]);
        return true;
    }
    calculateAnswer() {
        let totalJoltage = 0;
        for (const [first, middle, last] of this.batteries) {
            let div = document.createElement("div");
            div.innerText = `${first}${middle.join("")}${last}`;
            this.inputDisplay.appendChild(div);
            const maxMiddle = Math.max(...middle);
            const firstDigit = Math.max(first, maxMiddle);
            let secondDigit = 0;
            if (firstDigit === first)
                secondDigit = Math.max(maxMiddle, last);
            else {
                let firstIndex = middle.indexOf(firstDigit);
                secondDigit = Math.max(...middle.slice(firstIndex + 1), last);
            }
            const bankJoltage = firstDigit * 10 + secondDigit;
            div = document.createElement("div");
            div.innerText = `Bank joltage: ${bankJoltage}`;
            this.outputDisplay.appendChild(div);
            totalJoltage += bankJoltage;
        }
        return totalJoltage;
    }
}
//# sourceMappingURL=Part1.js.map