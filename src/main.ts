import { gsap } from "gsap";

import "./style.css";

const heartTemplate: HTMLTemplateElement = document.querySelector("#heart")!;
const container = document.querySelector(".container")!;
const button = document.querySelector(".button")!;

const endY = container.clientHeight * -1.2;

button.addEventListener("click", (event) => {
	event.preventDefault();

	const heart = heartTemplate.content.firstElementChild!.cloneNode(true);

	container.appendChild(heart);

	gsap.to(heart, {
		duration: 2,
		y: endY,
		onComplete: () => {
			container.removeChild(heart);
		},
	});
});
