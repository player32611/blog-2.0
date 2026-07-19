<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

import animPath from "@/assets/anims/savePoint.json";

gsap.registerPlugin(ScrollSmoother);

const detailStore = useDetailStore();
const animContainer = ref<HTMLDivElement | null>(null);
const lottieAnim = ref<AnimationItem | null>(null);
const triggerAnim = ref<ScrollTrigger | null>(null);

const handleClick = () => {
	const smoother = ScrollSmoother.get();
	if (smoother) {
		detailStore.maskInstance?.maskIn({
			onComplete: () => {
				smoother.scrollTo(0);
				detailStore.maskInstance?.maskOut();
			},
		});
	}
};

onMounted(() => {
	triggerAnim.value = ScrollTrigger.create({
		trigger: animContainer.value,
		onEnter: () => {
			lottieAnim.value?.play();
		},
		onEnterBack: () => {
			lottieAnim.value?.play();
		},
		onLeave: () => {
			lottieAnim.value?.pause();
		},
		onLeaveBack: () => {
			lottieAnim.value?.pause();
		},
	});
	if (animContainer.value) {
		lottieAnim.value = Lottie.loadAnimation({
			container: animContainer.value,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: animPath,
		});
		lottieAnim.value.pause();
	}
});

onUnmounted(() => {
	triggerAnim.value?.kill();
	lottieAnim.value?.destroy();
});
</script>

<template>
	<div class="bottom_navigation" @click="handleClick" ref="animContainer"></div>
</template>

<style scoped lang="scss">
.bottom_navigation {
	flex-grow: 0.5;
	position: relative;
	height: 200px;
	width: 200px;
	image-rendering: pixelated;
	user-select: none;
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.bottom_navigation {
		height: 200px * $base-size;
		width: 200px * $base-size;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.bottom_navigation {
		height: 200px * $base-size;
		width: 200px * $base-size;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.bottom_navigation {
		height: 200px * $base-size;
		width: 200px * $base-size;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.bottom_navigation {
		height: 200px * $base-size;
		width: 200px * $base-size;
	}
}
</style>
