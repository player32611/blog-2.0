<script setup lang="ts">
import gsap from "gsap";

const cursorRef = ref<HTMLDivElement | null>(null);
const isOut = ref<boolean>(true);

const easeTime: number = 0.2; // 缓动时间（s）
const changeTime: number = 0.5;
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
				event.x < rect.x + rect.height &&
				rect.y < event.y &&
				event.y < rect.y + rect.height
			);
		})
	) {
		console.log("111");
		gsap.to(cursorRef.value, {
			color: "blue",
			duration: changeTime,
		});
	} else {
		gsap.to(cursorRef.value, {
			color: "red",
			duration: changeTime,
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
	top: -10px;
	left: -10px;
	height: 20px;
	width: 20px;
	color: red;
	opacity: 0;
	z-index: variables.$cursor_zIndex;
	pointer-events: none;

	.icon {
		display: block;
		font-size: 20px;
		rotate: 135deg;
	}
}
</style>
