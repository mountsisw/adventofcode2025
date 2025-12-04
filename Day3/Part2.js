import { PuzzlePart } from "../aocFW.js";
export default class Part2 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.batteries = new Array();
    }
    processRecord(record) {
        this.batteries.push([...record].map((ch) => Number(ch)));
        return true;
    }
    calculateAnswer() {
        let totalJoltage = 0;
        const batteriesToTurnOn = 12;
        for (const bank of this.batteries) {
            let div = document.createElement("div");
            div.innerText = `${bank.join("")}`;
            this.inputDisplay.appendChild(div);
            let firstIndex = 0;
            let bankJoltage = 0;
            for (let batteriesRemaining = batteriesToTurnOn; batteriesRemaining > 0; batteriesRemaining--) {
                let endIndex = bank.length - Math.max(batteriesRemaining - 1, batteriesToTurnOn - (firstIndex + 1));
                let subBank = bank.slice(firstIndex, endIndex);
                let nextDigit = Math.max(...subBank);
                bankJoltage = bankJoltage * 10 + nextDigit;
                firstIndex = bank.indexOf(nextDigit, firstIndex) + 1;
            }
            div = document.createElement("div");
            div.innerText = `Bank joltage: ${bankJoltage}`;
            this.outputDisplay.appendChild(div);
            totalJoltage += bankJoltage;
        }
        return totalJoltage;
    }
}
//# sourceMappingURL=Part2.js.map