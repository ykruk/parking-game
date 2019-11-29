import createLevelSelect from './level-select.js';

import roundedRect from './rounded-rect.js';

export default function createTimeOutBlock(canvasWidth, canvasHeight, gameSettings) {
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

      writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.31, canvasHeight * 0.09, 'OOPS!...');
			writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.42, canvasHeight * 0.09, 'TIME IS UP!');
      writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.75, canvasHeight * 0.08, `TOTAL SCORE: ${gameSettings.totalScore}`);
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
