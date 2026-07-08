<script setup lang="ts">
import ItemGuidePhoto from "./ItemGuidePhoto.vue";
import ItemGuidePreview from "./ItemGuidePreview.vue";
</script>

<template>
	<div class="guide_introduce">
		<ItemGuidePhoto />
		<ItemGuidePreview />
	</div>
</template>

<style scoped lang="scss">
.guide_introduce {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 50vh;
}
</style>
