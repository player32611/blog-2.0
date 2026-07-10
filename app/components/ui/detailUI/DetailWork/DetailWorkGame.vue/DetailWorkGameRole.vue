<script setup lang="ts">
import Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

import animPath from "@/assets/anims/reisen.json";

const animContainerRef = ref<HTMLDivElement | null>(null);
const lottieAnim = ref<AnimationItem | null>(null);

onMounted(() => {
	if (animContainerRef.value) {
		lottieAnim.value = Lottie.loadAnimation({
			container: animContainerRef.value,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: animPath,
		});
	}
});

onUnmounted(() => {
	lottieAnim.value?.destroy();
});
</script>

<template>
	<div class="game_role" ref="animContainerRef"></div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.game_role {
	position: absolute;
	top: 0;
	width: 300px;
	height: 500px;
	image-rendering: pixelated;
	z-index: variables.$float_zIndex;
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.65;

	.game_role {
		top: 60px;
		width: 300px * $base-size;
		height: 500px * $base-size;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.game_role {
		top: 40px;
		width: 300px * $base-size;
		height: 500px * $base-size;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.game_role {
		width: 300px * $base-size;
		height: 500px * $base-size;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.game_role {
		top: -40px;
		width: 300px * $base-size;
		height: 500px * $base-size;
	}
}
</style>
