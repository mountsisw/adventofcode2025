import { PuzzlePart } from "../aocFW.js";
export default class Part2 extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.floorMap = new Array();
    }
    processRecord(record) {
        if (this.floorMap.length === 0)
            this.floorMap.push('.'.repeat(record.length + 2));
        this.floorMap.push(`.${record}.`);
        return true;
    }
    calculateAnswer() {
        this.floorMap.push('.'.repeat(this.floorMap[0].length));
        let rollsAccessible = 0;
        let rollsRemoved = 0;
        do {
            rollsAccessible = 0;
            const newFloorMap = new Array();
            newFloorMap.push(this.floorMap[0]);
            for (let index = 1; index < this.floorMap.length - 1; index++) {
                const previousRow = this.floorMap[index - 1];
                const thisRow = this.floorMap[index];
                const nextRow = this.floorMap[index + 1];
                newFloorMap.push(".");
                for (let colIndex = 1; colIndex < thisRow.length - 1; colIndex++) {
                    let contents = thisRow.charAt(colIndex);
                    if (contents === '@') {
                        let adjoiningRolls = 0;
                        if (previousRow.charAt(colIndex - 1) === '@')
                            adjoiningRolls++;
                        if (previousRow.charAt(colIndex) === '@')
                            adjoiningRolls++;
                        if (previousRow.charAt(colIndex + 1) === '@')
                            adjoiningRolls++;
                        if (thisRow.charAt(colIndex - 1) === '@')
                            adjoiningRolls++;
                        if (thisRow.charAt(colIndex + 1) === '@')
                            adjoiningRolls++;
                        if (nextRow.charAt(colIndex - 1) === '@')
                            adjoiningRolls++;
                        if (nextRow.charAt(colIndex) === '@')
                            adjoiningRolls++;
                        if (nextRow.charAt(colIndex + 1) === '@')
                            adjoiningRolls++;
                        if (adjoiningRolls < 4)
                            rollsAccessible++;
                        newFloorMap[index] += adjoiningRolls < 4 ? '.' : '@';
                    }
                    else
                        newFloorMap[index] += contents;
                }
                newFloorMap[index] += '.';
            }
            newFloorMap.push(this.floorMap[this.floorMap.length - 1]);
            this.floorMap = newFloorMap;
            rollsRemoved += rollsAccessible;
        } while (rollsAccessible > 0);
        return rollsRemoved;
    }
}
//# sourceMappingURL=Part2.js.map