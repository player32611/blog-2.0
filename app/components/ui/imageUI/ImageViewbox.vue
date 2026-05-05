<script setup lang="ts">
import type { ImageData, ImageViewboxInstance } from "~/types/components";

const imageData = ref<ImageData | null>(null);

const setImageData = (data: ImageData | null) => {
	imageData.value = data;
};

defineExpose<ImageViewboxInstance>({
	setImageData,
});
</script>

<template>
	<div class="image_viewbox"></div>
</template>

<style scoped lang="scss">
.image_viewbox {
	width: 100%;
	height: 100%;
}
</style>
