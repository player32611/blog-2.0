<script setup lang="ts">
import type { Point } from "~/types/common";

type CircleRing = Point & {
	radius: number;
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
const animationFrameId = ref<number | null>(null);
const posArray = ref<CircleRing[]>([]);
const { drawCircleRing } = useCanvasDrawing(canvasRef);

const circleRingSpeed: number = 2;
const circleRingColor: string = "#ffffff";
const circleRingWidth: number = 2;

const handleMouseDown = (e: MouseEvent) => {
	posArray.value.push({ x: e.x, y: e.y, radius: 0 });
	if (animationFrameId.value === null) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	}
};

const handleUpdate = () => {
	if (!canvasRef.value) return;
	const rect = canvasRef.value.getBoundingClientRect();
	posArray.value = posArray.value.filter(info => {
		info.radius += circleRingSpeed;
		if (info.radius >= rect.width) return false;
		return true;
	});
};

const resize = () => {
	if (!canvasRef.value) return;
	const canvas = canvasRef.value;
	const rect = canvas.getBoundingClientRect();

	canvas.width = rect.width;
	canvas.height = rect.height;
};

const drawFrame = () => {
	if (!canvasRef.value) return;
	const rect = canvasRef.value.getBoundingClientRect();
	const ctx = canvasRef.value.getContext("2d");
	ctx?.clearRect(0, 0, rect.width, rect.height);
	handleUpdate();
	posArray.value.forEach(info => {
		drawCircleRing(info.x, info.y, info.radius, info.radius - circleRingWidth, circleRingColor);
	});
	if (posArray.value.length) animationFrameId.value = requestAnimationFrame(drawFrame);
	else animationFrameId.value = null;
};

onMounted(() => {
	resize();
	canvasRef.value?.addEventListener("mousedown", handleMouseDown);
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	if (animationFrameId.value) {
		cancelAnimationFrame(animationFrameId.value);
		animationFrameId.value = null;
	}
	canvasRef.value?.removeEventListener("mousedown", handleMouseDown);
	window.addEventListener("resize", resize);
});
</script>

<template>
	<canvas class="bottom_background" ref="canvasRef"></canvas>
</template>

<style scoped lang="scss">
@use "../../../../assets/styles/variables.scss";

.bottom_background {
	position: absolute;
	height: 100vh;
	width: 100%;
	opacity: 0.4;
	z-index: variables.$background_zIndex;
}
</style>
