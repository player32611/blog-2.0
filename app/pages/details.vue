<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import Button from "~/components/ui/common/Button.vue";
import DetailIntroduce from "~/components/ui/detailUI/DetailIntroduce/DetailIntroduce.vue";
import DetailTitle from "~/components/ui/detailUI/DetailTitle/DetailTitle.vue";
import DetailPartition from "~/components/ui/detailUI/DetailPartition.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const loadingStore = useLoadingStore();
const smoother = ref<ScrollSmoother | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);

usePageReady();

onMounted(() => {
	smoother.value = ScrollSmoother.create({
		wrapper: wrapperRef.value,
		content: contentRef.value,
		smooth: 1,
	});
	document.title = "个人介绍";
});

onUnmounted(() => {
	smoother.value?.kill();
});
</script>

<template>
	<div class="details">
		<div class="details_wrapper" ref="wrapperRef">
			<div class="details_content" ref="contentRef">
				<DetailTitle />
				<DetailPartition text="introduce" :direction="'left'" />
				<DetailPartition text="introduce" :direction="'right'" />
				<DetailIntroduce />
				<DetailPartition text="work" :direction="'left'" />
				<DetailPartition text="work" :direction="'right'" />
			</div>
		</div>
		<Button
			:text="'back'"
			:icon="'&#xeb06;'"
			:size="'small'"
			@click="loadingStore.loadingNavigate('/')"
			:style="{ position: 'fixed', left: '20px', top: '20px' }"
		></Button>
	</div>
</template>

<style scoped lang="scss">
.details {
	width: 100%;
	font-size: 1rem;

	.details_wrapper {
		height: auto;
		width: 100%;
		background-color: #171717;

		.details_content {
			height: 500dvh;
			width: 100%;
		}
	}
}
</style>
