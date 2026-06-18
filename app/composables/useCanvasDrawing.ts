export function useCanvasDrawing(canvasRef: Ref<HTMLCanvasElement | null>) {
	const ctx = computed<CanvasRenderingContext2D | null>(() => {
		if (!canvasRef.value) return null;
		else return canvasRef.value.getContext("2d");
	});

	/**
	 * 绘制带有圆角的图片到离屏 canvas 上
	 *
	 * 该函数创建一个高分辨率的离屏 canvas，根据设备像素比进行缩放，
	 * 并绘制指定尺寸和圆角半径的图片。
	 *
	 * @param x - 图片的 x 坐标（CSS 像素）
	 * @param y - 图片的 y 坐标（CSS 像素）
	 * @param img - 要绘制的 HTMLImageElement 图片元素
	 * @param width - 绘制区域的宽度（逻辑像素）
	 * @param height - 绘制区域的高度（逻辑像素）
	 * @param radius - 圆角半径（逻辑像素）
	 */
	const drawImage = (
		x: number,
		y: number,
		img: HTMLImageElement,
		width: number,
		height: number,
		radius: number = 0,
	): void => {
		if (!canvasRef.value || !ctx.value) return;

		// 绘制圆角路径
		ctx.value.beginPath();
		ctx.value.moveTo(x + radius, y);
		ctx.value.lineTo(x + width - radius, y);
		ctx.value.arcTo(x + width, y, x + width, y + radius, radius);
		ctx.value.lineTo(x + width, y + height - radius);
		ctx.value.arcTo(x + width, y + height, x + width - radius, y + height, radius);
		ctx.value.lineTo(x + radius, y + height);
		ctx.value.arcTo(x, y + height, x, y + height - radius, radius);
		ctx.value.lineTo(x, y + radius);
		ctx.value.arcTo(x, y, x + radius, y, radius);
		ctx.value.closePath();

		// 裁剪并绘制图片
		ctx.value.save();
		ctx.value.clip();
		ctx.value.drawImage(img, x, y, width, height);
		ctx.value.restore();
	};

	/**
	 * 绘制带有圆角的占位图
	 *
	 * @param x - 占位图的 x 坐标（CSS 像素）
	 * @param y - 占位图的 y 坐标（CSS 像素）
	 * @param width - 占位图的宽度（CSS 像素）
	 * @param height - 占位图的高度（CSS 像素）
	 * @param radius - 圆角半径（CSS 像素）
	 * @param color - 填充颜色
	 */
	const drawPlaceholder = (
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number = 0,
		color: string = "#ffffff",
	): void => {
		if (!canvasRef.value || !ctx.value) return;

		ctx.value.fillStyle = color;
		ctx.value.beginPath();
		ctx.value.moveTo(x + radius, y);
		ctx.value.lineTo(x + width - radius, y);
		ctx.value.arcTo(x + width, y, x + width, y + radius, radius);
		ctx.value.lineTo(x + width, y + height - radius);
		ctx.value.arcTo(x + width, y + height, x + width - radius, y + height, radius);
		ctx.value.lineTo(x + radius, y + height);
		ctx.value.arcTo(x, y + height, x, y + height - radius, radius);
		ctx.value.lineTo(x, y + radius);
		ctx.value.arcTo(x, y, x + radius, y, radius);
		ctx.value.closePath();
		ctx.value.fill();
	};

	/**
	 * 绘制圆环
	 *
	 * @param x - 圆环的 x 坐标（CSS 像素）
	 * @param y - 圆环的 y 坐标（CSS 像素）
	 * @param outerRadius - 外圆半径（CSS 像素）
	 * @param innerRadius - 内圆半径（CSS 像素）（传入小于 0 的值时规范为 0）
	 * @param color - 圆环颜色（CSS 像素）
	 */
	const drawCircleRing = (
		x: number,
		y: number,
		outerRadius: number,
		innerRadius: number,
		color: string,
	): void => {
		if (!canvasRef.value || !ctx.value) return;

		const rect = canvasRef.value.getBoundingClientRect();
		const scaleX = canvasRef.value.width / rect.width; // 处理 canvas 实际像素 vs CSS 像素
		const scaleY = canvasRef.value.height / rect.height;
		x = (x - rect.left) * scaleX;
		y = (y - rect.top) * scaleY;

		ctx.value.beginPath();
		ctx.value.arc(x, y, outerRadius, 0, Math.PI * 2);
		ctx.value.arc(x, y, Math.max(0, innerRadius), 0, Math.PI * 2, true);
		ctx.value.fillStyle = color;
		ctx.value.fill();
	};

	return {
		drawImage,
		drawPlaceholder,
		drawCircleRing,
	};
}
