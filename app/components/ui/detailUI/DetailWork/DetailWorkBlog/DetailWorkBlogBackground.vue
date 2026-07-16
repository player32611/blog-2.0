<script setup lang="ts">
import gsap from "gsap";

const detailStore = useDetailStore();
const backgroundRef = ref<HTMLDivElement | null>(null);
const currentImage = ref<string | null>(detailStore.workBlogCurrentCard?.backgroundImage || null);

const easeDuration = 0.5;

watch(
	() => detailStore.workBlogCurrentCard?.backgroundImage,
	newState => {
		if (!newState) return;
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
		<img class="background_image" :src="`/blog-2.0${currentImage}`" draggable="false" />
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_blog_background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	filter: blur(10px);
	user-select: none;
	z-index: variables.$background_zIndex;

	.background_image {
		position: absolute;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
}
</style>
