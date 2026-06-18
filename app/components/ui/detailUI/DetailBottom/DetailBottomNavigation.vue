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
	<div class="bottom_navigation hoverable" @click="handleClick">
		<img v-show="imageFrame === 0" src="/images/sprites/savePoint1.png" alt="加载失败" />
		<img v-show="imageFrame === 1" src="/images/sprites/savePoint2.png" alt="加载失败" />
	</div>
</template>

<style scoped lang="scss">
.bottom_navigation {
	position: relative;
	height: 200px;
	width: 200px;
	cursor: pointer;

	img {
		height: 100%;
		width: 100%;
		image-rendering: crisp-edges; /* 强制锐利边缘，无平滑 */
		user-select: none;
	}
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
