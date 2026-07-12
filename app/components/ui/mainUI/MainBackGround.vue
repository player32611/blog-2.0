<script setup lang="ts">
import gsap from "gsap";

import backgroundImg from "/images/background/main_background.png";

const mainStore = useMainStore();
const viewBoxRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const viewBoxData = ref<{ height: number; width: number }>({ height: 0, width: 0 });
const imageData = ref<{ height: number; width: number }>({ height: 0, width: 0 });
const mousePos = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const movedata = ref<{ moveable: boolean; x: number; y: number; movX: number; movY: number }>({
	moveable: false,
	x: 0,
	y: 0,
	movX: 0,
	movY: 0,
});
const ani = ref<GSAPTween | null>(null); // gsap 动画
const standardWidth = ref<number>(1700); // 标准宽度
const scalesNums = ref<number>(1); // 缩放比例
const resistance: number = 0.2;
const easeTime: number = 1;

const resize = () => {
	if (viewBoxRef.value && imageRef.value) {
		viewBoxData.value.height = viewBoxRef.value.offsetHeight;
		viewBoxData.value.width = viewBoxRef.value.offsetWidth;
		imageData.value.height = imageRef.value.offsetHeight;
		imageData.value.width = imageRef.value.offsetWidth;
		movedata.value.x = 0;
		movedata.value.y = 0;
		movedata.value.movX = 0;
		movedata.value.movY = 0;
		scalesNums.value = document.body.offsetWidth / standardWidth.value;
		imageRef.value.style.transform = `scale(${scalesNums.value})`;
		gsap.to(imageRef.value, {
			transform: `translate(0,0)`,
			duration: 0,
			ease: "power4.out",
		});
	}
};

const move = (x: number, y: number) => {
	if (!movedata.value.moveable || !imageRef.value) return;
	const distanceX = ((x - mousePos.value.x) / scalesNums.value) * resistance;
	const distanceY = ((y - mousePos.value.y) / scalesNums.value) * resistance;

	const newMovX = movedata.value.movX + distanceX;
	const newMovY = movedata.value.movY + distanceY;

	const maxOffsetX = Math.max(0, (imageData.value.width - viewBoxData.value.width) / 2);
	const maxOffsetY = Math.max(0, (imageData.value.height - viewBoxData.value.height) / 2);

	movedata.value.movX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newMovX));
	movedata.value.movY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newMovY));

	if (ani.value) ani.value.kill();
	ani.value = gsap.to(imageRef.value, {
		transform: `translate(${movedata.value.movX}px , ${movedata.value.movY}px)`,
		duration: easeTime,
		ease: "power4.out",
	});
	mousePos.value = { x, y };
};

const handleMouseDown = (event: MouseEvent) => {
	movedata.value.moveable = true;
	mainStore.setIsDragging(true);
	mousePos.value.x = event.clientX;
	mousePos.value.y = event.clientY;
};

const handleTouchStart = (event: TouchEvent) => {
	if (!event.touches[0]) return;
	movedata.value.moveable = true;
	mainStore.setIsDragging(true);
	mousePos.value.x = event.touches[0].clientX;
	mousePos.value.y = event.touches[0].clientY;
};

const handleMouseMove = (event: MouseEvent) => {
	move(event.clientX, event.clientY);
};

const handleTouchMove = (event: TouchEvent) => {
	if (!event.touches[0]) return;
	move(event.touches[0].clientX, event.touches[0].clientY);
};

const handleMouseUp = () => {
	movedata.value.moveable = false;
	mainStore.setIsDragging(false);
};

onMounted(() => {
	resize();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<div
		className="main_background"
		ref="viewBoxRef"
		@mousedown="handleMouseDown"
		@mousemove="handleMouseMove"
		@mouseup="handleMouseUp"
		@mouseleave="handleMouseUp"
		@touchstart.passive="handleTouchStart"
		@touchmove.passive="handleTouchMove"
		@touchend="handleMouseUp"
		@touchcancel="handleMouseUp"
	>
		<img
			:src="backgroundImg"
			alt="background"
			:width="6016 / 3"
			:height="3541 / 3"
			draggable="false"
			ref="imageRef"
		/>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.main_background {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	overflow: hidden;
	overscroll-behavior: none;
	user-select: none;

	img {
		cursor: pointer;
	}
}
</style>
