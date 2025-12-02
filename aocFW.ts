export function doPart(solutionModule : string)
{
    import(`./${solutionModule}`).then((module) =>
    {
        const selectElement: HTMLSpanElement = <HTMLButtonElement> document.getElementById("puzzleName");
        const dayPart: Array<string> = solutionModule.split("/");
        selectElement.innerText = `Day ${dayPart[0].slice(3)} Part ${dayPart[1].slice(4, dayPart[1].indexOf("."))}`;
        selectElement.className = "statusStep";
        const fileChooser: HTMLInputElement = <HTMLInputElement> document.getElementById("fileChooser");
        fileChooser.accept = ".txt";
        const fileInputDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("inputFile");
        fileInputDiv.className = "activeStep";
        const fileNameDisplay: HTMLSpanElement = <HTMLSpanElement> document.getElementById("fileNameDisplay");
        fileNameDisplay.innerText = "Select input file";
        resetElements(fileInputDiv);

        fileNameDisplay.onclick = () =>
        {
            fileChooser.value = "";
            fileChooser.click();
        }
        fileChooser.onchange = () =>
        {
            if (fileChooser.files && fileChooser.files.length > 0)
            {
                const file: File = fileChooser.files[0];
                fileNameDisplay.innerText = file.name;
                fileInputDiv.className = "statusStep";

                let fr: FileReader = new FileReader();
                fr.onloadend = () =>
                {
                    const aValues: Array<string> = (<String> fr.result).split("\n");
                    const maxRecords: number = aValues.length;
                    fileNameDisplay.innerText += ` (${maxRecords} records)`;
                    const fileProgress: HTMLProgressElement = <HTMLProgressElement> document.getElementById("fileProgress");
                    const stage: HTMLDivElement = <HTMLDivElement> document.getElementById("stage");
                    const stageText: HTMLSpanElement = <HTMLSpanElement> document.getElementById("stageText");
                    fileProgress.max = maxRecords;
                    stage.className = "activeStep";
                    stageText.innerText = "Start";
                    resetElements(stage);
                    stage.onclick = () =>
                    {
                        stageText.style.display = "none";
                        fileProgress.style.display = "block";
                        resetElements(stage);
                        const inputDisplay: HTMLDivElement = <HTMLDivElement> document.getElementById("inputDisplay");
                        const outputDisplay: HTMLDivElement = <HTMLDivElement> document.getElementById("outputDisplay");
                        const part: PuzzlePart = new module.default(inputDisplay, outputDisplay);
                        let recordIndex: number = 0;
                        window.setTimeout(function processFileRecords()
                        {
                            const recordLength = aValues[recordIndex].length;
                            const record = aValues[recordIndex].charCodeAt(recordLength - 1) == 13 ?
                                aValues[recordIndex].slice(0, recordLength - 1) : aValues[recordIndex];
                            const moreRecords: boolean = part.processRecord(record);
                            fileProgress.value = ++recordIndex;
                            if (moreRecords === true && recordIndex < maxRecords) window.setTimeout(processFileRecords, 0);
                            else
                            {
                                fileProgress.style.display = "none";
                                stageText.innerText = "Solving ..."
                                stageText.style.display = "block";
                                window.setTimeout(() =>
                                {
                                    const answer = part.calculateAnswer();
                                    stageText.innerText = "Done";
                                    stage.className = "statusStep";
                                    const answerDisplay: HTMLSpanElement = <HTMLSpanElement> document.getElementById("answer")!;
                                    answerDisplay.innerText = `Answer => ${answer}`;
                                    answerDisplay.className = "activeStep";
                                }, 0);
                            }
                        }, 0);
                    }
                }
                fr.readAsText(file);
            }
            else alert("No file selected");
        }
    });
}

function resetElements(firstElement: HTMLElement)
{
    const inputDisplay: HTMLDivElement = <HTMLDivElement> document.getElementById("inputDisplay");
    inputDisplay.innerText = "";
    const outputDisplay: HTMLDivElement = <HTMLDivElement> document.getElementById("outputDisplay");
    outputDisplay.innerText = "";
    if (firstElement.id !== "answer")
    {
        const answerDisplay: HTMLSpanElement = <HTMLSpanElement> document.getElementById("answer")!;
        answerDisplay.innerText = "";
        answerDisplay.className = "statusStep";
        if (firstElement.id !== "stage")
        {
            const stage = document.getElementById("stage")!;
            stage.className = "statusStep";
            const stageText = document.getElementById("stageText")!;
            stageText.innerText = "";
            const fileProgress: HTMLProgressElement = <HTMLProgressElement> document.getElementById("fileProgress");
            fileProgress.value = 0;
            fileProgress.style.display = "none";
        }
    }
}

export abstract class PuzzlePart
{
    constructor(protected inputDisplay: HTMLDivElement, protected outputDisplay: HTMLDivElement) {}
    public processRecord(record: string) : boolean { return true; }
    public abstract calculateAnswer() : any;
}