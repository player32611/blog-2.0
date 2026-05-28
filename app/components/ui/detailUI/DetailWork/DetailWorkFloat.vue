<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import type { DetailWorkFloatInstance } from "~/types/components";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const containerRef = ref<HTMLDivElement | null>(null);
const itemRef = ref<HTMLDivElement | null>(null);

const ticking = () => {
	const smoother = ScrollSmoother.get();
	if (!smoother) return;
	const y = smoother.scrollTop();
	const top = containerRef.value?.getBoundingClientRect().top;
	console.log(y);

	gsap.set(itemRef.value, {
		y: y * 0.1,
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
	<div class="work_float_container" ref="containerRef">
		<div class="float_item" ref="itemRef"></div>
	</div>
</template>

<style scoped lang="scss">
.work_float_container {
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100%;
	background-color: rgba($color: #000000, $alpha: 0.5);

	.float_item {
		height: 100px;
		width: 100px;
		background-color: #ffffff;
	}
}
</style>
