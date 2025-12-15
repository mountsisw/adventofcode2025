import { PuzzlePart } from "../aocFW.js";

type Machine = { targets: Array<number>, increments: Array<Array<number>> };

export default class Part2 extends PuzzlePart
{
    private machines: Array<Machine> = new Array<Machine>();

    public processRecord(record: string) : boolean
    {
        const parts = record.split(" ");
        const targets = this.parseNumbers(parts[parts.length - 1]);
        const indicies = parts.slice(1, parts.length - 1).map(x => this.parseNumbers(x));
        // this.displayInput(`Targets: ${JSON.stringify(targets)}, indicies: ${JSON.stringify(indicies)}`);
        const increments = indicies.map(counters => targets.map((_, index) => counters.includes(index) ? 1 : 0));
        this.machines.push( { targets: targets, increments: increments } );
        return true;
    }

    private parseNumbers(indiciesStr: string) : Array<number>
    {
        const parts = indiciesStr.split(/(\d+)/);
        const values = parts.filter(x => x.length > 0 && Number.isNaN(Number(x)) === false)
        return values.map(x => Number(x));
    }

    static Comparisons  = { TOO_LOW : 0, JUST_RIGHT : 1, TOO_HIGH : 2 }

    public async calculateAnswer() : Promise<any>
    {
        let totalPushes = 0;
        let machineCount = 0;
        for (const machine of this.machines)
        {
            if (machine.increments.length > 5) continue;
            const pushCounter = new Array<number>(machine.increments.length);
            pushCounter.fill(0);
            const maxPushesPerButton = machine.increments.map(increments =>
                increments.reduce((min, increment, index) => increment === 0 ? min : Math.min(min, machine.targets[index]), Math.max(...machine.targets)));
            let minPushes = Number.MAX_SAFE_INTEGER;
            let result = Part2.Comparisons.TOO_LOW;
            const largestTarget = Math.max(...machine.targets);
            const totalCombos = maxPushesPerButton.reduce((acc, count) => acc * (count + 1), 1);
            this.displayOutput(`Min pushes: ${largestTarget}, max pushes: ${maxPushesPerButton.reduce((acc, count) => acc + count)}, combos: ${totalCombos}`);
            let validCombos = 0;
            while (this.nextCombination(pushCounter, maxPushesPerButton, largestTarget))
            {
                if (pushCounter.reduce((acc, count) => acc + count) >= largestTarget) validCombos++;
                /* const pushes = pushCounter.reduce((acc, count) => acc + count);
                if (pushes < minPushes)
                {
                    const counters : Array<number> = new Array(machine.targets.length);
                    counters.fill(0);
                    pushCounter.forEach((pushCount, buttonIndex) =>
                    {
                        const increments = machine.increments[buttonIndex];
                        increments.forEach((increment, counterIndex) => counters[counterIndex] += pushCount * increment);
                    });
                    result = this.evaluateCounters(counters, machine.targets);
                    if (result === Part2.Comparisons.JUST_RIGHT) minPushes = pushes;
                } */
            }

            // this.displayOutput(`${++machineCount} of ${this.machines.length} (${Math.round(machineCount * 100 / this.machines.length)}%): ${minPushes} pushes`);
            this.displayOutput(`Valid combos: ${validCombos} (${Math.round(validCombos * 100 / totalCombos)}%)`);
            await new Promise(requestAnimationFrame);
            totalPushes += minPushes;
        }
        return totalPushes;
    }

    private nextCombination(pushCounts : Array<number>, maxPushes : Array<number>, minPushes : number) : boolean
    {
        let index = 0;
        do
        {
            if (pushCounts[index] + 1 <= maxPushes[index])
            {
                pushCounts[index]++;
                return true;
            }
            pushCounts[index] = 0;
        } while (++index < pushCounts.length);
        return false;
    }

    private evaluateCounters(counters : Array<number>, targets : Array<number>) : number
    {
        if (counters.some((counter, index) => counter > targets[index])) return Part2.Comparisons.TOO_HIGH;
        if (counters.some((counter, index) => counter < targets[index])) return Part2.Comparisons.TOO_LOW;
        return Part2.Comparisons.JUST_RIGHT;
    }
}
