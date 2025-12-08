import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.splitters = new Array();
        this.startingPosition = 0;
    }
    processRecord(record) {
        const start = record.indexOf("S");
        if (start >= 0)
            this.startingPosition = start;
        else {
            const positions = new Array();
            let index = 0;
            while ((index = record.indexOf("^", index)) >= 0) {
                positions.push(index);
                index++;
            }
            if (positions.length > 0)
                this.splitters.push(positions);
        }
        return true;
    }
    calculateAnswer() {
        let tachyons = new Set().add(this.startingPosition);
        let splits = 0;
        for (const row of this.splitters) {
            const newTachyons = new Set();
            for (const tachyon of tachyons)
                if (row.includes(tachyon)) {
                    newTachyons.add(tachyon - 1).add(tachyon + 1);
                    splits++;
                }
                else
                    newTachyons.add(tachyon);
            tachyons = newTachyons;
        }
        return splits;
    }
}
//# sourceMappingURL=Part1.js.map