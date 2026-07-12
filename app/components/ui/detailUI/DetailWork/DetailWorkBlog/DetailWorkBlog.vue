<script setup lang="ts">
import DetailWorkBlogItem from "./DetailWorkBlogItem.vue";
import blogImg from "/images/components/blog.png";
import imageImg from "/images/components/image.png";
import itemImg from "/images/components/item.png";
import mainImg from "/images/components/main.png";
import musicImg from "/images/components/music.png";
</script>

<template>
	<div class="work_blog">
		<DetailWorkBlogItem :image="blogImg" />
		<DetailWorkBlogItem :image="musicImg" />
		<DetailWorkBlogItem :image="itemImg" />
		<DetailWorkBlogItem :image="imageImg" />
		<div class="main_container">
			<DetailWorkBlogItem :image="mainImg" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.work_blog {
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;
	height: 100vh;
	width: 100%;
	background-color: #000000;

	.main_container {
		position: absolute;
		top: 25%;
		left: 25%;
		height: 50%;
		width: 50%;
	}
}
</style>
