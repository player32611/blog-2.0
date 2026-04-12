<script setup lang="ts">
import { gsap } from "gsap/gsap-core";

const soundStore = useSoundStore();
const containerRef = ref<HTMLElement | null>(null);
const animationRef = ref<GSAPAnimation | null>(null);

const currentTitle = computed(() => {
	if (!soundStore.musicCurrent) return "DISCORD";
	return soundStore.musicCurrent.name;
});

const titleText = computed(() => {
	const title = currentTitle.value;
	let repeatedTitle = title;
	repeatedTitle += "     " + title + "     ";

	return repeatedTitle;
});

const rotationStep = computed(() => {
	const length = titleText.value.length;
	if (length === 0) return 0;
	return 360 / length;
});

watch(
	() => soundStore.playingMusic,
	isPlaying => {
		if (isPlaying) {
			animationRef.value?.play();
		} else {
			animationRef.value?.pause();
		}
	},
);

onMounted(() => {
	animationRef.value = gsap.to(containerRef.value, {
		rotate: 360,
		duration: 8,
		repeat: -1,
		paused: !soundStore.playingMusic,
		ease: "linear",
	});
});
</script>

<template>
	<button class="music_record">
		<p class="container" ref="containerRef">
			<span
				v-for="(char, index) in titleText"
				:key="index"
				:style="{ '--index': index, '--rotation-step': rotationStep }"
			>
				{{ char }}
			</span>
		</p>
	</button>
</template>

<style scoped lang="scss">
.music_record {
	position: absolute;
	top: 10dvh;
	right: calc((100% - 300px) / 2 - 300px);
	display: grid;
	height: 600px;
	width: 600px;
	border: none;
	background: #5865f2;
	color: #fff;
	font-weight: 600;
	border-radius: 50%;
	overflow: hidden;
	place-content: center;
	cursor: pointer;
	transition:
		background 300ms,
		transform 200ms;

	.container {
		position: absolute;
		inset: 0;

		> span {
			position: absolute;
			transform: rotate(calc(var(--rotation-step) * var(--index) * 1deg));
			inset: 7px;
		}
	}

	&:hover {
		background: #000;
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}
}
</style>
