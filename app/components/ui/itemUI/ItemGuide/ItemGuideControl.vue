<script setup lang="ts">
import ItemGuideContent from "./ItemGuideContent.vue";
import ItemGuideThemeSwitch from "./ItemGuideThemeSwitch.vue";
</script>

<template>
	<div class="guide_control">
		<ItemGuideContent content="控制台" />
		<ItemGuideContent title="主题切换" />
		<ItemGuideThemeSwitch />
	</div>
</template>

<style scoped lang="scss">
.guide_control {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 50vh;
}
</style>
