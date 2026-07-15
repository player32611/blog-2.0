<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailPartitionParams } from "~/types/components";

gsap.registerPlugin(ScrollTrigger);

const { text, direction } = defineProps<DetailPartitionParams>();
const containerRef = ref<HTMLDivElement | null>(null);
const itemRefs = ref<HTMLDivElement[]>([]);
const scrollAnim = ref<GSAPTween | null>(null);
const normalAnims = ref<GSAPTween[]>([]);

const itemNum = 20;

const resize = () => {
	if (!itemRefs.value[0]) return;
	const rect = itemRefs.value[0].getBoundingClientRect();

	if (scrollAnim.value) scrollAnim.value.progress(0).kill();

	gsap.set(containerRef.value, { x: 0 });
	scrollAnim.value = gsap.to(containerRef.value, {
		x: direction === "left" ? `-=${2 * rect.width}px` : `+=${2 * rect.width}px`,
		onStart: () => {
			if (direction === "left") gsap.set(containerRef.value, { right: 2 * rect.width });
			else gsap.set(containerRef.value, { right: 4 * rect.width });
		},
		scrollTrigger: { scrub: true },
	});

	normalAnims.value.forEach(el => {
		el.progress(0).kill();
	});
	normalAnims.value.length = 0;
	itemRefs.value.forEach(el => {
		gsap.set(el, { x: 0 });
		normalAnims.value.push(
			gsap.to(el, {
				x: direction === "left" ? `-=${2 * rect.width}px` : `+=${2 * rect.width}px`,
				ease: "none",
				duration: 3,
				repeat: -1,
			}),
		);
	});
};

onMounted(() => {
	resize();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	scrollAnim.value?.scrollTrigger?.kill();
	scrollAnim.value?.kill();
	normalAnims.value.forEach(item => item.kill());
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<div class="detail_partition">
		<div class="partition_container" ref="containerRef">
			<div class="partition_item" v-for="_ in itemNum" ref="itemRefs">
				<div class="partition_text">{{ text.toUpperCase() }}</div>
				<svg
					id="partition_arrow"
					data-name="arrow"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 57.68085 54"
					:style="{ rotate: direction === 'left' ? '0deg' : '180deg' }"
				>
					<g id="arrow" data-name="arrow">
						<g>
							<polygon
								points=".8833 26.5 16.4834 .5 26.1167 .5 10.5166 26.5 .8833 26.5"
								style="fill: #ff7f27"
							/>
							<path
								d="M25.23383,1l-15,25H1.76617L16.76617,1h8.46765M27,0h-10.79999L0,27h10.79999L27,0h0Z"
								style="fill: #ff7f27"
							/>
						</g>
						<g>
							<polygon
								points="16.4834 53.5 .8833 27.5 10.5166 27.5 26.1167 53.5 16.4834 53.5"
								style="fill: #ff7f27"
							/>
							<path
								d="M10.23383,28l15,25h-8.46765L1.76617,28h8.46765M10.79999,27H0l16.20001,27h10.79999L10.79999,27h0Z"
								style="fill: #ff7f27"
							/>
						</g>
						<g>
							<polygon
								points="11.56396 26.5 27.16406 .5 36.79736 .5 21.19775 26.5 11.56396 26.5"
								style="fill: #fff"
							/>
							<path
								d="M35.91467,1l-15,25h-8.46765L27.44702,1h8.46765M37.68085,0h-10.79999L10.68085,27h10.79999L37.68085,0h0Z"
								style="fill: #fff"
							/>
						</g>
						<g>
							<polygon
								points="27.16406 53.5 11.56396 27.5 21.19775 27.5 36.79736 53.5 27.16406 53.5"
								style="fill: #fff"
							/>
							<path
								d="M20.91467,28l15,25h-8.46765l-15-25h8.46765M21.48083,27h-10.79999l16.20001,27h10.79999l-16.20001-27h0Z"
								style="fill: #fff"
							/>
						</g>
						<g>
							<polygon
								points="37.16406 53.5 21.56396 27.5 31.19775 27.5 46.79736 53.5 37.16406 53.5"
								style="fill: #ff7f27"
							/>
							<path
								d="M30.91467,28l15,25h-8.46765l-15-25h8.46765M31.48083,27h-10.79999l16.20001,27h10.79999l-16.20001-27h0Z"
								style="fill: #ff7f27"
							/>
						</g>
						<g>
							<polygon
								points="21.56396 26.5 37.16406 .5 46.79736 .5 31.19775 26.5 21.56396 26.5"
								style="fill: #ff7f27"
							/>
							<path
								d="M45.91467,1l-15,25h-8.46765L37.44702,1h8.46765M47.68085,0h-10.79999l-16.20001,27h10.79999L47.68085,0h0Z"
								style="fill: #ff7f27"
							/>
						</g>
						<g>
							<polygon
								points="31.56396 26.5 47.16406 .5 56.79736 .5 41.19775 26.5 31.56396 26.5"
								style="fill: #fff"
							/>
							<path
								d="M55.91467,1l-15,25h-8.46765L47.44702,1h8.46765M57.68085,0h-10.79999l-16.20001,27h10.79999L57.68085,0h0Z"
								style="fill: #fff"
							/>
						</g>
						<g>
							<polygon
								points="47.16406 53.5 31.56396 27.5 41.19775 27.5 56.79736 53.5 47.16406 53.5"
								style="fill: #fff"
							/>
							<path
								d="M40.91467,28l15,25h-8.46765l-15-25h8.46765M41.48083,27h-10.79999l16.20001,27h10.79999l-16.20001-27h0Z"
								style="fill: #fff"
							/>
						</g>
					</g>
				</svg>
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

			#partition_arrow {
				height: 5rem;
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

				#partition_arrow {
					height: 5rem * $base-size;
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

				#partition_arrow {
					height: 5rem * $base-size;
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

				#partition_arrow {
					height: 5rem * $base-size;
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

				#partition_arrow {
					height: 5rem * $base-size;
				}
			}
		}
	}
}
</style>
