<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailWorkMaskInstance } from "~/types/components.js";

import DetailWorkBackground from "./DetailWorkBackground.vue";
import DetailWorkItem1 from "./DetailWorkItem1.vue";
import DetailWorkItem2 from "./DetailWorkItem2.vue";
import DetailWorkMask from "./DetailWorkMask.vue";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref<HTMLDivElement | null>(null);
const maskRef = ref<DetailWorkMaskInstance | null>(null);
const scrollAnim = ref<ScrollTrigger | null>(null);
const activeIndex = ref<number>(-1);

const triggerPoints = [0, 800, 1300, 1800];

onMounted(() => {
	scrollAnim.value = ScrollTrigger.create({
		trigger: containerRef.value, // 要固定的元素
		start: "top top", // 元素顶部 触达 视口顶部时开始
		end: `+=${5 * window.innerHeight}`,
		pin: true, // 开启固定
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
		<DetailWorkMask ref="maskRef" />
		<div class="item" data-speed="-0.1"></div>
		<div class="item" data-speed="0.2"></div>
		<div class="item" data-speed="1"></div>
		<div class="item" data-speed="1.2"></div>
		<div class="item" data-speed="1.2"></div>
	</div>
</template>

<style scoped lang="scss">
.detail_work {
	position: relative;
	height: 100vh;
	overflow: hidden;

	.item {
		position: relative;
		height: 100px;
		width: 100px;
		background-color: black;
	}
}
</style>
