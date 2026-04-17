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

const { useBlogContent, setBlogInstance, changeBlogMenuState } = useBlogStore();
const { loadingNavigate } = useLoadingStore();
const maskRef = ref<BlogMaskInstance | null>(null);
const menuRef = ref<BlogMenuInstance | null>(null);
const page = useBlogContent();
const smoother = ref<ScrollSmoother | null>(null);

usePageReady();

onMounted(() => {
	smoother.value = ScrollSmoother.create({
		wrapper: ".blog_content",
		content: ".blog_content_container",
		smooth: 1,
	});
	setBlogInstance(maskRef.value, menuRef.value);
});

onUnmounted(() => {
	smoother.value?.kill();
	setBlogInstance(null, null);
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
			:icon="'&#xeb06;'"
			:size="'small'"
			@click="loadingNavigate('/')"
			:style="{ position: 'fixed', left: '20px', top: '20px' }"
		></Button>
		<Button
			:text="'menu'"
			:icon="'&#xeaf8;'"
			:size="'small'"
			@click="changeBlogMenuState"
			:style="{ position: 'fixed', right: '20px', top: '20px' }"
		></Button>
	</div>
</template>

<style scoped lang="scss">
$base-size: 0.3;

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
			border-width: 5px;
			border-style: solid;
			border-color: #ffffff;
			font-family: "方正基础像素体";
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.blogs {
		font-size: 1.2rem * $base-size;
		.blog_content {
			width: 80%;

			.blog_content_container_text {
				margin: 0 10% 0;
				padding: 2rem * $base-size;
				border-width: 0.4rem * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.blogs {
		font-size: 1.2rem * $base-size;
		.blog_content {
			width: 80%;

			.blog_content_container_text {
				margin: 0 10% 0;
				padding: 2rem * $base-size;
				border-width: 0.4rem * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.blogs {
		font-size: 1.2rem * $base-size;
		.blog_content {
			width: 70%;

			.blog_content_container_text {
				margin: 0 15% 0;
				padding: 2rem * $base-size;
				border-width: 0.4rem * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.blogs {
		font-size: 1.2rem * $base-size;
		.blog_content {
			width: 70%;

			.blog_content_container_text {
				margin: 0 15% 0;
				padding: 2rem * $base-size;
				border-width: 0.4rem * $base-size;
			}
		}
	}
}
</style>
