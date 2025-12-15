import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.connections = new Array();
    }
    processRecord(record) {
        const parts = record.split(" ");
        this.connections.push({ name: parts[0].slice(0, parts[0].length - 1), connections: parts.slice(1), paths: 0 });
        return true;
    }
    async calculateAnswer() {
        return this.totalPaths("you");
    }
    totalPaths(deviceName) {
        const device = this.connections.find(connection => connection.name === deviceName);
        if (device.paths === 0)
            device.paths = device.connections.reduce((acc, connection) => connection === "out" ? 1 : acc + this.totalPaths(connection), 0);
        this.displayOutput(`${deviceName}: ${device.paths} paths`);
        return device.paths;
    }
}
//# sourceMappingURL=Part1.js.map