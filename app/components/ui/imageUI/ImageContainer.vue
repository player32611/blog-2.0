<script setup lang="ts">
import type { ImagePosData } from "~/types/components";

const imageStore = useImageStore();
const { rowMax, imageBorderRadius } = imageStore.getLayoutAttribute();
const { drawImage, drawPlaceholder } = useCanvasDrawing();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const content = ref<CanvasRenderingContext2D | null | undefined>(null);
const allImagePath = ref<string[]>([]);
const currentImageWidth = ref<number>(0);
const currentImageHeight = ref<number>(0);
const currentImageMargin = ref<number>(0);
const imagePosDatas = ref<ImagePosData[]>([]);
const originalImages = ref<HTMLImageElement[]>([]); // 存储原始图片引用，用于 resize 时重新缩放
const animationFrameId = ref<number | null>(null); // 添加 animationFrameId 引用来存储 requestAnimationFrame 的 ID

// 物理模型参数
const isDragging = ref<boolean>(false);
const velocityX = ref<number>(0);
const velocityY = ref<number>(0);
const acceleration = ref<number>(0.1); // 加速度系数
const friction = ref<number>(0.98); // 摩擦力系数（越小减速越快，越大滑动越久）
const mouseSensitivity = ref<number>(0.5); // 鼠标灵敏度
// 触摸事件跟踪
const lastTouchX = ref<number>(0);
const lastTouchY = ref<number>(0);

const handleMouseDown = () => {
	isDragging.value = true;
	velocityX.value = 0;
	velocityY.value = 0;
	// 如果动画循环未运行，启动它
	if (animationFrameId.value === null) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	}
};

const handleTouchStart = (e: TouchEvent) => {
	if (!e.touches[0]) return;
	isDragging.value = true;
	velocityX.value = 0;
	velocityY.value = 0;
	lastTouchX.value = e.touches[0].clientX;
	lastTouchY.value = e.touches[0].clientY;
	if (animationFrameId.value === null) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	}
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

const handleTouchMove = (e: TouchEvent) => {
	if (!e.touches[0] || !isDragging.value) return;

	const touch = e.touches[0];
	const deltaX = touch.clientX - lastTouchX.value;
	const deltaY = touch.clientY - lastTouchY.value;

	velocityX.value += deltaX * mouseSensitivity.value * acceleration.value;
	velocityY.value += deltaY * mouseSensitivity.value * acceleration.value;

	lastTouchX.value = touch.clientX;
	lastTouchY.value = touch.clientY;
};

const handleMouseup = (e: MouseEvent) => {
	isDragging.value = false;
	checkImg(e.x, e.y);
};

const handleTouchEnd = (e: TouchEvent) => {
	if (!e.touches[0]) return;
	isDragging.value = false;
	checkImg(e.touches[0].clientX, e.touches[0].clientY);
};

const handleMouseLeave = () => {
	isDragging.value = false;
};

const handleTouchCancel = (e: TouchEvent) => {
	isDragging.value = false;
};

const createImgDatas = async () => {
	imagePosDatas.value = [];
	originalImages.value = [];
	const loadPromises: Promise<void>[] = [];
	const { imageWidth, imageHeight, imageMargin } = imageStore.getLayoutAttribute();
	currentImageWidth.value = imageWidth;
	currentImageHeight.value = imageHeight;
	currentImageMargin.value = imageMargin;

	for (let i = 0; i < allImagePath.value.length; i++) {
		const img = new window.Image();
		const colIndex = i % rowMax;
		const lineIndex = Math.floor(i / rowMax);
		// 奇数列垂直偏移半个间距，实现交错效果
		const offsetY = colIndex % 2 === 1 ? (imageHeight + imageMargin) / 2 : 0;
		const x = colIndex * (imageWidth + imageMargin);
		const y = lineIndex * (imageHeight + imageMargin) + offsetY;
		const path = allImagePath.value[i];
		if (!path) continue;
		imagePosDatas.value[i] = {
			img: drawPlaceholder(imageWidth, imageHeight, imageBorderRadius, "#ffffff"),
			path: path,
			x,
			y,
			targetX: x,
			targetY: y,
			animation: null,
		};

		const loadPromise = new Promise<void>(resolve => {
			img.onload = () => {
				originalImages.value[i] = img;
				imagePosDatas.value[i]!.img = drawImage(img, imageWidth, imageHeight, imageBorderRadius);
				drawFrame();
				resolve();
			};
			img.onerror = () => {
				imagePosDatas.value[i]!.img = null;
				resolve();
			};
		});

		img.src = allImagePath.value[i]!;
		loadPromises.push(loadPromise);
	}

	await Promise.all(loadPromises);
};

const updatePosition = () => {
	// 应用摩擦力
	if (!isDragging.value) {
		velocityX.value *= friction.value;
		velocityY.value *= friction.value;
		if (Math.abs(velocityX.value) < 0.1) velocityX.value = 0;
		if (Math.abs(velocityY.value) < 0.1) velocityY.value = 0;
	}
	const { totalWidth, totalHeight } = imageStore.getLayoutAttribute();
	// 更新所有图片位置
	imagePosDatas.value.forEach(img => {
		img.x += velocityX.value;
		img.y += velocityY.value;

		// 无限循环边界处理
		if (img.x > totalWidth - currentImageWidth.value) {
			img.x -= totalWidth + currentImageMargin.value;
		}
		if (img.x < -currentImageWidth.value) {
			img.x += totalWidth + currentImageMargin.value;
		}
		if (img.y > totalHeight - currentImageHeight.value) {
			img.y -= totalHeight + currentImageMargin.value;
		}
		if (img.y < -currentImageHeight.value) {
			img.y += totalHeight + currentImageMargin.value;
		}
	});
};

const drawFrame = () => {
	if (!canvasRef.value || !content.value) return;
	const rect = canvasRef.value.getBoundingClientRect();
	content.value.clearRect(0, 0, rect.width, rect.height);

	updatePosition();

	imagePosDatas.value.forEach(img => {
		if (!img.img) return;
		content.value?.drawImage(
			img.img,
			img.x,
			img.y,
			currentImageWidth.value,
			currentImageHeight.value,
		);
	});

	// 只在有速度或正在拖动时继续动画循环
	if (isDragging.value || Math.abs(velocityX.value) > 0 || Math.abs(velocityY.value) > 0) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	} else {
		animationFrameId.value = null;
	}
};

const checkImg = (x: number, y: number) => {
	if (Math.abs(velocityX.value) > 5 || Math.abs(velocityY.value) > 5) return;
	let img = imagePosDatas.value.find(
		img =>
			x >= img.x &&
			x < img.x + currentImageWidth.value &&
			y >= img.y &&
			y < img.y + currentImageHeight.value,
	);
	if (img) console.log(img, img.img);
};

const resize = async () => {
	if (!canvasRef.value) return;

	const dpr = window.devicePixelRatio || 1;
	const rect = canvasRef.value.getBoundingClientRect();

	// 只有当尺寸确实改变时才重新设置
	if (canvasRef.value.width !== rect.width * dpr || canvasRef.value.height !== rect.height * dpr) {
		canvasRef.value.width = rect.width * dpr;
		canvasRef.value.height = rect.height * dpr;

		const ctx = canvasRef.value.getContext("2d");
		if (ctx) {
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			content.value = ctx;

			// 如果已经加载完成，重新计算图片尺寸并重新生成缩略图
			if (originalImages.value.length > 0) {
				const { imageWidth } = imageStore.getLayoutAttribute();

				// 只有当图片尺寸或间距需要改变时才重新生成
				if (imageWidth !== currentImageWidth.value) {
					createImgDatas();
				}
			}
		}
	}
	drawFrame();
};

onMounted(() => {
	allImagePath.value = getAllImages();

	// 等待 DOM 布局和渲染完成后再获取 canvas 尺寸
	// await new Promise(resolve => requestAnimationFrame(resolve));

	const dpr = window.devicePixelRatio || 1;
	const rect = canvasRef.value!.getBoundingClientRect();

	canvasRef.value!.width = rect.width * dpr;
	canvasRef.value!.height = rect.height * dpr;

	content.value = canvasRef.value!.getContext("2d");
	if (content.value) {
		content.value.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	// 等待所有图片加载完成
	createImgDatas();

	// 等待一帧确保布局完成后再渲染
	// await new Promise(resolve => requestAnimationFrame(resolve));

	// 给图片一个初始偏移，使内容居中显示在视口中
	// if (canvasRef.value) {
	// 	const { totalWidth, totalHeight } = imageStore.getLayoutAttribute();
	// 	const rect = canvasRef.value.getBoundingClientRect();
	// 	offsetX.value = (rect.width - totalWidth) / 2;
	// 	offsetY.value = (rect.height - totalHeight) / 2;

	// 	// 应用偏移到所有图片
	// 	imageDatas.value.forEach(img => {
	// 		img.x += offsetX.value;
	// 		img.y += offsetY.value;
	// 	});
	// }

	// 初始渲染
	drawFrame();

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
	imagePosDatas.value = [];
	allImagePath.value = [];
});
</script>

<template>
	<div class="image_container_wrapper">
		<canvas
			class="image_container"
			ref="canvasRef"
			@mousedown="handleMouseDown"
			@mousemove="handleMouseMove"
			@mouseup="handleMouseup"
			@mouseleave="handleMouseLeave"
			@dragstart.prevent
			@touchstart.passive="handleTouchStart"
			@touchmove.passive="handleTouchMove"
			@touchend="handleTouchEnd"
			@touchcancel="handleTouchCancel"
		></canvas>
	</div>
</template>

<style scoped lang="scss">
.image_container_wrapper {
	position: absolute;
	width: 100%;
	height: 100%;

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
}
</style>
