<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import type {
	DetailWorkFloatContainerParams,
	DetailWorkFloatContainerInstance,
} from "~/types/components";

import Bubble from "~/components/exhibit/Bubble.vue";
import Vial from "../../common/Vial.vue";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const { activeIndex } = defineProps<DetailWorkFloatContainerParams>();

const itemNum = ref<number>(10);
const itemRefs = ref<HTMLDivElement[]>([]);

const floatingSpeed = Array.from({ length: itemNum.value }, () => randomFloat(0.1, 0.2));
const rotateAngle = Array.from({ length: itemNum.value }, () => Math.random() * 360);
const rotateSpeed = Array.from({ length: itemNum.value }, () => randomSign() * randomFloat(0.5, 2));

const ticking = () => {
	const smoother = ScrollSmoother.get();
	if (!smoother) return;
	const baseY = smoother.scrollTop() - 4 * window.innerHeight;
	itemRefs.value.forEach((el, i) => {
		const innerRope = el.querySelector(".rope_container");
		if (!innerRope) return;
		const y = (baseY * (floatingSpeed[i] || 0)) % (window.innerHeight + el.offsetHeight);
		const rotation = ((rotateAngle[i] || 0) + baseY * (rotateSpeed[i] || 0)) % 360;
		gsap.set(el, { y, rotation });
		gsap.set(innerRope, { height: y, rotation: -rotation });
	});
};

const startFloating = () => {
	gsap.ticker.add(ticking);
};

const stopFloating = () => {
	gsap.ticker.remove(ticking);
};

onMounted(() => {
	itemNum.value = isMobile() ? 6 : 10;
});

onUnmounted(() => {
	gsap.ticker.remove(ticking);
});

defineExpose<DetailWorkFloatContainerInstance>({
	startFloating,
	stopFloating,
});
</script>

<template>
	<div class="work_float_container">
		<div
			class="float_item"
			v-for="i in itemNum"
			:key="i"
			:class="i === itemNum / 2 ? 'left_last' : ''"
			ref="itemRefs"
		>
			<div class="rope_container" v-if="activeIndex >= 0"><div class="rope"></div></div>
			<div class="item_container">
				<span v-if="activeIndex < 0"></span>
				<svg
					v-else-if="activeIndex === 0"
					id="bullet"
					data-name="bullet"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 8 17"
				>
					<g id="_bullet" data-name="_bullet">
						<g>
							<rect x="2.5" y=".5" width="3" height="16" />
							<path d="M5,1v15h-2V1h2M6,0H2v17h4V0h0Z" />
						</g>
						<g>
							<rect x="1.5" y="1.5" width="5" height="15" />
							<path d="M6,2v14H2V2h4M7,1H1v16h6V1h0Z" />
						</g>
						<g>
							<rect x=".5" y="3.5" width="7" height="12" />
							<path d="M7,4v11H1V4h6M8,3H0v13h8V3h0Z" />
						</g>
						<g>
							<rect x="2.5" y="1.5" width="3" height="14" style="fill: #4c4c4c" />
							<path d="M5,2v13h-2V2h2M6,1H2v15h4V1h0Z" style="fill: #4c4c4c" />
						</g>
						<g>
							<rect x="1.5" y="3.5" width="5" height="12" style="fill: #4c4c4c" />
							<path d="M6,4v11H2V4h4M7,3H1v13h6V3h0Z" style="fill: #4c4c4c" />
						</g>
						<g>
							<rect x="3.5" y="2.5" width="1" height="12" style="fill: #fff" />
							<path d="M4,3v11V3M5,2h-2v13h2V2h0Z" style="fill: #fff" />
						</g>
						<g>
							<rect x="2.5" y="3.5" width="3" height="11" style="fill: #fff" />
							<path d="M5,4v10h-2V4h2M6,3H2v12h4V3h0Z" style="fill: #fff" />
						</g>
					</g>
				</svg>
				<Vial v-else-if="activeIndex === 1" :color="randomColor({ format: 'hex' })" />
				<Bubble v-else style="scale: 0.2" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_float_container {
	position: absolute;
	top: 0;
	display: flex;
	height: 100vh;
	width: 100%;
	gap: 50px;
	pointer-events: none;
	z-index: variables.$float_zIndex;
	overflow: hidden;

	.float_item {
		position: relative;
		top: -30px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		width: 30px;
		transform-origin: center center;
		user-select: none;

		&.left_last {
			margin-right: auto;
		}

		.rope_container {
			position: absolute;
			width: 5px;

			.rope {
				position: absolute;
				bottom: 0;
				height: 100%;
				width: 5px;
				transform: translateY(-50%);
				background: repeating-linear-gradient(45deg, #d5ad72 0 10px, #000000 10px 11px);
				filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.237));
			}
		}

		.item_container {
			position: relative;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			transform-origin: center center;
			filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.237));

			#bullet {
				position: absolute;
				height: 100%;
				width: 100%;
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.work_float_container {
		gap: 50px * $base-size;

		.float_item {
			top: -30px * $base-size;
			height: 30px * $base-size;
			width: 30px * $base-size;

			.rope_container {
				width: 5px * $base-size;

				.rope {
					width: 5px * $base-size;
					background: repeating-linear-gradient(
						45deg,
						#d5ad72 0 10px * $base-size,
						#000000 10px * $base-size 11px * $base-size
					);
					filter: drop-shadow(
						5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
					);
				}
			}

			.item_container {
				filter: drop-shadow(
					5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
				);
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.work_float_container {
		gap: 50px * $base-size;

		.float_item {
			top: -30px * $base-size;
			height: 30px * $base-size;
			width: 30px * $base-size;

			.rope_container {
				width: 5px * $base-size;

				.rope {
					width: 5px * $base-size;
					background: repeating-linear-gradient(
						45deg,
						#d5ad72 0 10px * $base-size,
						#000000 10px * $base-size 11px * $base-size
					);
					filter: drop-shadow(
						5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
					);
				}
			}

			.item_container {
				filter: drop-shadow(
					5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
				);
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.work_float_container {
		gap: 50px * $base-size;

		.float_item {
			top: -30px * $base-size;
			height: 30px * $base-size;
			width: 30px * $base-size;

			.rope_container {
				width: 5px * $base-size;

				.rope {
					width: 5px * $base-size;
					background: repeating-linear-gradient(
						45deg,
						#d5ad72 0 10px * $base-size,
						#000000 10px * $base-size 11px * $base-size
					);
					filter: drop-shadow(
						5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
					);
				}
			}

			.item_container {
				filter: drop-shadow(
					5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
				);
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.work_float_container {
		gap: 50px * $base-size;

		.float_item {
			top: -30px * $base-size;
			height: 30px * $base-size;
			width: 30px * $base-size;

			.rope_container {
				width: 5px * $base-size;

				.rope {
					width: 5px * $base-size;
					background: repeating-linear-gradient(
						45deg,
						#d5ad72 0 10px * $base-size,
						#000000 10px * $base-size 11px * $base-size
					);
					filter: drop-shadow(
						5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
					);
				}
			}

			.item_container {
				filter: drop-shadow(
					5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.237)
				);
			}
		}
	}
}
</style>
