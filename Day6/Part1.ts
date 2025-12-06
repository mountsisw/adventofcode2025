import { PuzzlePart } from "../aocFW.js";

export default class Part1 extends PuzzlePart
{
    private problems : Array<[Array<number>, string]> = new Array();
    public processRecord(record: string) : boolean
    {
        const parts = record.split(" ").filter(part => part.length > 0);
        this.displayInput(`${record} => ${parts.length} parts`);
        if (this.problems.length == 0) for (const part of parts)
        {
            const num = parseInt(part);
            this.problems.push([[num], ""]);
        }
        else if (Number.isNaN(parseInt(parts[0])))
        {
            for (let i = 0; i < parts.length; i++) this.problems[i][1] = parts[i];
        }
        else for (let i = 0; i < parts.length; i++)
        {
            const num = parseInt(parts[i]);
            this.problems[i][0].push(num);
        }
        return true;
    }

    public calculateAnswer() : any
    {
        let total = 0;
        for (const problem of this.problems)
        {
            const answer = problem[1] === "+" ? problem[0].reduce((a, b) => a + b, 0) : problem[0].reduce((a, b) => a * b, 1);
            total += answer;
        }
        return total;
    }
}