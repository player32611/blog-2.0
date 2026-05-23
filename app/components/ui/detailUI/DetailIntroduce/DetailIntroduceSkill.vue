<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import DetailIntroduceSkillContainer from "./DetailIntroduceSkillContainer.vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const skillRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);
const showContainer = ref<boolean>(false);

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
			onComplete: () => {
				showContainer.value = true;
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
	<div class="introduce_skill" ref="skillRef">
		<DetailIntroduceSkillContainer v-if="showContainer" />
	</div>
</template>

<style scoped lang="scss">
.introduce_skill {
	position: absolute;
	right: 10%;
	bottom: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: start;
	height: 30dvh;
	width: 30%;
	color: rgba($color: #ffffff, $alpha: 0.5);
	font-size: 1.5rem;
	font-family: "方正基础像素体";
	border-color: rgba($color: #ffffff, $alpha: 0.5);
	border-width: 5px;
	border-style: solid;
	overflow: hidden;
}
</style>
