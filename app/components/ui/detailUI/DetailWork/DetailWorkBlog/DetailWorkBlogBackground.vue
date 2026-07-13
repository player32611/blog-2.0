<script setup lang="ts">
import gsap from "gsap";

const detailStore = useDetailStore();
const backgroundRef = ref<HTMLDivElement | null>(null);
const currentImage = ref<string>(detailStore.workBlogCurrentCard.image);

const easeDuration = 0.5;

watch(
	() => detailStore.workBlogCurrentCard.image,
	newState => {
		gsap
			.timeline()
			.to(backgroundRef.value, {
				filter: "blur(50px)",
				duration: easeDuration / 2,
				onComplete: () => {
					currentImage.value = newState;
				},
			})
			.to(backgroundRef.value, {
				filter: "blur(10px)",
				duration: easeDuration / 2,
			});
	},
);
</script>

<template>
	<div class="work_blog_background" ref="backgroundRef">
		<img class="background_image" :src="currentImage" />
	</div>
</template>

<style scoped lang="scss">
.work_blog_background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	filter: blur(10px);
	user-select: none;

	.background_image {
		position: absolute;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
}
</style>
