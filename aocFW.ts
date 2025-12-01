export function doPart(solutionModule : string)
{
    import(`./${solutionModule}`).then((module) =>
    {
        let inputDisplay: HTMLDivElement = <HTMLDivElement> document.getElementById("inputDisplay");
        let outputDisplay: HTMLDivElement = <HTMLDivElement> document.getElementById("outputDisplay");
        const fileChooser: HTMLInputElement = <HTMLInputElement> document.getElementById("puzzleInput");
        fileChooser.accept = ".txt";
        const fileProgress: HTMLProgressElement = <HTMLProgressElement> document.getElementById("fileProgress");
        fileChooser.onchange = () =>
        {
            if (fileChooser.files && fileChooser.files.length > 0)
            {
                inputDisplay.innerText = "";
                outputDisplay.innerText = "";

                const file: File = fileChooser.files[0];
                document.getElementById("fileName")!.innerText = file.name;
                const haveStatus: boolean = document.getElementById("status") != null;
                if (haveStatus)
                {
                    document.getElementById("reading")!.className = "puzzle";
                    document.getElementById("solving")!.className = "";
                    document.getElementById("done")!.className = "";
                }

                let fr: FileReader = new FileReader();
                fr.onloadend = () =>
                {
                    const aValues: Array<string> = (<String> fr.result).split("\n");
                    const maxRecords: number = aValues.length;
                    document.getElementById("recordCount")!.innerText = String(maxRecords) + " records";
                    document.getElementById("answer")!.innerText = "";
                    fileProgress.max = maxRecords;

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
                            if (haveStatus)
                            {
                                document.getElementById("reading")!.className = "";
                                document.getElementById("solving")!.className = "puzzle";
                            }
                            window.setTimeout(() =>
                            {
                                const answer = part.calculateAnswer();
                                if (haveStatus)
                                {
                                    document.getElementById("solving")!.className = "";
                                    document.getElementById("done")!.className = "puzzle";
                                }
                                document.getElementById("answer")!.innerText = String(answer);
                            }, 0);
                        }
                    }, 0);
                }
                fr.readAsText(file);
            }
            else alert("No file selected");
        }
    });
}

export abstract class PuzzlePart
{
    constructor(protected inputDisplay: HTMLDivElement, protected outputDisplay: HTMLDivElement) {}
    public processRecord(record: string) : boolean { return true; }
    public abstract calculateAnswer() : any;
}