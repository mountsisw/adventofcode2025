import { PuzzlePart } from "../aocFW.js";

type Point = { x: number, y: number, z: number };
type Span = { distance: number, from: Point, to: Point };

export default class Part1 extends PuzzlePart
{
    private boxes : Array<Point> = new Array();

    public processRecord(record: string) : boolean
    {
        const parts = record.split(",").map((val) => Number(val));
        const box: Point = { x: parts[0], y: parts[1], z: parts[2] };
        this.boxes.push(box);
        return true;
    }

    public calculateAnswer() : any
    {
        this.displayInput(`Total boxes: ${this.boxes.length}`);
        const spans : Array<Span> = new Array();
        for (let i = 1; i < this.boxes.length; i++)
        {
            const exitingBox = this.boxes[i];
            for (let j = 0; j < i; j++)
            {
                const box = this.boxes[j];
                spans.push({
                    distance: Math.pow(exitingBox.x - box.x, 2) + Math.pow(exitingBox.y - box.y, 2) + Math.pow(exitingBox.z - box.z, 2),
                    from: exitingBox,
                    to: box
                });
            }
        }
        this.displayInput(`Total spans: ${spans.length}`);
        spans.sort((a, b) => a.distance - b.distance);

        const circuits : Array<Array<Point>> = new Array();
        let lastSpan;
        for (const span of spans)
        {
            const fromInCircuit = circuits.findIndex((circuit) => circuit.includes(span.from));
            const toInCircuit = circuits.findIndex((circuit) => circuit.includes(span.to));
            if (fromInCircuit >= 0 && toInCircuit >= 0)
            {
                if (fromInCircuit != toInCircuit)
                {
                    circuits[fromInCircuit] = circuits[fromInCircuit].concat(circuits[toInCircuit]);
                    circuits.splice(toInCircuit, 1);
                }
            }
            else if (fromInCircuit >= 0) circuits[fromInCircuit].push(span.to);
            else if (toInCircuit >= 0) circuits[toInCircuit].push(span.from);
            else circuits.push([span.from, span.to]);
            if (circuits.length == 1 && circuits[0].length == this.boxes.length)
            {
                lastSpan = span;
                break;
            }
        }
        this.displayOutput(`${circuits.length} circuits created`);
        this.displayOutput(`Last span: ${JSON.stringify(lastSpan!.from)} to ${JSON.stringify(lastSpan!.to)}`);
        return lastSpan!.from.x * lastSpan!.to.x;
    }
}