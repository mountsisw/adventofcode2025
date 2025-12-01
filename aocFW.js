export function doPart(solutionModule) {
    import(`./${solutionModule}`).then((module) => {
        let inputDisplay = document.getElementById("inputDisplay");
        let outputDisplay = document.getElementById("outputDisplay");
        const fileChooser = document.getElementById("puzzleInput");
        fileChooser.accept = ".txt";
        const fileProgress = document.getElementById("fileProgress");
        fileChooser.onchange = () => {
            if (fileChooser.files && fileChooser.files.length > 0) {
                inputDisplay.innerText = "";
                outputDisplay.innerText = "";
                const file = fileChooser.files[0];
                document.getElementById("fileName").innerText = file.name;
                const haveStatus = document.getElementById("status") != null;
                if (haveStatus) {
                    document.getElementById("reading").className = "puzzle";
                    document.getElementById("solving").className = "";
                    document.getElementById("done").className = "";
                }
                let fr = new FileReader();
                fr.onloadend = () => {
                    const aValues = fr.result.split("\n");
                    const maxRecords = aValues.length;
                    document.getElementById("recordCount").innerText = String(maxRecords) + " records";
                    document.getElementById("answer").innerText = "";
                    fileProgress.max = maxRecords;
                    const part = new module.default(inputDisplay, outputDisplay);
                    let recordIndex = 0;
                    window.setTimeout(function processFileRecords() {
                        const recordLength = aValues[recordIndex].length;
                        const record = aValues[recordIndex].charCodeAt(recordLength - 1) == 13 ?
                            aValues[recordIndex].slice(0, recordLength - 1) : aValues[recordIndex];
                        const moreRecords = part.processRecord(record);
                        fileProgress.value = ++recordIndex;
                        if (moreRecords === true && recordIndex < maxRecords)
                            window.setTimeout(processFileRecords, 0);
                        else {
                            if (haveStatus) {
                                document.getElementById("reading").className = "";
                                document.getElementById("solving").className = "puzzle";
                            }
                            window.setTimeout(() => {
                                const answer = part.calculateAnswer();
                                if (haveStatus) {
                                    document.getElementById("solving").className = "";
                                    document.getElementById("done").className = "puzzle";
                                }
                                document.getElementById("answer").innerText = String(answer);
                            }, 0);
                        }
                    }, 0);
                };
                fr.readAsText(file);
            }
            else
                alert("No file selected");
        };
    });
}
export class PuzzlePart {
    constructor(inputDisplay, outputDisplay) {
        this.inputDisplay = inputDisplay;
        this.outputDisplay = outputDisplay;
    }
    processRecord(record) { return true; }
}
//# sourceMappingURL=aocFW.js.map