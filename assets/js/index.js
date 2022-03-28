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

	const experiencesSection = document.querySelector(".experiences>div");
	const projectsSection = document.querySelector(".projects>div");

	fetch("../../experiences.json")
	.then(response => {
		return response.json();
	}).then(output =>{
		const experiences = output.Experiences
		const projects = output.projects
		for(const o in experiences){
			const el = experiences[o];

			const art = `<article class="${el.Class}">
							<div class="blur"></div>
							<h4>${el.Location}</h4>
							<div class="overlay">
								<p>${el.Description}</p>
							</div>
						</article>`
			console.log(el);
			experiencesSection.innerHTML += art;
		}
		for(const o in projects){
			const el = projects[o];

			const art = `<article class="${el.Class}">
							<div class="blur"></div>
							<h4>${el.Location}</h4>
							<div class="overlay">
								<p>${el.Description}</p>
							</div>
						</article>`
			console.log(el);
			projectsSection.innerHTML += art;
		}
	})
}
