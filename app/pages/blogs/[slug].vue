<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import type { BlogCollectionItems, BlogCollections } from "~/types/config";
import type { BlogMaskInstance, BlogMenuInstance } from "~/types/components";

import BlogBackGround from "~/components/ui/blogUI/BlogBackGround.vue";
import BlogMask from "~/components/ui/blogUI/BlogMask.vue";
import BlogMenu from "~/components/ui/blogUI/BlogMenu.vue";
import BlogNavigation from "~/components/ui/blogUI/BlogNavigation.vue";
import BlogScrollBar from "~/components/ui/blogUI/BlogScrollBar.vue";
import Button from "~/components/ui/common/Button.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const route = useRoute();
const blogStore = useBlogStore();
const { loadingNavigate } = useLoadingStore();
const maskRef = ref<BlogMaskInstance | null>(null);
const menuRef = ref<BlogMenuInstance | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const smoother = ref<ScrollSmoother | null>(null);
const page = ref<BlogCollectionItems | null>(null);

const slug = computed(() => route.params.slug as BlogCollections);

usePageReady(() =>
	blogStore
		.useBlogContent(slug.value)
		.then(res => {
			page.value = res;
		})
		.then(() => {
			return nextTick();
		}),
);

onMounted(() => {
	smoother.value = ScrollSmoother.create({
		wrapper: wrapperRef.value,
		content: contentRef.value,
		smooth: 1,
	});
	blogStore.setBlogInstance(maskRef.value, menuRef.value);
	document.title = slug.value;
});

onBeforeUnmount(() => {
	smoother.value?.kill();
});
</script>

<template>
	<div class="blogs">
		<div class="blog_content" ref="wrapperRef">
			<div class="blog_content_container" ref="contentRef">
				<div class="blog_content_container_text">
					<ContentRenderer v-if="page" :value="page" />
				</div>
			</div>
		</div>
		<BlogBackGround />
		<BlogScrollBar />
		<BlogNavigation :page="page as BlogCollectionItems | null" />
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
			@click="blogStore.changeBlogMenuState"
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
			overflow-x: hidden;
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
	$base-size: 0.8;

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
