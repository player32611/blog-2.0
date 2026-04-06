<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { BlogNavigationParams } from "~/types/components";

const { page } = defineProps<BlogNavigationParams>();
const boxRef = ref<HTMLDivElement | null>(null);
const time = ref<number>(1);
const headings = ref<Array<{ id: string; text: string }>>([]);
const activeHeadingId = ref<string | null>(null);

const handleMouseEnter = () => {
	gsap.to(boxRef.value, {
		right: "0px",
		duration: time.value,
		ease: "power2.out",
	});
};

const handleMouseLeave = () => {
	gsap.to(boxRef.value, {
		right: "-300px",
		duration: time.value,
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
			const elementTop = rect.top + scrollTop;
			smoother.scrollTo(elementTop, true);
		}
		activeHeadingId.value = id;
	}
};
const getAllHeadings = () => {
	headings.value = [];
	const h2Elements = document.querySelectorAll("h2[id]");
	h2Elements.forEach(el => {
		const id = el.getAttribute("id");
		const text = el.textContent || "";
		if (id && text) {
			headings.value.push({ id, text });
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

onMounted(() => {
	getAllHeadings();
	getActiveHeading();
	watch(
		() => page,
		() => {
			setTimeout(() => {
				getAllHeadings();
				getActiveHeading();
			}, 100);
		},
	);
	window.addEventListener("scroll", getActiveHeading);
	window.addEventListener("resize", getActiveHeading);
});

onUnmounted(() => {
	window.removeEventListener("scroll", getActiveHeading);
	window.removeEventListener("resize", getActiveHeading);
});
</script>

<template>
	<div class="blog_navigation_box" ref="boxRef" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
		<div class="navigation_title">在此页面上</div>
		<div class="navigation_links" v-if="headings.length > 0">
			<div
				v-for="heading in headings"
				:key="heading.id"
				class="navigation_link"
				:class="{ active: activeHeadingId === heading.id }"
				@click="handleClick(heading.id)"
			>
				{{ heading.text }}
			</div>
		</div>
		<div v-else class="no_headings">无二级标题</div>
	</div>
</template>

<style scoped lang="scss">
.blog_navigation_box {
	position: fixed;
	right: -300px;
	margin: 10dvh 0;
	padding: 50px 40px;
	height: calc(80dvh - 50px * 2 - 5px * 2);
	width: 240px;
	background-color: #000000;
	border: 5px solid #ffffff;
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
			margin: 10px 0;
			width: auto;
			color: rgba($color: #ffffff, $alpha: 0.5);
			transition: color 0.2s ease-in-out;
			user-select: none;
			cursor: pointer;

			&.active {
				color: #ffffff;
			}
		}
	}
}
</style>
