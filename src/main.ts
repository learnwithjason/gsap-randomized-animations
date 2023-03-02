import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/all';

import './style.css';

gsap.registerPlugin(MotionPathPlugin);

const heartTemplate: HTMLTemplateElement = document.querySelector('#heart')!;
const container: HTMLElement = document.querySelector('.container')!;
const button: HTMLElement = document.querySelector('.button')!;

const w = container.clientWidth;
const endY = container.clientHeight * -1.2;

button.addEventListener('click', (event) => {
  event.preventDefault();

  const heart = heartTemplate.content.firstElementChild!.cloneNode(true);

  const width = gsap.utils.random(40, 70);
  const initialX = gsap.utils.random(0, w - width);

  const floatDirection = gsap.utils.random([-1, 1]);
  const getNextX = (dir: number): number => {
    return gsap.utils.random(initialX, initialX + 200 * dir);
  };

  gsap.set(heart, {
    scale: 0.2,
    width,
    x: initialX,
    y: 0,
  });

  container.appendChild(heart);

  gsap
    .to(heart, {
      duration: 2,
      motionPath: {
        autoRotate: 90,
        curviness: 1.25,
        path: [
          {
            x: getNextX(floatDirection), // first float one direction
            y: endY / gsap.utils.random(2, 4), // vary direction change point
            scale: gsap.utils.random(1.2, 1.5),
          },
          {
            x: getNextX(floatDirection * -1), // second float goes the other way
            y: endY,
            scale: 1,
          },
        ],
      },
      ease: 'power1.in',
      onComplete: () => {
        container.removeChild(heart);
      },
    })
    .play();
});
