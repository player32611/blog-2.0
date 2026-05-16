<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import Button from "~/components/ui/common/Button.vue";
import DetailTitle from "~/components/ui/detailUI/DetailTitle.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const loadingStore = useLoadingStore();
const smoother = ref<ScrollSmoother | null>(null);

usePageReady();

onMounted(() => {
	smoother.value = ScrollSmoother.create({
		wrapper: ".details",
		content: ".details_container",
		smooth: 1,
	});
	document.title = "个人介绍";
});
</script>

<template>
	<div class="details">
		<div class="details_container">
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
	height: 100dvh;
	width: 100%;
	font-size: 1rem;
	background-color: pink;

	.details_container {
		height: 500dvh;
		width: 100%;
	}
}
</style>
