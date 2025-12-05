import { PuzzlePart } from "../aocFW.js";
export default class Part2 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.ranges = new Array();
    }
    processRecord(record) {
        if (record.length > 0) {
            const parts = record.split('-');
            const first = parseInt(parts[0]);
            const second = parseInt(parts[1]);
            this.ranges.push([first, second]);
            return true;
        }
        return false;
    }
    calculateAnswer() {
        this.ranges.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        const finalRanges = new Array();
        let finalIndex = 0;
        for (const range of this.ranges) {
            this.displayInput(`${range[0]} - ${range[1]}`);
            if (finalRanges.length === 0) {
                finalRanges.push(range);
                this.displayOutput(`Adding new range: ${range[0]} - ${range[1]}`);
            }
            else if (range[0] > finalRanges[finalIndex][1]) {
                finalRanges.push(range);
                finalIndex++;
                this.displayOutput(`Adding new range: ${range[0]} - ${range[1]}`);
            }
            else {
                const overlappedRange = finalRanges[finalIndex];
                const message = `Merging range: ${overlappedRange[0]} - ${overlappedRange[1]} with ${range[0]} - ${range[1]}`;
                overlappedRange[1] = Math.max(overlappedRange[1], range[1]);
                this.displayOutput(message + ` => ${overlappedRange[0]} - ${overlappedRange[1]}`);
            }
        }
        return finalRanges.reduce((acc, r) => acc + (r[1] - r[0] + 1), 0);
    }
}
//# sourceMappingURL=Part2.js.map