<script setup lang="ts">
import ImageBackground from "~/components/ui/imageUI/ImageBackground.vue";
import ImageContainer from "~/components/ui/imageUI/ImageContainer.vue";
import ImageCursor from "~/components/ui/imageUI/ImageCursor.vue";
import ImageDetailSign from "~/components/ui/imageUI/ImageDetailSign.vue";
import ImageDownload from "~/components/ui/imageUI/ImageDownload.vue";
import ImageViewbox from "~/components/ui/imageUI/ImageViewbox.vue";

import Button from "~/components/ui/common/Button.vue";

const { loadingNavigate } = useLoadingStore();

usePageReady();

onMounted(() => {
	document.title = "图像集";
});
</script>

<template>
	<div class="images">
		<ImageBackground />
		<ImageContainer />
		<ImageViewbox />
		<ImageDetailSign />
		<ImageDownload />
		<Button
			:text="'back'"
			:icon="'&#xeb06;'"
			:size="'small'"
			@click="loadingNavigate('/')"
			:style="{ position: 'fixed', left: '20px', top: '20px' }"
		></Button>
		<ClientOnly>
			<ImageCursor v-if="!isMobile()" />
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
.images {
	position: relative;
	width: 100%;
	height: 100dvh;
	user-select: none;
}
</style>
