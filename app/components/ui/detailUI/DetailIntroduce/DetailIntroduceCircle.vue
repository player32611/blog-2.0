<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const contentRef = ref<HTMLDivElement | null>(null);
const circleRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);

onMounted(() => {
	mountAnim.value = gsap.fromTo(
		circleRef.value,
		{ left: "-20%", rotate: -1080 },
		{
			left: "80%",
			rotate: 0,
			ease: "power1.out",
			duration: 2,
			scrollTrigger: {
				trigger: circleRef.value,
				start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
			},
			onUpdate: () => {
				gsap.set(contentRef.value, {
					clipPath: `inset(0% ${90 - (gsap.getProperty(circleRef.value, "left") as number)}% 0% 0%)`,
				});
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
	<div class="introduce_circle_container">
		<div class="introduce_circle_content" ref="contentRef">技术栈</div>
		<div class="introduce_circle" ref="circleRef">
			<svg :width="100" :height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="50" fill="white" stroke="black" stroke-width="1" />
				<path d="M 50,0 A 50,50 0 0 1 50,100 A 25,25 0 0 0 50,50 A 25,25 0 0 1 50,0 Z" fill="red" />
				<circle cx="50" cy="25" r="8" fill="white" />
				<circle cx="50" cy="75" r="8" fill="red" />
			</svg>
		</div>
	</div>
</template>

<style scoped lang="scss">
.introduce_circle_container {
	position: absolute;
	left: 0;
	bottom: 52.6%;
	width: 50%;

	.introduce_circle_content {
		color: rgba($color: #ffffff, $alpha: 0.5);
		font-size: 5rem;
		font-family: "方正基础像素体";
		text-align: center;
	}

	.introduce_circle {
		position: absolute;
		bottom: 0;
		height: 100px;
		width: 100px;
	}
}
</style>
