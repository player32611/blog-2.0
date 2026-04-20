<script setup lang="ts">
import gsap from "gsap";

const containerRef = ref<SVGAElement>();
const width = ref<number>(0);
const height = ref<number>(0);
const left = ref<number>(0);
const top = ref<number>(0);
const side = ref<number>(30);
const margin = ref<number>(1);
const boxs = ref<SVGRectElement[]>([]);
const boxsOriPos = ref<{ x: number; y: number }[]>([]);
const mouseRadius = ref<number>(50);

const init = () => {
	resize();
	create(side.value, margin.value);
};

const resize = () => {
	if (containerRef.value) {
		containerRef.value.innerHTML = "";
		boxs.value = [];
		boxsOriPos.value = [];
		width.value = containerRef.value.getBoundingClientRect().width;
		height.value = containerRef.value.getBoundingClientRect().height;
		left.value = containerRef.value.getBoundingClientRect().left;
		top.value = containerRef.value.getBoundingClientRect().top;
	}
};

const create = (side: number, margin: number) => {
	for (let r = 0; (side + margin) * r <= height.value; r++) {
		for (let l = 0; (side + margin) * l <= width.value; l++) {
			let x = (side + margin) * l;
			let y = (side + margin) * r;
			const box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			box.setAttribute("class", "background_box");
			box.setAttribute("x", x.toString());
			box.setAttribute("y", y.toString());
			box.setAttribute("width", side.toString());
			box.setAttribute("height", side.toString());
			containerRef.value?.appendChild(box);
			boxs.value.push(box);
			boxsOriPos.value.push({ x, y });
		}
	}
};
const handleMouseMove = (e: MouseEvent) => {
	boxs.value.forEach((box, idx) => {
		if (box && boxsOriPos.value[idx]) {
			const mouseX = e.clientX - left.value;
			const mouseY = e.clientY - top.value;
			const dx = boxsOriPos.value[idx].x - mouseX;
			const dy = boxsOriPos.value[idx].y - mouseY;
			const distance = Math.sqrt(dx ** 2 + dy ** 2);
			if (distance <= mouseRadius.value && Math.random() >= 0.9) {
				gsap
					.timeline()
					.to(box, {
						stroke: "#1778A7",
						duration: 0.1,
						ease: "power4.out",
					})
					.to(box, {
						stroke: "#1C1C2D",
						duration: 0.2,
					});
			}
		}
	});
};

const handleTouchMove = (e: TouchEvent) => {
	const touch = e.touches[0];
	if (!touch) return;
	boxs.value.forEach((box, idx) => {
		if (box && boxsOriPos.value[idx]) {
			const mouseX = touch.clientX - left.value;
			const mouseY = touch.clientY - top.value;
			const dx = boxsOriPos.value[idx].x - mouseX;
			const dy = boxsOriPos.value[idx].y - mouseY;
			const distance = Math.sqrt(dx ** 2 + dy ** 2);
			if (distance <= mouseRadius.value && Math.random() >= 0.9) {
				gsap
					.timeline()
					.to(box, {
						stroke: "#1778A7",
						duration: 0.1,
						ease: "power4.out",
					})
					.to(box, {
						stroke: "#1C1C2D",
						duration: 0.2,
					});
			}
		}
	});
};

onMounted(() => {
	init();
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("touchmove", handleTouchMove, { passive: true });
	window.addEventListener("resize", init);
});

onUnmounted(() => {
	document.removeEventListener("mousemove", handleMouseMove);
	document.removeEventListener("touchmove", handleTouchMove);
	window.removeEventListener("resize", resize);
	if (containerRef.value) containerRef.value.innerHTML = "";
});
</script>

<template>
	<svg class="blog_background" ref="containerRef"></svg>
</template>

<style scoped lang="scss">
* {
	margin: 0;
	padding: 0;
	font-size: 1vmin;
}

.blog_background {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: #1c1c2d;
	z-index: -1;

	:deep(.background_box) {
		stroke: #1c1c2d;
	}
}
</style>
