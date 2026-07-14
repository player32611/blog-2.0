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
		<div>
			<DetailWorkBlogLink />
			<DetailWorkBlogTip />
		</div>
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
