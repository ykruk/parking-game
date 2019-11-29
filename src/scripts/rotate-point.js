export default function rotatePoint(x, y, degree) {
	let centerX = 0;
	let centerY = 0;

	let startX = x;
	let startY = y;
	
	let radiusX = centerX - startX;
	let radiusY = centerY - startY;

	let cos = Math.cos(toRad(degree));
	let sin = Math.sin(toRad(degree));

	let currentX = centerX + radiusX*cos - radiusY*sin;
	let currentY = centerY + radiusX*sin + radiusY*cos;

	return {x:currentX, y:currentY};
}

function toRad(degree) {
	return degree * Math.PI / 180;
}
