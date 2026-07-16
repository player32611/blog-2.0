<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import type {
	DetailWorkFloatContainerInstance,
	DetailWorkTransitionInstance,
} from "~/types/components.js";

import DetailWorkBackground from "./DetailWorkBackground.vue";
import DetailWorkFloatContainer from "./DetailWorkFloatContainer.vue";
import DetailWorkGame from "./DetailWorkGame.vue/DetailWorkGame.vue";
import DetailWorkBlog from "./DetailWorkBlog/DetailWorkBlog.vue";
import DetailWorkItemEmpty from "./DetailWorkItemEmpty.vue";
import DetailWorkTransition from "./DetailWorkTransition.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const containerRef = ref<HTMLDivElement | null>(null);
const floatRef = ref<DetailWorkFloatContainerInstance | null>(null);
const maskRef = ref<DetailWorkTransitionInstance | null>(null);
const scrollAnim = ref<ScrollTrigger | null>(null);
const activeIndex = ref<number>(-1);
const direction = ref<"forward" | "backward">("forward");

onMounted(() => {
	const triggerPoints: { start: number; end: number }[] = Array.from({ length: 3 }, (_, index) => {
		return {
			start: index * window.innerHeight * 2,
			end: (index + 1) * window.innerHeight * 2,
		};
	});
	scrollAnim.value = ScrollTrigger.create({
		trigger: containerRef.value, // 要固定的元素
		start: "top top", // 元素顶部 触达 视口顶部时开始
		end: `+=${5 * window.innerHeight}`,
		pin: true, // 开启固定
		onEnter: () => {
			direction.value = "forward";
			floatRef.value?.startFloating();
		},
		onEnterBack: () => {
			direction.value = "backward";
			floatRef.value?.startFloating();
		},
		onLeave: () => {
			floatRef.value?.stopFloating();
		},
		onLeaveBack: () => {
			floatRef.value?.stopFloating();
		},
		onUpdate: self => {
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
					maskRef.value?.transitionAnim({
						onComplete: () => {
							activeIndex.value = index;
						},
					});
				}
			});
		},
	});
});
</script>

<template>
	<div class="detail_work" ref="containerRef">
		<DetailWorkBackground v-if="activeIndex === -1" />
		<DetailWorkGame v-else-if="activeIndex === 0" />
		<DetailWorkBlog v-else-if="activeIndex === 1" />
		<DetailWorkItemEmpty v-else />
		<DetailWorkFloatContainer ref="floatRef" :activeIndex="activeIndex" />
		<DetailWorkTransition ref="maskRef" />
	</div>
</template>

<style scoped lang="scss">
.detail_work {
	position: relative;
	height: 100svh;
}
</style>
