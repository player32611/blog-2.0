<script setup lang="ts">
import Button from "~/components/ui/common/Button.vue";
import ItemCommandBar from "~/components/ui/itemUI/ItemCommandBar.vue";
import ItemContainer from "~/components/ui/itemUI/ItemContainer.vue";
import ItemGuide from "~/components/ui/itemUI/ItemGuide.vue";
import SakanaWidget from "~/components/ui/itemUI/SakanaWidget.vue";

const { loadingNavigate } = useLoadingStore();

usePageReady();
</script>

<template>
	<div class="items">
		<ItemContainer />
		<SakanaWidget />
		<ItemCommandBar />
		<ItemGuide />
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
	position: relative;
	height: 100dvh;
	width: 100%;
	overflow: hidden;
}
</style>
