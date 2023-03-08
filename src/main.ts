import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/all";

gsap.registerPlugin(MotionPathPlugin);

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

	const floatDirection = gsap.utils.random([-1, 1]);

	const getNextX = (dir: number): number => {
		return gsap.utils.random(initialX, initialX + 200 * dir);
	};

	gsap.set(heart, {
		width,
		x: initialX,
	});

	container.appendChild(heart);

	gsap.to(heart, {
		duration: 2,
		motionPath: {
			autoRotate: 90,
			curviness: 1.25,
			path: [
				{
					x: getNextX(floatDirection),
					y: endY / gsap.utils.random(2, 4),
				},
				{
					x: getNextX(floatDirection * -1), // reverse float direction
					y: endY,
				},
			],
		},
		onComplete: () => {
			container.removeChild(heart);
		},
	});
});
