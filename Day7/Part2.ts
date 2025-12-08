import { PuzzlePart } from "../aocFW.js";

export default class Part1 extends PuzzlePart
{
    private rows : Array<{ splitters : Set<number> , timelines : Map<number, number> }> = new Array();
    private startingPosition : number = 0;

    public processRecord(record: string) : boolean
    {
        const start = record.indexOf("S");
        if (start >= 0) this.startingPosition = start;
        else
        {
            const positions: Set<number> = new Set();
            let index = 0;
            while ((index = record.indexOf("^", index)) >= 0)
            {
                positions.add(index);
                index++;
            }
            this.rows.push({ splitters: positions, timelines: new Map() });
        }
        return true;
    }

    public calculateAnswer() : any
    {
        return this.calculatePaths(this.startingPosition, 0);
    }
    
    private calculatePaths(position: number, rowIndex: number) : number
    {
        if (rowIndex >= this.rows.length) return 1;
        const row = this.rows[rowIndex];
        if (row.timelines.has(position)) return row.timelines.get(position)!;
        const totalPaths = row.splitters.has(position) ?
            this.calculatePaths(position - 1, rowIndex + 1) + this.calculatePaths(position + 1, rowIndex + 1) :
            this.calculatePaths(position, rowIndex + 1);
        row.timelines.set(position, totalPaths);
        return totalPaths;
    }
}