<script setup lang="ts">
import Button from "../../common/Button.vue";

const loadingStore = useLoadingStore();
</script>

<template>
	<div class="bottom_more">
		<Button
			text="more"
			size="large"
			icon="&#xeaf1;"
			@click="loadingStore.loadingNavigate('/')"
		></Button>
	</div>
</template>

<style scoped lang="scss">
.bottom_more {
	position: relative;
}
</style>
