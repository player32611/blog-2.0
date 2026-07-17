<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailPartitionParams } from "~/types/components";

gsap.registerPlugin(ScrollTrigger);

const { text, direction } = defineProps<DetailPartitionParams>();
const containerRef = ref<HTMLDivElement | null>(null);
const itemRefs = ref<HTMLDivElement[]>([]);
const scrollAnim = ref<GSAPTween | null>(null);
const normalAnim = ref<GSAPTween | null>(null);

const itemNum = 15;

const resize = () => {
	if (!itemRefs.value[0]) return;
	const rect = itemRefs.value[0].getBoundingClientRect();

	if (scrollAnim.value) scrollAnim.value.progress(0).kill();

	const offset = 2 * rect.width;
	gsap.set(containerRef.value, { x: 0 });
	scrollAnim.value = gsap.to(containerRef.value, {
		x: direction === "left" ? `-=${offset}px` : `+=${offset}px`,
		onStart: () => {
			if (direction === "left") gsap.set(containerRef.value, { right: offset });
			else gsap.set(containerRef.value, { right: 2 * offset });
		},
		scrollTrigger: {
			scrub: true,
			onEnter: () => {
				normalAnim.value?.play();
			},
			onEnterBack: () => {
				normalAnim.value?.play();
			},
			onLeave: () => {
				normalAnim.value?.pause();
			},
			onLeaveBack: () => {
				normalAnim.value?.pause();
			},
		},
	});

	normalAnim.value?.progress(0).kill();
	gsap.set(itemRefs.value, { x: 0 });
	normalAnim.value = gsap.to(itemRefs.value, {
		x: direction === "left" ? `-=${offset}px` : `+=${offset}px`,
		ease: "none",
		duration: 3,
		repeat: -1,
	});
};

onMounted(() => {
	resize();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	scrollAnim.value?.scrollTrigger?.kill();
	scrollAnim.value?.kill();
	normalAnim.value?.kill();
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<div class="detail_partition">
		<div class="partition_container" ref="containerRef">
			<div class="partition_item" v-for="_ in itemNum" ref="itemRefs">
				<div class="partition_text">{{ text.toUpperCase() }}</div>
				<div
					class="partition_arrow"
					:style="{ rotate: direction === 'left' ? '0deg' : '180deg' }"
				></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.detail_partition {
	position: relative;
	display: flex;
	height: 5rem;
	width: 100%;
	overflow: hidden;
	z-index: variables.$bar_zIndex;

	.partition_container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5rem;
		width: auto;
		font-family: "方正基础像素体";
		font-weight: 600;
		background-color: #ff7f27;

		.partition_item {
			position: relative;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 250px;
			font-size: 2rem;
			user-select: none;

			.partition_arrow {
				height: 5rem;
				width: 5rem;
				background: url("/blog-2.0/images/sprites/arrow.svg") center/contain no-repeat;
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.detail_partition {
		height: 5rem * $base-size;

		.partition_container {
			height: 5rem * $base-size;

			.partition_item {
				width: 250px * $base-size;
				font-size: 2rem * $base-size;

				.partition_arrow {
					height: 5rem * $base-size;
					width: 5rem * $base-size;
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.detail_partition {
		height: 5rem * $base-size;

		.partition_container {
			height: 5rem * $base-size;

			.partition_item {
				width: 250px * $base-size;
				font-size: 2rem * $base-size;

				.partition_arrow {
					height: 5rem * $base-size;
					width: 5rem * $base-size;
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.detail_partition {
		height: 5rem * $base-size;

		.partition_container {
			height: 5rem * $base-size;

			.partition_item {
				width: 250px * $base-size;
				font-size: 2rem * $base-size;

				.partition_arrow {
					height: 5rem * $base-size;
					width: 5rem * $base-size;
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.detail_partition {
		height: 5rem * $base-size;

		.partition_container {
			height: 5rem * $base-size;

			.partition_item {
				width: 250px * $base-size;
				font-size: 2rem * $base-size;

				.partition_arrow {
					height: 5rem * $base-size;
					width: 5rem * $base-size;
				}
			}
		}
	}
}
</style>
