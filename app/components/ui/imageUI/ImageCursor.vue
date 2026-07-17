<script setup lang="ts">
import gsap from "gsap";

const imageStore = useImageStore();
const cursorRef = ref<HTMLDivElement | null>(null);
const rotateAnimation = ref<GSAPAnimation | null>(null); // 旋转动画引用

let toX: gsap.QuickToFunc;
let toY: gsap.QuickToFunc;
const easeTime = 0.2; // 缓动时间
const outTime = 0.5; // 离开变化时间（s）
const cursorScale = 1.1; // 光标缩放比例
const dampCoefficient = 0.05; // 阻尼系数

const handleMouseDown = (event: MouseEvent) => {
	if (!cursorRef.value) return;
	if (imageStore.hoverImageData) {
		toX(
			imageStore.hoverImageData.center.x +
				(event.clientX - imageStore.hoverImageData.center.x) * dampCoefficient,
		);
		toY(
			imageStore.hoverImageData.center.y +
				(event.clientY - imageStore.hoverImageData.center.y) * dampCoefficient,
		);
	} else {
		toX(event.clientX);
		toY(event.clientY);
	}
};

const handleMouseMove = (event: MouseEvent) => {
	if (!cursorRef.value) return;
	if (!rotateAnimation.value?.isActive()) {
		gsap.to(cursorRef.value, { scale: 1, opacity: 1, duration: outTime });
		if (!imageStore.hoverImageData) rotateAnimation.value?.resume();
	}
	if (imageStore.hoverImageData) {
		toX(
			imageStore.hoverImageData.center.x +
				(event.clientX - imageStore.hoverImageData.center.x) * dampCoefficient,
		);
		toY(
			imageStore.hoverImageData.center.y +
				(event.clientY - imageStore.hoverImageData.center.y) * dampCoefficient,
		);
	} else {
		toX(event.clientX);
		toY(event.clientY);
	}
};

const handleMouseOut = (event: MouseEvent) => {
	if (event.relatedTarget === null) {
		gsap.to(cursorRef.value, { scale: 0, opacity: 0, duration: outTime });
		rotateAnimation.value?.pause();
	}
};

watch(
	() => imageStore.hoverImageData,
	newData => {
		if (!cursorRef.value) return;
		if (newData) {
			rotateAnimation.value?.restart().pause();
			gsap.to(cursorRef.value, {
				top: (newData.height * cursorScale) / -2,
				left: (newData.width * cursorScale) / -2,
				height: newData.height * cursorScale,
				width: newData.width * cursorScale,
				duration: easeTime,
				ease: "power1.out",
			});
		} else {
			rotateAnimation.value?.restart();
			gsap.to(cursorRef.value, {
				top: -20,
				left: -20,
				height: 40,
				width: 40,
				duration: easeTime,
				ease: "power1.out",
			});
		}
	},
);

onMounted(() => {
	toX = gsap.quickTo(cursorRef.value, "x", { duration: easeTime });
	toY = gsap.quickTo(cursorRef.value, "y", { duration: easeTime });
	rotateAnimation.value = gsap
		.to(cursorRef.value, {
			rotate: 720,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut",
		})
		.pause();
	window.addEventListener("mousedown", handleMouseDown);
	window.addEventListener("mousemove", handleMouseMove);
	window.addEventListener("mouseout", handleMouseOut);
});

onUnmounted(() => {
	rotateAnimation.value?.kill();
	window.removeEventListener("mousedown", handleMouseDown);
	window.removeEventListener("mousemove", handleMouseMove);
	window.removeEventListener("mouseout", handleMouseOut);
});
</script>

<template>
	<div class="image_cursor" ref="cursorRef">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

$base-size: 1;

.image_cursor {
	position: fixed;
	top: -20px * $base-size;
	left: -20px * $base-size;
	width: 40px * $base-size;
	height: 40px * $base-size;
	opacity: 0;
	z-index: variables.$cursor_zIndex;
	pointer-events: none;

	div {
		position: absolute;
		width: 10px * $base-size;
		height: 10px * $base-size;
		border-width: 5px * $base-size;
		border-color: #ff7f27;

		&:nth-child(1) {
			top: 0;
			left: 0;
			border-top-style: solid;
			border-left-style: solid;
		}

		&:nth-child(2) {
			top: 0;
			right: 0;
			border-top-style: solid;
			border-right-style: solid;
		}

		&:nth-child(3) {
			bottom: 0;
			left: 0;
			border-bottom-style: solid;
			border-left-style: solid;
		}

		&:nth-child(4) {
			bottom: 0;
			right: 0;
			border-bottom-style: solid;
			border-right-style: solid;
		}
	}
}
</style>
