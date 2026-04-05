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
.music_controller {
	position: fixed;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	width: calc(100% - 304.5px);
	font-family: "方正基础像素体";
	background-color: #000000;
	border-top: 5px solid #ffffff;
	opacity: 0.4;

	.music_info {
		text-align: center;
		padding: 0.5rem;

		.music_name {
			font-size: 1.1rem;
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
		gap: 1.5rem;
		padding: 0.5rem;

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
			width: 40px;
			height: 40px;
		}

		.play_btn {
			width: 60px;
			height: 60px;
		}
	}
}
</style>
