<script setup lang="ts">
import ImageBackground from "~/components/ui/imageUI/ImageBackground.vue";
import ImageContainer from "~/components/ui/imageUI/ImageContainer.vue";
import ImageViewbox from "~/components/ui/imageUI/ImageViewbox.vue";
import Button from "~/components/ui/commen/Button.vue";

const { loadingNavigate } = useLoadingStore();

usePageReady();
</script>

<template>
	<div class="images">
		<ImageBackground />
		<ImageContainer />
		<ImageViewbox :data="null" />
		<Button
			:text="'back'"
			:icon="'&#xeb06;'"
			:size="'small'"
			@click="loadingNavigate('/')"
			:style="{ position: 'fixed', left: '20px', top: '20px' }"
		></Button>
	</div>
</template>

<style scoped lang="scss">
.images {
	position: relative;
	width: 100%;
	height: 100dvh;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
}
</style>
