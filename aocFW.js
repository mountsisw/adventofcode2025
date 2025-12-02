export function doPart(solutionModule) {
    import(`./${solutionModule}`).then((module) => {
        const selectElement = document.getElementById("puzzleName");
        const dayPart = solutionModule.split("/");
        selectElement.innerText = `Day ${dayPart[0].slice(3)} Part ${dayPart[1].slice(4, dayPart[1].indexOf("."))}`;
        selectElement.className = "statusStep";
        const fileChooser = document.getElementById("fileChooser");
        fileChooser.accept = ".txt";
        const fileInputDiv = document.getElementById("inputFile");
        fileInputDiv.className = "activeStep";
        const fileNameDisplay = document.getElementById("fileNameDisplay");
        fileNameDisplay.innerText = "Select input file";
        resetElements(fileInputDiv);
        fileNameDisplay.onclick = () => {
            fileChooser.value = "";
            fileChooser.click();
        };
        fileChooser.onchange = () => {
            if (fileChooser.files && fileChooser.files.length > 0) {
                const file = fileChooser.files[0];
                fileNameDisplay.innerText = file.name;
                fileInputDiv.className = "statusStep";
                let fr = new FileReader();
                fr.onloadend = () => {
                    const aValues = fr.result.split("\n");
                    const maxRecords = aValues.length;
                    fileNameDisplay.innerText += ` (${maxRecords} records)`;
                    const fileProgress = document.getElementById("fileProgress");
                    const stage = document.getElementById("stage");
                    const stageText = document.getElementById("stageText");
                    fileProgress.max = maxRecords;
                    stage.className = "activeStep";
                    stageText.innerText = "Start";
                    resetElements(stage);
                    stage.onclick = () => {
                        stageText.style.display = "none";
                        fileProgress.style.display = "block";
                        resetElements(stage);
                        const inputDisplay = document.getElementById("inputDisplay");
                        const outputDisplay = document.getElementById("outputDisplay");
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
                                fileProgress.style.display = "none";
                                stageText.innerText = "Solving ...";
                                stageText.style.display = "block";
                                window.setTimeout(() => {
                                    const answer = part.calculateAnswer();
                                    stageText.innerText = "Done";
                                    stage.className = "statusStep";
                                    const answerDisplay = document.getElementById("answer");
                                    answerDisplay.innerText = `Answer => ${answer}`;
                                    answerDisplay.className = "activeStep";
                                    answerDisplay.onclick = () => { navigator.clipboard.writeText(String(answer)); };
                                }, 0);
                            }
                        }, 0);
                    };
                };
                fr.readAsText(file);
            }
            else
                alert("No file selected");
        };
    });
}
function resetElements(firstElement) {
    const inputDisplay = document.getElementById("inputDisplay");
    inputDisplay.innerText = "";
    const outputDisplay = document.getElementById("outputDisplay");
    outputDisplay.innerText = "";
    if (firstElement.id !== "answer") {
        const answerDisplay = document.getElementById("answer");
        answerDisplay.innerText = "";
        answerDisplay.className = "statusStep";
        if (firstElement.id !== "stage") {
            const stage = document.getElementById("stage");
            stage.className = "statusStep";
            const stageText = document.getElementById("stageText");
            stageText.innerText = "";
            const fileProgress = document.getElementById("fileProgress");
            fileProgress.value = 0;
            fileProgress.style.display = "none";
        }
    }
}
export class PuzzlePart {
    constructor(inputDisplay, outputDisplay) {
        this.inputDisplay = inputDisplay;
        this.outputDisplay = outputDisplay;
    }
    processRecord(record) { return true; }
}
//# sourceMappingURL=aocFW.js.map