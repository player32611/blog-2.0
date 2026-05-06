<script setup lang="ts">
import ItemContainer from "~/components/ui/itemUI/ItemContainer.vue";
import Button from "~/components/ui/common/Button.vue";
import SakanaWidget from "~/components/ui/itemUI/SakanaWidget.vue";

const { loadingNavigate } = useLoadingStore();

usePageReady();
</script>

<template>
	<div class="items">
		<ItemContainer />
		<SakanaWidget />
		<Button
			:text="'back'"
			:icon="'&#xeb06;'"
			:size="'small'"
			@click="loadingNavigate('/')"
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
