<script setup lang="ts">
import MainBackGround from "~/components/ui/mainUI/MainBackGround.vue";
import MainBackMask from "~/components/ui/mainUI/MainBackMask.vue";
import MainContainer from "~/components/ui/mainUI/MainContainer.vue";
import MainCursor from "~/components/ui/mainUI/MainCursor.vue";
import MainLink from "~/components/ui/mainUI/MainLink.vue";
import MainUIBox from "~/components/ui/mainUI/MainUIBox.vue";

usePageReady();

onMounted(() => {
	document.title = "首页";
});
</script>

<template>
	<div class="main">
		<MainBackGround />
		<MainBackMask />
		<MainLink />
		<MainContainer />
		<MainUIBox />
		<ClientOnly>
			<MainCursor v-if="!isMobile()" />
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
.main {
	position: relative;
	width: 100%;
	height: 100dvh;
}
</style>
