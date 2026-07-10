<script setup lang="ts">
import gsap from "gsap";

import heartImg from "/images/sprites/heart.png";

const cursorRef = ref<HTMLDivElement | null>(null);
const isOut = ref<boolean>(true);
const isHover = ref<boolean>(false);

const easeTime: number = 1; // 缓动时间（s）
const outTime: number = 0.5; // 离开变化时间（s）

const handleMouseDown = () => {
	gsap.to(cursorRef.value, { scale: 0.8, duration: outTime });
};

const handleMouseUp = () => {
	gsap.to(cursorRef.value, { scale: 1, duration: outTime });
};

const handleMouseMove = (event: MouseEvent) => {
	if (!cursorRef.value) return;
	if (isOut.value) {
		gsap.to(cursorRef.value, { scale: 1, opacity: 1, duration: outTime });
		isOut.value = false;
	}
	gsap.set(cursorRef.value, { x: event.clientX, y: event.clientY });
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
		if (!isHover.value)
			gsap
				.timeline({
					onStart: () => {
						isHover.value = true;
					},
				})
				.to(cursorRef.value, {
					color: "#ff0000",
					textShadow: "0 0 8px #ff0000",
					duration: easeTime,
				})
				.to(cursorRef.value, { rotate: "10deg", ease: "power1.out", duration: easeTime / 4 }, "<")
				.to(
					cursorRef.value,
					{ rotate: "-10deg", ease: "power1.inOut", duration: easeTime / 2 },
					">",
				)
				.to(cursorRef.value, { rotate: "0deg", ease: "power1.out", duration: easeTime / 4 }, ">");
	} else {
		if (isHover.value)
			gsap.to(cursorRef.value, {
				color: "#ff000040",
				textShadow: "0px 0px 20px #ff000060",
				duration: easeTime,
				onStart: () => {
					isHover.value = false;
				},
			});
	}
};

const handleMouseOut = (event: MouseEvent) => {
	if (event.relatedTarget === null && cursorRef.value) {
		gsap.to(cursorRef.value, { scale: 0, opacity: 0, duration: outTime });
		isOut.value = true;
	}
};

onMounted(() => {
	window.addEventListener("mousedown", handleMouseDown);
	window.addEventListener("mouseup", handleMouseUp);
	window.addEventListener("mousemove", handleMouseMove);
	window.addEventListener("mouseout", handleMouseOut);
});

onUnmounted(() => {
	window.removeEventListener("mousedown", handleMouseDown);
	window.removeEventListener("mouseup", handleMouseUp);
	window.removeEventListener("mousemove", handleMouseMove);
	window.removeEventListener("mouseout", handleMouseOut);
});
</script>

<template>
	<ClientOnly>
		<div class="detail_cursor" ref="cursorRef" v-if="!isMobile()">
			<img :src="heartImg" alt="加载失败" />
		</div>
	</ClientOnly>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

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

	img {
		width: 20px;
		rotate: 135deg;
		image-rendering: pixelated;
	}
}
</style>
