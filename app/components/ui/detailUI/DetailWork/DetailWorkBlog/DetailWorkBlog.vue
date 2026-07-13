<script setup lang="ts">
import DetailWorkBlogBackground from "./DetailWorkBlogBackground.vue";
import DetailWorkBlogBottom from "./DetailWorkBlogBottom.vue";
import DetailWorkBlogContainer from "./DetailWorkBlogContainer.vue";
import DetailWorkBlogTitle from "./DetailWorkBlogTitle.vue";
</script>

<template>
	<div class="work_blog">
		<DetailWorkBlogBackground />
		<DetailWorkBlogTitle />
		<DetailWorkBlogContainer />
		<DetailWorkBlogBottom />
	</div>
</template>

<style scoped lang="scss">
.work_blog {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	height: 100vh;
	width: 100%;
	background-color: #000000;
}
</style>
