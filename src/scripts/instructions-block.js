import createLevel1 from './level1.js';
import createLevel2 from './level2.js';
import createLevel3 from './level3.js';
import createLevel4 from './level4.js';

import roundedRect from './rounded-rect.js';

import Keys from '../img/keys.png';
import PlayIcon from '../img/play-icon.svg';

export default function createInstructionsBlock(canvasWidth, canvasHeight, gameSettings) {
  return function () {
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
        writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.584, canvasHeight * 0.066, 'USE ARROW KEYS TO STEER');
        writeText(ctx, canvasWidth * 0.5, canvasHeight * 0.663, canvasHeight * 0.066, 'AND DRIVE YOUR CAR');
  
        const image = new Image();
        
        image.onload = function() {
          ctx.drawImage(image, canvasWidth * 0.5 - image.width * 0.5, canvasHeight * 0.27);
        };
        image.src = Keys;
      }
      drawBlock();
  
      function writeText(ctx, x, y, fontSize, text) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#3e2702';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
      }
  
      function addPlayButton() {
        const image = new Image();
        
        image.onload = function() {
          roundedRect(ctx, canvasWidth * 0.467, canvasHeight * 0.729, canvasWidth * 0.065, canvasHeight * 0.133, 15, '#ffcc3b');
  
          ctx.drawImage(image, canvasWidth * 0.465, canvasHeight * 0.720, canvasWidth * 0.07, canvasWidth * 0.07);
        };
        image.src = PlayIcon;
      }
      addPlayButton();
  
      canvas.addEventListener('click', clickOnPlay);
  
      function clickOnPlay(event) {
        if ((event.offsetX > canvasWidth * 0.471 && event.offsetX < canvasWidth * 0.529) 
        && (event.offsetY > canvasHeight * 0.736 && event.offsetY < canvasHeight * 0.855)) {
          const image = new Image();
          
          image.onload = function() {
            roundedRect(ctx, canvasWidth * 0.461, canvasHeight * 0.716, canvasWidth * 0.078, canvasHeight * 0.159, 15, '#ef9d30');
            ctx.drawImage(image, canvasWidth * 0.462, canvasHeight * 0.710, canvasWidth * 0.08, canvasWidth * 0.08);
          };
          image.src = PlayIcon;
          
          canvas.removeEventListener('click', clickOnPlay);
          switch(gameSettings.level) {
            case 1:
              createLevel1(canvasWidth, canvasHeight, gameSettings);
              break;
            case 2:
              createLevel2(canvasWidth, canvasHeight, gameSettings);
              break;
            case 3:
              createLevel3(canvasWidth, canvasHeight, gameSettings);
              break;
            case 4:
              createLevel4(canvasWidth, canvasHeight, gameSettings);
              break;
            default:
              //game over (new levels in development)
              break;
          }
        }
      }
    }
  }
  
}
