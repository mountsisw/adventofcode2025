import { PuzzlePart } from "../aocFW.js";

export default class Part1 extends PuzzlePart
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
            if (direction === 'L') this.position -= clicks;
            else if (direction === 'R') this.position += clicks;
            let output = this.position.toString();    
            if (this.position % 100 === 0)
            {
                this.pointedAtZero++;
                output += ` => ${this.pointedAtZero}`;
            }
            output += "\n";
            div = document.createElement("div");
            div.innerText = output;
            this.outputDisplay.appendChild(div);
        }
        return this.pointedAtZero;
    }
}