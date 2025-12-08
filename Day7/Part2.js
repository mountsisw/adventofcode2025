import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.rows = new Array();
        this.startingPosition = 0;
    }
    processRecord(record) {
        const start = record.indexOf("S");
        if (start >= 0)
            this.startingPosition = start;
        else {
            const positions = new Set();
            let index = 0;
            while ((index = record.indexOf("^", index)) >= 0) {
                positions.add(index);
                index++;
            }
            this.rows.push({ splitters: positions, timelines: new Map() });
        }
        return true;
    }
    calculateAnswer() {
        return this.calculatePaths(this.startingPosition, 0);
    }
    calculatePaths(position, rowIndex) {
        if (rowIndex >= this.rows.length)
            return 1;
        const row = this.rows[rowIndex];
        if (row.timelines.has(position))
            return row.timelines.get(position);
        const totalPaths = row.splitters.has(position) ?
            this.calculatePaths(position - 1, rowIndex + 1) + this.calculatePaths(position + 1, rowIndex + 1) :
            this.calculatePaths(position, rowIndex + 1);
        row.timelines.set(position, totalPaths);
        return totalPaths;
    }
}
//# sourceMappingURL=Part2.js.map