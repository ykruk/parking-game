import createLevelSelect from '../scripts/level-select.js';
import createInstructionsBlock from '../scripts/instructions-block.js';

import roundedRect from './rounded-rect.js';

import MenuBackground from '../img/back-menu.jpg';
import Logo from '../img/logo.png';
import PlayIcon from '../img/play-icon.svg';
import NextIcon from '../img/next-icon.png';

export default function createMainMenu(canvasWidth, canvasHeight, gameSettings) {
  if (canvas && canvas.getContext('2d')) {
    let ctx = canvas.getContext('2d');

    function drawBackground() {
      const image = new Image();
      
      image.onload = function() {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'black';
				ctx.fillRect(0, 0, canvasWidth, canvasHeight);
				
				addLogo();
				addPlayButton('#ffeb3b');
				addNextButton('#ffeb3b');
      };
			image.src = MenuBackground;
    }
		drawBackground();
		
		function addLogo() {
      const image = new Image();
      
      image.onload = function() {
				ctx.save();
				ctx.translate(canvasWidth * 0.5, 0)
				ctx.rotate(toRad(-10));
				ctx.drawImage(image, - (image.width * 0.20), canvasHeight * 0.03, image.width * 0.35, image.height * 0.35);
				ctx.restore();
      };
      image.src = Logo;
		}
		
		function addPlayButton(color, nextStep) {
      const image = new Image();
      
      image.onload = function() {
				ctx.globalAlpha = 1;
        roundedRect(ctx, canvasWidth * 0.335, canvasHeight * 0.75, canvasWidth * 0.09, canvasWidth * 0.09, 15, color);
				ctx.drawImage(image, canvasWidth * 0.335 + canvasWidth * 0.01, canvasHeight * 0.75 + canvasHeight * 0.007, canvasWidth * 0.08, canvasWidth * 0.08);
				
				if (nextStep) setTimeout(nextStep, 300);
      };
      image.src = PlayIcon;
		}
		
		function addNextButton(color, nextStep) {
      const image = new Image();
      
      image.onload = function() {
				ctx.globalAlpha = 1;
        roundedRect(ctx, canvasWidth * 0.57, canvasHeight * 0.75, canvasWidth * 0.09, canvasWidth * 0.09, 15, color);
				ctx.drawImage(image, canvasWidth * 0.57 + canvasWidth * 0.011, canvasHeight * 0.75 + canvasHeight * 0.016, canvasWidth * 0.075, canvasWidth * 0.075);
				
				if (nextStep) setTimeout(nextStep, 300);
      };
      image.src = NextIcon;
		}
		
		canvas.addEventListener('click', clickOnButton);

    function clickOnButton(event) {
      const x = event.offsetX;
      const y = event.offsetY;

      if ((x > canvasWidth * 0.335 && x < canvasWidth * 0.335 + 140) && (y > canvasHeight * 0.75 && y < canvasHeight * 0.75 + 140)) {
				gameSettings.level = 1;
        canvas.removeEventListener('click', clickOnButton);
				addPlayButton('#ef9d30', createInstructionsBlock(canvasWidth, canvasHeight, gameSettings));
      } else if ((x > canvasWidth * 0.57 && x < canvasWidth * 0.66) && (y > canvasHeight * 0.75 && y < canvasHeight * 0.75 + canvasWidth * 0.09)) {
        canvas.removeEventListener('click', clickOnButton);
				addNextButton('#ef9d30', createLevelSelect(canvasWidth, canvasHeight, gameSettings));
      }
    }
  }
}

function toRad(degree) {
	return degree * Math.PI / 180;
}
