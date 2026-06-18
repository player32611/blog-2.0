<script setup lang="ts">
import gsap from "gsap";
import type { Point } from "~/types/common";

import brushImg from "@/assets/images/sprites/brush.png";

const mainStore = useMainStore();
const cursorRef = ref<HTMLDivElement | null>(null);
const normalAnimation = ref<GSAPAnimation | null>(null);
const rotateAnimation = ref<GSAPAnimation | null>(null);
const traceRef = ref<HTMLDivElement | null>(null);
const currentMousePos = ref<Point>({ x: -100, y: -100 });

const easeTime: number = 0.2; // 缓动时间（s）
const outTime: number = 0.5; // 离开变化时间（s）
const traceDuration: number = 1; // 轨迹持续时间（s）
const traceDeg: number = 0.5; // 触发轨迹的角度上下界（deg）

const makeTrace = () => {
	if (!traceRef.value || !cursorRef.value || gsap.getProperty(traceRef.value!, "opacity") != 0)
		return;
	gsap
		.timeline()
		.set(traceRef.value, {
			x: currentMousePos.value.x,
			y: currentMousePos.value.y + cursorRef.value?.offsetHeight / 2 - 5,
			opacity: 1,
		})
		.set(traceRef.value.children, { scale: 1 })
		.to(traceRef.value, { duration: traceDuration, opacity: 0 })
		.to(traceRef.value.children, { duration: traceDuration, scale: 2.5 }, "<");
};

const handleMouseMove = (event: MouseEvent) => {
	if (!normalAnimation.value?.isActive() && !rotateAnimation.value?.isActive()) {
		gsap.to(cursorRef.value, { scale: 1, opacity: 1, duration: outTime });
		normalAnimation.value?.resume();
	}
	gsap.to(cursorRef.value, {
		x: event.clientX,
		y: event.clientY,
		duration: easeTime,
	});
	currentMousePos.value = { x: event.clientX, y: event.clientY };
};

const handleMouseOut = (event: MouseEvent) => {
	if (event.relatedTarget === null) {
		gsap.to(cursorRef.value, { scale: 0, opacity: 0, duration: outTime });
		normalAnimation.value?.pause();
		rotateAnimation.value?.pause();
	}
};

watch(
	() => mainStore.isDragging,
	newState => {
		if (newState) {
			normalAnimation.value?.pause();
			rotateAnimation.value?.resume();
		} else {
			normalAnimation.value?.resume();
			rotateAnimation.value?.pause();
		}
	},
);

onMounted(() => {
	if (cursorRef.value) {
		normalAnimation.value = gsap
			.timeline({
				onUpdate: () => {
					const currentRotate = gsap.getProperty(cursorRef.value!, "rotation");
					const rotationValue =
						typeof currentRotate === "string" ? parseFloat(currentRotate) : currentRotate;
					if (rotationValue >= -traceDeg && rotationValue <= traceDeg) makeTrace();
				},
			})
			.set(cursorRef.value, {
				rotation: -30,
			})
			.to(cursorRef.value, {
				rotation: 30,
				duration: 1,
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
			});
		normalAnimation.value.pause();
		rotateAnimation.value = gsap.timeline().to(cursorRef.value, {
			rotation: "+=360",
			duration: 0.2,
			repeat: -1,
			ease: "none",
		});
		rotateAnimation.value.pause();
	}
	window.addEventListener("mousemove", handleMouseMove);
	window.addEventListener("mouseout", handleMouseOut);
});

onUnmounted(() => {
	normalAnimation.value?.kill();
	rotateAnimation.value?.kill();
	window.removeEventListener("mousemove", handleMouseMove);
	window.removeEventListener("mouseout", handleMouseOut);
});
</script>

<template>
	<div class="main_cursor" ref="cursorRef">
		<img :src="brushImg" alt="加载失败" />
	</div>
	<div class="main_trace" ref="traceRef">
		<div class="trace_circle"></div>
	</div>
</template>

<style scoped lang="scss">
@use "../../../assets/styles/variables.scss";

.main_cursor {
	position: fixed;
	left: -5px;
	top: -30px;
	opacity: 0;
	pointer-events: none;
	z-index: variables.$cursor_zIndex;
}

.main_trace {
	position: fixed;
	left: -5px;
	top: -5px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: #000000;
	opacity: 0;
	z-index: variables.$cursor_trace_zIndex;
	pointer-events: none;

	.trace_circle {
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: #000000;
		opacity: 0.5;
	}
}
</style>
