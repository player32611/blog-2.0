<script setup lang="ts">
import type { DetailBottomMoreInstance } from "~/types/components.js";

import DetailBottomContent from "./DetailBottomContent.vue";
import DetailBottomLinks from "./DetailBottomLinks.vue";
import DetailBottomMore from "./DetailBottomMore.vue";
import DetailBottomNavigation from "./DetailBottomNavigation.vue";
import Television from "~/components/exhibit/Television.vue";

const detailStore = useDetailStore();
const moreRef = ref<DetailBottomMoreInstance | null>(null);

const handleClick = () => {
	detailStore.setShaderType("VCR distortion");
};

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
			<div class="exhibit_container hoverable" @click="handleClick"><Television /></div>
			<DetailBottomLinks />
			<div class="exhibit_container hoverable"><Television /></div>
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
	height: 100vh;
	width: 100%;

	.bottom_bar {
		display: flex;
		justify-content: space-evenly;
		align-items: end;
		width: 100%;
	}
}
</style>
