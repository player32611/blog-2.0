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
			<img
				v-if="soundStore.musicCurrent?.cover"
				class="music_cover"
				:src="soundStore.musicCurrent?.cover"
				alt="加载失败"
			/>
		</p>
	</button>
</template>

<style scoped lang="scss">
$base-size: 1;

.music_record {
	position: relative;
	display: grid;
	height: 600px * $base-size;
	width: 600px * $base-size;
	font-size: 1rem * $base-size;
	border: none;
	background: #000000;
	color: #fff;
	font-weight: 600;
	border-radius: 50%;
	overflow: hidden;
	place-content: center;
	cursor: pointer;
	transition: transform 200ms;

	.container {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		inset: 0;

		> span {
			position: absolute;
			transform: rotate(calc(var(--rotation-step) * var(--index) * 1deg));
			inset: 7px * $base-size;
		}

		.music_cover {
			position: relative;
			height: 450px * $base-size;
			width: 450px * $base-size;
			border-radius: 50%;
		}
	}

	&:hover {
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.4;

	.music_record {
		height: 600px * $base-size;
		width: 600px * $base-size;
		font-size: 1rem * $base-size;

		.container {
			> span {
				inset: 7px * $base-size;
			}

			.music_cover {
				height: 450px * $base-size;
				width: 450px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.5;

	.music_record {
		height: 600px * $base-size;
		width: 600px * $base-size;
		font-size: 1rem * $base-size;

		.container {
			> span {
				inset: 7px * $base-size;
			}

			.music_cover {
				height: 450px * $base-size;
				width: 450px * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.music_record {
		height: 600px * $base-size;
		width: 600px * $base-size;
		font-size: 1rem * $base-size;

		.container {
			> span {
				inset: 7px * $base-size;
			}

			.music_cover {
				height: 450px * $base-size;
				width: 450px * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.music_record {
		height: 600px * $base-size;
		width: 600px * $base-size;
		font-size: 1rem * $base-size;

		.container {
			> span {
				inset: 7px * $base-size;
			}

			.music_cover {
				height: 450px * $base-size;
				width: 450px * $base-size;
			}
		}
	}
}
</style>
