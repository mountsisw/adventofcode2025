// @ts-check
import { doPart } from './aocFW.js';

const dateCellInformation = new Map(); // used to store info about each date cell
const solutions = new Map(); // used to store solution info
solutions.set("1", {title: "Secret Entrance", part1: "Day1/Part1.js", part2: "Day1/Part2.js", bg: "Day1/Day1.png"});
solutions.set("2", {title: "Gift Shop", part1: "Day2/Part1.js", part2: "Day2/Part2.js", bg: "Day2/Day2.png"});
solutions.set("3", {title: "Lobby", part1: "Day3/Part1.js", part2: "Day3/Part2.js", bg: "Day3/Day3.png"});
solutions.set("4", {title: "Printing Department", part1: "Day4/Part1.js", part2: "Day4/Part2.js", bg: "Day4/Day4.png"});

// Make doPart available globally for javascript: URLs
// @ts-ignore
window.doPart = doPart;

// Initialize the calendar when the window loads
window.onload = () =>
{
    // All date/time vaules are in Eastern Time (New York), since Advent of Code uses that time zone
    const firstDate = Date.UTC(2025, 11, 1, 5, 0, 0); // first date present on calender
    const lastDate = Date.UTC(2025, 11, 12, 5, 0, 0); // last date present on calender
    const firstPuzzle = Date.UTC(2025, 11, 1, 5, 0, 0); // first date a puzzle is available
    const lastPuzzle = Date.UTC(2025, 11, 12, 5, 0, 0); // last date a puzzle is available

    const containerDiv = document.getElementById("days");
    if (containerDiv == null) { console.error("No container div"); return; }
    for (let thisDate = firstDate; thisDate <= lastDate; thisDate += 24 * 60 * 60 * 1000) // increment by one day
    {
        // Create the cell for this date
        const cellDiv = document.createElement("div");
        cellDiv.className = "cells";
        
        // Create the date div that displays the day number
        const dateDiv = document.createElement("div");
        dateDiv.className = "dates";
        
        // Set the date text based on Eastern Time
        const dateString = new Date(thisDate).toLocaleDateString('en-US', {timeZone: 'America/New_York', day: 'numeric'});
        dateDiv.innerText = dateString;

        // If this date has a puzzle, set up the cell accordingly
        if (thisDate >= firstPuzzle && thisDate <= lastPuzzle)
        {
            dateDiv.className += " puzzle";
            cellDiv.id = dateString;
            cellDiv.onmouseenter = showInfo;
            dateCellInformation.set(dateString, {unlockTime: thisDate, timer: 0, content: dateDiv});

            // If a solution exists for this date, set the background image
            if (solutions.has(dateString)) cellDiv.style.backgroundImage = "url(" + solutions.get(dateString).bg + ")";
        }

        // Assemble the cell and add it to the container
        cellDiv.append(dateDiv);
        containerDiv.append(cellDiv);
    }
}

// Show information about the puzzle when the mouse enters a date cell
/**
 * @param {MouseEvent} event
 */
function showInfo(event)
{
    if (!(event.target instanceof HTMLElement)) { console.error("Not an HTML Element"); return; }
    // get info for this date cell
    const dateInfo = dateCellInformation.get(event.target.id);
    // hide the current content
    dateInfo.content.style.display = "none";
    // preserve the current background image
    const backgroundImageStyle = event.target.style.backgroundImage;
    // set a dark overlay on the background image
    event.target.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), " + backgroundImageStyle;
    // create a new div to hold the puzzle info
    const newDiv = document.createElement("div");
    newDiv.className = "puzzle";
    event.target.append(newDiv);
    // determine what to show based on the current time
    if (Date.now() < dateInfo.unlockTime)
    {
        // puzzle is not yet unlocked, show countdown
        // if no timer is running, start one
        if (dateInfo.timer === 0)
        {
            // display initial countdown value
            countdown(newDiv, dateInfo.unlockTime);
            // start timer to update countdown every second
            dateInfo.timer = window.setInterval(countdown, 1000, newDiv, dateInfo.unlockTime);
            // save updated info (timer value) back to map
            dateCellInformation.set(event.target.id, dateInfo);
        }
    }
    else if (solutions.has(event.target.id))
    {
        // puzzle is unlocked and solution exists, show solution links
        const solution = solutions.get(event.target.id);
        let anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = solution.title;
        anchor.href = "https://adventofcode.com/2025/day/" + event.target.id;
        anchor.target = "_blank";
        newDiv.append(document.createElement("br"));
        anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = "Part 1";
        anchor.href = `javascript:doPart("${solution.part1}");`;
        newDiv.append(document.createElement("br"));
        anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = "Part 2";
        anchor.href = `javascript:doPart("${solution.part2}");`;
    }
    else
    {
        // puzzle is unlocked but solutions are not ready, show link to puzzle
        const anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = "Puzzle";
        anchor.href = "https://adventofcode.com/2025/day/" + event.target.id;
        anchor.target = "_blank";
    }
    // set up mouseleave event to clean up when the mouse leaves the cell
    event.target.onmouseleave = (event) =>
    {
        if (!(event.target instanceof HTMLElement)) { console.error("Not an HTML Element"); return; }
        // get info for this date cell
        const dateInfo = dateCellInformation.get(event.target.id);
        // stop any running timer
        if (dateInfo.timer > 0)
        {
            window.clearInterval(dateInfo.timer);
            dateInfo.timer = 0;
            dateCellInformation.set(event.target.id, dateInfo);
        }
        // remove the new div
        newDiv.remove();
        // restore the original background image
        event.target.style.backgroundImage = backgroundImageStyle;
        // show the original content
        dateInfo.content.style.display = "";
    }
}

// Display the time until the puzzle unlocks
/**
 * @param {HTMLDivElement} target
 * @param {number} unlockTime
 */
function countdown(target, unlockTime)
{
    let waitTime = unlockTime - Date.now();
    let denom = 24 * 60 * 60 * 1000; // milliseconds in a day
    const days = Math.floor(waitTime / denom); // number of whole days remaining
    let countdown = days > 0 ? String(days) + ":" : ""; // start countdown string, include days if > 0
    waitTime -= days * denom; // reduce waitTime by number of whole days
    denom /= 24; // milliseconds in an hour
    const hours = Math.floor(waitTime / denom); // number of whole hours remaining
    countdown += (hours > 9 ? "" : "0") + String(hours) + ":"; // add hours to countdown string with leading zero if needed
    waitTime -= hours * denom; // reduce waitTime by number of whole hours
    denom /= 60; // milliseconds in a minute
    const minutes = Math.floor(waitTime / denom); // number of whole minutes remaining
    countdown += (minutes > 9 ? "" : "0") + String(minutes) + ":"; // add minutes to countdown string with leading zero if needed
    waitTime -= minutes * denom; // reduce waitTime by number of whole minutes
    denom /= 60; // milliseconds in a second    
    const seconds = Math.ceil(waitTime / denom); // round up for number of whole seconds remaining
    target.innerText = "Unlocks in " + countdown + (seconds > 9 ? "" : "0") + String(seconds); // add seconds to countdown string with leading zero if needed, and set the target text
}
