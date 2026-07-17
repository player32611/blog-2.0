<script setup lang="ts">
import gsap from "gsap";
import { MorphSVGPlugin, ScrollTrigger } from "gsap/all";
import Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";
import type { DetailWorkTransitionInstance } from "~/types/components";

import animPath from "@/assets/anims/dog.json";

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);

const pathRef = ref<SVGPathElement | null>(null);
const activeAnim = ref<GSAPTimeline | null>(null);
const animContainerRef = ref<HTMLDivElement | null>(null);
const lottieAnim = ref<AnimationItem | null>(null);

const start = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
const mid1 = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
const mid2 = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
const mid3 = "M 0 0 V 50 Q 50 100 100 50 V 0 z";
const end = "M 0 0 V 0 Q 50 0 100 0 V 0 z";
const easeDuration = 2;

const transitionAnim = (inOptions?: gsap.TweenVars, outOptions?: gsap.TweenVars) => {
	if (activeAnim.value) return;
	activeAnim.value = gsap
		.timeline({
			onStart: () => {
				lottieAnim.value?.play();
			},
		})
		.fromTo(
			pathRef.value,
			{ morphSVG: start },
			{ morphSVG: mid1, ease: "power1.in", duration: easeDuration / 4 },
		)
		.to(pathRef.value, {
			morphSVG: mid2,
			ease: "power1.out",
			duration: easeDuration / 4,
			...inOptions,
		})
		.to(pathRef.value, { morphSVG: mid3, ease: "power1.in", duration: easeDuration / 4 })
		.to(pathRef.value, {
			morphSVG: end,
			ease: "power1.out",
			duration: easeDuration / 4,
			...outOptions,
			onComplete: () => {
				lottieAnim.value?.pause();
				const optionOnComplete = outOptions?.onComplete;
				activeAnim.value?.kill();
				activeAnim.value = null;
				optionOnComplete?.();
			},
		})
		.fromTo(
			animContainerRef.value,
			{
				rotate: 0,
				y: "100vh",
				ease: "none",
			},
			{
				rotate: () => randomSign() * 720,
				y: "-100vh",
				ease: "none",
				duration: easeDuration,
			},
			0,
		);
};

defineExpose<DetailWorkTransitionInstance>({
	transitionAnim,
});

onMounted(() => {
	if (animContainerRef.value) {
		lottieAnim.value = Lottie.loadAnimation({
			container: animContainerRef.value,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: animPath,
		});
		lottieAnim.value.pause();
	}
	gsap.set(animContainerRef.value, { y: "100vh" });
});

onUnmounted(() => {
	activeAnim.value?.kill();
	lottieAnim.value?.destroy();
});
</script>

<template>
	<div class="work_transition" ref="transitionRef">
		<svg class="transition" viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
			<defs>
				<linearGradient id="grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
					<stop offset="0.2" stop-color="rgb(255, 135, 9)" />
					<stop offset="0.7" stop-color="rgb(247, 189, 248)" />
				</linearGradient>
			</defs>
			<path
				class="path"
				stroke="url(#grad)"
				fill="url(#grad)"
				stroke-width="2px"
				vector-effect="non-scaling-stroke"
				d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
				ref="pathRef"
			/>
		</svg>
		<div class="anim_container" ref="animContainerRef"></div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_transition {
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
	pointer-events: none;
	z-index: variables.$loading_zIndex;

	.anim_container {
		position: absolute;
		left: 35%;
		top: 35%;
		height: 30%;
		width: 30%;
		image-rendering: pixelated;
	}

	.transition {
		position: absolute;
		width: 100%;
		height: 100%;
	}
}
</style>
