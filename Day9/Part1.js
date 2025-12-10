import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.redTiles = new Array();
    }
    processRecord(record) {
        const parts = record.split(",").map((val) => Number(val));
        const redTile = { x: parts[0], y: parts[1] };
        this.redTiles.push(redTile);
        return true;
    }
    calculateAnswer() {
        this.displayInput(`Total red tiles: ${this.redTiles.length}`);
        let maxArea = 0;
        for (let i = 1; i < this.redTiles.length; i++) {
            const firstTile = this.redTiles[i];
            for (let j = 0; j < i; j++) {
                const tile = this.redTiles[j];
                const area = (Math.abs(firstTile.x - tile.x) + 1) * (Math.abs(firstTile.y - tile.y) + 1);
                if (area > maxArea)
                    maxArea = area;
            }
        }
        return maxArea;
    }
}
//# sourceMappingURL=Part1.js.map