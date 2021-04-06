"use strict";


let options = [
    ["#282c34", "#282c34", "rgba(52, 73, 94, 0.4)", "rgba(0, 0, 0, 0.8)", "white", "#727575", "rgba(0, 0, 0, 0.5)"],
    /*body--------nav--------start------end--------text------subtext----border*/
    ["#fbe8a6", "#f4976c", "#b4dfe5", "#d2fdff", "#303c6c", "#303c6c94", "none"],
    ["#5a5560", "#46344e", "#9d8d8f", "#9b786f", "#fff", "#faed2682", "#none"],
    ["#5d5c61", "#b1a296", "#938e94", "#938e94", "#fff", "#303c6c94", "#fbeec1"],
    ["#5d5c61", "#46344e", "#46344e", "#46344e", "#fff", "#938e94", "#fbeec1"],
    ["#659dbd", "#bc986a", "#8d8741", "#daad86", "#fff", "#fbeec1", "#none"],
    ["#283747", "#46344e", "#283747", "#283747", "#fff", "#932432", "#DE354C"],
    ["#203647", "#007CC7", "#007CC7", "#4DA8DA", "#EEFBFB", "#EEFBFB", "#12232E"],
    ["#202020", "#3F3F3F", "#202020", "#3F3F3F", "#fff", "#707070", "#FFDf6C"],
    ["#164A41", "#39603D", "#3C403D", "#39603D", "#DADED4", "#DADED4", "#DE354C"],
    ["#E8CEBF", "#DDAF94", "#266150", "#266150", "#fff", "#fff", "#DDAF94"]]

function openNav() {
    document.querySelector("nav").style.width = "100%";
}

function closeNav() {
    document.querySelector("nav").style.width = "0%";
}

function loadColors(){
    let colornav = document.querySelector("#colorChangeButtons");
    for(let i = 1; i < options.length; i++){
        colornav.innerHTML += `<a href="#" data-value="${i}">option ${i}</a>`;
    }
}

function setStyling(e) {
    e.preventDefault();
    const id = e.target.getAttribute("data-value");
    let colorOptions = options[id];
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
        loadColors();
        document.querySelectorAll("#colorChangeButtons a").forEach(selected => selected.addEventListener("click", setStyling))
        let navEl = document.querySelector(".animation");
        navEl.classList.add(`start-${pageTag}`);
        document.querySelector("#openMenu").addEventListener("click", openNav);
        document.querySelector(".closebtn").addEventListener("click", closeNav);
    });
});
