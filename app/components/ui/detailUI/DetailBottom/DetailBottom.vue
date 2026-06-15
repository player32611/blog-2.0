<script setup lang="ts">
import DetailBottomBackground from "./DetailBottomBackground.vue";
import DetailBottomContent from "./DetailBottomContent.vue";
import DetailBottomLinks from "./DetailBottomLinks.vue";
import DetailBottomMore from "./DetailBottomMore.vue";
import DetailBottomNavigation from "./DetailBottomNavigation.vue";
</script>

<template>
	<div class="detail_bottom">
		<DetailBottomBackground />
		<DetailBottomContent />
		<DetailBottomNavigation />
		<DetailBottomMore />
		<DetailBottomLinks />
	</div>
</template>

<style scoped lang="scss">
.detail_bottom {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
}
</style>
