"use strict";

function openNav() {
    document.querySelector("nav").style.width = "100%";
}

function closeNav() {
    document.querySelector("nav").style.width = "0%";
}

function loadColors() {
    let colornav = document.querySelector("#colorChangeButtons");
    for (let i = 1; i < options.length; i++) {
        colornav.innerHTML += `<a href="#" data-value="${i}">option ${i}</a>`;
    }
}


$(document).ready(function () {
    $("nav").load("nav.html", () => {
        document.querySelector("#openMenu").addEventListener("click", openNav);
        document.querySelector(".closebtn").addEventListener("click", closeNav);
    });
});
