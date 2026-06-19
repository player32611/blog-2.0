<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import type { DetailMaskInstance } from "~/types/components";

import DetailBottom from "~/components/ui/detailUI/DetailBottom/DetailBottom.vue";
import DetailDoing from "~/components/ui/detailUI/DetailDoing/DetailDoing.vue";
import DetailIntroduce from "~/components/ui/detailUI/DetailIntroduce/DetailIntroduce.vue";
import DetailTitle from "~/components/ui/detailUI/DetailTitle/DetailTitle.vue";
import DetailWork from "~/components/ui/detailUI/DetailWork/DetailWork.vue";
import DetaiBackground from "~/components/ui/detailUI/DetaiBackground.vue";
import DetailCursor from "~/components/ui/detailUI/DetailCursor.vue";
import DetailMask from "~/components/ui/detailUI/DetailMask.vue";
import DetailPartition from "~/components/ui/detailUI/DetailPartition.vue";
import DetailTooltip from "~/components/ui/detailUI/DetailTooltip.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const detailStore = useDetailStore();
const smoother = ref<ScrollSmoother | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const maskRef = ref<DetailMaskInstance | null>(null);

usePageReady();

onMounted(() => {
	smoother.value = ScrollSmoother.create({
		wrapper: wrapperRef.value,
		content: contentRef.value,
		smooth: 1,
		effects: true,
		normalizeScroll: true,
	});
	detailStore.setMaskInstance(maskRef.value);
	document.title = "个人介绍";
});

onUnmounted(() => {
	smoother.value?.kill();
});
</script>

<template>
	<div class="details">
		<DetaiBackground />
		<div class="details_wrapper" ref="wrapperRef">
			<div class="details_content" ref="contentRef">
				<DetailTitle />
				<DetailPartition text="introduce" :direction="'left'" />
				<DetailPartition text="introduce" :direction="'right'" />
				<DetailIntroduce />
				<DetailDoing />
				<DetailPartition text="work" :direction="'left'" />
				<DetailPartition text="work" :direction="'right'" />
				<DetailWork />
				<DetailPartition text="contact" :direction="'left'" />
				<DetailPartition text="contact" :direction="'right'" />
				<DetailBottom />
			</div>
		</div>
		<DetailTooltip />
		<DetailCursor v-if="!isMobile()" />
		<DetailMask ref="maskRef" />
	</div>
</template>

<style scoped lang="scss">
.details {
	width: 100%;
	font-size: 1rem;
	cursor: none;

	.details_wrapper {
		height: auto;
		width: 100%;

		.details_content {
			width: 100%;
		}
	}
}
</style>
