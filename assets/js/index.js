document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector("#openMenu").addEventListener("click", openNav);
    document.querySelector(".closebtn").addEventListener("click", closeNav);
}

function openNav() {
    document.querySelector("nav").style.width = "100%";
}

function closeNav() {
    document.querySelector("nav").style.width = "0%";
}