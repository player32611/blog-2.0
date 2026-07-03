<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import type { BlogNavigationParams, BlogNavigationInstance } from "~/types/components";

const { page } = defineProps<BlogNavigationParams>();
const boxRef = ref<HTMLDivElement | null>(null);
const activeId = ref<string | null>(null);

const links = computed(() => page?.body.toc?.links);

const easeTime: number = 1;

const handleMouseEnter = () => {
	gsap.to(boxRef.value, {
		right: 0,
		duration: easeTime,
		ease: "power2.out",
	});
};

const handleMouseLeave = () => {
	let offset;
	if (window.innerWidth < 576) {
		offset = "-9rem";
	} else if (window.innerWidth < 768) {
		offset = "-12.5rem";
	} else if (window.innerWidth < 991) {
		offset = "-14.5rem";
	} else if (window.innerWidth < 1199) {
		offset = "-16.5rem";
	} else {
		offset = "-18rem";
	}
	gsap.to(boxRef.value, {
		right: offset,
		duration: easeTime,
		ease: "power2.out",
	});
};

const handleClick = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		const smoother = ScrollSmoother.get();
		if (smoother) {
			const rect = element.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const elementTop = rect.top + scrollTop - 20;
			smoother.scrollTo(elementTop, true);
		}
		activeId.value = id;
	}
};

const handleScroll = () => {
	if (!links.value) return;
	for (const h2 of links.value) {
		const h2Rect = document.getElementById(h2.id)?.getBoundingClientRect();
		if (!h2Rect) continue;
		for (const h3 of h2.children || []) {
			const h3Rect = document.getElementById(h3.id)?.getBoundingClientRect();
			if (!h3Rect) continue;
			if (h2Rect.top > 0 && h3Rect.top > 0) {
				activeId.value = h2.id;
				return;
			} else if (h2Rect.top < 0 && h3Rect.top > 0) {
				activeId.value = h3.id;
				return;
			}
		}
	}
};

defineExpose<BlogNavigationInstance>({ handleScroll });
</script>

<template>
	<div
		class="blog_navigation_box"
		ref="boxRef"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<div class="navigation_title">在此页面上</div>
		<div v-if="page" v-for="h2 in links" :key="h2.id" class="navigation_links">
			<div :class="'link_h2 ' + (activeId === h2.id ? 'active' : null)" @click="handleClick(h2.id)">
				{{ h2.text }}
			</div>
			<div
				v-for="h3 in h2.children"
				:key="h3.id"
				:class="'link_h3 ' + (activeId === h3.id ? 'active' : null)"
				@click="handleClick(h3.id)"
			>
				{{ h3.text }}
			</div>
		</div>
		<div v-else class="no_headings">无二级标题</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.blog_navigation_box {
	position: fixed;
	top: 10vh;
	right: -18rem * $base-size;
	padding: 2rem * $base-size;
	height: 80vh;
	width: 15rem * $base-size;
	background-color: #000000;
	border-width: 0.3rem * $base-size;
	border-style: solid;
	border-color: #ffffff;
	font-family: "方正基础像素体";
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	.navigation_title {
		color: #ffffff;
		font-weight: 600;
	}

	.navigation_links {
		display: flex;
		flex-direction: column;
		align-items: start;

		.link_h2,
		.link_h3 {
			width: 100%;
			color: rgba($color: #ffffff, $alpha: 0.5);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			user-select: none;
			transition: color 0.2s ease-in-out;
			transition: background-color 0.2s ease-in-out;
			cursor: pointer;

			&.active {
				color: #ffffff;
			}

			&:hover {
				background-color: rgba($color: #ffffff, $alpha: 0.5);
			}
		}

		.link_h2 {
			padding: 10px 0;
			font-size: 16px;
			font-weight: 600;
		}

		.link_h3 {
			padding: 5px 0;
			text-indent: 1rem;
			font-size: 14px;
			font-weight: 400;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.blog_navigation_box {
		right: -18rem * $base-size;
		padding: 2rem * $base-size;
		width: 15rem * $base-size;
		border-width: 0.3rem * $base-size;

		.navigation_links {
			.link_h2 {
				padding: 1rem * $base-size 0;
				font-size: 1.5rem * $base-size;
			}

			.link_h3 {
				padding: 0.5rem * $base-size 0;
				font-size: 1.2rem * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.blog_navigation_box {
		right: -18rem * $base-size;
		padding: 2rem * $base-size;
		width: 15rem * $base-size;
		border-width: 0.3rem * $base-size;

		.navigation_links {
			.link_h2 {
				padding: 1rem * $base-size 0;
				font-size: 1.5rem * $base-size;
			}

			.link_h3 {
				padding: 0.5rem * $base-size 0;
				font-size: 1.2rem * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.blog_navigation_box {
		right: -18rem * $base-size;
		padding: 2rem * $base-size;
		width: 15rem * $base-size;
		border-width: 0.3rem * $base-size;

		.navigation_links {
			.link_h2 {
				padding: 1rem * $base-size 0;
				font-size: 1.3rem * $base-size;
			}

			.link_h3 {
				padding: 0.5rem * $base-size 0;
				font-size: 1.1rem * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.blog_navigation_box {
		right: -18rem * $base-size;
		padding: 2rem * $base-size;
		width: 15rem * $base-size;
		border-width: 0.3rem * $base-size;

		.navigation_links {
			.link_h2 {
				padding: 1rem * $base-size 0;
				font-size: 1.3rem * $base-size;
			}

			.link_h3 {
				padding: 0.5rem * $base-size 0;
				font-size: 1.1rem * $base-size;
			}
		}
	}
}
</style>
