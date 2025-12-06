import { PuzzlePart } from "../aocFW.js";

export default class Part2 extends PuzzlePart
{
    private numbers : Array<Array<number>> = new Array();
    private operands : Array<string> = new Array();
    public processRecord(record: string) : boolean
    {
        let char = record.charAt(0);
        if (char === '+' || char === '*') this.operands = record.split('');
        else
        {
            const nums: Array<number> = record.split('').map(digit => Number(digit));
            this.displayInput(record + " => " + nums.join(''));
            if (this.numbers.length === 0) for (let i = 0; i < nums.length; i++) this.numbers.push(new Array());
            for (let i = 0; i < nums.length; i++) this.numbers[i].push(nums[i]);
        }
        return true;
    }

    public calculateAnswer() : any
    {
        let total = 0;
        let operand = "";
        let answer = 0;
        for (let index = 0; index < this.numbers.length; index++)
        {
            if (this.operands[index] !== ' ')
            {
                this.displayOutput(`Intermediate answer: ${answer}`);
                total += answer;
                operand = this.operands[index];
                answer = operand === '+' ? 0 : 1;
            }
            let number = this.numbers[index].reduce((a, b) => b > 0 ? a * 10 + b : a, 0);
            this.displayOutput(this.numbers[index].join('') + ` => ${number}`);
            if (operand === '+') answer += number
            else if (operand === '*' && number > 0) answer *= number;
        }
        this.displayOutput(`Intermediate answer: ${answer}`);
        return total + answer;
    }
}