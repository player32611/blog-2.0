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
</style>
