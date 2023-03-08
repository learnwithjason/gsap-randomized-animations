import { gsap } from "gsap";

import "./style.css";

const heartTemplate: HTMLTemplateElement = document.querySelector("#heart")!;
const container = document.querySelector(".container")!;
const button = document.querySelector(".button")!;

const endY = container.clientHeight * -1.2;
const w = container.clientWidth;

button.addEventListener("click", (event) => {
	event.preventDefault();

	const heart = heartTemplate.content.firstElementChild!.cloneNode(true);

	const width = gsap.utils.random(40, 70);

	const initialX = gsap.utils.random(0, w - width);

	gsap.set(heart, {
		width,
		x: initialX,
	});

	container.appendChild(heart);

	gsap.to(heart, {
		duration: 2,
		y: endY,
		onComplete: () => {
			container.removeChild(heart);
		},
	});
});
