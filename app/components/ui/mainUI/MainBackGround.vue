<script setup lang="ts">
import gsap from "gsap";
import type { Point, Rectangle } from "~/types/common";

import backgroundImg from "/images/background/main_background.png";

const mainStore = useMainStore();
const viewBoxRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const viewBoxData = ref<Rectangle>({ height: 0, width: 0 });
const imageData = ref<Rectangle>({ height: 0, width: 0 });
const mousePos = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const movedata = ref<{ moveable: boolean; movePos: Point }>({
	moveable: false,
	movePos: { x: 0, y: 0 },
});
const ani = ref<GSAPTween | null>(null); // gsap 动画
const scaleNum = ref<number>(1); // 缩放比例

let setX: gsap.QuickToFunc;
let setY: gsap.QuickToFunc;
const standardWidth = 1700; // 标准宽度
const resistance = 0.2;
const easeTime = 1;

const resize = () => {
	if (viewBoxRef.value && imageRef.value) {
		mainStore.setIsResized(true);
		viewBoxData.value.height = viewBoxRef.value.offsetHeight;
		viewBoxData.value.width = viewBoxRef.value.offsetWidth;
		imageData.value.height = imageRef.value.offsetHeight;
		imageData.value.width = imageRef.value.offsetWidth;
		mainStore.setBackgroundSize(imageData.value);
		mainStore.setBackgroundTransform(movedata.value.movePos);
		scaleNum.value = document.body.offsetWidth / standardWidth;
	}
};

const move = (x: number, y: number) => {
	if (!movedata.value.moveable || !imageRef.value) return;
	const distanceX = ((x - mousePos.value.x) / scaleNum.value) * resistance;
	const distanceY = ((y - mousePos.value.y) / scaleNum.value) * resistance;

	const newMovX = movedata.value.movePos.x + distanceX;
	const newMovY = movedata.value.movePos.y + distanceY;

	const maxOffsetX = Math.max(0, (imageData.value.width - viewBoxData.value.width) / 2);
	const maxOffsetY = Math.max(0, (imageData.value.height - viewBoxData.value.height) / 2);

	movedata.value.movePos.x = Math.max(-maxOffsetX, Math.min(maxOffsetX, newMovX));
	movedata.value.movePos.y = Math.max(-maxOffsetY, Math.min(maxOffsetY, newMovY));
	mainStore.setBackgroundTransform(movedata.value.movePos);

	if (ani.value) ani.value.kill();
	setX(movedata.value.movePos.x);
	setY(movedata.value.movePos.y);
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
	setX = gsap.quickTo(imageRef.value, "x", { duration: easeTime, ease: "power4.out" });
	setY = gsap.quickTo(imageRef.value, "y", { duration: easeTime, ease: "power4.out" });
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
		<img :src="backgroundImg" alt="background" draggable="false" ref="imageRef" />
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
		object-fit: cover;
		cursor: pointer;
	}
}
</style>
