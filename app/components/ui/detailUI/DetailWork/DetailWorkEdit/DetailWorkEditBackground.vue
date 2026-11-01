<script setup lang="ts">
const canvasScale = 10;
const minHeight = 20;
const maxHeight = 200;
const rectWidth = 5;
const translateSpeed = 1;
const drawInterval = 10;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const animId = ref<number | null>(null);
const drawtime = ref<number>(0);

const init = () => {
	const canvas = canvasRef.value;
	if (!canvas) return;

	canvas.width = canvas.width * canvasScale;
	canvas.height = canvas.height * canvasScale;
};

const onUpdate = () => {
	const canvas = canvasRef.value;
	if (!canvas) return;

	const ctx = canvas.getContext("2d", {
		willReadFrequently: true,
	});
	if (!ctx) return;

	ctx.save();

	const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(data, -translateSpeed, 0);
	if (drawtime.value % drawInterval === 0) {
		const height = randomInt(minHeight, maxHeight);
		ctx.fillRect(canvas.width - rectWidth, canvas.height / 2 - height, rectWidth, height * 2);
	}

	ctx.restore();

	drawtime.value = (drawtime.value + 1) % drawInterval;

	animId.value = requestAnimationFrame(onUpdate);
};

onMounted(() => {
	init();
	animId.value = requestAnimationFrame(onUpdate);
});

onUnmounted(() => {
	if (animId.value) {
		cancelAnimationFrame(animId.value);
		animId.value = null;
	}
});
</script>

<template>
	<canvas class="work_edit_background" ref="canvasRef"></canvas>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_edit_background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none;
	background-color: #ffffff;
	z-index: variables.$background_zIndex;
}
</style>
