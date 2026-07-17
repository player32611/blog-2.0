<script setup lang="ts">
import gsap from "gsap";
import { SlowMo, SplitText } from "gsap/all";
import Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

import animPath from "@/assets/anims/dog.json";

gsap.registerPlugin(SlowMo, SplitText);

const loadingStore = useLoadingStore();
const loadingRef = ref<SVGSVGElement | null>(null);
const blocks = ref<SVGUseElement[]>([]);
const maskRef = ref<HTMLDivElement | null>(null);
const animContainerRef = ref<HTMLDivElement | null>(null);
const animItem = ref<AnimationItem | null>(null);
const animContainerAnim = ref<GSAPTimeline | null>(null);
const contentContainerRef = ref<HTMLDivElement | null>(null);
const contentSplit = ref<SplitText | null>(null);
const contentAnim = ref<GSAPTimeline | null>(null);

const row = 13;
const line = 15;
const animContainerAnimInterval = 1.5;
const contentAnimDuration = 3;
const contentAnimStagger = 0.2;

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
			onStart: () => {
				animItem.value?.play();
				animContainerAnim.value?.resume();
				contentAnim.value?.resume();
			},
			onComplete: () => {
				next();
			},
		})
		.to(blocks.value, {
			scale: 1,
			opacity: 1,
			duration: 0.5,
			ease: "power2.out",
			stagger: { from: "edges", each: 0.003 },
		})
		.to(
			blocks.value,
			{
				"stroke-dashoffset": Math.random() < 0.5 ? -100 : 100,
				"stroke-opacity": 0,
				duration: 0.5,
				ease: "power4.out",
				stagger: { from: "random", each: 0.002 },
			},
			"<0.5",
		)
		.to(maskRef.value, { opacity: 1, duration: 0.5, ease: "none" }, "<0.2");
};

const loadingOut = () => {
	gsap
		.timeline({
			onComplete: () => {
				loadingStore.setIsLoading(false);
				animItem.value?.pause();
				animContainerAnim.value?.pause();
				contentAnim.value?.pause();
			},
		})
		.to(maskRef.value, { opacity: 0, duration: 0.5, ease: "none" })
		.to(
			blocks.value,
			{
				"stroke-dashoffset": 0,
				"stroke-opacity": 1,
				duration: 0.5,
				ease: "power4.out",
				stagger: { from: "random", each: 0.002 },
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
				stagger: { from: "center", each: 0.004 },
			},
			"<0.2",
		);
};

onMounted(() => {
	createBlocks();
	if (animContainerRef.value) {
		animItem.value = Lottie.loadAnimation({
			container: animContainerRef.value,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: animPath,
		});
	}
	animContainerAnim.value = gsap
		.timeline({ repeat: -1 })
		.set(animContainerRef.value, { rotateY: 180, delay: animContainerAnimInterval })
		.to(animContainerRef.value, {
			y: -100,
			ease: "slow(0.1,2,true)",
			duration: animContainerAnimInterval,
			delay: animContainerAnimInterval,
		})
		.set(animContainerRef.value, { rotateY: 0, delay: animContainerAnimInterval })
		.to(animContainerRef.value, {
			y: -100,
			ease: "slow(0.1,2,true)",
			duration: animContainerAnimInterval,
			delay: animContainerAnimInterval,
		});
	contentSplit.value = SplitText.create(contentContainerRef.value, { type: "chars" });
	contentAnim.value = gsap
		.timeline({ repeat: -1 })
		.fromTo(
			contentSplit.value.chars,
			{ x: -150 },
			{
				x: 150,
				ease: "slow(0.3,0.7,false)",
				duration: contentAnimDuration,
				stagger: { each: contentAnimStagger, from: "end" },
			},
		)
		.fromTo(
			contentSplit.value.chars,
			{ rotate: 90, opacity: 0 },
			{
				rotate: 0,
				opacity: 1,
				ease: "power1.out",
				duration: contentAnimDuration / 2,
				stagger: { each: contentAnimStagger, from: "end" },
			},
			"<",
		)
		.to(
			contentSplit.value.chars,
			{
				rotate: -90,
				opacity: 0,
				ease: "power1.in",
				duration: contentAnimDuration / 2,
				stagger: { each: contentAnimStagger, from: "end" },
			},
			`<${contentAnimDuration / 2}`,
		);
});

onUnmounted(() => {
	animItem.value?.destroy();
	animContainerAnim.value?.kill();
	contentAnim.value?.kill();
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
		<div class="loading_mask" ref="maskRef">
			<div class="loading_anim" ref="animContainerRef"></div>
			<div class="loading_content" ref="contentContainerRef">LOADING</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.root_loading {
	position: fixed;
	top: 0;
	left: 0;
	height: 100lvh;
	width: 100lvw;
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

	.loading_mask {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		background-color: #000000;
		image-rendering: pixelated;

		.loading_anim {
			height: 15vmin;
			width: 15vmin;
		}

		.loading_content {
			color: #ffffff;
			font-family: "方正基础像素体";
		}
	}
}
</style>
