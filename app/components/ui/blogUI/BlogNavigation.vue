<script setup lang="ts">
import { gsap } from "gsap/gsap-core";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { BlogNavigationParams } from "~/types/components";

const { page } = defineProps<BlogNavigationParams>();
const boxRef = ref<HTMLDivElement | null>(null);
const easeTime = ref<number>(1);
const headings = ref<Array<{ id: string; text: string; level: number }>>([]);
const activeHeadingId = ref<string | null>(null);

const handleMouseEnter = () => {
	gsap.to(boxRef.value, {
		right: 0,
		duration: easeTime.value,
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
		duration: easeTime.value,
		ease: "power2.out",
	});
};

const handleClick = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		const contentSmoother = ScrollSmoother.get();
		if (contentSmoother) {
			const rect = element.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const elementTop = rect.top + scrollTop;
			contentSmoother.scrollTo(elementTop, true);
		}
		activeHeadingId.value = id;
	}
};

const getAllHeadings = () => {
	headings.value = [];
	const allElements = document.querySelectorAll("h2[id], h3[id]");
	allElements.forEach(el => {
		const id = el.getAttribute("id");
		const text = el.textContent || "";
		const level = el.tagName === "H2" ? 2 : 3;
		if (id && text) {
			headings.value.push({ id, text, level });
		}
	});
};

const getActiveHeading = () => {
	let currentActiveId = "";
	for (let i = headings.value.length - 1; i >= 0; i--) {
		const heading = headings.value[i];
		if (!heading) continue;
		const element = document.getElementById(heading.id);
		if (element) {
			const rect = element.getBoundingClientRect();
			if (rect.top <= 100) {
				currentActiveId = heading.id;
				break;
			}
		}
	}
	activeHeadingId.value = currentActiveId || null;
};

watch(
	() => page,
	() => {
		setTimeout(() => {
			getAllHeadings();
			getActiveHeading();
		}, 100);
	},
);

onMounted(() => {
	getAllHeadings();
	getActiveHeading();
	window.addEventListener("scroll", getActiveHeading);
	window.addEventListener("resize", getActiveHeading);
});

onUnmounted(() => {
	window.removeEventListener("scroll", getActiveHeading);
	window.removeEventListener("resize", getActiveHeading);
});
</script>

<template>
	<div
		class="blog_navigation_box"
		ref="boxRef"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<div class="navigation_title">在此页面上</div>
		<div class="navigation_links" v-if="headings.length > 0">
			<div
				v-for="heading in headings"
				:key="heading.id"
				class="navigation_link"
				:class="{
					active: activeHeadingId === heading.id,
					h2: heading.level === 2,
					h3: heading.level === 3,
				}"
				@click="handleClick(heading.id)"
			>
				{{ heading.text }}
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
		margin-top: 20px;

		.navigation_link {
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

			&.h2 {
				padding: 10px 0;
				font-size: 16px;
				font-weight: 600;
			}

			&.h3 {
				padding: 5px 0;
				text-indent: 1rem;
				font-size: 14px;
				font-weight: 400;
			}
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
			margin-top: 0.5rem * $base-size;

			.navigation_link {
				&.h2 {
					padding: 1rem * $base-size 0;
					font-size: 1.5rem * $base-size;
				}

				&.h3 {
					padding: 0.5rem * $base-size 0;
					font-size: 1.2rem * $base-size;
				}
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
			margin-top: 0.5rem * $base-size;

			.navigation_link {
				&.h2 {
					padding: 1rem * $base-size 0;
					font-size: 1.5rem * $base-size;
				}

				&.h3 {
					padding: 0.5rem * $base-size 0;
					font-size: 1.2rem * $base-size;
				}
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
			margin-top: 0.5rem * $base-size;

			.navigation_link {
				&.h2 {
					padding: 1rem * $base-size 0;
					font-size: 1.3rem * $base-size;
				}

				&.h3 {
					padding: 0.5rem * $base-size 0;
					font-size: 1.1rem * $base-size;
				}
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
			margin-top: 0.5rem * $base-size;

			.navigation_link {
				&.h2 {
					padding: 1rem * $base-size 0;
					font-size: 1.3rem * $base-size;
				}

				&.h3 {
					padding: 0.5rem * $base-size 0;
					font-size: 1.1rem * $base-size;
				}
			}
		}
	}
}
</style>
