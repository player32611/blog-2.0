<script setup lang="ts">
import DetailBottomNavigation from "./DetailBottomNavigation.vue";
</script>

<template>
	<div class="detail_bottom">
		<DetailBottomNavigation />
	</div>
</template>

<style scoped lang="scss">
.detail_bottom {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	background-color: blue;
}
</style>
