<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

import animPath from "@/assets/anims/savePoint.json";

gsap.registerPlugin(ScrollSmoother);

const detailStore = useDetailStore();
const animContainer = ref<HTMLDivElement | null>(null);
const animItem = ref<AnimationItem | null>(null);

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
	if (animContainer.value) {
		animItem.value = Lottie.loadAnimation({
			container: animContainer.value,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: animPath,
		});
	}
});

onUnmounted(() => {
	animItem.value?.destroy();
});
</script>

<template>
	<div class="bottom_navigation hoverable" @click="handleClick" ref="animContainer"></div>
</template>

<style scoped lang="scss">
.bottom_navigation {
	position: relative;
	height: 200px;
	width: 200px;
	image-rendering: crisp-edges; /* 强制锐利边缘，无平滑 */
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
