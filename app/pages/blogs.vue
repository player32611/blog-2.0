<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { BlogMaskInstance, BlogMenuInstance } from "~/types/components";

import BlogBackGround from "~/components/ui/blogUI/BlogBackGround.vue";
import BlogMask from "~/components/ui/blogUI/BlogMask.vue";
import BlogMenu from "~/components/ui/blogUI/BlogMenu.vue";
import BlogNavigation from "~/components/ui/blogUI/BlogNavigation.vue";
import BlogScrollBar from "~/components/ui/blogUI/BlogScrollBar.vue";
import Button from "~/components/ui/Button.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const { useBlogContent } = useBlogStore();
const maskRef = ref<BlogMaskInstance | null>(null);
const menuRef = ref<BlogMenuInstance | null>(null);
const page = useBlogContent();
const smoother = ref<ScrollSmoother | null>(null);

onMounted(() => {
	smoother.value = ScrollSmoother.create({
		wrapper: ".blog_content",
		content: ".blog_content_container",
		smooth: 1,
	});
});

onUnmounted(() => {
	smoother.value?.kill();
});
</script>

<template>
	<div class="blogs">
		<div class="blog_content">
			<div class="blog_content_container">
				<div class="blog_content_container_text">
					<ContentRenderer v-if="page" :value="page" />
				</div>
			</div>
		</div>
		<BlogBackGround />
		<BlogScrollBar />
		<BlogNavigation :page="page" />
		<BlogMenu ref="menuRef" />
		<BlogMask ref="maskRef" />
		<Button
			:text="'back'"
			:icon="'&#xeaf1;'"
			:size="'small'"
			@click="navigateTo('/')"
			:style="{
				position: 'fixed',
				left: '20px',
				top: '20px',
			}"
		></Button>
		<Button
			:text="'menu'"
			:icon="'&#xeaf1;'"
			:size="'small'"
			@click="
				() => {
					maskRef?.changeMask();
					menuRef?.changeMenu();
				}
			"
			:style="{
				position: 'fixed',
				right: '20px',
				top: '20px',
			}"
		></Button>
	</div>
</template>

<style lang="scss">
.blogs {
	height: auto;
	width: 100%;

	.blog_content {
		height: auto;
		width: 60%;

		.blog_content_container_text {
			margin: 0 20% 0;
			padding: 50px;
			color: #ffffff;
			border: 5px solid #ffffff;
			font-family: "方正基础像素体";
		}
	}
}
</style>
