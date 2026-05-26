<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import DetailWorkMask from "./DetailWorkMask.vue";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref<HTMLDivElement | null>(null);

onMounted(() => {});
</script>

<template>
	<div class="detail_work" ref="containerRef">
		<DetailWorkMask :containerRef="containerRef" />
		<div class="item" data-speed="-0.1"></div>
		<div class="item" data-speed="0.2"></div>
		<div class="item" data-speed="1"></div>
		<div class="item" data-speed="1.2"></div>
		<div class="item" data-speed="1.2"></div>
	</div>
</template>

<style scoped lang="scss">
.detail_work {
	height: 500vh;
	overflow: hidden;

	.detail_work_mask {
		height: 100px;
		width: 100%;
		background-color: white;
		opacity: 0.5;
	}

	.item {
		position: relative;
		height: 100px;
		width: 100px;
		background-color: black;
	}
}
</style>
