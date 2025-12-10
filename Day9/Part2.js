import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.redTiles = new Array();
        this.rows = new Map();
        this.columns = new Map();
    }
    processRecord(record) {
        const parts = record.split(",").map((val) => Number(val));
        const redTile = { x: parts[0], y: parts[1] };
        this.redTiles.push(redTile);
        return true;
    }
    calculateAnswer() {
        this.displayInput(`Total red tiles: ${this.redTiles.length}`);
        for (let index = 0; index < this.redTiles.length - 1; index++)
            this.recordPerimeter(this.redTiles[index], this.redTiles[index + 1]);
        this.recordPerimeter(this.redTiles[this.redTiles.length - 1], this.redTiles[0]);
        for (const row of this.rows.values())
            row.sort((a, b) => a[0] - b[0]);
        for (const column of this.columns.values())
            column.sort((a, b) => a[0] - b[0]);
        let maxArea = 0;
        for (let i = 1; i < this.redTiles.length; i++)
            for (let j = 0; j < i; j++) {
                const area = (Math.abs(this.redTiles[i].x - this.redTiles[j].x) + 1) * (Math.abs(this.redTiles[i].y - this.redTiles[j].y) + 1);
                if (area > maxArea && this.isSolidArea(this.redTiles[i], this.redTiles[j])) {
                    const output = `(${this.redTiles[i].x},${this.redTiles[i].y}) and (${this.redTiles[j].x},${this.redTiles[j].y})`;
                    this.displayOutput(`Area ${area} found : ${output}`);
                    maxArea = area;
                }
            }
        return maxArea;
    }
    recordPerimeter(tile1, tile2) {
        if (tile1.x === tile2.x) {
            const minY = Math.min(tile1.y, tile2.y);
            const maxY = Math.max(tile1.y, tile2.y);
            const column = this.columns.get(tile1.x) ?? new Array();
            column.push([minY, maxY]);
            this.columns.set(tile1.x, column);
        }
        else if (tile1.y === tile2.y) {
            const minX = Math.min(tile1.x, tile2.x);
            const maxX = Math.max(tile1.x, tile2.x);
            const row = this.rows.get(tile1.y) ?? new Array();
            row.push([minX, maxX]);
            this.rows.set(tile1.y, row);
        }
    }
    isSolidArea(corner1, corner2) {
        const minX = Math.min(corner1.x, corner2.x);
        const maxX = Math.max(corner1.x, corner2.x);
        const minY = Math.min(corner1.y, corner2.y);
        const maxY = Math.max(corner1.y, corner2.y);
        for (let coord = minX + 1; coord < maxX; coord++) {
            const segments = this.columns.get(coord);
            if (segments) {
                let noOverlap = segments.every((range) => range[0] >= maxY || range[1] <= minY);
                if (noOverlap === false)
                    return false;
            }
        }
        for (let coord = minY + 1; coord < maxY; coord++) {
            const segments = this.rows.get(coord);
            if (segments) {
                let noOverlap = segments.every((range) => range[0] >= maxX || range[1] <= minX);
                if (noOverlap === false)
                    return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=Part2.js.map