import createInstructionsBlock from '../scripts/instructions-block.js';

import roundedRect from './rounded-rect.js';

export default function createLevelSelect(canvasWidth, canvasHeight, gameSettings) {
  return function () {
    if (canvas && canvas.getContext('2d')) {
      let ctx = canvas.getContext('2d');
  
      function drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }
      drawBackground();
  
      function drawSelectTable() {
        roundedRect(ctx, canvasWidth * 0.24, canvasHeight * 0.20, canvasWidth * 0.52, canvasHeight * 0.60, 15, '#ca971a');
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        name(ctx, canvasWidth * 0.5, canvasHeight * 0.32, canvasHeight * 0.09, 'SELECT LEVEL');
        
        const roundWidth = canvasWidth * 0.072, roundSpace = canvasWidth * 0.047;
        const startX = canvasWidth * 0.241, startY = canvasHeight * 0.531;
        const startTextX = canvasWidth * 0.275, startTextY = canvasHeight * 0.629;
  
        roundedRect(ctx, startX + roundSpace, startY, roundWidth, roundWidth, 15, '#e5c400');
        name(ctx,  startTextX + roundSpace, startTextY, canvasHeight * 0.08, '1');
        roundedRect(ctx, startX + 2 * roundSpace + roundWidth, startY, roundWidth, roundWidth, 15, '#e5c400');
        name(ctx,  startTextX + 2 * roundSpace + roundWidth, startTextY, canvasHeight * 0.08, '2');
        roundedRect(ctx, startX + 3 * roundSpace + 2 * roundWidth, startY, roundWidth, roundWidth, 15, '#e5c400');
        name(ctx,  startTextX + 3 * roundSpace + 2 * roundWidth, startTextY, canvasHeight * 0.08, '3');
        roundedRect(ctx, startX + 4 * roundSpace + 3 * roundWidth, startY, roundWidth, roundWidth, 15, '#e5c400');
        name(ctx,  startTextX + 4 * roundSpace + 3 * roundWidth, startTextY, canvasHeight * 0.08, '4');
      }
      drawSelectTable();
  
      function name(ctx, x, y, fontSize, text) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#3e2702';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
      }
  
      canvas.addEventListener('click', clickOnLevel);
  
      function clickOnLevel(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const roundWidth = canvasWidth * 0.072, roundSpace = canvasWidth * 0.047;
        const startX = canvasWidth * 0.241, startY = canvasHeight * 0.531;
        const startTextX = canvasWidth * 0.275, startTextY = canvasHeight * 0.629;
  
        if ((x > startX + roundSpace && x < startX + roundSpace + roundWidth) 
        && (y > startY && y < startY + roundWidth)) {
          roundedRect(ctx, startX + roundSpace, startY, roundWidth, roundWidth, 15, '#ef9d30');
          name(ctx,  startTextX + roundSpace, startTextY, canvasHeight * 0.08, '1');
          canvas.removeEventListener('click', clickOnLevel);
          setTimeout(createInstructionsBlock(canvasWidth, canvasHeight, gameSettings), 300);
        } else if ((x > startX + 2 * roundSpace + roundWidth && x < startX + 2 * roundSpace + 2* roundWidth) && (y > startY && y < startY + roundWidth)) {
          roundedRect(ctx, startX + 2 * roundSpace + roundWidth, startY, roundWidth, roundWidth, 15, '#ef9d30');
          name(ctx,  startTextX +  + 2 * roundSpace + roundWidth, startTextY, canvasHeight * 0.08, '2');
          gameSettings.level = 2;
          canvas.removeEventListener('click', clickOnLevel);
          setTimeout(createInstructionsBlock(canvasWidth, canvasHeight, gameSettings), 300);
        } else if ((x > startX + 3 * roundSpace + 2 * roundWidth && x < startX + 3 * roundSpace + 3 * roundWidth) && (y > startY && y < startY + roundWidth)) {
          roundedRect(ctx, startX + 3 * roundSpace + 2 * roundWidth, startY, roundWidth, roundWidth, 15, '#ef9d30');
          name(ctx,  startTextX + 3 * roundSpace + 2 * roundWidth, startTextY, canvasHeight * 0.08, '3');
          gameSettings.level = 3;
          canvas.removeEventListener('click', clickOnLevel);
          setTimeout(createInstructionsBlock(canvasWidth, canvasHeight, gameSettings), 300);
        } else if ((x > startX + 4 * roundSpace + 3 * roundWidth && x < startX + 4 * roundSpace + 4 * roundWidth) && (y > startY && y < startY + roundWidth)) {
          roundedRect(ctx, startX + 4 * roundSpace + 3 * roundWidth, startY, roundWidth, roundWidth, 15, '#ef9d30');
          name(ctx,  startTextX + 4 * roundSpace + 3 * roundWidth, startTextY, canvasHeight * 0.08, '4');
          gameSettings.level = 4;
          canvas.removeEventListener('click', clickOnLevel);
          setTimeout(createInstructionsBlock(canvasWidth, canvasHeight, gameSettings), 300);
        }
      }
    }
  }
  
}
