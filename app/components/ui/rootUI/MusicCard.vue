<script setup lang="ts">
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import type { NetworkLoadingState } from "~/types/config";

import CircleRingLoading from "~/components/exhibit/CircleRingLoading.vue";

gsap.registerPlugin(Draggable, InertiaPlugin);

const loadingStore = useLoadingStore();
const mainStore = useMainStore();
const soundStore = useSoundStore();
const cardRef = ref<HTMLDivElement | null>(null);
const btnRef = ref<HTMLButtonElement | null>(null);
const loadingState = ref<NetworkLoadingState>("loading");
const isSmall = ref<boolean>(false);
const sizeAnim = ref<GSAPTween | null>(null);

const changeTime = 0.5;

const handleLoad = () => {
	loadingState.value = "success";
};

const handleError = () => {
	loadingState.value = "error";
};

const handleChangeSize = () => {
	sizeAnim.value?.kill();
	if (isSmall.value) {
		sizeAnim.value = gsap.to(cardRef.value, {
			height: "auto",
			width: "auto",
			ease: "power2.out",
			duration: changeTime,
		});
	} else {
		sizeAnim.value = gsap.to(cardRef.value, {
			height: btnRef.value?.offsetWidth || 20,
			width: btnRef.value?.offsetWidth || 20,
			ease: "power2.out",
			duration: changeTime,
		});
	}
	isSmall.value = !isSmall.value;
};

watch(
	() => soundStore.musicCurrent?.cover,
	() => {
		loadingState.value = "loading";
	},
);

onMounted(() => {
	Draggable.create(cardRef.value, {
		type: "x,y", // 可以是 "x", "y", "x,y", "rotation", "scrollLeft", "scrollTop" 等
		bounds: "body", // 限制拖拽范围
		edgeResistance: 0.65, // 边界阻力
		throwProps: true, // 启用投掷效果（需要 InertiaPlugin）
		allowEventDefault: true,
		onPress: () => {
			mainStore.setIsDragging(true);
		},
		onRelease: () => {
			mainStore.setIsDragging(false);
		},
	});
});
</script>

<template>
	<!-- From Uiverse.io by Tsiangana -->
	<div class="music_card" ref="cardRef">
		<div class="card_content">
			<div class="card_title">
				<button class="control_btn" title="最大化" @click="handleChangeSize" ref="btnRef">
					<span class="icon" v-if="isSmall">&#xe78e;</span>
					<span class="icon" v-else>&#xe78f;</span>
				</button>
				<div class="title_content">Music</div>
				<button class="control_btn" title="关闭" @click="soundStore.setMusicCardVisible(false)">
					<span class="icon">&#xe781;</span>
				</button>
			</div>
			<div class="cover_container">
				<img
					v-if="loadingState !== 'error'"
					class="music_cover"
					draggable="false"
					:class="{ loading: loadingState === 'loading' }"
					:src="`/blog-2.0${soundStore.musicCurrent?.cover}`"
					:alt="soundStore.musicCurrent?.cover"
					@load="handleLoad"
					@error="handleError"
				/>
				<span
					class="cover_loading"
					v-if="loadingState === 'loading' && soundStore.musicCurrent?.cover"
				>
					<CircleRingLoading />
				</span>
				<span v-else-if="loadingState === 'error'" class="loading_error">加载失败</span>
			</div>
			<div class="music_name">
				{{ soundStore.musicCurrent?.name || "未选择音乐" }}
			</div>
			<div class="music_artist">
				{{ soundStore.musicCurrent?.artist || "未知作者" }}
			</div>
			<div class="music_control">
				<button class="control_btn" title="上一首" @click="soundStore.previous">
					<span class="icon">&#xea88;</span>
				</button>
				<button class="control_btn" title="快退" @click="soundStore.seek(-soundStore.seekTime)">
					<span class="icon">&#xea7a;</span>
				</button>
				<button
					class="control_btn"
					:title="soundStore.playingMusic ? '暂停' : '播放'"
					@click="soundStore.toggle"
				>
					<span v-if="!soundStore.playingMusic" class="icon">&#xea82;</span>
					<span v-else class="icon">&#xea81;</span>
				</button>
				<button class="control_btn" title="快进" @click="soundStore.seek(soundStore.seekTime)">
					<span class="icon">&#xea7e;</span>
				</button>
				<button class="control_btn" title="下一首" @click="soundStore.next">
					<span class="icon">&#xea7f;</span>
				</button>
			</div>
			<div class="music_control">
				<button class="control_btn" title="播放模式" @click="soundStore.nextPlayingMode">
					<span v-if="soundStore.musicPlayingMode == 'RepeatSingle'" class="icon">&#xe877;</span>
					<span v-else-if="soundStore.musicPlayingMode == 'RepeatAll'" class="icon">&#xe878;</span>
					<span v-else-if="soundStore.musicPlayingMode == 'RandomAll'" class="icon">&#xe87a;</span>
					<span v-else-if="soundStore.musicPlayingMode == 'OrderAll'" class="icon">&#xe87e;</span>
				</button>
				<button
					class="control_btn"
					title="播放列表"
					@click="loadingStore.loadingNavigate('/musics')"
				>
					<span class="icon">&#xeb10;</span>
				</button>
			</div>
		</div>
		<div class="backgound1"></div>
		<div class="backgound2"></div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

$base-size: 1;

/* From Uiverse.io by Tsiangana */
.music_card {
	position: fixed;
	left: 0;
	top: 0;
	border-radius: 10px * $base-size;
	z-index: variables.$float_zIndex;
	overflow: hidden;
	user-select: none;

	.card_content {
		width: 190px * $base-size;
		z-index: variables.$float_zIndex;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(255, 255, 255, 0.55);
		box-shadow: 0 8px * $base-size 32px * $base-size 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(8.5px * $base-size);
		-webkit-backdrop-filter: blur(8.5px * $base-size);
		border-radius: 10px * $base-size;
		border-width: 1px * $base-size;
		border-style: solid;
		border-color: rgba(255, 255, 255, 0.18);
		overflow: hidden;

		.card_title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			border-radius: 12px * $base-size;

			.title_content {
				color: rgba(102, 100, 100, 0.911);
				font-size: 0.6rem * $base-size;
				font-family: Roboto, sans-serif;
				text-align: center;
				border-width: 1px * $base-size;
				border-style: solid;
				border-color: rgba(180, 177, 177, 0.308);
			}
		}

		.cover_container {
			width: 80px * $base-size;
			height: 80px * $base-size;
			background: rgba(216, 212, 212, 0.726);
			margin-top: 20px * $base-size;
			border-radius: 15px * $base-size;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;

			.music_cover {
				height: 100%;
				width: 100%;

				&.loading {
					display: none;
				}
			}
		}

		.music_name {
			width: auto;
			height: 20px * $base-size;
			font-size: 0.7rem * $base-size;
			font-weight: 500;
			font-family: Roboto, sans-serif;
			padding: 0 5px * $base-size;
			margin: 10px * $base-size auto 0px;
			display: block;
			text-align: center;
			color: rgba(50, 49, 51, 0.637);
			mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
			overflow: hidden;
		}

		.music_artist {
			font-size: 0.6rem * $base-size;
			font-weight: 500;
			font-family: Roboto, sans-serif;
			padding: 0 5px * $base-size;
			margin: 0px auto;
			display: block;
			overflow: hidden;
			text-align: center;
			color: rgba(50, 49, 51, 0.637);
		}

		.music_control {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			padding: 0 5px * $base-size;
			cursor: pointer;
		}

		.control_btn {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30px * $base-size;
			height: 30px * $base-size;
			color: rgba($color: #000000, $alpha: 0.5);
			background: transparent;
			border: none;
			user-select: none;
			cursor: pointer;

			.icon {
				font-size: 13px * $base-size;
			}
		}
	}

	.backgound1 {
		position: absolute;
		top: 30px * $base-size;
		left: 20px * $base-size;
		width: 60px * $base-size;
		height: 60px * $base-size;
		background-color: rgb(131, 25, 163);
		filter: drop-shadow(0 0 10px rgb(131, 25, 163));
		border-radius: 50%;
		animation: one 5s infinite;
	}

	.backgound2 {
		position: absolute;
		top: 90px * $base-size;
		left: 90px * $base-size;
		width: 60px * $base-size;
		height: 60px * $base-size;
		background-color: rgb(29, 209, 149);
		filter: drop-shadow(0 0 10px rgb(29, 209, 149));
		border-radius: 50%;
		animation: two 5s infinite;
	}
}

@keyframes one {
	0% {
		top: 30px * $base-size;
		left: 20px * $base-size;
	}
	20% {
		top: 50px * $base-size;
		left: 40px * $base-size;
	}
	40% {
		top: 80px * $base-size;
		left: 70px * $base-size;
	}
	50% {
		top: 60px * $base-size;
		left: 40px * $base-size;
	}
	60% {
		top: 35px * $base-size;
		left: 90px * $base-size;
	}
	80% {
		top: 70px * $base-size;
		left: 70px * $base-size;
	}
	100% {
		top: 30px * $base-size;
		left: 20px * $base-size;
	}
}

@keyframes two {
	0% {
		top: 90px * $base-size;
		left: 90px * $base-size;
	}
	20% {
		top: 50px * $base-size;
		left: 40px * $base-size;
	}
	40% {
		top: 60px * $base-size;
		left: 20px * $base-size;
	}
	50% {
		top: 80px * $base-size;
		left: 30px * $base-size;
	}
	60% {
		top: 35px * $base-size;
		left: 90px * $base-size;
	}
	80% {
		top: 70px * $base-size;
		left: 60px * $base-size;
	}
	100% {
		top: 90px * $base-size;
		left: 90px * $base-size;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.75;

	.music_card {
		width: 190px * $base-size;
		border-radius: 10px * $base-size;

		.card_content {
			width: 190px * $base-size;
			box-shadow: 0 8px * $base-size 32px * $base-size 0 rgba(31, 38, 135, 0.37);
			backdrop-filter: blur(8.5px * $base-size);
			-webkit-backdrop-filter: blur(8.5px * $base-size);
			border-radius: 10px * $base-size;
			border-width: 1px * $base-size;

			.card_title {
				border-width: 1px * $base-size;
				margin: 12px * $base-size auto;
				font-size: 0.6rem * $base-size;
				border-radius: 12px * $base-size;
			}

			.cover_container {
				width: 80px * $base-size;
				min-height: 80px * $base-size;
				margin-top: 20px * $base-size;
				border-radius: 15px * $base-size;
			}

			.music_name {
				height: 20px * $base-size;
				font-size: 0.7rem * $base-size;
				padding: 0 5px * $base-size;
				margin: 10px * $base-size auto 0px;
			}

			.music_artist {
				font-size: 0.6rem * $base-size;
				padding: 0 5px * $base-size;
			}

			.music_control {
				padding: 0 5px * $base-size;

				.control_btn {
					width: 30px * $base-size;
					height: 30px * $base-size;

					.icon {
						font-size: 13px * $base-size;
					}
				}
			}
		}

		.backgound1 {
			top: 30px * $base-size;
			left: 20px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}

		.backgound2 {
			top: 90px * $base-size;
			left: 90px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}
	}

	@keyframes one {
		0% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 80px * $base-size;
			left: 70px * $base-size;
		}
		50% {
			top: 60px * $base-size;
			left: 40px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 70px * $base-size;
		}
		100% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
	}

	@keyframes two {
		0% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 60px * $base-size;
			left: 20px * $base-size;
		}
		50% {
			top: 80px * $base-size;
			left: 30px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 60px * $base-size;
		}
		100% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.85;

	.music_card {
		width: 190px * $base-size;
		border-radius: 10px * $base-size;

		.card_content {
			width: 190px * $base-size;
			box-shadow: 0 8px * $base-size 32px * $base-size 0 rgba(31, 38, 135, 0.37);
			backdrop-filter: blur(8.5px * $base-size);
			-webkit-backdrop-filter: blur(8.5px * $base-size);
			border-radius: 10px * $base-size;
			border-width: 1px * $base-size;

			.card_title {
				border-width: 1px * $base-size;
				margin: 12px * $base-size auto;
				font-size: 0.6rem * $base-size;
				border-radius: 12px * $base-size;
			}

			.cover_container {
				width: 80px * $base-size;
				min-height: 80px * $base-size;
				margin-top: 20px * $base-size;
				border-radius: 15px * $base-size;
			}

			.music_name {
				height: 20px * $base-size;
				font-size: 0.7rem * $base-size;
				padding: 0 5px * $base-size;
				margin: 10px * $base-size auto 0px;
			}

			.music_artist {
				font-size: 0.6rem * $base-size;
				padding: 0 5px * $base-size;
			}

			.music_control {
				padding: 0 5px * $base-size;

				.control_btn {
					width: 30px * $base-size;
					height: 30px * $base-size;

					.icon {
						font-size: 13px * $base-size;
					}
				}
			}
		}

		.backgound1 {
			top: 30px * $base-size;
			left: 20px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}

		.backgound2 {
			top: 90px * $base-size;
			left: 90px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}
	}

	@keyframes one {
		0% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 80px * $base-size;
			left: 70px * $base-size;
		}
		50% {
			top: 60px * $base-size;
			left: 40px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 70px * $base-size;
		}
		100% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
	}

	@keyframes two {
		0% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 60px * $base-size;
			left: 20px * $base-size;
		}
		50% {
			top: 80px * $base-size;
			left: 30px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 60px * $base-size;
		}
		100% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.music_card {
		width: 190px * $base-size;
		border-radius: 10px * $base-size;

		.card_content {
			width: 190px * $base-size;
			box-shadow: 0 8px * $base-size 32px * $base-size 0 rgba(31, 38, 135, 0.37);
			backdrop-filter: blur(8.5px * $base-size);
			-webkit-backdrop-filter: blur(8.5px * $base-size);
			border-radius: 10px * $base-size;
			border-width: 1px * $base-size;

			.card_title {
				border-width: 1px * $base-size;
				margin: 12px * $base-size auto;
				font-size: 0.6rem * $base-size;
				border-radius: 12px * $base-size;
			}

			.cover_container {
				width: 80px * $base-size;
				min-height: 80px * $base-size;
				margin-top: 20px * $base-size;
				border-radius: 15px * $base-size;
			}

			.music_name {
				height: 20px * $base-size;
				font-size: 0.7rem * $base-size;
				padding: 0 5px * $base-size;
				margin: 10px * $base-size auto 0px;
			}

			.music_artist {
				font-size: 0.6rem * $base-size;
				padding: 0 5px * $base-size;
			}

			.music_control {
				padding: 0 5px * $base-size;

				.control_btn {
					width: 30px * $base-size;
					height: 30px * $base-size;

					.icon {
						font-size: 13px * $base-size;
					}
				}
			}
		}

		.backgound1 {
			top: 30px * $base-size;
			left: 20px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}

		.backgound2 {
			top: 90px * $base-size;
			left: 90px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}
	}

	@keyframes one {
		0% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 80px * $base-size;
			left: 70px * $base-size;
		}
		50% {
			top: 60px * $base-size;
			left: 40px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 70px * $base-size;
		}
		100% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
	}

	@keyframes two {
		0% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 60px * $base-size;
			left: 20px * $base-size;
		}
		50% {
			top: 80px * $base-size;
			left: 30px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 60px * $base-size;
		}
		100% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.music_card {
		width: 190px * $base-size;
		border-radius: 10px * $base-size;

		.card_content {
			width: 190px * $base-size;
			box-shadow: 0 8px * $base-size 32px * $base-size 0 rgba(31, 38, 135, 0.37);
			backdrop-filter: blur(8.5px * $base-size);
			-webkit-backdrop-filter: blur(8.5px * $base-size);
			border-radius: 10px * $base-size;
			border-width: 1px * $base-size;

			.card_title {
				border-width: 1px * $base-size;
				margin: 12px * $base-size auto;
				font-size: 0.6rem * $base-size;
				border-radius: 12px * $base-size;
			}

			.cover_container {
				width: 80px * $base-size;
				min-height: 80px * $base-size;
				margin-top: 20px * $base-size;
				border-radius: 15px * $base-size;
			}

			.music_name {
				height: 20px * $base-size;
				font-size: 0.7rem * $base-size;
				padding: 0 5px * $base-size;
				margin: 10px * $base-size auto 0px;
			}

			.music_artist {
				font-size: 0.6rem * $base-size;
				padding: 0 5px * $base-size;
			}

			.music_control {
				padding: 0 5px * $base-size;

				.control_btn {
					width: 30px * $base-size;
					height: 30px * $base-size;

					.icon {
						font-size: 13px * $base-size;
					}
				}
			}
		}

		.backgound1 {
			top: 30px * $base-size;
			left: 20px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}

		.backgound2 {
			top: 90px * $base-size;
			left: 90px * $base-size;
			width: 60px * $base-size;
			height: 60px * $base-size;
		}
	}

	@keyframes one {
		0% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 80px * $base-size;
			left: 70px * $base-size;
		}
		50% {
			top: 60px * $base-size;
			left: 40px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 70px * $base-size;
		}
		100% {
			top: 30px * $base-size;
			left: 20px * $base-size;
		}
	}

	@keyframes two {
		0% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
		20% {
			top: 50px * $base-size;
			left: 40px * $base-size;
		}
		40% {
			top: 60px * $base-size;
			left: 20px * $base-size;
		}
		50% {
			top: 80px * $base-size;
			left: 30px * $base-size;
		}
		60% {
			top: 35px * $base-size;
			left: 90px * $base-size;
		}
		80% {
			top: 70px * $base-size;
			left: 60px * $base-size;
		}
		100% {
			top: 90px * $base-size;
			left: 90px * $base-size;
		}
	}
}
</style>
