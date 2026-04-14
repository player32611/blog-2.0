<script setup lang="ts">
const soundStore = useSoundStore();
</script>

<template>
	<div class="music_controller">
		<div class="music_info">
			<div class="music_name">
				{{ soundStore.musicCurrent?.name || "未选择音乐" }}
			</div>
		</div>

		<div class="music_controls">
			<button class="control_btn" @click="soundStore.previous" title="上一首">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
				</svg>
			</button>

			<button
				class="play_btn"
				@click="soundStore.toggle"
				:title="soundStore.playingMusic ? '暂停' : '播放'"
			>
				<svg
					v-if="!soundStore.playingMusic"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M8 5v14l11-7z" />
				</svg>
				<svg v-else width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
					<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
				</svg>
			</button>

			<button class="control_btn" @click="soundStore.next" title="下一首">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
				</svg>
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.music_controller {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 100%;
	width: 100%;
	font-family: "方正基础像素体";
	background-color: #000000;
	border-top: 5px * $base-size solid #ffffff;
	opacity: 0.4;

	.music_info {
		text-align: center;
		padding-top: 10px * $base-size;

		.music_name {
			font-size: 1.2rem * $base-size;
			font-weight: bold;
			color: #fff;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.music_controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px * $base-size;
		padding: 10px * $base-size;

		.control_btn,
		.play_btn {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			background: transparent;
			border: none;
			transition: all 0.3s ease;
			cursor: pointer;
		}

		.control_btn {
			width: 50px * $base-size;
			height: 50px * $base-size;
		}

		.play_btn {
			width: 50px * $base-size;
			height: 50px * $base-size;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.8;

	.music_controller {
		border-top: 3px * $base-size solid #ffffff;

		.music_info {
			padding-top: 10px * $base-size;

			.music_name {
				font-size: 1rem * $base-size;
			}
		}

		.music_controls {
			gap: 10px * $base-size;
			padding: 10px * $base-size;

			.control_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}

			.play_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.9;

	.music_controller {
		border-top: 4px * $base-size solid #ffffff;

		.music_info {
			padding-top: 10px * $base-size;

			.music_name {
				font-size: 1.1rem * $base-size;
			}
		}

		.music_controls {
			gap: 10px * $base-size;
			padding: 10px * $base-size;

			.control_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}

			.play_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.music_controller {
		border-top: 5px * $base-size solid #ffffff;

		.music_info {
			.music_name {
				font-size: 1.2rem * $base-size;
			}
		}

		.music_controls {
			gap: 10px * $base-size;

			.control_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}

			.play_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.music_controller {
		border-top: 5px * $base-size solid #ffffff;

		.music_info {
			.music_name {
				font-size: 1.2rem * $base-size;
			}
		}

		.music_controls {
			gap: 10px * $base-size;

			.control_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}

			.play_btn {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}
</style>
