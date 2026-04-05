<script setup lang="ts">
import ItemContainer from "~/components/ui/itemUI/ItemContainer.vue";
import Button from "~/components/ui/Button.vue";
</script>

<template>
	<div class="items">
		<ItemContainer />
		<Button
			:text="'back'"
			:icon="'&#xeb09;'"
			:size="'small'"
			@click="navigateTo('/')"
			:style="{ position: 'fixed', left: '20px', top: '20px' }"
		></Button>
	</div>
</template>

<style scoped lang="scss">
.items {
	height: 100dvh;
	width: 100%;
}
</style>
