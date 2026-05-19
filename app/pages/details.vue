<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import Button from "~/components/ui/common/Button.vue";
import DetailTitle from "~/components/ui/detailUI/DetailTitle/DetailTitle.vue";

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
	<div class="details" ref="wrapperRef">
		<div class="details_container" ref="contentRef">
			<DetailTitle />
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
	position: relative;
	width: 100%;
	font-size: 1rem;
	background-color: #171717;

	.details_container {
		height: 500dvh;
		width: 100%;
		overflow: visible;
	}
}
</style>
