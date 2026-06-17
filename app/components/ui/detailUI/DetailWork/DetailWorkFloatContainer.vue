<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import type { DetailWorkFloatInstance } from "~/types/components";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const itemRefs = ref<HTMLDivElement[]>([]);

const itemNum: number = 5;
const floatingRate: number[] = Array.from({ length: itemNum }, () => Math.random() * 0.3 + 0.1);

const ticking = () => {
	const smoother = ScrollSmoother.get();
	if (!smoother) return;
	const y = smoother.scrollTop() - 5 * window.innerHeight;

	itemRefs.value.forEach((el, i) => {
		gsap.set(el, {
			y: (y * (floatingRate[i] || 0)) % (window.innerHeight + el.offsetHeight),
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

defineExpose<DetailWorkFloatInstance>({
	startFloating,
	stopFloating,
});
</script>

<template>
	<div class="work_float_container">
		<div
			class="float_item"
			v-for="_ in itemNum"
			:ref="el => itemRefs.push(el as HTMLDivElement)"
		></div>
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
		top: -50px;
		height: 50px;
		width: 50px;
		background-color: #ffffff;
	}
}
</style>
