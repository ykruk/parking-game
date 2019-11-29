import _ from 'lodash';
import './style.css';

//import scripts
import createMainMenu from './scripts/main-menu.js';


const gameSettings = {
	level: 1,
	levelScore: 0,
	totalScore: 0,
};

function createCanvas() {
  const element = document.createElement('canvas');

  element.id = 'canvas';

  return element;
}

document.body.appendChild(createCanvas());

const canvas = document.getElementById('canvas');
const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;

canvas.width = canvasWidth;
canvas.height = canvasHeight;


createMainMenu(canvasWidth, canvasHeight, gameSettings);
