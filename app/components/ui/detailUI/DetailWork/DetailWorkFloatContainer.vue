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

const itemRefs = ref<HTMLDivElement[]>([]);

const itemNum: number = 5;
const floatingSpeed: number[] = Array.from({ length: itemNum }, () => Math.random() * 0.4 + 0.1);
const rotateAngle: number[] = Array.from({ length: itemNum }, () => Math.random() * 360);
const rotateSpeed: number[] = Array.from(
	{ length: itemNum },
	() => randomSign() * (Math.random() * 2 + 0.5),
);

const ticking = () => {
	const smoother = ScrollSmoother.get();
	if (!smoother) return;
	const y = smoother.scrollTop() - 4 * window.innerHeight;
	itemRefs.value.forEach((el, i) => {
		gsap.set(el, {
			y: (y * (floatingSpeed[i] || 0)) % (window.innerHeight + el.offsetHeight),
			rotate: ((rotateAngle[i] || 0) + y * (rotateSpeed[i] || 0)) % 360,
		});
	});
};

const startFloating = () => {
	gsap.ticker.add(ticking);
};

const stopFloating = () => {
	gsap.ticker.remove(ticking);
};

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
		<div class="float_item" v-for="_ in itemNum" ref="itemRefs">
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
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_float_container {
	position: absolute;
	top: 0;
	display: flex;
	justify-content: space-around;
	height: 100vh;
	width: 100%;
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
		filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.237));
		user-select: none;

		#bullet {
			height: 100%;
			width: 100%;
		}

		.icon {
			color: #ffffff;
			font-size: 30px;
		}
	}
}
</style>
