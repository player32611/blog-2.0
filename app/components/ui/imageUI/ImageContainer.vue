<script setup lang="ts">
import type { ImageData } from "~/types/components";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const content = ref<CanvasRenderingContext2D | null | undefined>(null);
const allImagePath = ref<string[]>([]);
const imageTotal = ref<number>(28);
const rowMax = ref<number>(7);
const lineMax = ref<number>(4);
const imageWidth = ref<number>(350);
const imageHeight = ref<number>(500);
const imageMargin = ref<number>(200);
const totalWidth = ref<number>(0);
const totalHeight = ref<number>(0);
const imageDatas = ref<ImageData[]>([]);

// 添加 animationFrameId 引用来存储 requestAnimationFrame 的 ID
const animationFrameId = ref<number | null>(null);
// 添加加载状态
const isLoaded = ref<boolean>(false);

// 物理模型参数
const isDragging = ref<boolean>(false);
const velocityX = ref<number>(0);
const velocityY = ref<number>(0);
const acceleration = ref<number>(0.1); // 加速度系数
const friction = ref<number>(0.95); // 摩擦力系数
const mouseSensitivity = ref<number>(0.5); // 鼠标灵敏度

const handleMouseDown = () => {
	if (!isLoaded.value) return;
	isDragging.value = true;
	velocityX.value = 0;
	velocityY.value = 0;
	// 如果动画循环未运行，启动它
	if (animationFrameId.value === null) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	}
};

const handleMouseup = (e: MouseEvent) => {
	isDragging.value = false;
	checkImg(e.x, e.y);
};

const handleMouseLeave = () => {
	isDragging.value = false;
};

const handleMouseMove = (e: MouseEvent) => {
	if (!isDragging.value) return;

	// 鼠标移动时给予加速度
	velocityX.value += e.movementX * mouseSensitivity.value * acceleration.value;
	velocityY.value += e.movementY * mouseSensitivity.value * acceleration.value;

	// 如果动画循环未运行，启动它
	if (animationFrameId.value === null) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	}
};

const createImgDatas = async () => {
	imageDatas.value = [];
	const loadPromises: Promise<void>[] = [];

	for (let i = 0; i < imageTotal.value; i++) {
		const img = new window.Image();
		const colIndex = i % rowMax.value;
		const lineIndex = Math.floor(i / rowMax.value);
		const x = colIndex * (imageWidth.value + imageMargin.value);
		const y = lineIndex * (imageHeight.value + imageMargin.value);

		const loadPromise = new Promise<void>(resolve => {
			img.onload = () => {
				imageDatas.value.push({
					img,
					x,
					y,
					targetX: x,
					targetY: y,
					animation: null,
				});
				resolve();
			};
			img.onerror = () => {
				// 即使加载失败也要 resolve，避免阻塞其他图片
				console.error(`Failed to load image: ${allImagePath.value[i]}`);
				resolve();
			};
		});

		img.src = allImagePath.value[i]!;
		loadPromises.push(loadPromise);
	}

	// 等待所有图片加载完成
	await Promise.all(loadPromises);
};

const updatePosition = () => {
	// 应用摩擦力
	if (!isDragging.value) {
		velocityX.value *= friction.value;
		velocityY.value *= friction.value;

		// 当速度很小时停止，避免无限计算
		if (Math.abs(velocityX.value) < 0.1) velocityX.value = 0;
		if (Math.abs(velocityY.value) < 0.1) velocityY.value = 0;
	}

	// 更新所有图片位置
	imageDatas.value.forEach(img => {
		img.x += velocityX.value;
		img.y += velocityY.value;

		// 无限循环边界处理
		if (img.x > totalWidth.value - imageWidth.value) {
			img.x -= totalWidth.value + imageMargin.value;
		}
		if (img.x < -imageWidth.value) {
			img.x += totalWidth.value + imageMargin.value;
		}
		if (img.y > totalHeight.value - imageHeight.value) {
			img.y -= totalHeight.value + imageMargin.value;
		}
		if (img.y < -imageHeight.value) {
			img.y += totalHeight.value + imageMargin.value;
		}
	});
};

const drawFrame = () => {
	if (canvasRef.value) {
		content.value?.clearRect(0, 0, canvasRef.value?.width, canvasRef.value?.height);
	}

	updatePosition();

	imageDatas.value.forEach(img => {
		content.value?.drawImage(img.img, img.x, img.y, imageWidth.value, imageHeight.value);
	});

	// 只在有速度或正在拖动时继续动画循环
	if (isDragging.value || Math.abs(velocityX.value) > 0 || Math.abs(velocityY.value) > 0) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	} else {
		animationFrameId.value = null;
	}
};

const checkImg = (x: number, y: number) => {
	let img = imageDatas.value.find(
		img =>
			x >= img.x && x < img.x + imageWidth.value && y >= img.y && y < img.y + imageHeight.value,
	);
	if (img) console.log(img, img.img);
};

const resize = () => {
	if (!canvasRef.value) return;

	const dpr = window.devicePixelRatio || 1;
	const rect = canvasRef.value.getBoundingClientRect();

	// 只有当尺寸确实改变时才重新设置
	if (canvasRef.value.width !== rect.width * dpr || canvasRef.value.height !== rect.height * dpr) {
		canvasRef.value.width = rect.width * dpr;
		canvasRef.value.height = rect.height * dpr;

		const ctx = canvasRef.value.getContext("2d");
		if (ctx) {
			ctx.scale(dpr, dpr);
			content.value = ctx;

			// 如果已经加载完成，重新渲染一次
			if (isLoaded.value) {
				content.value?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
				imageDatas.value.forEach(img => {
					content.value?.drawImage(img.img, img.x, img.y, imageWidth.value, imageHeight.value);
				});
			}
		}
	}
};

onMounted(async () => {
	content.value = canvasRef.value?.getContext("2d");
	totalWidth.value = rowMax.value * (imageWidth.value + imageMargin.value) - imageMargin.value;
	totalHeight.value = lineMax.value * (imageHeight.value + imageMargin.value) - imageMargin.value;
	allImagePath.value = getAllImages();
	resize();

	// 等待所有图片加载完成
	await createImgDatas();

	// 标记为已加载
	isLoaded.value = true;

	// 初始渲染一次，不启动持续动画循环
	if (canvasRef.value) {
		content.value?.clearRect(0, 0, canvasRef.value?.width, canvasRef.value?.height);
		imageDatas.value.forEach(img => {
			content.value?.drawImage(img.img, img.x, img.y, imageWidth.value, imageHeight.value);
		});
	}

	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	window.removeEventListener("resize", resize);

	// 取消动画循环
	if (animationFrameId.value !== null) {
		cancelAnimationFrame(animationFrameId.value);
		animationFrameId.value = null;
	}

	// 清理图片引用，避免内存泄漏
	imageDatas.value = [];
	allImagePath.value = [];
});
</script>

<template>
	<div class="image_container_wrapper">
		<canvas
			class="image_container"
			ref="canvasRef"
			@mousedown="handleMouseDown"
			@mouseup="handleMouseup"
			@mouseleave="handleMouseLeave"
			@mousemove="handleMouseMove"
		></canvas>
		<div v-if="!isLoaded" class="loading_indicator">加载中...</div>
	</div>
</template>

<style scoped lang="scss">
.image_container_wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
}

.image_container {
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
}

.loading_indicator {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 24px;
	color: white;
	font-family: "Mars Needs Cunnilingus", "方正基础像素体", sans-serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	pointer-events: none;
}
</style>
