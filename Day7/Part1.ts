import { PuzzlePart } from "../aocFW.js";

export default class Part1 extends PuzzlePart
{
    private splitters : Array<Array<number>> = new Array();
    private startingPosition : number = 0;

    public processRecord(record: string) : boolean
    {
        const start = record.indexOf("S");
        if (start >= 0) this.startingPosition = start;
        else
        {
            const positions: Array<number> = new Array();
            let index = 0;
            while ((index = record.indexOf("^", index)) >= 0)
            {
                positions.push(index);
                index++;
            }
            if (positions.length > 0) this.splitters.push(positions);
        }
        return true;
    }

    public calculateAnswer() : any
    {
        let tachyons: Set<number> = new Set<number>().add(this.startingPosition);
        let splits = 0;
        for (const row of this.splitters)
        {
            const newTachyons: Set<number> = new Set<number>();
            for (const tachyon of tachyons)
                if (row.includes(tachyon))
                {
                    newTachyons.add(tachyon - 1).add(tachyon + 1);
                    splits++;
                }
                else newTachyons.add(tachyon);
            tachyons = newTachyons;
        }
        return splits;
    }
}