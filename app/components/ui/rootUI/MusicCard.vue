<script setup lang="ts">
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";

gsap.registerPlugin(Draggable, InertiaPlugin);

const soundStore = useSoundStore();
const isLoading = ref<boolean>(true); // 封面加载状态
const loadingError = ref<boolean>(false); // 封面是否加载错误
const cardRef = ref<HTMLDivElement | null>(null); // 卡片容器 Ref
const position = ref<{ x: number; y: number }>({ x: 100, y: 100 }); // 卡片位置

const handleLoad = () => {
	isLoading.value = false;
	loadingError.value = false;
};

const handleError = () => {
	isLoading.value = false;
	loadingError.value = true;
};

watch(
	() => soundStore.musicCurrent?.cover,
	() => {
		isLoading.value = true;
		loadingError.value = false;
	},
);

onMounted(() => {
	Draggable.create(cardRef.value, {
		type: "x,y", // 可以是 "x", "y", "x,y", "rotation", "scrollLeft", "scrollTop" 等
		bounds: "body", // 限制拖拽范围
		edgeResistance: 0.65, // 边界阻力
		throwProps: true, // 启用投掷效果（需要 InertiaPlugin）
		onDrag: function () {
			position.value.x = this.x;
			position.value.y = this.y;
		},

		// 拖拽结束时的回调（包括投掷结束）
		onThrowUpdate: function () {
			position.value.x = this.x;
			position.value.y = this.y;
		},
	});
});
</script>

<template>
	<!-- From Uiverse.io by Tsiangana -->
	<div class="music_card" ref="cardRef">
		<div class="card_content">
			<div class="card_title">Music</div>
			<div class="cover_container">
				<img
					v-if="!loadingError"
					class="music_cover"
					draggable="false"
					:class="{ loading: isLoading }"
					:src="soundStore.musicCurrent?.cover"
					:alt="soundStore.musicCurrent?.cover"
					@load="handleLoad"
					@error="handleError"
				/>
				<span v-if="isLoading && soundStore.musicCurrent?.cover" class="cover_loading">加载中</span>
				<span v-else-if="!isLoading && loadingError" class="loading_error">加载失败</span>
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
			</div>
		</div>
		<div class="backgound1"></div>
		<div class="backgound2"></div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

/* From Uiverse.io by Tsiangana */
.music_card {
	position: fixed;
	left: 0;
	top: 0;
	width: 190px * $base-size;
	height: auto;
	border-radius: 10px * $base-size;
	cursor: pointer;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
	z-index: 10;

	.card_content {
		width: 190px * $base-size;
		z-index: 10;
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
			border-width: 1px * $base-size;
			border-style: solid;
			border-color: rgba(180, 177, 177, 0.308);
			display: block;
			margin: 12px * $base-size auto;
			text-align: center;
			font-size: 0.6rem * $base-size;
			border-radius: 12px * $base-size;
			font-family: Roboto, sans-serif;
			color: rgba(102, 100, 100, 0.911);
		}

		.cover_container {
			width: 80px * $base-size;
			min-height: 80px * $base-size;
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
				-webkit-tap-highlight-color: transparent;

				.icon {
					font-size: 13px * $base-size;
				}
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
		position: fixed;
		left: 0;
		top: 0;
		width: 190px * $base-size;
		height: auto;
		border-radius: 10px * $base-size;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		z-index: 10;

		.card_content {
			width: 190px * $base-size;
			z-index: 10;
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
				border-width: 1px * $base-size;
				border-style: solid;
				border-color: rgba(180, 177, 177, 0.308);
				display: block;
				margin: 12px * $base-size auto;
				text-align: center;
				font-size: 0.6rem * $base-size;
				border-radius: 12px * $base-size;
				font-family: Roboto, sans-serif;
				color: rgba(102, 100, 100, 0.911);
			}

			.cover_container {
				width: 80px * $base-size;
				min-height: 80px * $base-size;
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
				mask-image: linear-gradient(
					to right,
					transparent 0%,
					black 10%,
					black 90%,
					transparent 100%
				);
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
					-webkit-tap-highlight-color: transparent;

					.icon {
						font-size: 13px * $base-size;
					}
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
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.music_card {
		position: fixed;
		left: 0;
		top: 0;
		width: 190px * $base-size;
		height: auto;
		border-radius: 10px * $base-size;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		z-index: 10;

		.card_content {
			width: 190px * $base-size;
			z-index: 10;
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
				border-width: 1px * $base-size;
				border-style: solid;
				border-color: rgba(180, 177, 177, 0.308);
				display: block;
				margin: 12px * $base-size auto;
				text-align: center;
				font-size: 0.6rem * $base-size;
				border-radius: 12px * $base-size;
				font-family: Roboto, sans-serif;
				color: rgba(102, 100, 100, 0.911);
			}

			.cover_container {
				width: 80px * $base-size;
				min-height: 80px * $base-size;
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
				mask-image: linear-gradient(
					to right,
					transparent 0%,
					black 10%,
					black 90%,
					transparent 100%
				);
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
					-webkit-tap-highlight-color: transparent;

					.icon {
						font-size: 13px * $base-size;
					}
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
}
</style>
