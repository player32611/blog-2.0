<script setup lang="ts">
import ItemBackground from "~/components/ui/itemUI/ItemBackground.vue";
import ItemCommandBar from "~/components/ui/itemUI/ItemCommandBar.vue";
import ItemContainer from "~/components/ui/itemUI/ItemContainer.vue";
import ItemGuide from "~/components/ui/itemUI/ItemGuide/ItemGuide.vue";
import ItemSakanaWidget from "~/components/ui/itemUI/ItemSakanaWidget.vue";
import Button from "~/components/ui/common/Button.vue";

const { loadingNavigate } = useLoadingStore();

usePageReady();

onMounted(() => {
	document.title = "物品";
});
</script>

<template>
	<div class="items">
		<ItemBackground />
		<ItemContainer />
		<ClientOnly>
			<ItemSakanaWidget />
		</ClientOnly>
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
