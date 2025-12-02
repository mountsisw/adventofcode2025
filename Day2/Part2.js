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
                const maxLengthRepeatedPattern = Math.floor(length / 2);
                let isValid = true;
                for (let numDigits = 1; (numDigits <= maxLengthRepeatedPattern) && (isValid == true); numDigits++) {
                    if (length % numDigits == 0) {
                        const pattern = strNumber.slice(0, numDigits);
                        let isInvalid = true;
                        for (let index = numDigits; (index < length) && (isInvalid == true); index += numDigits)
                            isInvalid = (strNumber.slice(index, index + numDigits) === pattern);
                        if (isInvalid == true) {
                            let outDiv = document.createElement("div");
                            outDiv.innerText = `  Invalid ID found: ${strNumber}`;
                            this.outputDisplay.appendChild(outDiv);
                            sumOfInvalidIDs += nextNumber;
                            isValid = false;
                        }
                    }
                }
                nextNumber++;
            } while (nextNumber <= last);
        }
        return sumOfInvalidIDs;
    }
}
//# sourceMappingURL=Part2.js.map