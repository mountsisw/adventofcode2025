import { PuzzlePart } from "../aocFW.js";

export default class Part1 extends PuzzlePart
{
    private position : number = 50;
    private pointedAtZero : number = 0;

    public processRecord(record: string) : boolean
    {
        let div = document.createElement("div");
        div.innerText = record;
        this.inputDisplay.appendChild(div);
        if (record[0] === 'L') this.position -= Number(record.slice(1));
        else if (record[0] === 'R') this.position += Number(record.slice(1));
        this.position = this.position % 100;
        if (this.position < 0) this.position += 100;
        let output = this.position.toString();
        if (this.position === 0) this.pointedAtZero++;
        if (this.position === 0) output += ` => ${this.pointedAtZero}`;
        output += "\n";
        div = document.createElement("div");
        div.innerText = output;
        this.outputDisplay.appendChild(div);
        return true;
    }

    public calculateAnswer() : any
    {
        return this.pointedAtZero;
    }
}