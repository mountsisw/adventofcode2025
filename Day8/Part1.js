import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.boxes = new Array();
    }
    processRecord(record) {
        const parts = record.split(",").map((val) => Number(val));
        const box = { x: parts[0], y: parts[1], z: parts[2] };
        this.boxes.push(box);
        return true;
    }
    calculateAnswer() {
        this.displayInput(`Total boxes: ${this.boxes.length}`);
        const spans = new Array();
        for (let i = 1; i < this.boxes.length; i++) {
            const exitingBox = this.boxes[i];
            for (let j = 0; j < i; j++) {
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
        const circuits = new Array();
        const maxConnections = this.boxes.length > 100 ? 1000 : 10;
        for (let i = 0; i < maxConnections; i++) {
            const span = spans[i];
            const fromInCircuit = circuits.findIndex((circuit) => circuit.includes(span.from));
            const toInCircuit = circuits.findIndex((circuit) => circuit.includes(span.to));
            if (fromInCircuit >= 0 && toInCircuit >= 0) {
                if (fromInCircuit != toInCircuit) {
                    circuits[fromInCircuit] = circuits[fromInCircuit].concat(circuits[toInCircuit]);
                    circuits.splice(toInCircuit, 1);
                }
            }
            else if (fromInCircuit >= 0) {
                circuits[fromInCircuit].push(span.to);
            }
            else if (toInCircuit >= 0) {
                circuits[toInCircuit].push(span.from);
            }
            else {
                circuits.push([span.from, span.to]);
            }
        }
        circuits.sort((a, b) => b.length - a.length);
        this.displayOutput(`${circuits.length} circuits created`);
        this.displayOutput(`Largest circuits sizes: ${circuits[0].length}, ${circuits[1].length}, ${circuits[2].length}`);
        return circuits[0].length * circuits[1].length * circuits[2].length;
    }
}
//# sourceMappingURL=Part1.js.map