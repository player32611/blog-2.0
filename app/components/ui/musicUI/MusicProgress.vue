<script setup lang="ts">
import { gsap } from "gsap/gsap-core";

const soundStore = useSoundStore();
const barContainerRef = ref<HTMLDivElement | null>(null);
const barRef = ref<HTMLDivElement | null>(null);
const stripeAnimation = ref<gsap.core.Tween | null>(null);

const handleClickProgress = (e: MouseEvent) => {
	if (!barContainerRef.value || !soundStore.musicAudio) return;
	soundStore.setMusicCurrentTime(
		(e.offsetX / barContainerRef.value.offsetWidth) * soundStore.musicAudio.duration,
	);
};

// 启动条纹动画
const startStripeAnimation = () => {
	if (!barRef.value) return;
	stripeAnimation.value = gsap.to(barRef.value, {
		backgroundPositionX: "+=56.57",
		duration: 0.5,
		repeat: -1,
		ease: "linear",
	});
};

// 停止条纹动画
const stopStripeAnimation = () => {
	stripeAnimation.value?.kill();
	stripeAnimation.value = null;
};

// 监听播放状态，控制条纹动画
watch(
	() => soundStore.playingMusic,
	isPlaying => {
		if (isPlaying) {
			startStripeAnimation();
		} else {
			stopStripeAnimation();
		}
	},
	{ immediate: true },
);

onUnmounted(() => {
	stopStripeAnimation();
});
</script>

<template>
	<div class="music_progress">
		<div class="music_currentTime">{{ formatTime(soundStore.musicCurrentTime) }}</div>
		<div class="bar_container" ref="barContainerRef" @click="handleClickProgress">
			<div
				class="progress_bar"
				ref="barRef"
				:style="{
					width: `${soundStore.musicAudio ? (soundStore.musicCurrentTime / soundStore.musicAudio.duration) * 100 : 0}%`,
				}"
			></div>
		</div>
		<div class="music_duration">
			{{ soundStore.musicAudio ? formatTime(soundStore.musicAudio.duration) : "00:00" }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.music_progress {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	cursor: pointer;

	.music_currentTime,
	.music_duration {
		font-size: 1rem;
		color: #fff;
		transform: translateY(-1px);
	}

	.bar_container {
		margin: 0 10px;
		height: 100%;
		width: 80%;
		background-color: #333;
		border-radius: 10px;
		overflow: hidden;

		.progress_bar {
			width: 0;
			height: 100%;
			background: repeating-linear-gradient(-45deg, #766df4 0 20px, #0000 0 40px) 0 0 / 56.57px 100%;
			border-right: 1px solid #766df4;
			border-radius: 10px;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.7;

	.music_progress {
		.music_currentTime,
		.music_duration {
			font-size: 1rem * $base-size;
		}

		.bar_container {
			margin: 0 10px * $base-size;
			width: 80%;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.9;

	.music_progress {
		.music_currentTime,
		.music_duration {
			font-size: 1rem * $base-size;
		}

		.bar_container {
			margin: 0 10px * $base-size;
			width: 80%;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 1;

	.music_progress {
		.music_currentTime,
		.music_duration {
			font-size: 1rem * $base-size;
		}

		.bar_container {
			margin: 0 10px * $base-size;
			width: 80%;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.music_progress {
		.music_currentTime,
		.music_duration {
			font-size: 1rem * $base-size;
		}

		.bar_container {
			margin: 0 10px * $base-size;
			width: 80%;
		}
	}
}
</style>
