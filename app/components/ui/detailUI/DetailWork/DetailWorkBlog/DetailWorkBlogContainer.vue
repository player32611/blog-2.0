<script setup lang="ts">
import gsap from "gsap";
import { Flip } from "gsap/all";

import DetailWorkBlogCard from "./DetailWorkBlogCard.vue";

gsap.registerPlugin(Flip);

const containerRef = ref<HTMLDivElement | null>(null);
const nextIndex = ref<number>(5);
const cardParams = ref([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

const lastCard = computed<HTMLDivElement | null>(
	() => containerRef.value?.querySelector(".container_card:last-child") || null,
);

const moveCard = () => {
	if (containerRef.value && lastCard.value) {
		console.log(cardParams.value);
		lastCard.value.style.display = "none";
		cardParams.value.unshift({
			id: nextIndex.value++,
		});

		cardParams.value.pop();
	}
};

const handleClick = async () => {
	const state = Flip.getState(".container_card");

	moveCard();

	await nextTick();

	Flip.from(state, {
		targets: ".container_card",
		ease: "sine.inOut",
		absolute: true,
		onEnter: elements => {
			return gsap.from(elements, {
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
				onComplete() {
					console.log("logging", element[0]);
				},
			});
		},
	});
};

onMounted(() => {});

onUnmounted(() => {});
</script>

<template>
	<div class="work_blog_container" ref="containerRef" @click="handleClick">
		<div class="container_card" v-for="params in cardParams" :key="params.id">
			<DetailWorkBlogCard />
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
		background: red;

		&:nth-child(5) {
			left: 0;
			top: 0;
		}
		&:nth-child(4) {
			left: 20px;
			top: -20px;
		}
		&:nth-child(3) {
			left: 40px;
			top: -40px;
		}
		&:nth-child(2) {
			left: 60px;
			top: -60px;
		}
		&:nth-child(1) {
			left: 80px;
			top: -80px;
		}
	}
}
</style>
