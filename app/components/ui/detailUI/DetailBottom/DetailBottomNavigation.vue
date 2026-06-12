<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const detailStore = useDetailStore();

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
</script>

<template>
	<div class="bottom_navigation">
		<div class="save_point" @click="handleClick"></div>
	</div>
</template>

<style scoped lang="scss">
.bottom_navigation {
	.save_point {
		height: 50px;
		width: 50px;
		background-color: yellow;
		cursor: pointer;
	}
}
</style>
