<script setup lang="ts">
import DetailBottomContent from "./DetailBottomContent.vue";
import DetailBottomLinks from "./DetailBottomLinks.vue";
import DetailBottomNavigation from "./DetailBottomNavigation.vue";
</script>

<template>
	<div class="detail_bottom">
		<DetailBottomContent />
		<DetailBottomNavigation />
		<DetailBottomLinks />
	</div>
</template>

<style scoped lang="scss">
.detail_bottom {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100vh;
	width: 100%;
}
</style>
