import { PuzzlePart } from "../aocFW.js";

export default class Part1 extends PuzzlePart
{
    private readingRanges : boolean = true;
    private ranges : Array<[BigInt, BigInt]> = new Array();
    private ingredients : Array<BigInt> = new Array();

    public processRecord(record: string) : boolean
    {
        if (this.readingRanges)
        {
            this.readingRanges = record.length > 0;
            if (this.readingRanges === true)
            {
                const parts = record.split('-');
                const first = BigInt(parts[0]);
                const second = BigInt(parts[1]);
                if (first > second)
                {
                    const div = document.createElement("div");
                    div.innerText = `Unexpected range: ${record}`;
                    this.inputDisplay.appendChild(div);
                }
                this.ranges.push([first, second]);
            }
        }
        else this.ingredients.push(BigInt(record));
        return true;
    }

    public calculateAnswer() : any
    {
        let freshCount = 0;
        // this.ranges.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        for (const ingredient of this.ingredients)
        {
            freshCount += this.ranges.findIndex(range => ingredient >= range[0] && ingredient <= range[1]) < 0 ? 0 : 1;
        }
        return freshCount;
    }
}