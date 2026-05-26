<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailWorkMaskParams } from "~/types/components";

gsap.registerPlugin(ScrollTrigger);

const { containerRef } = defineProps<DetailWorkMaskParams>();
const maskRef = ref<HTMLDivElement | null>(null);
const itemRef = ref<HTMLDivElement[]>([]);
const scrollAnim = ref<ScrollTrigger | null>(null);
const activeAnim = ref<gsap.core.Tween | null>(null);
const activeIndex = ref<number>(-1);

const row: number = 10;
const column: number = 20;
const triggerPoints = [0, 800, 1300, 1800];

const triggerAnim = (index: number) => {
	switch (index) {
		case 0:
			activeAnim.value = gsap.to(itemRef.value, {
				rotateX: 0,
				duration: 1,
				ease: "power1.out",
				stagger: {
					amount: 1,
					from: "random",
				},
			});
			break;
		case 1:
			activeAnim.value = gsap.to(itemRef.value, {
				rotateX: 90,
				duration: 1,
				ease: "power1.out",
				stagger: {
					amount: 1,
					from: "random",
				},
			});
			break;
	}
};

onMounted(async () => {
	gsap.set(itemRef.value, { rotateX: 90 });
	await nextTick();
	scrollAnim.value = ScrollTrigger.create({
		trigger: maskRef.value, // 要固定的元素
		start: "top top", // 元素顶部 触达 视口顶部时开始
		end: `+=${containerRef?.offsetHeight}`, // 继续滚动500px后结束固定
		pin: true, // 开启固定
		markers: { startColor: "white", endColor: "white" },
		onUpdate: self => {
			const scrolledDistance = self.scroll() - self.start;
			triggerPoints.forEach((point, index) => {
				if (scrolledDistance >= point && index > activeIndex.value) {
					activeIndex.value = index;
					console.log(`🎯 第 ${index + 1} 次触发，距离: ${point}px`);
					triggerAnim(index);
				}
			});
		},
	});

	// 动画点2：滚动到 500px
	// anim2.value = ScrollTrigger.create({
	// 	trigger: maskRef.value,
	// 	start: "top top+=500",
	// 	onEnter: () => {
	// 		gsap.to(itemRef.value, {
	// 			rotateX: "+=90",
	// 			duration: 1,
	// 			ease: "power1.out",
	// 			stagger: {
	// 				amount: 1,
	// 				from: "random",
	// 			},
	// 		});
	// 	},
	// 	toggleActions: "play none none none",
	// 	markers: { startColor: "blue", endColor: "blue" },
	// });
});
</script>

<template>
	<div class="work_mask" ref="maskRef">
		<div class="work_mask_row" v-for="i in row">
			<div
				class="work_mask_item"
				v-for="j in column"
				:ref="el => itemRef.push(el as HTMLDivElement)"
			></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.work_mask {
	height: 100vh;
	width: 100%;
	background-color: rgba($color: #ffffff, $alpha: 0.5);

	.work_mask_row {
		display: flex;
		height: 10%;
		width: 100%;

		.work_mask_item {
			height: 100%;
			width: 10%;
			background-color: green;
		}
	}
}
</style>
