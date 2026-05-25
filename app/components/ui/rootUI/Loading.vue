<script setup lang="ts">
import gsap from "gsap";

import Loading1 from "~/components/exhibit/Loading1.vue";

const row = 13;
const line = 15;
const loadingRef = ref<SVGSVGElement | null>(null);
const blocks = ref<SVGUseElement[]>([]);
const animRef = ref<HTMLDivElement | null>(null);
const loadingStore = useLoadingStore();

const createBlocks = () => {
	if (!loadingRef.value) return;

	for (let l = 0; l < line; l++) {
		const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		for (let r = 0; r < row; r++) {
			let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
			use.setAttribute("class", "loading_block");
			use.setAttribute("href", "#loading_hexagon");
			use.setAttribute("x", `${l % 2 ? 86.5 * r : 86.5 * r + 43.3}`);
			use.setAttribute("y", `${74.5 * l}`);
			use.setAttribute("transform-origin", "50 50");
			g.appendChild(use);
			blocks.value.push(use);
		}
		loadingRef.value.appendChild(g);
	}
};

const loadingIn = (next: () => void) => {
	gsap
		.timeline({
			onComplete: () => {
				next();
			},
		})
		.to(blocks.value, {
			scale: 1,
			opacity: 1,
			duration: 0.5,
			ease: "power2.out",
			stagger: {
				from: "edges",
				each: 0.003,
			},
		})
		.to(
			blocks.value,
			{
				"stroke-dashoffset": Math.random() < 0.5 ? -100 : 100,
				"stroke-opacity": 0,
				duration: 0.5,
				ease: "power4.out",
				stagger: {
					from: "random",
					each: 0.002,
				},
			},
			"<0.5",
		)
		.to(
			animRef.value,
			{
				opacity: 1,
				duration: 0.5,
				ease: "linear",
			},
			"<0.2",
		);
};

const loadingOut = () => {
	gsap
		.timeline({
			// onStart: () => {
			// 	console.log("start");
			// 	gsap.set(animRef.value, { opacity: 1 });
			// },
			onComplete: () => {
				loadingStore.setIsLoading(false);
			},
		})
		.to(animRef.value, {
			opacity: 0,
			duration: 0.5,
			ease: "linear",
		})
		.to(
			blocks.value,
			{
				"stroke-dashoffset": 0,
				"stroke-opacity": 1,
				duration: 0.5,
				ease: "power4.out",
				stagger: {
					from: "random",
					each: 0.002,
				},
			},
			"<0.2",
		)
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
	// setTimeout(() => {
	// 	loadingOut();
	// }, 1000);
});

defineExpose({
	loadingIn,
	loadingOut,
});
</script>

<template>
	<div class="root_loading">
		<svg
			class="loading_blocks"
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
		<div class="loading_anim" ref="animRef">
			<Loading1 />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "../../../assets/styles/variables.scss";

.root_loading {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100dvw;
	z-index: variables.$loading_zIndex;
	overflow: hidden;
	pointer-events: none;

	.loading_blocks {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;

		:deep(.loading_block) {
			stroke: #17f700;
			stroke-width: 0.8;
			stroke-dasharray: 100;
			stroke-opacity: 0;
		}
	}

	.loading_anim {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		background-color: #000000;
	}
}
</style>
