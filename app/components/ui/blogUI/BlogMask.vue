<script setup lang="ts">
import gsap from "gsap";
import { EasePack } from "gsap/all";

import HamsterRunning from "~/components/exhibit/HamsterRunning.vue";

gsap.registerPlugin(EasePack);

const maskRef = ref<HTMLDivElement | null>(null);
const maskState = ref<"in" | "out">("in");

let maskAnim: GSAPTimeline;

const easeTime = 0.75;

const changeMask = () => {
	switch (maskState.value) {
		case "in":
			maskAnim.play();
			maskState.value = "out";
			break;
		case "out":
			maskAnim.reverse();
			maskState.value = "in";
			break;
	}
};

onMounted(() => {
	maskAnim = gsap
		.timeline()
		.to(maskRef.value, {
			height: 300,
			duration: easeTime,
			ease: "slow(0.1,0.1,true)",
		})
		.fromTo(
			maskRef.value,
			{ top: -110 },
			{ top: "100%", duration: easeTime, ease: "power1.inOut" },
			0,
		)
		.pause();
});

onUnmounted(() => {
	maskAnim.kill();
});

defineExpose({
	changeMask,
});
</script>

<template>
	<div class="blog_mask" ref="maskRef">
		<HamsterRunning />
	</div>
</template>

<style scoped lang="scss">
.blog_mask {
	position: fixed;
	top: -110px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 5px solid #000000;
	height: 100px;
	width: calc(100% - 10px);
	overflow: hidden;
	background-color: #212121;
}
</style>
