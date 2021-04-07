"use strict";

function openNav()
{
	document.querySelector("nav").classList.add("open");
	document.querySelector("nav").classList.remove("close");
}

function closeNav()
{
	document.querySelector("nav").classList.remove("open");
	document.querySelector("nav").classList.add("close");
}

function setStyling(e)
{
	e.preventDefault();
	const id = e.target.getAttribute("data-value");
	let colorOptions = options[id];
	document.documentElement.style.setProperty('--primary', colorOptions[0]);
	document.documentElement.style.setProperty('--nav', colorOptions[1]);
	document.documentElement.style.setProperty('--nav-text', colorOptions[2]);
	document.documentElement.style.setProperty('--start-gradient', colorOptions[3]);
	document.documentElement.style.setProperty('--end-gradient', colorOptions[4]);
	document.documentElement.style.setProperty('--headers', colorOptions[5]);
	document.documentElement.style.setProperty('--subText', colorOptions[6]);
	document.documentElement.style.setProperty('--border-color', colorOptions[7]);
	if (window.innerWidth < 1050)
	{
		closeNav();
	}
}

$(document).ready(function()
{
	$("nav").load("nav.html", () =>
	{
		document.querySelector("#openMenu").addEventListener("click", openNav);
		document.querySelector(".closebtn").addEventListener("click", closeNav);

		if (document.querySelector("body").getAttribute("data-page") !== "portfolio")
		{
			$("#home").on('click', function(event)
			{
				event.preventDefault();

				closeNav();
				$('html, body').animate(
				{
					scrollTop: $("body").offset().top
				}, 800);
			});

			$("#about").on('click', function(event)
			{

				closeNav();
				$('html, body').animate(
				{
					scrollTop: $("#about>section").offset().top
				}, 800);
			});
		}
	});
});
