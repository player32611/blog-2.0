<script setup lang="ts">
import gsap from "gsap";

const imageStore = useImageStore();
const cursorRef = ref<HTMLDivElement | null>(null);
const easeTime: number = 0.2;
const handleMouseMove = (event: MouseEvent) => {
	if (!cursorRef.value) return;
	if (imageStore.hoverImageData) {
		gsap.to(cursorRef.value, {
			x:
				imageStore.hoverImageData.center.x +
				(event.clientX - imageStore.hoverImageData.center.x) * 0.1,
			y:
				imageStore.hoverImageData.center.y +
				(event.clientY - imageStore.hoverImageData.center.y) * 0.1,
			duration: easeTime,
		});
	} else {
		gsap.to(cursorRef.value, {
			x: event.clientX,
			y: event.clientY,
			duration: easeTime,
		});
	}
};

watch(
	() => imageStore.hoverImageData,
	newData => {
		if (!cursorRef.value) return;
		if (newData) {
			gsap.to(cursorRef.value, {
				top: newData.height / -2,
				left: newData.width / -2,
				height: newData.height,
				width: newData.width,
				duration: easeTime,
				ease: "power1.out",
			});
		} else {
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
	window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", handleMouseMove);
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
$base-size: 1;

.image_cursor {
	position: fixed;
	top: -20px * $base-size;
	left: -20px * $base-size;
	width: 40px * $base-size;
	height: 40px * $base-size;
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
