import createLoseScoreBlock from './lose-score-block.js';
import createWinScoreBlock from './win-score-block.js';
import createTimeOutBlock from './time-out-block.js';

import rotatePoint from './rotate-point.js';
import drawTarget from './draw-target.js';
import loadImages from './load-images.js';

import Timer from '../img/stopwatch.png';
import Hit from '../img/bam.png';
import Car from '../img/car1.png';
import Level2 from '../img/level2.png';


export default function createLevel2(canvasWidth, canvasHeight, gameSettings) {
  if (canvas && canvas.getContext('2d')) {
    let ctx = canvas.getContext('2d');
    
    gameSettings.level = 2;
		
		const levelSettings = {
			time: 270,
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
			{x: canvasWidth * 0.470,
      y: canvasHeight * 0.174},//1 yel car
      {x: canvasWidth * 0.420,
      y: canvasHeight * 0.415},//2 yel car
      {x: canvasWidth * 0.475,
      y: canvasHeight * 0.455},//3 yel car
      {x: canvasWidth * 0.540,
      y: canvasHeight * 0.174},//4 yel car
      {x: canvasWidth * 0.680,
      y: canvasHeight * 0.174},//5 red car
      {x: canvasWidth * 0.645,
      y: canvasHeight * 0.415},//6 red car
      {x: canvasWidth * 0.705,
      y: canvasHeight * 0.445},//7 red car
      {x: canvasWidth * 0.745,
      y: canvasHeight * 0.174},//8 red car
      {x: canvasWidth * 0.818,
      y: canvasHeight * 0.174},//9 corner
      {x: canvasWidth * 0.818,
      y: canvasHeight * 0.630},//10 trash
			{x: canvasWidth * 0.672,
      y: canvasHeight * 0.630},//11 trash
			{x: canvasWidth * 0.672,
      y: canvasHeight * 0.828},//12 trash
      {x: canvasWidth * 0.202,
      y: canvasHeight * 0.828},//13 entry
			{x: canvasWidth * 0.202,
			y: canvasHeight * 0.565},//14
			{x: canvasWidth * 0.213,
			y: canvasHeight * 0.565},//15				
			{x: canvasWidth * 0.213,
			y: canvasHeight * 0.513},//16
			{x: canvasWidth * 0.180,
			y: canvasHeight * 0.513},//17
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
			{x: canvasWidth * 0.601,
			y: canvasHeight * 0.185},//0
			{x: canvasWidth * 0.667,
			y: canvasHeight * 0.185},//1
			{x: canvasWidth * 0.626,
			y: canvasHeight * 0.460},//2
			{x: canvasWidth * 0.560,
			y: canvasHeight * 0.460},//3
		];

    //подгрузить все изображения
		const images = loadImages([Level2, Car, Timer, Hit]);

		function drawMovement() {
      const min = Math.floor(levelSettings.time / 60) < 10 ? `0${Math.floor(levelSettings.time / 60)}` : Math.floor(levelSettings.time / 60);
      const sec = levelSettings.time%60 < 10 ? `0${levelSettings.time%60}` : levelSettings.time%60;

      drawBackground();
      drawTarget(ctx, canvasWidth * 0.603, canvasWidth * 0.663, canvasWidth * 0.624, canvasWidth * 0.564, canvasHeight * 0.192, canvasHeight * 0.192, canvasHeight * 0.452, canvasHeight * 0.452);
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
      ctx.drawImage(images[1], -(carSettings.width * 0.75), -(carSettings.height / 2), carSettings.width, carSettings.height);
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

				function getLine(x1, y1, x2, y2) {
					const diffX = x1 - x2;
					const diffY = y1 - y2;

					const a = diffY / diffX;
					const b = y1 - a * x1;

					return {a: a, b: b};
				};

				if (X < fieldHitPoints[0].x && (Y > fieldHitPoints[0].y && Y < fieldHitPoints[17].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[2].x && X < fieldHitPoints[1].x) && (Y > (getLine(fieldHitPoints[1].x, fieldHitPoints[1].y, fieldHitPoints[2].x, fieldHitPoints[2].y).a * X + getLine(fieldHitPoints[1].x, fieldHitPoints[1].y, fieldHitPoints[2].x, fieldHitPoints[2].y).b)) && (Y < fieldHitPoints[2].y)) { /*желтое авто лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[2].x && X < fieldHitPoints[3].x) && (Y < (getLine(fieldHitPoints[2].x, fieldHitPoints[2].y, fieldHitPoints[3].x, fieldHitPoints[3].y).a * X + getLine(fieldHitPoints[2].x, fieldHitPoints[2].y, fieldHitPoints[3].x, fieldHitPoints[3].y).b)) && (Y < fieldHitPoints[3].y && Y > fieldHitPoints[2].y)) { /*желтое авто низ*/
					carSettings.x -= (carSettings.speed + 1);
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[3].x && X < fieldHitPoints[4].x) && (Y < (getLine(fieldHitPoints[3].x, fieldHitPoints[3].y, fieldHitPoints[4].x, fieldHitPoints[4].y).a * X + getLine(fieldHitPoints[3].x, fieldHitPoints[3].y, fieldHitPoints[4].x, fieldHitPoints[4].y).b)) && (Y < fieldHitPoints[3].y)) { /*желтое авто прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[6].x && X < fieldHitPoints[5].x) && (Y > (getLine(fieldHitPoints[5].x, fieldHitPoints[5].y, fieldHitPoints[6].x, fieldHitPoints[6].y).a * X + getLine(fieldHitPoints[5].x, fieldHitPoints[5].y, fieldHitPoints[6].x, fieldHitPoints[6].y).b)) && (Y < fieldHitPoints[6].y)) { /*красное авто лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[6].x && X < fieldHitPoints[7].x) && (Y < (getLine(fieldHitPoints[6].x, fieldHitPoints[6].y, fieldHitPoints[7].x, fieldHitPoints[7].y).a * X + getLine(fieldHitPoints[6].x, fieldHitPoints[6].y, fieldHitPoints[7].x, fieldHitPoints[7].y).b)) && (Y < fieldHitPoints[7].y && Y > fieldHitPoints[6].y)) { /*красное авто низ*/
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[7].x && X < fieldHitPoints[8].x) && (Y < (getLine(fieldHitPoints[7].x, fieldHitPoints[7].y, fieldHitPoints[8].x, fieldHitPoints[8].y).a * X + getLine(fieldHitPoints[7].x, fieldHitPoints[7].y, fieldHitPoints[8].x, fieldHitPoints[8].y).b)) && (Y < fieldHitPoints[7].y)) { /*красное авто прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if (X > fieldHitPoints[9].x && (Y > fieldHitPoints[9].y && Y < fieldHitPoints[10].y)) {
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
        } else if (X > fieldHitPoints[11].x && (Y > fieldHitPoints[11].y && Y < fieldHitPoints[12].y)) {
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
        } else if (X < fieldHitPoints[13].x && (Y > fieldHitPoints[14].y && Y < fieldHitPoints[13].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
        } else if (X < fieldHitPoints[15].x && (Y > fieldHitPoints[16].y && Y < fieldHitPoints[15].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[0].y && (X > fieldHitPoints[0].x && X < fieldHitPoints[1].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[4].y && (X > fieldHitPoints[4].x && X < fieldHitPoints[5].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[8].y && (X > fieldHitPoints[8].x && X < fieldHitPoints[9].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y > fieldHitPoints[10].y && (X > fieldHitPoints[11].x && X < fieldHitPoints[10].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
        } else if (Y > fieldHitPoints[12].y && (X > fieldHitPoints[13].x && X < fieldHitPoints[12].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
        } else if ((Y > fieldHitPoints[16].y && Y < fieldHitPoints[15].y) && (X > fieldHitPoints[17].x && X < fieldHitPoints[16].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
        }
			});
		}

		function gameOver() {
			levelSettings.finished = true;
			levelSettings.score = 0;

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
			function getLine(x1, y1, x2, y2) {
				const diffX = x1 - x2;
				const diffY = y1 - y2;

				const a = diffY / diffX;
				const b = y1 - a * x1;

				return {a: a, b: b};
			};

			let check = carHitPoints.every((elemP) => {
				const X = carSettings.x + rotatePoint(elemP.x, elemP.y, carSettings.angle).x;
				const Y = carSettings.y + rotatePoint(elemP.x, elemP.y, carSettings.angle).y;

				return ((X > (Y - getLine(fieldParkPoints[0].x, fieldParkPoints[0].y, fieldParkPoints[3].x, fieldParkPoints[3].y).b) / getLine(fieldParkPoints[0].x, fieldParkPoints[0].y, fieldParkPoints[3].x, fieldParkPoints[3].y).a) && (X < (Y - getLine(fieldParkPoints[1].x, fieldParkPoints[1].y, fieldParkPoints[2].x, fieldParkPoints[2].y).b) / getLine(fieldParkPoints[1].x, fieldParkPoints[1].y, fieldParkPoints[2].x, fieldParkPoints[2].y).a)) && (Y > fieldParkPoints[0].y && Y < fieldParkPoints[2].y);
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
