<script setup lang="ts">
import MainBackGround from "@/components/ui/mainUI/MainBackGround.vue";
import MainBackMask from "~/components/ui/mainUI/MainBackMask.vue";
import MainUIBox from "~/components/ui/mainUI/MainUIBox.vue";

usePageReady();
</script>

<template>
	<div class="home">
		<MainBackGround />
		<MainBackMask />
		<MainUIBox />
	</div>
</template>

<style scoped lang="scss">
.home {
	overflow: hidden;
}
</style>
