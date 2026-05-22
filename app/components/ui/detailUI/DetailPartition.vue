<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailPartitionParams } from "~/types/components";

gsap.registerPlugin(ScrollTrigger);

const { text, direction } = defineProps<DetailPartitionParams>();
const containerRef = ref<HTMLDivElement | null>(null);
const anim = ref<gsap.core.Tween | null>(null);

const itemNum: number = 15;

onMounted(() => {
	const start = direction === "left" ? 0 : -1000;
	const end = direction === "left" ? -1000 : 0;
	anim.value = gsap.fromTo(
		containerRef.value,
		{ x: start },
		{
			x: end,
			scrollTrigger: { scrub: true },
		},
	);
});

onUnmounted(() => {
	anim.value?.scrollTrigger?.kill();
	anim.value?.kill();
});
</script>

<template>
	<div class="detail_partition">
		<div class="partition_container" ref="containerRef">
			<div class="partition_item" v-for="i in itemNum">
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
.detail_partition {
	position: relative;
	display: flex;
	height: 5rem;
	width: 100%;
	overflow: hidden;

	.partition_container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5rem;
		width: auto;
		font-family: "方正基础像素体";
		font-weight: 600;
		background-color: #ff7f27;

		.partition_item {
			display: flex;
			align-items: center;
			font-size: 2rem;

			#partition_arrow {
				height: 5rem;
			}
		}
	}
}
</style>
