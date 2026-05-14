<script setup lang="ts">
import gsap from "gsap";
import brushImg from "@/assets/images/sprites/brush.png";

const cursorRef = ref<HTMLDivElement | null>(null);
const rotateAnimation = ref<GSAPAnimation | null>(null);
const easeTime: number = 0.2; // 缓动时间

const handleMouseMove = (event: MouseEvent) => {
	if (!cursorRef.value) return;
	gsap.to(cursorRef.value, {
		x: event.clientX,
		y: event.clientY,
		duration: easeTime,
	});
};

onMounted(() => {
	if (cursorRef.value) {
		rotateAnimation.value = gsap.to(cursorRef.value, {
			rotate: 720,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut",
		});
	}
	window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
	<div class="main_cursor" ref="cursorRef" v-if="!isMobile()">
		<img :src="brushImg" alt="加载失败" />
	</div>
</template>

<style scoped lang="scss">
.main_cursor {
	position: fixed;
	left: -5px;
	top: -30px;
	pointer-events: none;
}
</style>
