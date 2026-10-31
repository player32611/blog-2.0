<script setup lang="ts">
import DetailWorkEditBackground from "./DetailWorkEditBackground.vue";
import DetailWorkEditContainer from "./DetailWorkEditContainer.vue";
import DetailWorkEditLink from "./DetailWorkEditLink.vue";
import DetailWorkEditTitle from "./DetailWorkEditTitle.vue";
</script>

<template>
	<div class="work_edit">
		<DetailWorkEditBackground />
		<DetailWorkEditTitle />
		<DetailWorkEditContainer />
		<DetailWorkEditLink />
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_edit {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	color: #ffffff;
	height: 100%;
	width: 100%;
	z-index: variables.$float_zIndex;
	overflow: hidden;
}
</style>
