<script setup lang="ts">
import gsap from "gsap";

const cursorRef = ref<HTMLDivElement | null>(null);
const isOut = ref<boolean>(true);
const isHover = ref<boolean>(false);

const easeTime: number = 1; // 缓动时间（s）
const outTime: number = 0.5; // 离开变化时间（s）

const handleMouseMove = (event: MouseEvent) => {
	if (isOut.value) {
		gsap.to(cursorRef.value, { scale: 1, opacity: 1, duration: outTime });
		isOut.value = false;
	}
	gsap.set(cursorRef.value, {
		x: event.clientX,
		y: event.clientY,
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

	.icon {
		display: block;
		font-size: 30px;
		text-shadow: 0px 0px 20px #ff000060;
		rotate: 135deg;
	}
}
</style>
