window.onload = init;

let info = new Map();
let solutions = new Map();
solutions.set("1", {title: "Report Repair", part1: "Day1/Part1.html", part2: "Day1/Part2.html", bg: "Day1/Day1.png"});
solutions.set("2", {title: "Password Philosophy", part1: "Day2/Part1.html", part2: "Day2/Part2.html", bg: "Day2/Day2.png"});
solutions.set("3", {title: "Toboggan Trajectory", part1: "Day3/Part1.html", part2: "Day3/Part2.html", bg: "Day3/Day3.png"});
solutions.set("4", {title: "Passport Processing", part1: "Day4/Part1.html", part2: "Day4/Part2.html", bg: "Day4/Day4.png"});
solutions.set("5", {title: "Binary Boarding", part1: "Day5/Part1.html", part2: "Day5/Part2.html", bg: "Day5/Day5.png"});
solutions.set("6", {title: "Custom Customs", part1: "Day6/Part1.html", part2: "Day6/Part2.html", bg: "Day6/Day6.png"});
solutions.set("7", {title: "Handy Haversacks", part1: "Day7/Part1.html", part2: "Day7/Part2.html", bg: "Day7/Day7.png"});
solutions.set("8", {title: "Handheld Halting", part1: "Day8/Part1.html", part2: "Day8/Part2.html", bg: "Day8/Day8.png"});
solutions.set("9", {title: "Encoding Error", part1: "Day9/Part1.html", part2: "Day9/Part2.html", bg: "Day9/Day9.png"});
solutions.set("10", {title: "Adapter Array", part1: "Day10/Part1.html", part2: "Day10/Part2.html", bg: "Day10/Day10.png"});
solutions.set("11", {title: "Seating System", part1: "Day11/Part1.html", part2: "Day11/Part2.html", bg: "Day11/Day11.png"});
solutions.set("12", {title: "Rain Risk", part1: "Day12/Part1.html", part2: "Day12/Part2.html", bg: "Day12/Day12.png"});
solutions.set("13", {title: "Shuttle Search", part1: "Day13/Part1.html", part2: "Day13/Part2.html", bg: "Day13/Day13.png"});
solutions.set("14", {title: "Docking Data", part1: "Day14/Part1.html", part2: "Day14/Part2.html", bg: "Day14/Day14.png"});
solutions.set("15", {title: "Rambunctious Recitation", part1: "Day15/Part1.html", part2: "Day15/Part2.html", bg: "Day15/Day15.png"});
solutions.set("16", {title: "Ticket Translation", part1: "Day16/Part1.html", part2: "Day16/Part2.html", bg: "Day16/Day16.png"});
solutions.set("17", {title: "Conway Cubes", part1: "Day17/Part1.html", part2: "Day17/Part2.html", bg: "Day17/Day17.png"});
solutions.set("18", {title: "Operation Order", part1: "Day18/Part1.html", part2: "Day18/Part2.html", bg: "Day18/Day18.png"});
solutions.set("19", {title: "Monster Messages", part1: "Day19/Part1.html", part2: "Day19/Part2.html", bg: "Day19/Day19.png"});
solutions.set("20", {title: "Jurassic Jigsaw", part1: "Day20/Part1.html", part2: "Day20/Part2.html", bg: "Day20/Day20.png"});
solutions.set("21", {title: "Allergen Assessment", part1: "Day21/Part1.html", part2: "Day21/Part2.html", bg: "Day21/Day21.png"});
solutions.set("22", {title: "Crab Combat", part1: "Day22/Part1.html", part2: "Day22/Part2.html", bg: "Day22/Day22.png"});
solutions.set("23", {title: "Crab Cups", part1: "Day23/Part1.html", part2: "Day23/Part2.html", bg: "Day23/Day23.png"});
solutions.set("24", {title: "Lobby Layout", part1: "Day24/Part1.html", part2: "Day24/Part2.html", bg: "Day24/Day24.png"});
solutions.set("25", {title: "Combo Breaker", part1: "Day25/Part1.html", part2: "Day25/Part2.html", bg: "Day25/Day25.png"});

function init()
{
    //TODO Adjust first date for current year
    let firstDate = Date.UTC(2025, 11, 1, 5, 0, 0);
    //let firstDate = Date.now();
    let firstPuzzle = Date.UTC(2025, 11, 1, 5, 0, 0);
    let lastPuzzle = Date.UTC(2025, 11, 12, 5, 0, 0);
    let containerDiv = document.getElementById("days");
    for (let nLoop = 1; nLoop <= 12; nLoop++)
    {
        let cellDiv = document.createElement("div");
        cellDiv.className = "cells";
        let dateDiv = document.createElement("div");
        dateDiv.className = "dates";
        let thisDate = new Date(firstDate);
        let dateString = thisDate.toLocaleDateString('en-US', {timeZone: 'America/New_York', day: 'numeric'});
        dateDiv.innerText = dateString;
        if (firstDate >= firstPuzzle && firstDate <= lastPuzzle)
        {
            dateDiv.className += " puzzle";
            cellDiv.id = dateString;
            cellDiv.onmouseenter = showInfo;
            info.set(dateString, {unlockTime: firstDate, timer: 0, content: dateDiv});
            if (solutions.has(dateString)) cellDiv.style.backgroundImage = "url(" + solutions.get(dateString).bg + ")";
        }
        cellDiv.append(dateDiv);
        containerDiv.append(cellDiv);
        firstDate += 24 * 60 * 60 * 1000;
    }
}

function showInfo(event)
{
    let dateInfo = info.get(event.target.id);
    console.log("Entered " + event.target.id + ": " + dateInfo.unlockTime);
    dateInfo.content.style.display = "none";
    let newDiv = document.createElement("div");
    event.target.append(newDiv);
    if (Date.now() < dateInfo.unlockTime)
    {
        if (dateInfo.timer == 0)
        {
            countdown(newDiv, dateInfo.unlockTime);
            dateInfo.timer = window.setInterval(countdown, 1000, newDiv, dateInfo.unlockTime);
            info.set(event.target.id, dateInfo);
        }
    }
    else if (solutions.has(event.target.id))
    {
        let solution = solutions.get(event.target.id);
        let anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = solution.title;
        anchor.href = "https://adventofcode.com/2020/day/" + event.target.id;
        newDiv.append(document.createElement("br"));
        anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = "Part 1";
        anchor.href = solution.part1;
        newDiv.append(document.createElement("br"));
        anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = "Part 2";
        anchor.href = solution.part2;
    }
    else
    {
        let anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = "Puzzle";
        anchor.href = "https://adventofcode.com/2020/day/" + event.target.id;
    }
    event.target.onmouseleave = function (event) {
        console.log("Left " + event.target.id);
        let dateInfo = info.get(event.target.id);
        if (dateInfo.timer > 0)
        {
            window.clearInterval(dateInfo.timer);
            dateInfo.timer = 0;
            info.set(event.target.id, dateInfo);
        }
        newDiv.remove();
        dateInfo.content.style.display = "";
    }
}

function countdown(target, unlockTime)
{
    let waitTime = unlockTime - Date.now();
    let denom = 24 * 60 * 60 * 1000;
    let days = Math.floor(waitTime / denom);
    let countdown = days > 0 ? String(days) + ":" : "";
    waitTime -= days * denom;
    denom /= 24;
    let hours = Math.floor(waitTime / denom);
    countdown += (hours > 9 ? "" : "0") + String(hours) + ":";
    waitTime -= hours * denom;
    denom /= 60;
    let minutes = Math.floor(waitTime / denom);
    countdown += (minutes > 9 ? "" : "0") + String(minutes) + ":";
    waitTime -= minutes * denom;
    denom /= 60;
    let seconds = Math.ceil(waitTime / denom);
    target.innerText = "Unlocks in " + countdown + (seconds > 9 ? "" : "0") + String(seconds);
}
