<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import type { DetailWorkFloatInstance, DetailWorkTransitionInstance } from "~/types/components.js";

import DetailWorkBackground from "./DetailWorkBackground.vue";
import DetailWorkFloatContainer from "./DetailWorkFloatContainer.vue";
import DetailWorkItem1 from "./DetailWorkItem1.vue";
import DetailWorkItem2 from "./DetailWorkItem2.vue";
import DetailWorkItemEmpty from "./DetailWorkItemEmpty.vue";
import DetailWorkTransition from "./DetailWorkTransition.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const containerRef = ref<HTMLDivElement | null>(null);
const floatRef = ref<DetailWorkFloatInstance | null>(null);
const maskRef = ref<DetailWorkTransitionInstance | null>(null);
const scrollAnim = ref<ScrollTrigger | null>(null);
const activeIndex = ref<number>(-1);
const direction = ref<"forward" | "backward">("forward");

const totalHeight: number = 5 * window.innerHeight;
const triggerPoints: { start: number; end: number }[] = [
	{
		start: 0,
		end: window.innerHeight,
	},
	{
		start: window.innerHeight,
		end: 2 * window.innerHeight,
	},
	{
		start: 2 * window.innerHeight,
		end: 3 * window.innerHeight,
	},
	{
		start: 3 * window.innerHeight,
		end: 4 * window.innerHeight,
	},
];

onMounted(() => {
	scrollAnim.value = ScrollTrigger.create({
		trigger: containerRef.value, // 要固定的元素
		start: "top top", // 元素顶部 触达 视口顶部时开始
		end: `+=${totalHeight}`,
		pin: true, // 开启固定
		markers: true,
		onEnter: () => {
			console.log("enter");
			direction.value = "forward";
			floatRef.value?.startFloating();
		},
		onEnterBack: () => {
			console.log("enterback");
			direction.value = "backward";
			floatRef.value?.startFloating();
		},
		onLeave: () => {
			console.log("leave");
			floatRef.value?.stopFloating();
		},
		onLeaveBack: () => {
			console.log("leaveback");
			floatRef.value?.stopFloating();
		},
		onUpdate: self => {
			const smoother = ScrollSmoother.get();
			const scrolledDistance = self.scroll() - self.start;
			triggerPoints.forEach((point, index) => {
				if (
					(direction.value === "forward" &&
						scrolledDistance >= point.start &&
						index > activeIndex.value) ||
					(direction.value === "backward" &&
						scrolledDistance <= point.end &&
						index < activeIndex.value)
				) {
					maskRef.value?.transitionAnim(
						{
							onStart: () => {
								// smoother?.paused(true);
							},
							onComplete: () => {
								activeIndex.value = index;
							},
						},
						{
							onComplete: () => {
								// smoother?.paused(false);
							},
						},
					);
				}
			});
		},
	});
});
</script>

<template>
	<div class="detail_work" ref="containerRef">
		<DetailWorkBackground v-if="activeIndex === -1" />
		<DetailWorkItem1 v-else-if="activeIndex === 0" />
		<DetailWorkItem2 v-else-if="activeIndex === 1" />
		<DetailWorkItemEmpty v-else />
		<DetailWorkFloatContainer ref="floatRef" />
		<DetailWorkTransition ref="maskRef" />
	</div>
</template>

<style scoped lang="scss">
.detail_work {
	position: relative;
	height: 100vh;
}
</style>
