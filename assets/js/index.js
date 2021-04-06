"use strict";
let originalColors = ["#282c34", "#282c34", "rgba(52, 73, 94, 0.4)", "rgba(0, 0, 0, 0.8)", "white", "#727575", "rgba(0, 0, 0, 0.5)"];
/*body-------nav--------start------end--------text--------subtext*/
let option1colors = ["#fbe8a6", "#f4976c", "#b4dfe5", "#d2fdff", "#303c6c", "#303c6c94", "none"];
let option2colors = ["#5a5560", "#46344e", "#9d8d8f", "#9b786f", "#fff", "#faed2682", "#none"];
let option3colors = ["#efe2ba", "#d79922", "#c5cbe3", "#c5cbe3", "#fff", "#4056a1b8", "#none"];
let option4colors = ["#5d5c61", "#b1a296", "#938e94", "#938e94", "#fff", "#303c6c94", "#none"];
let option5colors = ["#5d5c61", "#b1a296", "#938e94", "#938e94", "#fff", "#303c6c94", "#fbeec1"];
let option6colors = ["#659dbd", "#bc986a", "#8d8741", "#daad86", "#fff", "#fbeec1", "#none"];


function openNav() {
    document.querySelector("nav").style.width = "100%";
}

function closeNav() {
    document.querySelector("nav").style.width = "0%";
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
        case "6":
            colorOptions = option6colors;
            break;

        default:
            colorOptions = originalColors;
            break;

    }
    document.documentElement.style.setProperty('--primary', colorOptions[0]);
    document.documentElement.style.setProperty('--nav', colorOptions[1]);
    document.documentElement.style.setProperty('--start-gradient', colorOptions[2]);
    document.documentElement.style.setProperty('--end-gradient', colorOptions[3]);
    document.documentElement.style.setProperty('--headers', colorOptions[4]);
    document.documentElement.style.setProperty('--subText', colorOptions[5]);
    document.documentElement.style.setProperty('--border-color', colorOptions[6]);
    if(window.innerWidth<1050){
        closeNav();

    }
}


$(document).ready(function(){
    $("nav").load("nav.html", ()=>{
        let pageTag = document.querySelector("body").getAttribute("data-page");
        document.querySelectorAll("#colorChangeButtons a").forEach(selected => selected.addEventListener("click", setStyling))
        let navEl = document.querySelector(".animation");
        navEl.classList.add(`start-${pageTag}`);
        document.querySelector("#openMenu").addEventListener("click", openNav);
        document.querySelector(".closebtn").addEventListener("click", closeNav);
    });
});
