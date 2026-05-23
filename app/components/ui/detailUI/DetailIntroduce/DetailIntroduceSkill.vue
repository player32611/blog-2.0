<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const skillRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);

onMounted(() => {
	mountAnim.value = gsap.fromTo(
		skillRef.value,
		{ height: 0, y: "-15dvh", opacity: 0 },
		{
			height: "30dvh",
			y: 0,
			opacity: 1,
			ease: "power4.out",
			duration: 1,
			scrollTrigger: {
				trigger: skillRef.value,
				start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
			},
		},
	);
});

onUnmounted(() => {
	mountAnim.value?.scrollTrigger?.kill();
	mountAnim.value?.kill();
});
</script>

<template>
	<div class="introduce_skill" ref="skillRef"></div>
</template>

<style scoped lang="scss">
.introduce_skill {
	position: absolute;
	right: 20%;
	bottom: 50%;
	padding: 3rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: start;
	height: 30dvh;
	width: 20%;
	color: rgba($color: #ffffff, $alpha: 0.5);
	font-size: 1.5rem;
	font-family: "方正基础像素体";
	border-color: rgba($color: #ffffff, $alpha: 0.5);
	border-width: 5px;
	border-style: solid;
	overflow: hidden;
}
</style>
