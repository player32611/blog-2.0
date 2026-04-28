<script setup lang="ts">
const soundStore = useSoundStore();
const isLoading = ref<boolean>(true);
const loadingError = ref<boolean>(false);
const cardRef = ref<HTMLDivElement | null>(null);
const isDragging = ref<boolean>(false);
const draggingPoint = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const position = ref({ x: 100, y: 100 });
const maxSpeed = ref<number>(15);
const speed = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const friction = ref<number>(0.98);
const animationFrame = ref<number | null>(null);

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

const handleMouseDown = (e: MouseEvent) => {
	if (!cardRef.value) return;
	isDragging.value = true;
	draggingPoint.value = { x: e.clientX, y: e.clientY };
	animationFrame.value = null;
	speed.value = { x: 0, y: 0 };
};

const handleTouchStart = (e: TouchEvent) => {
	if (!cardRef.value || !e.touches[0]) return;
	isDragging.value = true;
	draggingPoint.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

const handleMouseMove = (e: MouseEvent) => {
	if (!isDragging.value || !cardRef.value) return;
	const dx = e.clientX - draggingPoint.value.x;
	const dy = e.clientY - draggingPoint.value.y;
	position.value.x += dx;
	position.value.y += dy;
	speed.value = { x: dx, y: dy };
	draggingPoint.value = { x: e.clientX, y: e.clientY };
};

const handleTouchMove = (e: TouchEvent) => {
	if (!isDragging.value || !cardRef.value || !e.touches[0]) return;
	const dx = e.touches[0].clientX - draggingPoint.value.x;
	const dy = e.touches[0].clientY - draggingPoint.value.y;
	position.value.x += dx;
	position.value.y += dy;
	speed.value = { x: dx, y: dy };
	draggingPoint.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

const handleMouseUp = () => {
	if (!cardRef.value) return;
	isDragging.value = false;
	speed.value.x = Math.max(Math.min(speed.value.x, maxSpeed.value), -maxSpeed.value);
	speed.value.y = Math.max(Math.min(speed.value.y, maxSpeed.value), -maxSpeed.value);
	startInertia();
};

const startInertia = () => {
	if (!cardRef.value) return;
	const animate = () => {
		if (!cardRef.value) return;
		if (speed.value.x > maxSpeed.value) console.log(speed.value.x);
		speed.value.x *= friction.value;
		speed.value.y *= friction.value;
		if (Math.abs(speed.value.x) < 0.1) speed.value.x = 0;
		if (Math.abs(speed.value.y) < 0.1) speed.value.y = 0;
		if (speed.value.x !== 0 || speed.value.y !== 0) {
			position.value.x += speed.value.x;
			position.value.y += speed.value.y;
			animationFrame.value = requestAnimationFrame(animate);
		} else animationFrame.value = null;
	};

	animationFrame.value = requestAnimationFrame(animate);
};
</script>

<template>
	<div
		class="music_card"
		ref="cardRef"
		:style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
		@mousedown="handleMouseDown"
		@mousemove="handleMouseMove"
		@mouseup="handleMouseUp"
		@mouseleave="handleMouseUp"
		@touchstart.passive="handleTouchStart"
		@touchmove.passive="handleTouchMove"
		@touchend="handleMouseUp"
		@touchcancel="handleMouseUp"
	>
		<div class="card_content">
			<div class="card_title">Music</div>
			<div class="cover_container">
				<img
					v-if="!loadingError"
					class="music_cover"
					:class="{ loading: isLoading }"
					:src="soundStore.musicCurrent?.cover"
					:alt="soundStore.musicCurrent?.cover"
					@load="handleLoad"
					@error="handleError"
				/>
				<span v-if="isLoading && soundStore.musicCurrent?.cover" class="cover_loading"></span>
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

.music_card {
	position: fixed;
	left: 0;
	top: 0;
	width: 190px;
	border-radius: 10px;
	cursor: pointer;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
	z-index: 10;

	.card_content {
		width: 190px;
		z-index: 10;
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(255, 255, 255, 0.55);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(8.5px);
		-webkit-backdrop-filter: blur(8.5px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		overflow: hidden;

		.card_title {
			width: 70px;
			border: 1px solid rgba(180, 177, 177, 0.308);
			display: block;
			margin: 12px auto;
			text-align: center;
			font-size: 10px;
			border-radius: 12px;
			font-family: Roboto, sans-serif;
			color: rgba(102, 100, 100, 0.911);
		}

		.cover_container {
			width: 80px;
			min-height: 80px;
			background: rgba(216, 212, 212, 0.726);
			margin-top: 20px;
			border-radius: 15px;
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
			height: 20px;
			font-size: 12px;
			font-weight: 500;
			font-family: Roboto, sans-serif;
			padding: 0 5px;
			margin: 10px auto 0px;
			display: block;
			text-align: center;
			color: rgba(50, 49, 51, 0.637);
			mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
			overflow: hidden;
		}

		.music_artist {
			width: 120px;
			font-size: 9px;
			font-weight: 500;
			font-family: Roboto, sans-serif;
			padding: 0 5px;
			margin: 0px auto;
			display: block;
			overflow: hidden;
			text-align: center;
			color: rgba(50, 49, 51, 0.637);
		}

		.music_control {
			margin: 0px auto;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			padding: 0 5px;
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
		width: 60px;
		height: 60px;
		background-color: rgb(131, 25, 163);
		filter: drop-shadow(0 0 10px rgb(131, 25, 163));
		border-radius: 50%;
		position: relative;
		top: 30px;
		left: 20px;
		animation: one 5s infinite;
	}

	.backgound2 {
		width: 60px;
		height: 60px;
		background-color: rgb(29, 209, 149);
		filter: drop-shadow(0 0 10px rgb(29, 209, 149));
		border-radius: 50%;
		position: relative;
		top: 90px;
		left: 90px;
		animation: two 5s infinite;
	}
}

@keyframes one {
	0% {
		top: 30px;
		left: 20px;
	}
	20% {
		top: 50px;
		left: 40px;
	}
	40% {
		top: 80px;
		left: 70px;
	}
	50% {
		top: 60px;
		left: 40px;
	}
	60% {
		top: 35px;
		left: 90px;
	}
	80% {
		top: 70px;
		left: 70px;
	}
	100% {
		top: 30px;
		left: 20px;
	}
}

@keyframes two {
	0% {
		top: 90px;
		left: 90px;
	}
	20% {
		top: 50px;
		left: 40px;
	}
	40% {
		top: 60px;
		left: 20px;
	}
	50% {
		top: 80px;
		left: 30px;
	}
	60% {
		top: 35px;
		left: 90px;
	}
	80% {
		top: 70px;
		left: 60px;
	}
	100% {
		top: 90px;
		left: 90px;
	}
}
</style>
