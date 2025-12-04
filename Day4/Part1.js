import { PuzzlePart } from "../aocFW.js";
export default class Part1 extends PuzzlePart {
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
        for (let index = 1; index < this.floorMap.length - 1; index++) {
            const previousRow = this.floorMap[index - 1];
            const thisRow = this.floorMap[index];
            const nextRow = this.floorMap[index + 1];
            for (let colIndex = 1; colIndex < thisRow.length - 1; colIndex++) {
                if (thisRow.charAt(colIndex) === '@') {
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
                }
            }
        }
        return rollsAccessible;
    }
}
//# sourceMappingURL=Part1.js.map