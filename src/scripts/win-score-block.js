import createLevel2 from './level2.js';
import createLevel3 from './level3.js';
import createLevel4 from './level4.js';
import createFutureLevelsBlock from './future-levels.js';

import roundedRect from './rounded-rect.js';

import ParkedCar from '../img/parked-car.png';

export default function createWinScoreBlock(canvasWidth, canvasHeight, gameSettings, levelScore) {
  if (canvas && canvas.getContext('2d')) {
    let ctx = canvas.getContext('2d');

    function drawBackground() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    drawBackground();

    function drawBlock() {
      roundedRect(ctx, canvasWidth * 0.241, canvasHeight * 0.199, canvasWidth * 0.521, canvasHeight * 0.597, 15, '#ca971a');
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

      const image = new Image();
      
      image.onload = function() {
				writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.29, canvasHeight * 0.09, 'CONGRATULATIONS!');
				writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.65, canvasHeight * 0.08, `LEVEL SCORE: ${levelScore}`);
				writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.75, canvasHeight * 0.08, `TOTAL SCORE: ${gameSettings.totalScore}`);
        ctx.drawImage(image, canvasWidth * 0.5 - (image.width * 0.5), canvasHeight * 0.28);
      };
      image.src = ParkedCar;
    }
    drawBlock();

    function writeText(ctx, x, y, fontSize, text) {
      ctx.fillStyle = 'white';
      ctx.strokeStyle = '#3e2702';
      ctx.lineWidth = 2;
			ctx.font = `bold ${fontSize}px Arial`;
			ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
      ctx.strokeText(text, x, y);
    }

    canvas.addEventListener('click', clickOnScore);

    function clickOnScore(event) {
      canvas.removeEventListener('click', clickOnScore);
      switch(gameSettings.level) {
				case 1:
          createLevel2(canvasWidth, canvasHeight, gameSettings);
          break;
        case 2:
          createLevel3(canvasWidth, canvasHeight, gameSettings);
          break;
        case 3:
          createLevel4(canvasWidth, canvasHeight, gameSettings);
          break;
        default:
          createFutureLevelsBlock(canvasWidth, canvasHeight, gameSettings);
          break;
      }
    }
  }
}
