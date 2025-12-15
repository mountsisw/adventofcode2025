import { PuzzlePart } from "../aocFW.js";

type Device = { name : string, connections : Array<string>, paths : number };

export default class Part2 extends PuzzlePart
{
    private connections: Array<Device> = new Array();

    public processRecord(record: string) : boolean
    {
        const parts = record.split(" ");
        this.connections.push({ name : parts[0].slice(0, parts[0].length - 1), connections : parts.slice(1), paths: -1 });
        return true;
    }

    public async calculateAnswer() : Promise<any>
    {
        this.connections.push({ name : "out", connections: [], paths : 1 });
        const pathsToCount = [["svr", "fft", "dac", "out"], ["svr", "dac", "fft", "out"]];
        let totalPaths = 0;
        for (const path of pathsToCount)
        {
            let pathCount = 0;
            for (let index = path.length - 2; index >= 0; index--)
            {
                pathCount = this.totalPaths(path[index], path[index + 1]);
                this.displayOutput(`${JSON.stringify(path.slice(index))} : ${pathCount} paths`);
                this.clearDevices(path[index]);
            }
            totalPaths += pathCount;
            this.resetPaths();
        }
        this.displayOutput(`Total paths: ${totalPaths}`);
        return totalPaths;
    }

    private clearDevices(deviceToPreserve : string)
    {
        this.connections.forEach(device => { if (device.name !== deviceToPreserve && device.paths > 0) device.paths = 0; });
    }

    private resetPaths()
    {
        this.connections.forEach(connection => connection.paths = -1);
        this.connections[this.connections.length - 1].paths = 1;
    }

    private totalPaths(fromDevice : string, toDevice : string) : number
    {
        const device = this.connections.find(connection => connection.name === fromDevice)!;
        if (device.paths === -1)
            device.paths = device.connections.reduce((acc, connection) =>
                connection === toDevice ? this.connections.find(device => device.name === toDevice)!.paths : acc + this.totalPaths(connection, toDevice), 0);
        return device.paths;
    }
}
