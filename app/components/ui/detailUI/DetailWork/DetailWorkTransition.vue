<script setup lang="ts">
import gsap from "gsap";
import { MorphSVGPlugin, ScrollTrigger } from "gsap/all";
import type { DetailWorkTransitionInstance } from "~/types/components";

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);

const pathRef = ref<SVGPathElement | null>(null);
const activeAnim = ref<gsap.core.Timeline | null>(null);

const start = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
const mid1 = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
const mid2 = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
const mid3 = "M 0 0 V 50 Q 50 100 100 50 V 0 z";
const end = "M 0 0 V 0 Q 50 0 100 0 V 0 z";
const easeDuration: number = 2;

const transitionAnim = (inOptions?: gsap.TweenVars, outOptions?: gsap.TweenVars) => {
	if (activeAnim.value) return;
	activeAnim.value = gsap
		.timeline()
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
				const optionOnComplete = outOptions?.onComplete;
				activeAnim.value?.kill();
				activeAnim.value = null;
				optionOnComplete?.();
			},
		});
};

defineExpose<DetailWorkTransitionInstance>({
	transitionAnim,
});
</script>

<template>
	<div class="work_transition" ref="transitionRef">
		<svg class="transition" viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
			<defs>
				<linearGradient id="grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
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
	</div>
</template>

<style scoped lang="scss">
.work_transition {
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;

	.transition {
		width: 100%;
		height: 100%;
	}
}
</style>
