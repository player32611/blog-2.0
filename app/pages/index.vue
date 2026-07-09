<script setup lang="ts">
import MainBackGround from "~/components/ui/mainUI/MainBackGround.vue";
import MainBackMask from "~/components/ui/mainUI/MainBackMask.vue";
import MainContainer from "~/components/ui/mainUI/MainContainer.vue";
import MainCursor from "~/components/ui/mainUI/MainCursor.vue";
import MainUIBox from "~/components/ui/mainUI/MainUIBox.vue";

usePageReady();

onMounted(() => {
	document.title = "首页";
});
</script>

<template>
	<div class="home">
		<MainBackGround />
		<MainBackMask />
		<MainContainer />
		<MainUIBox />
		<ClientOnly>
			<MainCursor v-if="!isMobile()" />
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss"></style>
