export default function drawTarget(ctx, x1, x2, x3, x4, y1, y2, y3, y4) {
	ctx.strokeStyle = '#2AD27B';
	ctx.lineWidth = 8;
	ctx.lineJoin = 'bevel';
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.lineTo(x4, y4);
	ctx.lineTo(x1, y1);
	ctx.lineTo(x3, y3);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x4, y4);
	ctx.stroke();
}