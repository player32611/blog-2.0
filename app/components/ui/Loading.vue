<script setup lang="ts">
import { gsap } from "gsap";
import type { LoadingParams } from "~/types/components";

const row = 22;
const line = 15;
const loadingRef = ref<SVGSVGElement | null>(null);
const blocks = ref<SVGUseElement[]>([]);
const props = defineProps<LoadingParams>();
const isLoading = ref(true);

const createBlocks = () => {
	if (!loadingRef.value) return;

	for (let l = 0; l < line; l++) {
		const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		for (let r = 0; r < row; r++) {
			let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
			use.setAttribute("class", "loading_block");
			use.setAttribute("href", "#loading_hexagon");
			use.setAttribute("x", `${(l % 2 ? 86.5 * r : 86.5 * r + 43.3) - 450}`);
			use.setAttribute("y", `${74.5 * l}`);
			use.setAttribute("transform-origin", "50 50");
			g.appendChild(use);
			blocks.value.push(use);
		}
		loadingRef.value.appendChild(g);
	}
};

const loadingIn = (next: () => void) => {
	isLoading.value = true;
	gsap
		.timeline({
			onComplete: () => {
				next();
				props.checkLoading?.();
			},
		})
		.set(blocks.value, { "stroke-dashoffset": 0 })
		.to(blocks.value, {
			scale: 1,
			opacity: 1,
			duration: 0.5,
			ease: "power2.out",
			stagger: {
				from: "center",
				each: 0.003,
			},
		});
};

const loadingOut = () => {
	isLoading.value = false;
	gsap
		.timeline()
		.to(blocks.value, {
			"stroke-dashoffset": 0,
			"stroke-opacity": 1,
			duration: 0.5,
			ease: "power4.out",
			stagger: {
				from: "random",
				each: 0.002,
			},
		})
		.to(
			blocks.value,
			{
				scale: 0,
				opacity: 0,
				duration: 1,
				ease: "power2.out",
				stagger: {
					from: "center",
					each: 0.004,
				},
			},
			"<0.2",
		);
};

onMounted(() => {
	createBlocks();
	setTimeout(() => {
		loadingOut();
	}, 1000);
});

defineExpose({
	loadingIn,
	loadingOut,
});
</script>

<template>
	<svg
		:class="isLoading ? 'loading_blocks' : 'loading_blocks  loading_out'"
		viewBox="0 0 1000 1000"
		preserveAspectRatio="xMidYMid slice"
		ref="loadingRef"
	>
		<defs>
			<polygon
				id="loading_hexagon"
				points="0,-50 43.3,-25 43.3,25 0,50 -43.3,25 -43.3,-25"
				fill="#171717"
			/>
		</defs>
	</svg>
</template>

<style scoped lang="scss">
.loading_blocks {
	position: fixed;
	top: 0;
	left: 0;
	height: 100dvh;
	width: 100vw;
	z-index: 9999;
	overflow: hidden;

	&.loading_out {
		pointer-events: none;
	}

	:deep(.loading_block) {
		stroke: #17f700;
		stroke-width: 0.8;
		stroke-dasharray: 100;
		stroke-opacity: 0;
	}
}
</style>
