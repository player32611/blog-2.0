<script setup lang="ts">
import ItemGuidePhoto from "./ItemGuidePhoto.vue";
import ItemGuideContent from "./ItemGuideContent.vue";
</script>

<template>
	<div class="guide_help">
		<ItemGuidePhoto />
		<ItemGuideContent content="参考书" />
		<ItemGuideContent title="add xxx" content="添加物品" />
		<ItemGuideContent title="delete xxx" content="删除物品" />
	</div>
</template>

<style scoped lang="scss">
.guide_help {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 50vh;
}
</style>
