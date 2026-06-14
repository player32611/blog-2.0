<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const detailStore = useDetailStore();
const imageFrame = ref<number>(0);
const animInterval = ref<number | null>(null);

const changeInterval: number = 200;

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
	animInterval.value = setInterval(() => {
		imageFrame.value = imageFrame.value ? 0 : 1;
	}, changeInterval);
});

onUnmounted(() => {
	if (animInterval.value) clearInterval(animInterval.value);
});
</script>

<template>
	<div class="bottom_navigation" @click="handleClick">
		<img v-if="imageFrame" src="/images/sprites/savePoint1.png" alt="加载失败" />
		<img v-else src="/images/sprites/savePoint2.png" alt="加载失败" />
	</div>
</template>

<style scoped lang="scss">
.bottom_navigation {
	height: 200px;
	width: 200px;
	cursor: pointer;

	img {
		height: 100%;
		width: 100%;
		image-rendering: crisp-edges; /* 强制锐利边缘，无平滑 */
	}
}
</style>
