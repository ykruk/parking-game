import createLoseScoreBlock from './lose-score-block.js';
import createWinScoreBlock from './win-score-block.js';
import createTimeOutBlock from './time-out-block.js';

import rotatePoint from './rotate-point.js';
import drawTarget from './draw-target.js';
import loadImages from './load-images.js';

import Timer from '../img/stopwatch.png';
import Hit from '../img/bam.png';
import Car from '../img/car1.png';
import Level4 from '../img/level4.png';


export default function createLevel2(canvasWidth, canvasHeight, gameSettings) {
  if (canvas && canvas.getContext('2d')) {
		let ctx = canvas.getContext('2d');

		gameSettings.level = 4;
		
		const levelSettings = {
			time: 210,
			carLife: 500,
			score: 0,
			hit: false,
			parked: false,
			finished: false,
    };
    
		const carSettings = {
			width: canvasWidth * 0.104, 
			height: canvasHeight * 0.114,
			x: canvasWidth * 0.760,
			y: canvasHeight * 0.740,
			angle: 0,
			speed: 3,
			mod: 0,
			ahead: false,
			back: false,
			left: false,
			right: false,
		};

		const fieldHitPoints = [
			{x: canvasWidth * 0.200,
			y: canvasHeight * 0.174},//0
			{x: canvasWidth * 0.335,
      y: canvasHeight * 0.174},//1 red car
      {x: canvasWidth * 0.335,
      y: canvasHeight * 0.385},//2 red car
      {x: canvasWidth * 0.385,
      y: canvasHeight * 0.385},//3 red car
      {x: canvasWidth * 0.385,
      y: canvasHeight * 0.174},//4 red car
      {x: canvasWidth * 0.550,
      y: canvasHeight * 0.174},//5 yel car
      {x: canvasWidth * 0.540,
      y: canvasHeight * 0.384},//6 yel car
      {x: canvasWidth * 0.590,
      y: canvasHeight * 0.384},//7 yel car
      {x: canvasWidth * 0.600,
      y: canvasHeight * 0.174},//8 yel car
      {x: canvasWidth * 0.650,
      y: canvasHeight * 0.174},//9 gr car
      {x: canvasWidth * 0.650,
      y: canvasHeight * 0.390},//10 gr car
			{x: canvasWidth * 0.765,
      y: canvasHeight * 0.390},//11 blue car
			{x: canvasWidth * 0.765,
      y: canvasHeight * 0.174},//12 blue car
      {x: canvasWidth * 0.836,
      y: canvasHeight * 0.174},//13 corner
			{x: canvasWidth * 0.836,
			y: canvasHeight * 0.585},//14 entry
			{x: canvasWidth * 0.810,
			y: canvasHeight * 0.585},//15 entry	
			{x: canvasWidth * 0.810,
			y: canvasHeight * 0.825},//16 entry
			{x: canvasWidth * 0.250,
			y: canvasHeight * 0.825},//17 red car
			{x: canvasWidth * 0.285,
			y: canvasHeight * 0.635},//18 red car
			{x: canvasWidth * 0.275,
			y: canvasHeight * 0.565},//19 trash
			{x: canvasWidth * 0.275,
			y: canvasHeight * 0.410},//20 trash
			{x: canvasWidth * 0.200,
			y: canvasHeight * 0.410},//21 trash
			{x: canvasWidth * 0.660,
			y: canvasHeight * 0.625},//22 bus-wall right
			{x: canvasWidth * 0.685,
			y: canvasHeight * 0.625},//23 wall r
			{x: canvasWidth * 0.685,
			y: canvasHeight * 0.680},//24 wall r down
			{x: canvasWidth * 0.400,
			y: canvasHeight * 0.680},//25 wall l down
			{x: canvasWidth * 0.400,
			y: canvasHeight * 0.625},//26 wall l
			{x: canvasWidth * 0.455,
			y: canvasHeight * 0.625},//27 bus-wall l
			{x: canvasWidth * 0.455,
			y: canvasHeight * 0.500},//28 bus l
			{x: canvasWidth * 0.660,
			y: canvasHeight * 0.500},//29 bus r
		];

		const carHitPoints = [
			{x: (carSettings.width * 0.75) - canvasWidth * 0.02,
			y: (carSettings.height * 0.5) - canvasHeight * 0.1},//0
			{x: -(carSettings.width * 0.25) + canvasWidth * 0.014,
			y: (carSettings.height * 0.5) - canvasHeight * 0.1},//1
			
			{x: -(carSettings.width * 0.25),
			y: -(carSettings.height * 0.5) + canvasHeight * 0.035},//2
			{x: -(carSettings.width * 0.25),
			y: (carSettings.height * 0.5) - canvasHeight * 0.035},//3

			{x: -(carSettings.width * 0.25) + canvasWidth * 0.014,
			y: (carSettings.height * 0.5) - canvasHeight * 0.016},//4
			{x: (carSettings.width * 0.75)  - canvasWidth * 0.020,
			y: (carSettings.height * 0.5) - canvasHeight * 0.016},//5

			{x: (carSettings.width * 0.75) - canvasWidth * 0.004,
			y: (carSettings.height * 0.5) - canvasHeight * 0.043},//6
			{x: (carSettings.width * 0.75) - canvasWidth * 0.004,
			y: -(carSettings.height * 0.5) + canvasHeight * 0.043},//7
		];

		const fieldParkPoints = [
			{x: canvasWidth * 0.456,
			y: canvasHeight * 0.185},//0
			{x: canvasWidth * 0.514,
			y: canvasHeight * 0.185},//1
			{x: canvasWidth * 0.514,
			y: canvasHeight * 0.404},//2
			{x: canvasWidth * 0.456,
			y: canvasHeight * 0.404},//3
		];

		
		//подгрузить все изображения
		const images = loadImages([Level4, Car, Timer, Hit]);

		function drawMovement() {
			const min = Math.floor(levelSettings.time / 60) < 10 ? `0${Math.floor(levelSettings.time / 60)}` : Math.floor(levelSettings.time / 60);
			const sec = levelSettings.time%60 < 10 ? `0${levelSettings.time%60}` : levelSettings.time%60;

			drawBackground();
			drawTarget(ctx, canvasWidth * 0.460, canvasWidth * 0.512, canvasWidth * 0.460, canvasWidth * 0.512, canvasHeight * 0.189, canvasHeight * 0.189, canvasHeight * 0.395, canvasHeight * 0.395);
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
			drawBlock(ctx, canvasWidth * 0.130, canvasWidth * 0.150, canvasHeight * 0.120, canvasHeight * 0.760, '#2D0505', '#fbfb8f');
			drawBlock(ctx, canvasWidth * 0.130, canvasWidth * 0.150, (canvasHeight * 0.120) + (canvasHeight * 0.640) * (1 - levelSettings.carLife / 500), canvasHeight * 0.760, '#2D0505', '#fbe126');
			drawBlock(ctx, canvasWidth * 0.127, canvasWidth * 0.153, canvasHeight * 0.760, canvasHeight * 0.780, '#2D0505', '#2D0505');

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

				if (X < fieldHitPoints[0].x && (Y > fieldHitPoints[0].y && Y < fieldHitPoints[21].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
        } else if ((X > fieldHitPoints[1].x && X < fieldHitPoints[1].x + 10) && (Y > fieldHitPoints[1].y && Y < fieldHitPoints[2].y)) { /*кр машина лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
        } else if ((X < fieldHitPoints[3].x && X > fieldHitPoints[3].x - 10) && (Y > fieldHitPoints[4].y && Y < fieldHitPoints[3].y)) { /*кр машина прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
        } else if ((X > fieldHitPoints[6].x && X < fieldHitPoints[5].x) && (Y > (getLine(fieldHitPoints[5].x, fieldHitPoints[5].y, fieldHitPoints[6].x, fieldHitPoints[6].y).a * X + getLine(fieldHitPoints[5].x, fieldHitPoints[5].y, fieldHitPoints[6].x, fieldHitPoints[6].y).b)) && (Y < fieldHitPoints[6].y)) { /*желт авто лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[8].x && X < fieldHitPoints[7].x) && (Y < (getLine(fieldHitPoints[7].x, fieldHitPoints[7].y, fieldHitPoints[8].x, fieldHitPoints[8].y).a * X + getLine(fieldHitPoints[7].x, fieldHitPoints[7].y, fieldHitPoints[8].x, fieldHitPoints[8].y).b)) && (Y < fieldHitPoints[8].y)) { /*желт авто прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[9].x && X < fieldHitPoints[9].x + 10) && (Y > fieldHitPoints[9].y && Y < fieldHitPoints[10].y)) { /*зел машина лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
        } //else if ((X < fieldHitPoints[11].x && X < fieldHitPoints[11].x - 10) && (Y > fieldHitPoints[12].y && Y < fieldHitPoints[11].y)) { /*син машина прав*/
				// 	carSettings.x += (carSettings.speed + 1);
				// 	makeHit();
				// } 
				else if (X > fieldHitPoints[13].x && (Y > fieldHitPoints[13].y && Y < fieldHitPoints[14].y)) {
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if (X > fieldHitPoints[15].x && (Y > fieldHitPoints[15].y && Y < fieldHitPoints[16].y)) {
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[17].x && X < fieldHitPoints[18].x) && (Y < (getLine(fieldHitPoints[17].x, fieldHitPoints[17].y, fieldHitPoints[18].x, fieldHitPoints[18].y).a * X + getLine(fieldHitPoints[17].x, fieldHitPoints[17].y, fieldHitPoints[18].x, fieldHitPoints[18].y).b)) && (Y > fieldHitPoints[18].y)) { /*крас авто прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[19].x && X < fieldHitPoints[18].x) && (Y < (getLine(fieldHitPoints[18].x, fieldHitPoints[18].y, fieldHitPoints[19].x, fieldHitPoints[19].y).a * X + getLine(fieldHitPoints[18].x, fieldHitPoints[18].y, fieldHitPoints[19].x, fieldHitPoints[19].y).b)) && (Y > fieldHitPoints[19].y && Y < fieldHitPoints[18].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X < fieldHitPoints[19].x) && (Y > fieldHitPoints[20].y && Y < fieldHitPoints[19].y)) { /*мусорка прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if (Y < fieldHitPoints[0].y && (X > fieldHitPoints[0].x && X < fieldHitPoints[1].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[2].y && (X > fieldHitPoints[2].x && X < fieldHitPoints[3].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[4].y && (X > fieldHitPoints[4].x && X < fieldHitPoints[5].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[6].y && (X > fieldHitPoints[6].x && X < fieldHitPoints[7].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[8].y && (X > fieldHitPoints[8].x && X < fieldHitPoints[9].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[10].y && (X > fieldHitPoints[10].x && X < fieldHitPoints[11].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[12].y && (X > fieldHitPoints[12].x && X < fieldHitPoints[13].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y > fieldHitPoints[14].y && (X > fieldHitPoints[15].x && X < fieldHitPoints[14].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
        } else if (Y > fieldHitPoints[16].y && (X > fieldHitPoints[17].x && X < fieldHitPoints[16].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
        } else if (Y > fieldHitPoints[20].y && (X > fieldHitPoints[21].x && X < fieldHitPoints[20].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
				}
				
				else if ((X < fieldHitPoints[23].x && X > fieldHitPoints[23].x - 10) && (Y > fieldHitPoints[23].y && Y < fieldHitPoints[24].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
        } else if ((X > fieldHitPoints[25].x && X < fieldHitPoints[25].x + 10) && (Y > fieldHitPoints[26].y && Y < fieldHitPoints[25].y)) {
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
        } else if ((X > fieldHitPoints[27].x && X < fieldHitPoints[27].x + 10) && (Y > fieldHitPoints[28].y && Y < fieldHitPoints[27].y)) {
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
        } else if ((X < fieldHitPoints[22].x && X > fieldHitPoints[22].x - 10) && (Y > fieldHitPoints[29].y && Y < fieldHitPoints[24].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
        } else if ((Y > fieldHitPoints[23].y && Y < fieldHitPoints[23].y + 10) && (X > fieldHitPoints[22].x && X < fieldHitPoints[23].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
        } else if ((Y < fieldHitPoints[24].y && Y > fieldHitPoints[24].y - 10) && (X > fieldHitPoints[25].x && X < fieldHitPoints[24].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if ((Y > fieldHitPoints[26].y && Y < fieldHitPoints[26].y + 10) && (X > fieldHitPoints[26].x && X < fieldHitPoints[27].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
        } else if ((Y > fieldHitPoints[28].y && Y < fieldHitPoints[28].y + 10) && (X > fieldHitPoints[28].x && X < fieldHitPoints[29].x)) {
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
			let check = carHitPoints.every((elemP) => {
				const X = carSettings.x + rotatePoint(elemP.x, elemP.y, carSettings.angle).x;
				const Y = carSettings.y + rotatePoint(elemP.x, elemP.y, carSettings.angle).y;

				return (X > fieldParkPoints[0].x && X < fieldParkPoints[1].x) && (Y > fieldParkPoints[1].y && Y < fieldParkPoints[2].y);
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
