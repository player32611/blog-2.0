<script setup lang="ts">
import gsap from "gsap";

const cursorRef = ref<HTMLDivElement | null>(null);
const isOut = ref<boolean>(true);

const easeTime: number = 0.2; // 缓动时间（s）
const outTime: number = 0.5; // 离开变化时间（s）

const handleMouseMove = (event: MouseEvent) => {
	if (isOut.value) {
		gsap.to(cursorRef.value, { scale: 1, opacity: 1, duration: outTime });
		isOut.value = false;
	}
	gsap.to(cursorRef.value, {
		x: event.clientX,
		y: event.clientY,
		duration: easeTime,
	});
	if (
		Array.from(document.querySelectorAll(".hoverable")).some(node => {
			const rect = node.getBoundingClientRect();
			return (
				rect.x < event.x &&
				event.x < rect.x + rect.width &&
				rect.y < event.y &&
				event.y < rect.y + rect.height
			);
		})
	) {
		gsap.to(cursorRef.value, {
			color: "#ff0000ff",
			textShadow: "#ff0000bf",
			duration: easeTime,
		});
	} else {
		gsap.to(cursorRef.value, {
			color: "#ff000040",
			textShadow: "#ff000060",
			duration: easeTime,
		});
	}
};

const handleMouseOut = (event: MouseEvent) => {
	if (event.relatedTarget === null) {
		gsap.to(cursorRef.value, { scale: 0, opacity: 0, duration: outTime });
		isOut.value = true;
	}
};

onMounted(() => {
	window.addEventListener("mousemove", handleMouseMove);
	window.addEventListener("mouseout", handleMouseOut);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", handleMouseMove);
	window.removeEventListener("mouseout", handleMouseOut);
});
</script>

<template>
	<div class="detail_cursor" ref="cursorRef">
		<span class="icon">&#xe82b;</span>
	</div>
</template>

<style scoped lang="scss">
@use "../../../assets/styles/variables.scss";

.detail_cursor {
	position: fixed;
	top: -15px;
	left: -15px;
	height: 30px;
	width: 30px;
	color: #ff000040;
	opacity: 0;
	z-index: variables.$cursor_zIndex;
	pointer-events: none;

	.icon {
		display: block;
		font-size: 30px;
		text-shadow: 0px 0px 5px #ff000060;
		rotate: 135deg;
	}
}
</style>
