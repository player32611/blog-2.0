<script setup lang="ts">
import gsap from "gsap";
import type { RGBColor, Point } from "@/types/common";

const backgroundRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const progressStart = ref<number>(0);
const progressEnd = ref<number>(0);

const activeColor: RGBColor = { r: 0, g: 174, b: 240 };
const defaultColor: RGBColor = { r: 23, g: 23, b: 23 };

const getTopPoints = (width: number, height: number): Point[] => {
	return [
		{ x: width / 2, y: 0 },
		{ x: width / 4, y: (height / 5) * 3 },
		{ x: width / 2, y: (height / 9) * 8 },
		{ x: (width / 6) * 4, y: (height / 9) * 4 },
		{ x: (width / 11) * 5, y: (height / 6) * 2 },
		{ x: (width / 21) * 9, y: (height / 8) * 5 },
		{ x: (width / 21) * 11, y: (height / 9) * 5 },
		{ x: width / 2, y: height / 2 },
	];
};

const getBottomPoints = (width: number, height: number): Point[] => {
	return [
		{ x: width / 2, y: height },
		{ x: (width / 4) * 3, y: (height / 5) * 2 },
		{ x: width / 2, y: (height / 9) * 1 },
		{ x: (width / 6) * 2, y: (height / 9) * 5 },
		{ x: (width / 11) * 6, y: (height / 6) * 4 },
		{ x: (width / 21) * 12, y: (height / 8) * 3 },
		{ x: (width / 21) * 10, y: (height / 9) * 4 },
		{ x: width / 2, y: height / 2 },
	];
};

const getPathLength = (points: Point[]) => {
	let length = 0;
	for (let i = 1; i < points.length; i++) {
		const p1 = points[i - 1];
		const p2 = points[i];
		if (p1 && p2) length += getDistance(p1, p2);
	}
	return length;
};

const getColorByPosition = (startColor: RGBColor, endColor: RGBColor, ratio: number) => {
	const r = Math.floor(startColor.r + (endColor.r - startColor.r) * ratio);
	const g = Math.floor(startColor.g + (endColor.g - startColor.g) * ratio);
	const b = Math.floor(startColor.b + (endColor.b - startColor.b) * ratio);
	return `rgb(${r}, ${g}, ${b})`;
};

// 绘制带进度效果的折线
const drawProgressLine = (
	ctx: CanvasRenderingContext2D,
	points: Point[],
	startColor: RGBColor,
	endColor: RGBColor,
	progressStartVal: number,
	progressEndVal: number,
) => {
	if (points.length < 2) return;

	const totalLength = getPathLength(points);
	const startLength = totalLength * progressStartVal;
	const endLength = totalLength * progressEndVal;
	if (startLength >= endLength) return;

	let currentLength = 0;
	let hasStarted = false;

	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.lineWidth = 2;

	for (let i = 1; i < points.length; i++) {
		const p1 = points[i - 1];
		const p2 = points[i];
		if (!p1 || !p2) continue;

		const segmentLength = getDistance(p1, p2);
		const segmentStart = currentLength;
		const segmentEnd = currentLength + segmentLength;

		// 检查当前线段是否与绘制范围有交集
		if (segmentEnd > startLength && segmentStart < endLength) {
			let drawStartX = p1.x;
			let drawStartY = p1.y;
			let drawEndX = p2.x;
			let drawEndY = p2.y;

			// 调整起点（如果需要）
			if (segmentStart < startLength) {
				const ratio = (startLength - segmentStart) / segmentLength;
				drawStartX = p1.x + (p2.x - p1.x) * ratio;
				drawStartY = p1.y + (p2.y - p1.y) * ratio;
			}

			// 调整终点（如果需要）
			if (segmentEnd > endLength) {
				const ratio = (endLength - segmentStart) / segmentLength;
				drawEndX = p1.x + (p2.x - p1.x) * ratio;
				drawEndY = p1.y + (p2.y - p1.y) * ratio;
			}

			// 计算当前绘制段在整体路径中的位置比例
			const midPointLength =
				(Math.max(segmentStart, startLength) + Math.min(segmentEnd, endLength)) / 2;
			const colorRatio = (midPointLength - startLength) / (endLength - startLength);
			const color = getColorByPosition(startColor, endColor, colorRatio);

			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(drawStartX, drawStartY);
			ctx.lineTo(drawEndX, drawEndY);
			ctx.stroke();
		}

		currentLength += segmentLength;
	}
};

const drawLine = () => {
	const canvas = canvasRef.value;
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	// 获取 canvas 的逻辑尺寸 (CSS pixels)
	const { width: logicalWidth, height: logicalHeight } = canvas.getBoundingClientRect();

	// 清除画布
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 获取点数组
	const topPoints = getTopPoints(logicalWidth, logicalHeight);
	const bottomPoints = getBottomPoints(logicalWidth, logicalHeight);

	// 绘制上线条进度范围效果
	drawProgressLine(
		ctx,
		topPoints,
		defaultColor,
		activeColor,
		progressStart.value,
		progressEnd.value,
	);

	// 绘制下线条进度范围效果
	drawProgressLine(
		ctx,
		bottomPoints,
		defaultColor,
		activeColor,
		progressStart.value,
		progressEnd.value,
	);
};

const startProgressAnimation = () => {
	gsap.to(progressStart, {
		value: 1,
		duration: 3,
		delay: 1,
		repeat: -1,
		repeatDelay: 3,
		ease: "power1.inOut",
		onUpdate: drawLine,
	});

	gsap.to(progressEnd, {
		value: 1,
		duration: 3,
		ease: "power1.inOut",
		repeat: -1,
		repeatDelay: 3,
		onUpdate: drawLine,
		onRepeat: () => {
			progressStart.value = 0;
			progressEnd.value = 0;
		},
	});
};

const resize = () => {
	const canvas = canvasRef.value;
	if (!canvas) return;

	// 设置 canvas 尺寸为容器的实际尺寸
	const rect = backgroundRef.value?.getBoundingClientRect();
	if (rect) {
		const dpr = window.devicePixelRatio || 1;
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		// 缩放上下文以适应高 DPI 显示器
		const ctx = canvas.getContext("2d");
		if (ctx) {
			ctx.scale(dpr, dpr);
		}
	}
};

onMounted(() => {
	resize();
	startProgressAnimation();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	window.removeEventListener("resize", resize);
	gsap.killTweensOf(progressStart);
	gsap.killTweensOf(progressEnd);
});
</script>

<template>
	<div class="title_background" ref="backgroundRef">
		<canvas ref="canvasRef"></canvas>
	</div>
</template>

<style scoped lang="scss">
.title_background {
	position: absolute;
	width: 100%;
	height: 100dvh;

	canvas {
		height: 100%;
		width: 100%;
	}
}
</style>
