<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailWorkFloatInstance, DetailWorkMaskInstance } from "~/types/components.js";

import DetailWorkBackground from "./DetailWorkBackground.vue";
import DetailWorkFloat from "./DetailWorkFloat.vue";
import DetailWorkItem1 from "./DetailWorkItem1.vue";
import DetailWorkItem2 from "./DetailWorkItem2.vue";
import DetailWorkMask from "./DetailWorkMask.vue";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref<HTMLDivElement | null>(null);
const floatRef = ref<DetailWorkFloatInstance | null>(null);
const maskRef = ref<DetailWorkMaskInstance | null>(null);
const scrollAnim = ref<ScrollTrigger | null>(null);
const activeIndex = ref<number>(-1);

const triggerPoints = [0, window.innerHeight, window.innerHeight * 2, window.innerHeight * 3];

onMounted(() => {
	scrollAnim.value = ScrollTrigger.create({
		trigger: containerRef.value, // 要固定的元素
		start: "top top", // 元素顶部 触达 视口顶部时开始
		end: `+=${5 * window.innerHeight}`,
		pin: true, // 开启固定
		// markers: true,
		onEnter: () => {
			console.log("enter");
			floatRef.value?.startFloating();
		},
		onEnterBack: () => {
			console.log("enterback");
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
			const scrolledDistance = self.scroll() - self.start;
			triggerPoints.forEach((point, index) => {
				if (scrolledDistance >= point && index > activeIndex.value) {
					maskRef.value?.triggerAnim(() => {
						activeIndex.value = index;
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
		<DetailWorkItem1 v-if="activeIndex === 0" />
		<DetailWorkItem2 v-if="activeIndex === 1" />
		<DetailWorkFloat ref="floatRef" />
		<DetailWorkMask ref="maskRef" />
	</div>
</template>

<style scoped lang="scss">
.detail_work {
	position: relative;
	height: 100vh;
}
</style>
