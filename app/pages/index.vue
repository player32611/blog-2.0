<script setup lang="ts">
import MainBackGround from "@/components/ui/mainUI/MainBackGround.vue";
import MainBackMask from "~/components/ui/mainUI/MainBackMask.vue";
import MainContainer from "~/components/ui/mainUI/MainContainer.vue";
import MainUIBox from "~/components/ui/mainUI/MainUIBox.vue";

usePageReady();
</script>

<template>
	<div class="home">
		<MainBackGround />
		<MainBackMask />
		<MainContainer />
		<MainUIBox />
	</div>
</template>

<style lang="scss">
html,
body {
	overflow: hidden;
}
</style>
