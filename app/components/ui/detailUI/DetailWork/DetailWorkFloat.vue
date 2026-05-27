<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref<HTMLDivElement | null>(null);
const scrollAnim = ref<ScrollTrigger | null>(null);
const itemRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
	scrollAnim.value = ScrollTrigger.create({
		trigger: containerRef.value, // 要固定的元素
		start: "top top", // 元素顶部 触达 视口顶部时开始
		end: `+=${5 * window.innerHeight}`,
		markers: true,
		onEnter: () => {
			itemRef.value;
		},
	});
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
	left: 0;
	height: 100vh;
	width: 100%;
	background-color: rgba($color: #000000, $alpha: 0.5);

	.float_item {
		height: 100px;
		width: 100px;
	}
}
</style>
