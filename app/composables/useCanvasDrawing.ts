export function useCanvasDrawing() {
	const drawImage = (img: HTMLImageElement, w: number, h: number, r: number): HTMLCanvasElement => {
		const dpr = window.devicePixelRatio || 1;
		const offscreen = document.createElement("canvas");
		offscreen.width = w * dpr;
		offscreen.height = h * dpr;
		const ctx = offscreen.getContext("2d")!;
		ctx.scale(dpr, dpr);

		// 绘制圆角路径
		ctx.beginPath();
		ctx.moveTo(r, 0);
		ctx.lineTo(w - r, 0);
		ctx.arcTo(w, 0, w, r, r);
		ctx.lineTo(w, h - r);
		ctx.arcTo(w, h, w - r, h, r);
		ctx.lineTo(r, h);
		ctx.arcTo(0, h, 0, h - r, r);
		ctx.lineTo(0, r);
		ctx.arcTo(0, 0, r, 0, r);
		ctx.closePath();

		// 裁剪并绘制图片
		ctx.save();
		ctx.clip();
		ctx.drawImage(img, 0, 0, w, h);
		ctx.restore();

		return offscreen;
	};

	// 绘制单色占位符卡片
	const drawPlaceholder = (w: number, h: number, r: number, color: string) => {
		const dpr = window.devicePixelRatio || 1;
		const offscreen = document.createElement("canvas");
		offscreen.width = w * dpr;
		offscreen.height = h * dpr;
		const ctx = offscreen.getContext("2d")!;
		ctx.scale(dpr, dpr);

		// 绘制圆角路径
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(r, 0);
		ctx.lineTo(w - r, 0);
		ctx.arcTo(w, 0, w, r, r);
		ctx.lineTo(w, h - r);
		ctx.arcTo(w, h, w - r, h, r);
		ctx.lineTo(r, h);
		ctx.arcTo(0, h, 0, h - r, r);
		ctx.lineTo(0, r);
		ctx.arcTo(0, 0, r, 0, r);
		ctx.closePath();
		ctx.fill();

		return offscreen;
	};

	return {
		drawImage,
		drawPlaceholder,
	};
}
