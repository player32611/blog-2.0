export function useCanvasDrawing() {
	/**
	 * 绘制带有圆角的图片到离屏 canvas 上
	 *
	 * 该函数创建一个高分辨率的离屏 canvas，根据设备像素比进行缩放，
	 * 并绘制指定尺寸和圆角半径的图片。
	 *
	 * @param img - 要绘制的 HTMLImageElement 图片元素
	 * @param w - 绘制区域的宽度（逻辑像素）
	 * @param h - 绘制区域的高度（逻辑像素）
	 * @param r - 圆角半径（逻辑像素）
	 * @returns 包含绘制结果的 HTMLCanvasElement 元素
	 */
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

	/**
	 * 绘制带有圆角的占位图
	 *
	 * @param w - 占位图的宽度（CSS 像素）
	 * @param h - 占位图的高度（CSS 像素）
	 * @param r - 圆角半径（CSS 像素）
	 * @param color - 填充颜色
	 * @returns 返回包含绘制好的占位图的离屏 canvas 元素
	 */
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
