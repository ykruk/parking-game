import createLevelSelect from './level-select.js';

import roundedRect from './rounded-rect.js';

import CrashedCar from '../img/crash.png';

export default function createLoseScoreBlock(canvasWidth, canvasHeight, gameSettings) {
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
				writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.29, canvasHeight * 0.09, 'YOU CRASHED');
				writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.39, canvasHeight * 0.09, 'YOUR CAR!');
				writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.75, canvasHeight * 0.08, `TOTAL SCORE: ${gameSettings.totalScore}`);
        ctx.drawImage(image, canvasWidth * 0.41, canvasHeight * 0.30, image.width * 0.35, image.height * 0.35);
      };
      image.src = CrashedCar;
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

    function clickOnScore() {
      gameSettings.totalScore = 0;
      
			canvas.removeEventListener('click', clickOnScore);
      createLevelSelect(canvasWidth, canvasHeight, gameSettings)();
    }
  }
}
