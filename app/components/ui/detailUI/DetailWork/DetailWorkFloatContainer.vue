<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import type {
	DetailWorkFloatContainerParams,
	DetailWorkFloatContainerInstance,
} from "~/types/components";

import Bubble from "~/components/exhibit/Bubble.vue";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const { activeIndex } = defineProps<DetailWorkFloatContainerParams>();

const itemRefs = ref<HTMLDivElement[]>([]);

const itemNum: number = 5;
const floatingSpeed: number[] = Array.from({ length: itemNum }, () => Math.random() * 0.4 + 0.1);
const rotateAngle: number[] = Array.from({ length: itemNum }, () => Math.random() * 360);
const rotateSpeed: number[] = Array.from(
	{ length: itemNum },
	() => randomSign() * (Math.random() * 2 + 0.5),
);

const ticking = () => {
	const smoother = ScrollSmoother.get();
	if (!smoother) return;
	const y = smoother.scrollTop() - 5 * window.innerHeight;
	itemRefs.value.forEach((el, i) => {
		gsap.set(el, {
			y: (y * (floatingSpeed[i] || 0)) % (window.innerHeight + el.offsetHeight),
			rotate: ((rotateAngle[i] || 0) + y * (rotateSpeed[i] || 0)) % 360,
		});
	});
};

const startFloating = () => {
	gsap.ticker.add(ticking);
};

const stopFloating = () => {
	gsap.ticker.remove(ticking);
};

onUnmounted(() => {
	gsap.ticker.remove(ticking);
});

defineExpose<DetailWorkFloatContainerInstance>({
	startFloating,
	stopFloating,
});
</script>

<template>
	<div class="work_float_container">
		<div class="float_item" v-for="_ in itemNum" ref="itemRefs">
			<span class="icon" v-if="activeIndex === 0">&#xe7c9;</span>
			<span class="icon" v-else-if="activeIndex === 1">&#xe62e;</span>
			<Bubble v-else style="scale: 0.2" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.work_float_container {
	position: absolute;
	top: 0;
	display: flex;
	justify-content: space-around;
	height: 100vh;
	width: 100%;
	overflow: hidden;

	.float_item {
		position: relative;
		top: -30px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		width: 30px;
		transform-origin: center center;
		user-select: none;

		.icon {
			color: #000000;
			font-size: 30px;
		}
	}
}
</style>
