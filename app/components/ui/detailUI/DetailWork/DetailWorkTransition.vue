<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailWorkTransitionInstance } from "~/types/components";

gsap.registerPlugin(ScrollTrigger);

const transitionRef = ref<HTMLDivElement | null>(null);
const activeAnim = ref<gsap.core.Timeline | null>(null);

const transitionAnim = (inOptions?: gsap.TweenVars, outOptions?: gsap.TweenVars) => {
	if (activeAnim.value) return;

	activeAnim.value = gsap
		.timeline()
		.set(transitionRef.value, { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" })
		.to(transitionRef.value, {
			clipPath: "polygon(0 0, 200% 0, 100% 100%, 0 200%)",
			duration: 1,
			ease: "power1.out",
			...inOptions,
		})
		.to(transitionRef.value, {
			clipPath: "polygon(100% 100%, 200% 0, 100% 100%, 0 200%)",
			duration: 1,
			ease: "power1.out",
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
	<div class="work_transition" ref="transitionRef"></div>
</template>

<style scoped lang="scss">
.work_transition {
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100%;
	background-color: red;
	clip-path: polygon(0 0, 0 0, 0 0, 0 0);
}
</style>
