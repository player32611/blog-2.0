<script setup lang="ts">
import MainBackGround from "@/components/ui/mainUI/MainBackGround.vue";
import UiBox from "@/components/ui/mainUI/UiBox.vue";

usePageReady();

onMounted(async () => {
	await fetch("/666");
});
</script>

<template>
	<div class="home">
		<MainBackGround />
		<UiBox />
	</div>
</template>

<style scoped lang="scss">
.home {
	overflow: hidden;
}
</style>
