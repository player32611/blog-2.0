<script setup lang="ts">
import gsap from "gsap";
import { Flip } from "gsap/all";
import type { DetailWorkBlogCardParams } from "~/types/components";

import DetailWorkBlogCard from "./DetailWorkBlogCard.vue";

interface params extends DetailWorkBlogCardParams {
	id: string;
}

gsap.registerPlugin(Flip);
const detailStore = useDetailStore();
const cardParams = ref<params[]>(
	Array.from(DETAIL_WORK_BLOGDATA, data => ({
		id: generateId(),
		content: data.content,
		image: data.image,
		title: data.title,
	})),
);

const moveCard = () => {
	const first = cardParams.value[DETAIL_WORK_BLOGDATA.length - 1];
	const second = cardParams.value[DETAIL_WORK_BLOGDATA.length - 2];
	if (!first || !second) return;
	cardParams.value.unshift({
		...first,
		id: generateId(),
	});
	cardParams.value.pop();
	detailStore.setWorkBlogCurrentCard(second);
};

const handleClick = async () => {
	const state = Flip.getState(".container_card");

	moveCard();

	await nextTick();

	Flip.from(state, {
		targets: ".container_card",
		ease: "sine.inOut",
		absolute: true,
		onEnter: element => {
			return gsap.from(element, {
				duration: 0.3,
				yPercent: 20,
				opacity: 0,
				ease: "expo.out",
			});
		},
		onLeave: element => {
			return gsap.to(element, {
				duration: 0.3,
				yPercent: 5,
				xPercent: -5,
				transformOrigin: "bottom left",
				opacity: 0,
				ease: "expo.out",
			});
		},
	});
};

onMounted(() => {
	window.addEventListener("click", handleClick);
});

onUnmounted(() => {
	window.removeEventListener("click", handleClick);
});
</script>

<template>
	<div class="work_blog_container" ref="containerRef">
		<div class="container_card" v-for="params in cardParams" :key="params.id">
			<DetailWorkBlogCard :title="params.title" :content="params.content" :image="params.image" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.work_blog_container {
	position: relative;
	height: 500px;
	width: 300px;
	perspective: 100px;

	:deep(.container_card) {
		position: absolute;
		height: 500px;
		width: 300px;
		pointer-events: none;

		&:nth-child(5) {
			left: 0;
			top: 0;
			z-index: 10;
			pointer-events: all;
		}

		&:nth-child(4) {
			left: 20px;
			top: -20px;
			z-index: 9;
		}

		&:nth-child(3) {
			left: 40px;
			top: -40px;
			z-index: 8;
		}

		&:nth-child(2) {
			left: 60px;
			top: -60px;
			z-index: 7;
		}

		&:nth-child(1) {
			left: 80px;
			top: -80px;
			z-index: 6;
		}
	}
}
</style>
