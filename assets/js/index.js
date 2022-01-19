"use strict";
const colors = {
	"Charleston Green": "0b2027",
	"Pastel Pink": "deb1b1",
	Skobeloff: "286666",
	Silver: "c6c6c6",
	Charcoal: "2a4651",
};

window.addEventListener("DOMContentLoaded", init);

function init() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;

	document.querySelector(".scroll").addEventListener("click", (e) => {
		e.preventDefault();
		document
			.querySelector("section")
			.scrollIntoView({ behavior: "smooth", block: "end" });
	});
}
