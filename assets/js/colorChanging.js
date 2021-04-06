"use strict";

let originalColors = ["#282c34", "#282c34", "rgba(52, 73, 94, 0.4)", "rgba(0, 0, 0, 0.8)", "white", "#727575"];
                    /*body-------nav--------start------end--------text--------subtext*/
let option1colors = ["#fbe8a6", "#f4976c", "#b4dfe5", "#d2fdff", "#303c6c", "#303c6c94"];
let option2colors = ["#5a5560", "#46344e", "#9d8d8f", "#9b786f", "#fff", "#faed2682"];
let option3colors = ["#efe2ba", "#d79922", "#c5cbe3", "#c5cbe3", "#fff", "#4056a1b8"];
let option4colors = ["#5d5c61", "#b1a296", "#938e94", "#938e94", "#fff", "#303c6c94"];
let option5colors = ["#659dbd", "#bc986a", "#8d8741", "#daad86", "#fff", "#fbeec1"];

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelectorAll("#colorChangeButtons a").forEach(selected => selected.addEventListener("click", setStyling))
}

function setStyling(e) {
    e.preventDefault();
    const id = e.target.getAttribute("data-value");
    let colorOptions;
    console.log(id);
    switch (id) {
        case "1":
            colorOptions = option1colors;
            break;
        case "2":
            colorOptions = option2colors;
            break;
        case "3":
            colorOptions = option3colors;
            break;
        case "4":
            colorOptions = option4colors;
            break;
        case "5":
            colorOptions = option5colors;
            break;

        default:
            colorOptions = originalColors;
            break;

    }
    console.log(colorOptions);
    document.documentElement.style.setProperty('--primary', colorOptions[0]);
    document.documentElement.style.setProperty('--nav', colorOptions[1]);
    document.documentElement.style.setProperty('--start-gradient', colorOptions[2]);
    document.documentElement.style.setProperty('--end-gradient', colorOptions[3]);
    document.documentElement.style.setProperty('--headers', colorOptions[4]);
    document.documentElement.style.setProperty('--subText', colorOptions[5]);
}
