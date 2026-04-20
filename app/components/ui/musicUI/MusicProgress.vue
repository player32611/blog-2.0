<script setup lang="ts">
import { gsap } from "gsap/gsap-core";

const soundStore = useSoundStore();
const progressRef = ref<HTMLDivElement | null>(null);
const barRef = ref<HTMLDivElement | null>(null);
const stripeAnimation = ref<gsap.core.Tween | null>(null);

const handleClickProgress = (e: MouseEvent) => {
	if (!progressRef.value || !soundStore.musicAudio) return;
	soundStore.setMusicCurrentTime(
		(e.offsetX / progressRef.value.offsetWidth) * soundStore.musicAudio.duration,
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

const updateTime = () => {
	if (!soundStore.musicAudio) {
		gsap.to(barRef.value, {
			width: 0,
			duration: 0.1,
			ease: "power1.out",
		});
	} else {
		gsap.to(barRef.value, {
			width: `${(soundStore.musicAudio.currentTime / soundStore.musicAudio.duration) * 100}%`,
			duration: 0.1,
			ease: "power1.out",
		});
	}
};

// 监听 musicAudio 变化，绑定/解绑 timeupdate 事件
watch(
	() => soundStore.musicAudio,
	(newAudio, oldAudio) => {
		if (oldAudio) {
			oldAudio.removeEventListener("timeupdate", updateTime);
		}
		if (newAudio) {
			newAudio.addEventListener("timeupdate", updateTime);
			updateTime(); // 初始化
		}
	},
	{ immediate: true },
);

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

onBeforeUnmount(() => {
	if (soundStore.musicAudio) {
		soundStore.musicAudio.removeEventListener("timeupdate", updateTime);
	}
	stopStripeAnimation();
});
</script>

<template>
	<div class="music_progress" @click="handleClickProgress" ref="progressRef">
		<div class="progress_bar" ref="barRef"></div>
	</div>
</template>

<style scoped lang="scss">
.music_progress {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #333;
	border-radius: 10px;
	overflow: hidden;
	cursor: pointer;

	.progress_bar {
		width: 0;
		height: 100%;
		background: repeating-linear-gradient(-45deg, #766df4 0 20px, #0000 0 40px) 0 0 / 56.57px 100%;
		border-right: 1px solid #766df4;
		border-radius: 10px;
	}
}
</style>
