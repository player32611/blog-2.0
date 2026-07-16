<script setup lang="ts">
import type { DetailBottomMoreInstance } from "~/types/components.js";

import DetailBottomContent from "./DetailBottomContent.vue";
import DetailBottomLinks from "./DetailBottomLinks.vue";
import DetailBottomMore from "./DetailBottomMore.vue";
import DetailBottomNavigation from "./DetailBottomNavigation.vue";
import DetailBottomTelevision from "./DetailBottomTelevision.vue";
import DetailBottomTextarea from "./DetailBottomTextarea.vue";

const detailStore = useDetailStore();
const moreRef = ref<DetailBottomMoreInstance | null>(null);

onMounted(() => {
	detailStore.setBottomMoreInstance(moreRef.value);
});
</script>

<template>
	<div class="detail_bottom">
		<DetailBottomContent />
		<DetailBottomNavigation />
		<DetailBottomMore ref="moreRef" />
		<div class="bottom_bar">
			<DetailBottomTelevision />
			<DetailBottomLinks />
			<DetailBottomTextarea />
		</div>
	</div>
</template>

<style scoped lang="scss">
.detail_bottom {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100svh;
	width: 100%;

	.bottom_bar {
		flex-grow: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: center;
		align-items: end;
		width: 100%;
	}
}
</style>
