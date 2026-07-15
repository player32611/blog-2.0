<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { Point } from "~/types/common";

gsap.registerPlugin(ScrollTrigger);

type CircleRing = Point & {
	radius: number;
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
const animationFrameId = ref<number | null>(null);
const posArray = ref<CircleRing[]>([]);
const { drawCircleRing } = useCanvasDrawing(canvasRef);

const circleRingSpeed = 2;
const circleRingColor = "#ffffff40";
const circleRingWidth = 2;

const handleClick = (e: MouseEvent) => {
	posArray.value.push({ x: e.x, y: e.y, radius: 0 });
	if (animationFrameId.value === null) animationFrameId.value = requestAnimationFrame(drawFrame);
};

const update = () => {
	if (!canvasRef.value) return;
	const rect = canvasRef.value.getBoundingClientRect();
	posArray.value = posArray.value.filter(info => {
		info.radius += circleRingSpeed;
		if (info.radius >= Math.max(rect.width, rect.height)) return false;
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
	update();
	posArray.value.forEach(info => {
		drawCircleRing(info.x, info.y, info.radius, info.radius - circleRingWidth, circleRingColor);
	});
	if (posArray.value.length) animationFrameId.value = requestAnimationFrame(drawFrame);
	else animationFrameId.value = null;
};

onMounted(() => {
	resize();
	window.addEventListener("click", handleClick);
	ScrollTrigger.addEventListener("refresh", resize);
});

onUnmounted(() => {
	if (animationFrameId.value) {
		cancelAnimationFrame(animationFrameId.value);
		animationFrameId.value = null;
	}
	window.removeEventListener("click", handleClick);
	ScrollTrigger.removeEventListener("refresh", resize);
});
</script>

<template>
	<canvas class="detail_background" ref="canvasRef"></canvas>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.detail_background {
	position: fixed;
	height: 100vh;
	width: 100%;
	background-color: #171717;
	z-index: variables.$background_zIndex;
}
</style>
