<script setup lang="ts">
import DetailWorkBlogBackground from "./DetailWorkBlogBackground.vue";
import DetailWorkBlogContainer from "./DetailWorkBlogContainer.vue";
</script>

<template>
	<div class="work_blog">
		<DetailWorkBlogBackground />
		<DetailWorkBlogContainer />
	</div>
</template>

<style scoped lang="scss">
.work_blog {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	height: 100vh;
	width: 100%;
	background-color: #000000;
}
</style>
