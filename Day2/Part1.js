import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.ranges = new Array();
    }
    processRecord(record) {
        const ranges = record.split(",");
        for (const rangeStr of ranges) {
            const range = rangeStr.split("-");
            this.ranges.push([Number(range[0]), Number(range[1])]);
        }
        return true;
    }
    calculateAnswer() {
        let sumOfInvalidIDs = 0;
        for (const [first, last] of this.ranges) {
            let div = document.createElement("div");
            div.innerText = `${first}-${last}`;
            this.inputDisplay.appendChild(div);
            let nextNumber = first;
            do {
                const strNumber = String(nextNumber);
                const length = strNumber.length;
                if (length % 2 === 0) {
                    const halfLength = length / 2;
                    const firstHalf = strNumber.slice(0, halfLength);
                    const secondHalf = strNumber.slice(halfLength);
                    if (firstHalf === secondHalf) {
                        sumOfInvalidIDs += nextNumber;
                        const output = `Invalid ID found: ${nextNumber}`;
                        div = document.createElement("div");
                        div.innerText = output;
                        this.outputDisplay.appendChild(div);
                    }
                    nextNumber++;
                }
                else
                    nextNumber = 10 ** length;
            } while (nextNumber <= last);
        }
        return sumOfInvalidIDs;
    }
}
//# sourceMappingURL=Part1.js.map