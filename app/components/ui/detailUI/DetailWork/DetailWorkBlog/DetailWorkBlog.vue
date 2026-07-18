<script setup lang="ts">
import DetailWorkBlogBackground from "./DetailWorkBlogBackground.vue";
import DetailWorkBlogContainer from "./DetailWorkBlogContainer.vue";
import DetailWorkBlogLink from "./DetailWorkBlogLink.vue";
import DetailWorkBlogTip from "./DetailWorkBlogTip.vue";
import DetailWorkBlogTitle from "./DetailWorkBlogTitle.vue";
</script>

<template>
	<div class="work_blog">
		<DetailWorkBlogBackground />
		<DetailWorkBlogTitle />
		<DetailWorkBlogContainer />
		<div class="work_blog_bottom">
			<DetailWorkBlogLink />
			<DetailWorkBlogTip />
		</div>
	</div>
</template>

<style scoped lang="scss">
.work_blog {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 5vh;
	height: 100%;
	width: 100%;
	background-color: #000000;

	.work_blog_bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>
