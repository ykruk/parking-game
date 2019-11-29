import createLoseScoreBlock from './lose-score-block.js';
import createWinScoreBlock from './win-score-block.js';
import createTimeOutBlock from './time-out-block.js';

import rotatePoint from './rotate-point.js';
import drawTarget from './draw-target.js';
import loadImages from './load-images.js';

import Timer from '../img/stopwatch.png';
import Hit from '../img/bam.png';
import Car from '../img/car1.png';
import Level3 from '../img/level3.png';


export default function createLevel2(canvasWidth, canvasHeight, gameSettings) {
  if (canvas && canvas.getContext('2d')) {
		let ctx = canvas.getContext('2d');

		gameSettings.level = 3;
		
		const levelSettings = {
			time: 240,
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
			{x: canvasWidth * 0.420,
      y: canvasHeight * 0.174},//1 blue car
      {x: canvasWidth * 0.375,
      y: canvasHeight * 0.370},//2 blue car
      {x: canvasWidth * 0.420,
      y: canvasHeight * 0.400},//3 blue car
      {x: canvasWidth * 0.435,
      y: canvasHeight * 0.350},//4 blue car
      {x: canvasWidth * 0.490,
      y: canvasHeight * 0.395},//5 red car
      {x: canvasWidth * 0.545,
      y: canvasHeight * 0.174},//6 red car
      {x: canvasWidth * 0.625,
      y: canvasHeight * 0.174},//7 yel car
      {x: canvasWidth * 0.580,
      y: canvasHeight * 0.365},//8 yel car
      {x: canvasWidth * 0.635,
      y: canvasHeight * 0.395},//9 yel car
      {x: canvasWidth * 0.685,
      y: canvasHeight * 0.174},//10 yel car
			{x: canvasWidth * 0.755,
      y: canvasHeight * 0.174},//11 gr car
			{x: canvasWidth * 0.715,
      y: canvasHeight * 0.360},//12 gr car
      {x: canvasWidth * 0.765,
      y: canvasHeight * 0.385},//13 gr car
			{x: canvasWidth * 0.836,
			y: canvasHeight * 0.385},//14 r wall
			{x: canvasWidth * 0.836,
			y: canvasHeight * 0.460},//15	r wall		
			{x: canvasWidth * 0.700,
			y: canvasHeight * 0.460},//16 red car
			{x: canvasWidth * 0.700,
			y: canvasHeight * 0.550},//17 red car
			{x: canvasWidth * 0.810,
			y: canvasHeight * 0.550},//18 red car
			{x: canvasWidth * 0.810,
			y: canvasHeight * 0.825},//19	entry	
			{x: canvasWidth * 0.595,
			y: canvasHeight * 0.825},//20 bus
			{x: canvasWidth * 0.595,
			y: canvasHeight * 0.675},//21 bus
			{x: canvasWidth * 0.390,
			y: canvasHeight * 0.675},//22 bus
			{x: canvasWidth * 0.390,
			y: canvasHeight * 0.825},//23 bus
			{x: canvasWidth * 0.200,
			y: canvasHeight * 0.825},//24 l corner
			{x: canvasWidth * 0.200,
			y: canvasHeight * 0.575},//25 trash
			{x: canvasWidth * 0.275,
			y: canvasHeight * 0.575},//26 trash
			{x: canvasWidth * 0.275,
			y: canvasHeight * 0.420},//27 trash
			{x: canvasWidth * 0.200,
			y: canvasHeight * 0.420},//28 trash
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
			{x: canvasWidth * 0.552,
			y: canvasHeight * 0.185},//0
			{x: canvasWidth * 0.611,
			y: canvasHeight * 0.185},//1
			{x: canvasWidth * 0.557,
			y: canvasHeight * 0.406},//2
			{x: canvasWidth * 0.506,
			y: canvasHeight * 0.370},//3
		];

		//подгрузить все изображения
		const images = loadImages([Level3, Car, Timer, Hit]);

		function drawMovement() {
			const min = Math.floor(levelSettings.time / 60) < 10 ? `0${Math.floor(levelSettings.time / 60)}` : Math.floor(levelSettings.time / 60);
			const sec = levelSettings.time%60 < 10 ? `0${levelSettings.time%60}` : levelSettings.time%60;
				
			drawBackground();
			drawTarget(ctx, canvasWidth * 0.553, canvasWidth * 0.608, canvasWidth * 0.556, canvasWidth * 0.510, canvasHeight * 0.189, canvasHeight * 0.189, canvasHeight * 0.400, canvasHeight * 0.363);
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

				if (X < fieldHitPoints[0].x && (Y > fieldHitPoints[0].y && Y < fieldHitPoints[28].y)) {
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[2].x && X < fieldHitPoints[1].x) && (Y > (getLine(fieldHitPoints[1].x, fieldHitPoints[1].y, fieldHitPoints[2].x, fieldHitPoints[2].y).a * X + getLine(fieldHitPoints[1].x, fieldHitPoints[1].y, fieldHitPoints[2].x, fieldHitPoints[2].y).b)) && (Y < fieldHitPoints[2].y)) { /*син авто лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[2].x && X < fieldHitPoints[3].x) && (Y < (getLine(fieldHitPoints[2].x, fieldHitPoints[2].y, fieldHitPoints[3].x, fieldHitPoints[3].y).a * X + getLine(fieldHitPoints[2].x, fieldHitPoints[2].y, fieldHitPoints[3].x, fieldHitPoints[3].y).b)) && (Y < fieldHitPoints[3].y && Y > fieldHitPoints[2].y)) { /*син авто низ*/
					carSettings.x -= (carSettings.speed + 1);
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[3].x && X < fieldHitPoints[4].x) && (Y < (getLine(fieldHitPoints[3].x, fieldHitPoints[3].y, fieldHitPoints[4].x, fieldHitPoints[4].y).a * X + getLine(fieldHitPoints[3].x, fieldHitPoints[3].y, fieldHitPoints[4].x, fieldHitPoints[4].y).b)) && (Y < fieldHitPoints[3].y)) { /*син авто прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[4].x && X < fieldHitPoints[5].x) && (Y < (getLine(fieldHitPoints[4].x, fieldHitPoints[4].y, fieldHitPoints[5].x, fieldHitPoints[5].y).a * X + getLine(fieldHitPoints[4].x, fieldHitPoints[4].y, fieldHitPoints[5].x, fieldHitPoints[5].y).b)) && (Y < fieldHitPoints[5].y && Y > fieldHitPoints[4].y)) { /*красн авто низ*/
					carSettings.x -= (carSettings.speed + 1);
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[5].x && X < fieldHitPoints[6].x) && (Y < (getLine(fieldHitPoints[5].x, fieldHitPoints[5].y, fieldHitPoints[6].x, fieldHitPoints[6].y).a * X + getLine(fieldHitPoints[5].x, fieldHitPoints[5].y, fieldHitPoints[6].x, fieldHitPoints[6].y).b)) && (Y < fieldHitPoints[5].y)) { /*красн авто прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[8].x && X < fieldHitPoints[7].x) && (Y > (getLine(fieldHitPoints[7].x, fieldHitPoints[7].y, fieldHitPoints[8].x, fieldHitPoints[8].y).a * X + getLine(fieldHitPoints[7].x, fieldHitPoints[7].y, fieldHitPoints[8].x, fieldHitPoints[8].y).b)) && (Y < fieldHitPoints[8].y)) { /*желт авто лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[8].x && X < fieldHitPoints[9].x) && (Y < (getLine(fieldHitPoints[8].x, fieldHitPoints[8].y, fieldHitPoints[9].x, fieldHitPoints[9].y).a * X + getLine(fieldHitPoints[8].x, fieldHitPoints[8].y, fieldHitPoints[9].x, fieldHitPoints[9].y).b)) && (Y < fieldHitPoints[9].y && Y > fieldHitPoints[8].y)) { /*желт авто низ*/
					carSettings.x -= (carSettings.speed + 1);
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[9].x && X < fieldHitPoints[10].x) && (Y < (getLine(fieldHitPoints[9].x, fieldHitPoints[9].y, fieldHitPoints[10].x, fieldHitPoints[10].y).a * X + getLine(fieldHitPoints[9].x, fieldHitPoints[9].y, fieldHitPoints[10].x, fieldHitPoints[10].y).b)) && (Y < fieldHitPoints[9].y)) { /*желт авто прав*/
					carSettings.x += (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[12].x && X < fieldHitPoints[11].x) && (Y > (getLine(fieldHitPoints[11].x, fieldHitPoints[11].y, fieldHitPoints[12].x, fieldHitPoints[12].y).a * X + getLine(fieldHitPoints[11].x, fieldHitPoints[11].y, fieldHitPoints[12].x, fieldHitPoints[12].y).b)) && (Y < fieldHitPoints[12].y)) { /*зел авто лев*/
					carSettings.x -= (carSettings.speed + 1);
					makeHit();
				} else if ((X > fieldHitPoints[12].x && X < fieldHitPoints[13].x) && (Y < (getLine(fieldHitPoints[12].x, fieldHitPoints[12].y, fieldHitPoints[13].x, fieldHitPoints[13].y).a * X + getLine(fieldHitPoints[12].x, fieldHitPoints[12].y, fieldHitPoints[13].x, fieldHitPoints[13].y).b)) && (Y < fieldHitPoints[13].y && Y > fieldHitPoints[12].y)) { /*зел авто низ*/
					carSettings.x -= (carSettings.speed + 1);
					carSettings.y += (carSettings.speed + 1);
					makeHit();
				} else if (X > fieldHitPoints[12].x && (Y > fieldHitPoints[12].y && Y < fieldHitPoints[13].y)) {
				 	carSettings.x -= (carSettings.speed + 1);
				 	makeHit();
				} else if (X > fieldHitPoints[16].x && (Y > fieldHitPoints[16].y && Y < fieldHitPoints[17].y)) {
					carSettings.x -= (carSettings.speed + 1); /*кр авто лев*/
					makeHit();
			  } else if (X > fieldHitPoints[18].x && (Y > fieldHitPoints[18].y && Y < fieldHitPoints[19].y)) {
					carSettings.x -= (carSettings.speed + 1); /*шлагб*/
					makeHit();
			  } else if ((X < fieldHitPoints[20].x && X > fieldHitPoints[20].x - 10) && (Y > fieldHitPoints[21].y && Y < fieldHitPoints[20].y)) {
					carSettings.x += (carSettings.speed + 1); /*автобус прав*/
					makeHit();
			  } else if ((X < fieldHitPoints[23].x + 10 && X > fieldHitPoints[23].x) && (Y > fieldHitPoints[21].y && Y < fieldHitPoints[20].y)) {
					carSettings.x -= (carSettings.speed + 1); /*автобус лев*/
					makeHit();
			  } else if (X < fieldHitPoints[24].x && (Y > fieldHitPoints[25].y && Y < fieldHitPoints[24].y)) {
					carSettings.x += (carSettings.speed + 1); /*стена лев*/
					makeHit();
			  } else if (X < fieldHitPoints[26].x && (Y > fieldHitPoints[27].y && Y < fieldHitPoints[26].y)) {
					carSettings.x += (carSettings.speed + 1); /*мусорка лев*/
					makeHit();
			  } else if (Y < fieldHitPoints[0].y && (X > fieldHitPoints[0].x && X < fieldHitPoints[1].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[6].y && (X > fieldHitPoints[6].x && X < fieldHitPoints[7].x)) {
					carSettings.y += (carSettings.speed + 1);
					makeHit();
        } else if (Y < fieldHitPoints[10].y && (X > fieldHitPoints[10].x && X < fieldHitPoints[11].x)) {
				  carSettings.y += (carSettings.speed + 1);
				 	makeHit();
        } else if (Y < fieldHitPoints[13].y && (X > fieldHitPoints[13].x && X < fieldHitPoints[14].x)) {
				  carSettings.y += (carSettings.speed + 1);
				 	makeHit();
        } else if ((Y > fieldHitPoints[15].y && Y < fieldHitPoints[15].y + 10) && (X > fieldHitPoints[16].x && X < fieldHitPoints[15].x)) {
				  carSettings.y -= (carSettings.speed + 1);
				 	makeHit();
        } else if ((Y < fieldHitPoints[18].y && Y > fieldHitPoints[18].y - 10) && (X > fieldHitPoints[17].x && X < fieldHitPoints[18].x)) {
				  carSettings.y += (carSettings.speed + 1);
				 	makeHit();
        } else if (Y > fieldHitPoints[19].y && (X > fieldHitPoints[20].x && X < fieldHitPoints[19].x)) {
				 	carSettings.y -= (carSettings.speed + 1);
				 	makeHit();
        } else if (Y > fieldHitPoints[21].y && (X > fieldHitPoints[22].x && X < fieldHitPoints[21].x)) {
					carSettings.y -= (carSettings.speed + 1);
					makeHit();
			  } else if (Y > fieldHitPoints[23].y && (X > fieldHitPoints[24].x && X < fieldHitPoints[23].x)) {
				  carSettings.y -= (carSettings.speed + 1);
				  makeHit();
		    } else if ((Y < fieldHitPoints[25].y && Y > fieldHitPoints[25].y - 10) && (X > fieldHitPoints[25].x && X < fieldHitPoints[26].x)) {
				 	carSettings.y += (carSettings.speed + 1);
				 	makeHit();
        } else if ((Y > fieldHitPoints[27].y && Y < fieldHitPoints[27].y + 10) && (X > fieldHitPoints[28].x && X < fieldHitPoints[27].x)) {
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

				// console.log((X > (Y - getLine(fieldParkPoints[0].x, fieldParkPoints[0].y, fieldParkPoints[3].x, fieldParkPoints[3].y).b) / getLine(fieldParkPoints[0].x, fieldParkPoints[0].y, fieldParkPoints[3].x, fieldParkPoints[3].y).a) && (X < (Y - getLine(fieldParkPoints[1].x, fieldParkPoints[1].y, fieldParkPoints[2].x, fieldParkPoints[2].y).b) / getLine(fieldParkPoints[1].x, fieldParkPoints[1].y, fieldParkPoints[2].x, fieldParkPoints[2].y).a)) && (Y > fieldParkPoints[0].y && Y < (getLine(fieldHitPoints[1].x, fieldHitPoints[1].y, fieldHitPoints[2].x, fieldHitPoints[2].y).a * X + getLine(fieldHitPoints[1].x, fieldHitPoints[1].y, fieldHitPoints[2].x, fieldHitPoints[2].y).b));

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
