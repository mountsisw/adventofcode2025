import { PuzzlePart } from "../aocFW.js";

export default class Part2 extends PuzzlePart
{
    private position : number = 50;
    private pointedAtZero : number = 0;
    private turns : Array<[string, string, number]> = new Array();

    public processRecord(record: string) : boolean
    {
        this.turns.push([record, record[0], Number(record.slice(1))]);
        return true;
    }

    public calculateAnswer() : any
    {
        for (const [record, direction, clicks] of this.turns)
        {
            let div = document.createElement("div");
            div.innerText = record;
            this.inputDisplay.appendChild(div);
            const fullRotations = Math.floor(clicks / 100);
            this.pointedAtZero += fullRotations;
            const remainderClicks = clicks % 100;
            this.position += record[0] === 'L' ? -remainderClicks : remainderClicks;
            if (this.position < 0)
            {
                this.position = 100 + this.position;
                if (this.position + remainderClicks > 100) this.pointedAtZero++;
            }
            else if (this.position === 0)
            {
                this.pointedAtZero++;
            }
            else if (this.position >= 100)
            {
                this.position -= 100;
                this.pointedAtZero++;
            }
            const output = `${this.position} => ${this.pointedAtZero}`;
            div = document.createElement("div");
            div.innerText = output;
            this.outputDisplay.appendChild(div);
        }
        return this.pointedAtZero;
    }
}