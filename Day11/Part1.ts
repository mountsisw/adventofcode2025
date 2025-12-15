import { PuzzlePart } from "../aocFW.js";

type Device = { name : string, connections : Array<string>, paths : number };

export default class Part1 extends PuzzlePart
{
    private connections: Array<Device> = new Array();

    public processRecord(record: string) : boolean
    {
        const parts = record.split(" ");
        this.connections.push({ name : parts[0].slice(0, parts[0].length - 1), connections : parts.slice(1), paths: 0 });
        return true;
    }


    public async calculateAnswer() : Promise<any>
    {
        return this.totalPaths("you");
    }

    private totalPaths(deviceName: string) : number
    {
        const device = this.connections.find(connection => connection.name === deviceName)!;
        if (device.paths === 0) device.paths = device.connections.reduce((acc, connection) => connection === "out" ? 1 : acc + this.totalPaths(connection), 0);
        this.displayOutput(`${deviceName}: ${device.paths} paths`);
        return device.paths;
    }
}
