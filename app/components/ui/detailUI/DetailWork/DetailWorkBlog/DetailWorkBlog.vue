<script setup lang="ts">
import mainImg from "/images/components/main.png";
import blogImg from "/images/components/blog.png";
import itemImg from "/images/components/item.png";
import musicImg from "/images/components/music.png";
</script>

<template>
	<div class="work_blog">
		<div class="work_blog_mainContainer">
			<img :src="mainImg" alt="" />
		</div>
		<div class="work_blog_blogContainer">
			<img :src="blogImg" alt="" />
		</div>
		<div class="work_blog_musicContainer">
			<img :src="musicImg" alt="" />
		</div>
		<div class="work_blog_itemContainer">
			<img :src="itemImg" alt="" />
		</div>
		<div class="work_blog_imageContainer">
			<!-- <img :src="" alt="" /> -->
		</div>
	</div>
</template>

<style scoped lang="scss">
.work_blog {
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(2, 1fr);
	height: 100vh;
	width: 100%;
	background-color: yellow;
	pointer-events: none;

	.work_blog_mainContainer {
		position: absolute;
		top: 25%;
		left: 25%;
		height: 50%;
		width: 50%;
		overflow: hidden;
		pointer-events: all;
	}

	img {
		height: 100%;
		width: 100%;
		user-select: none;
	}
}
</style>
