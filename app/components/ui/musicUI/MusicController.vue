<script setup lang="ts">
const soundStore = useSoundStore();
const seekTime = ref<number>(5);
</script>

<template>
	<div class="music_controller">
		<div class="music_info">
			<div class="music_name">
				{{ soundStore.musicCurrent?.name || "未选择音乐" }}
			</div>
		</div>

		<div class="music_controls">
			<div class="left_controls"></div>
			<div class="center_controls">
				<button class="control_btn" title="上一首" @click="soundStore.previous">
					<span class="icon">&#xea88;</span>
				</button>
				<button class="control_btn" title="快退" @click="() => soundStore.seek(-seekTime)">
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
				<button class="control_btn" title="快进" @click="() => soundStore.seek(seekTime)">
					<span class="icon">&#xea7e;</span>
				</button>
				<button class="control_btn" title="下一首" @click="soundStore.next">
					<span class="icon">&#xea7f;</span>
				</button>
			</div>
			<div class="right_controls">
				<button class="control_btn" title="音量">
					<span v-if="soundStore.musicVolume > 0.66" class="icon">&#xea12;</span>
					<span v-else-if="soundStore.musicVolume > 0.33" class="icon">&#xea13;</span>
					<span v-else-if="soundStore.musicVolume > 0" class="icon">&#xea11;</span>
					<span v-else class="icon">&#xea0f;</span>
				</button>
			</div>
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
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 100%;
		gap: 10px * $base-size;
		padding: 10px * $base-size;

		.left_controls,
		.center_controls,
		.right_controls {
			display: flex;
			align-items: center;

			&.left_controls {
				justify-content: flex-start;
			}

			&.center_controls {
				justify-content: center;
			}

			&.right_controls {
				justify-content: flex-end;
			}

			.control_btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50px * $base-size;
				height: 50px * $base-size;
				color: #fff;
				background: transparent;
				border: none;
				transition: all 0.3s ease;
				cursor: pointer;

				.icon {
					font-size: 1.3rem * $base-size;
				}
			}
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

				.icon {
					font-size: 1.3rem * $base-size;
				}
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

				.icon {
					font-size: 1.2rem * $base-size;
				}
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

				.icon {
					font-size: 1.2rem * $base-size;
				}
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

				.icon {
					font-size: 1.2rem * $base-size;
				}
			}
		}
	}
}
</style>
