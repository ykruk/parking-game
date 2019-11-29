import createLoseScoreBlock from './lose-score-block.js';
import createWinScoreBlock from './win-score-block.js';
import createTimeOutBlock from './time-out-block.js';

import rotatePoint from './rotate-point.js';
import drawTarget from './draw-target.js';
import loadImages from './load-images.js';

import Timer from '../img/stopwatch.png';
import Hit from '../img/bam.png';
import Car from '../img/car1.png';
import Level1 from '../img/level1.png';


export default function createLevel1(canvasWidth, canvasHeight, gameSettings) {
  if (canvas && canvas.getContext('2d')) {
		let ctx = canvas.getContext('2d');

		gameSettings.level = 1;
    
		const levelSettings = {
			time: 300,
      carLife: 500,
      score: 0,
			hit: false,
			parked: false,
			finished: false,
    };
    
		const carSettings = {
			width: canvasWidth * 0.130, 
			height: canvasHeight * 0.142,
			x: canvasWidth * 0.260,
			y: canvasHeight * 0.740,
			angle: 180,
			speed: 3,
			mod: 0,
			ahead: false,
			back: false,
			left: false,
			right: false,
		};

		const fieldHitPoints = [
			{x: canvasWidth * 0.180,
			y: canvasHeight * 0.174},//0
			{x: canvasWidth * 0.818,
			y: canvasHeight * 0.174},//1
			{x: canvasWidth * 0.818,
			y: canvasHeight * 0.828},//2
			{x: canvasWidth * 0.202,
			y: canvasHeight * 0.828},//3
			{x: canvasWidth * 0.202,
			y: canvasHeight * 0.565},//4
			{x: canvasWidth * 0.213,
			y: canvasHeight * 0.565},//5				
			{x: canvasWidth * 0.213,
			y: canvasHeight * 0.513},//6
			{x: canvasWidth * 0.180,
			y: canvasHeight * 0.513},//7
		];

		const carHitPoints = [
			{x: (carSettings.width * 0.75) - canvasWidth * 0.02,
			y: (carSettings.height * 0.5) - canvasHeight * 0.125},//0
			{x: -(carSettings.width * 0.25) + canvasWidth * 0.014,
			y: (carSettings.height * 0.5) - canvasHeight * 0.125},//1
			
			{x: -(carSettings.width * 0.25),
			y: -(carSettings.height * 0.5) + canvasHeight * 0.035},//2
			{x: -(carSettings.width * 0.25),
			y: (carSettings.height * 0.5) - canvasHeight * 0.035},//3

			{x: -(carSettings.width * 0.25) + canvasWidth * 0.014,
			y: (carSettings.height * 0.5) - canvasHeight * 0.016},//4
			{x: (carSettings.width * 0.75)  - canvasWidth * 0.020,
			y: (carSettings.height * 0.5) - canvasHeight * 0.016},//5

			{x: (carSettings.width * 0.75) - canvasWidth * 0.005,
			y: (carSettings.height * 0.5) - canvasHeight * 0.043},//6
			{x: (carSettings.width * 0.75) - canvasWidth * 0.005,
			y: -(carSettings.height * 0.5) + canvasHeight * 0.043},//7
		];

		const fieldParkPoints = [
			{x: canvasWidth * 0.580,
			y: canvasHeight * 0.185},//0
			{x: canvasWidth * 0.656,
			y: canvasHeight * 0.185},//1
			{x: canvasWidth * 0.656,
			y: canvasHeight * 0.471},//2
			{x: canvasWidth * 0.580,
			y: canvasHeight * 0.471},//3
		];

		//подгрузить все изображения
		const images = loadImages([Level1, Car, Timer, Hit]);

		function drawMovement() {
			const min = Math.floor(levelSettings.time / 60) < 10 ? `0${Math.floor(levelSettings.time / 60)}` : Math.floor(levelSettings.time / 60);
			const sec = levelSettings.time%60 < 10 ? `0${levelSettings.time%60}` : levelSettings.time%60;

			drawBackground();
			drawTarget(ctx, canvasWidth * 0.586, canvasWidth * 0.650, canvasWidth * 0.650, canvasWidth * 0.586, canvasHeight * 0.192, canvasHeight * 0.192, canvasHeight * 0.463, canvasHeight * 0.463);
			drawCarLife();
			drawScore(ctx, canvasWidth * 0.5, canvasHeight * 0.935, canvasHeight * 0.08, `SCORE: ${gameSettings.totalScore}`);
			drawTimer(ctx, canvasWidth * 0.33, canvasHeight * 0.1, canvasHeight * 0.08, `${min}:${sec}`);
			drawCar();

			isHit();
			if (levelSettings.hit === true) drawHit();
			if (levelSettings.carLife <= 0 || levelSettings.time <= 0) gameOver();

			isParked();
			if (levelSettings.finished === true && (levelSettings.carLife !== 0 && levelSettings.time !== 0)) {
				levelWon();
			}
			
			let gameAnimation = window.requestAnimationFrame(drawMovement);
			if (levelSettings.finished === true) window.cancelAnimationFrame(gameAnimation);
		}
		drawMovement();

		function drawBackground() {
			ctx.fillStyle = '##686161';
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);
			ctx.drawImage(images[0], 0, 0, canvasWidth, canvasHeight);
		}
		
		function drawCar() {
			carSettings.x += (carSettings.speed * carSettings.mod) * Math.cos(toRad(carSettings.angle));
			carSettings.y += (carSettings.speed * carSettings.mod) * Math.sin(toRad(carSettings.angle));

			ctx.save();
			ctx.translate(carSettings.x, carSettings.y);
			ctx.rotate(toRad(carSettings.angle));
			ctx.drawImage(images[1], -(carSettings.width * 0.75), -(carSettings.height / 2),carSettings.width, carSettings.height);
			ctx.restore();
		}

		function drawCarLife() {
			drawBlock(ctx, canvasWidth * 0.150, canvasWidth * 0.170, canvasHeight * 0.120, canvasHeight * 0.760, '#2D0505', '#fbfb8f');
			drawBlock(ctx, canvasWidth * 0.150, canvasWidth * 0.170, (canvasHeight * 0.120) + (canvasHeight * 0.640) * (1 - levelSettings.carLife / 500), canvasHeight * 0.760, '#2D0505', '#fbe126');
			drawBlock(ctx, canvasWidth * 0.147, canvasWidth * 0.173, canvasHeight * 0.760, canvasHeight * 0.780, '#2D0505', '#2D0505');

			function drawBlock(ctx, x1, x2, y1, y2, colorStr, colorFill) {
				ctx.strokeStyle = colorStr;
				ctx.fillStyle = colorFill;
				ctx.lineWidth = 4;
				ctx.lineJoin = 'bevel';
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x1, y2);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x2, y1);
				ctx.lineTo(x1, y1);
				ctx.stroke();
				ctx.fill();
			}
		}

    function drawScore(ctx, x, y, fontSize, text) {
      ctx.fillStyle = '#E1FF9A';
      ctx.strokeStyle = '#3e2702';
      ctx.lineWidth = 2;
			ctx.font = `bold ${fontSize}px Arial`;
			ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
      ctx.strokeText(text, x, y);
		}

		function drawTimer(ctx, x, y, fontSize, text) {
      ctx.fillStyle = '#E1FF9A';
      ctx.strokeStyle = '#3e2702';
      ctx.lineWidth = 2;
			ctx.font = `bold ${fontSize}px Arial`;
			ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
			ctx.strokeText(text, x, y);
			
			ctx.drawImage(images[2], x - canvasWidth * 0.10, y - canvasHeight * 0.07, fontSize, fontSize);
		}

		const timerID1 = setInterval(() => {
			levelSettings.time -= 1;
		}, 1000);

		function drawHit() {
			const image = images[3];
			ctx.drawImage(image, carSettings.x - (image.width * 0.3), carSettings.y - (image.height * 0.3), image.width * 0.6, image.height * 0.6);
			
			setTimeout(() => {
				levelSettings.hit = false;
			}, 1000);
		}

		function makeHit() {
			carSettings.mod = 0;
			levelSettings.hit = true;
			levelSettings.carLife -= 15;
		}

		function isHit() {
			carHitPoints.forEach((elemP) => {
				const X = carSettings.x + rotatePoint(elemP.x, elemP.y, carSettings.angle).x;
				const Y = carSettings.y + rotatePoint(elemP.x, elemP.y, carSettings.angle).y;

				if (X < fieldHitPoints[0].x && (Y > fieldHitPoints[0].y && Y < fieldHitPoints[7].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if (X < fieldHitPoints[5].x && (Y > fieldHitPoints[6].y && Y < fieldHitPoints[5].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if (X < fieldHitPoints[3].x && (Y > fieldHitPoints[4].y && Y < fieldHitPoints[3].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if (X > fieldHitPoints[1].x && (Y > fieldHitPoints[1].y && Y < fieldHitPoints[2].y)) {
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if (Y < fieldHitPoints[0].y && (X > fieldHitPoints[0].x && X < fieldHitPoints[1].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if ((Y < fieldHitPoints[4].y && Y > fieldHitPoints[6].y) && (X > fieldHitPoints[4].x && X < fieldHitPoints[5].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if ((Y > fieldHitPoints[7].y && Y < fieldHitPoints[5].y) && (X > fieldHitPoints[7].x && X < fieldHitPoints[6].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
				} else if (Y > fieldHitPoints[2].y && (X > fieldHitPoints[3].x && X < fieldHitPoints[2].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
				}
      });
		}

		function gameOver() {
			levelSettings.finished = true;
			
      document.removeEventListener('keydown', keypress_handler, false);
      document.removeEventListener('keyup', keyup_handler, false);
			window.clearInterval(timerID1);
			
      if(levelSettings.carLife <= 0) {
				levelSettings.carLife = 0;
				createLoseScoreBlock(canvasWidth, canvasHeight, gameSettings);
			}
			      
      if(levelSettings.time <= 0) {
				levelSettings.time = 0;
				createTimeOutBlock(canvasWidth, canvasHeight, gameSettings);
			}
		}

		function isParked() {

			let check = carHitPoints.every((elemP) => {
				const X = carSettings.x + rotatePoint(elemP.x, elemP.y, carSettings.angle).x;
				const Y = carSettings.y + rotatePoint(elemP.x, elemP.y, carSettings.angle).y;

				return (X > fieldParkPoints[0].x && X < fieldParkPoints[1].x) && (Y > fieldParkPoints[0].y && Y < fieldParkPoints[2].y);
			});

			if (check) {
        levelSettings.parked = true;
        checkParking();
			} else {
				levelSettings.parked = false;
			}
		}

		function checkParking() {
			setTimeout(() => {
				if (levelSettings.parked === true) {
					levelSettings.parked = false;
					levelSettings.finished = true;
				};
			}, 2000);
		}

		function levelWon() {
			window.clearInterval(timerID1);
			document.removeEventListener('keydown', keypress_handler, false);
			document.removeEventListener('keyup', keyup_handler, false);

			levelSettings.score = Math.floor(levelSettings.time * levelSettings.carLife / 100) * gameSettings.level;
			gameSettings.totalScore += levelSettings.score;			
			
			createWinScoreBlock(canvasWidth, canvasHeight, gameSettings, levelSettings.score);
		}

		document.addEventListener('keydown', keypress_handler, false);
  	document.addEventListener('keyup', keyup_handler, false);

		function keyup_handler(event) {
			switch (event.keyCode) {
				case 38:
					carSettings.ahead = false;
				case 40:
					carSettings.back = 'off';
					carSettings.mod = 0;
					carSettings.speed = 3;
					break;
				case 37:
					carSettings.left = 'off';
					break;
				case 39:
					carSettings.right = 'off';
					break;
				default:
					break;
			}
		}

		function keypress_handler(event) {
			switch (event.keyCode) {
				case 38:
					carSettings.mod = -1;
					carSettings.speed += 0.3
					if(carSettings.left === true) {carSettings.angle -= 3};
					if(carSettings.right === true) {carSettings.angle += 3};
					carSettings.ahead = true;
					break;
				case 40:
					carSettings.mod = 1;
					carSettings.speed += 0.2;
					if(carSettings.left === true) {carSettings.angle += 3};
					if(carSettings.right === true) {carSettings.angle -= 3};
					carSettings.back = true;
					break;
				case 37:
					if(carSettings.ahead === true) {carSettings.angle -= 3};
					if(carSettings.back === true) {carSettings.angle += 3};
					carSettings.left = true;
					break;
				case 39:
					if(carSettings.ahead === true) {carSettings.angle += 3};
					if(carSettings.back === true) {carSettings.angle -= 3};
					carSettings.right = true;
					break;
				default:
					break;
			}
		}
  }
}

function toRad(degree) {
	return degree * Math.PI / 180;
}
