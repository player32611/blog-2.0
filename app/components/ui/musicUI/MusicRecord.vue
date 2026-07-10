<script setup lang="ts">
import { gsap } from "gsap/gsap-core";
import type { NetworkLoadingState } from "~/types/config";

import RadarLoading from "~/components/exhibit/RadarLoading.vue";

const soundStore = useSoundStore();
const containerRef = ref<HTMLElement | null>(null);
const animationRef = ref<GSAPAnimation | null>(null);
const loadingState = ref<NetworkLoadingState>("loading");

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

const handleLoad = () => {
	loadingState.value = "success";
};

const handleError = () => {
	loadingState.value = "error";
};

watch(
	() => soundStore.musicCurrent?.cover,
	() => {
		loadingState.value = "loading";
	},
);

watch(
	() => soundStore.playingMusic,
	isPlaying => {
		if (isPlaying) animationRef.value?.play();
		else animationRef.value?.pause();
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

onUnmounted(() => {
	animationRef.value?.kill();
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
				v-if="loadingState !== 'error'"
				class="music_cover"
				:class="{ loading: loadingState === 'loading' }"
				:src="`/blog-2.0${soundStore.musicCurrent?.cover}`"
				:alt="soundStore.musicCurrent?.cover"
				@load="handleLoad"
				@error="handleError"
			/>
			<span
				v-if="loadingState === 'loading' && soundStore.musicCurrent?.cover"
				class="cover_loading"
			>
				<RadarLoading />
			</span>
			<span v-else-if="loadingState === 'error'" class="loading_error">加载失败</span>
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
	font-family: "方正基础像素体";
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

			&.loading {
				display: none;
			}
		}

		.cover_loading,
		.loading_error {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
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
