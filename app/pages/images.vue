<script setup lang="ts">
import ImageBackground from "~/components/ui/imageUI/ImageBackground.vue";
import ImageContainer from "~/components/ui/imageUI/ImageContainer.vue";
import ImageCursor from "~/components/ui/imageUI/ImageCursor.vue";
import ImageDetailSign from "~/components/ui/imageUI/ImageDetailSign.vue";
import ImageDownload from "~/components/ui/imageUI/ImageDownload.vue";
import ImageViewbox from "~/components/ui/imageUI/ImageViewbox.vue";

import RectButton from "~/components/ui/common/RectButton.vue";

const imageStore = useImageStore();
const loadingStore = useLoadingStore();
const buttonRef = ref<HTMLDivElement | null>(null);

const handleMouseEnter = () => {
	if (!buttonRef.value) return;
	const rect = buttonRef.value.getBoundingClientRect();
	imageStore.setHoverImageData({
		width: rect.width,
		height: rect.height,
		center: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
	});
};

const handleMouseLeave = () => {
	imageStore.setHoverImageData(null);
};

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
		<div
			class="button_container"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
			ref="buttonRef"
		>
			<RectButton
				:text="'back'"
				:icon="'&#xeb06;'"
				:size="'small'"
				@click="loadingStore.loadingNavigate(-1)"
			></RectButton>
		</div>
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

	.button_container {
		position: fixed;
		left: 20px;
		top: 20px;
	}
}
</style>
