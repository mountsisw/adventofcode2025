import { PuzzlePart } from "../aocFW.js";

type Machine = { target: number, operands: Array<number> };

export default class Part1 extends PuzzlePart
{
    private machines: Array<Machine> = new Array<Machine>();

    public processRecord(record: string) : boolean
    {
        const parts = record.split(" ");
        const targetState = parts[0].slice(1, parts[0].length - 1);
        let target = targetState.split("").reduce((acc, bit, index) => acc + (bit === "#" ? Math.pow(2, index) : 0), 0);

        const operands = parts.slice(1, parts.length - 1).map(x => this.parseOperands(x));
        this.machines.push( { target: target, operands: operands } );
        this.displayInput(`Target: ${target}, Operands: ${operands.join(", ")}`);
        return true;
    }

    private parseOperands(operandStr: string) : number
    {
        const operands = operandStr.split(/[(),]+/).filter(x => x.length > 0);
        return operands.reduce((acc, bit) => acc + Math.pow(2, Number(bit)), 0);
    }

    public async calculateAnswer() : Promise<any>
    {
        let totalPushes = 0;
        let machineCount = 0;
        for (const machine of this.machines)
        {
            const pushCounter = new Array<number>();
            pushCounter.push(0);
            let value;
            do
            {
                value = pushCounter.reduce((acc, index) => acc ^= machine.operands[index], 0);
                if (value != machine.target)
                {
                    let index = pushCounter.length - 1;
                    if (pushCounter[index] == machine.operands.length - 1)
                    {
                        pushCounter[index] = 0;
                        let rolledOver = true;
                        while (--index >= 0 && rolledOver)
                        {
                            if (pushCounter[index] == machine.operands.length - 1) pushCounter[index] = 0;
                            else
                            {
                                pushCounter[index] = pushCounter[index] + 1;
                                rolledOver = false;
                            }
                        }
                        if (rolledOver) pushCounter.push(0);
                    }
                    else pushCounter[index] = pushCounter[index] + 1;
                }
            } while (value != machine.target);
            this.displayOutput(`${++machineCount} of ${this.machines.length} (${Math.round(machineCount * 100 / this.machines.length)}%): ${pushCounter.length} pushes => ${pushCounter.reduce((acc, index) => acc + machine.operands[index] + ", ", "")}`);
            await new Promise(requestAnimationFrame);
            totalPushes += pushCounter.length;
        }
        return totalPushes;
    }

}
