<script setup lang="ts">
import type { ImageData } from "~/types/components";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const content = ref<CanvasRenderingContext2D | null | undefined>(null);
const allImagePath = ref<string[]>([]);
const imageTotal = ref<number>(28);
const rowMax = ref<number>(4);
const lineMax = ref<number>(7);
const imageWidth = ref<number>(350);
const imageHeight = ref<number>(500);
const imageMargin = ref<number>(200); // 图片间距
const imageBorderRadius = ref<number>(16); // 图片圆角半径
const imageBaseWidth = ref<number>(350); // 基准图片宽度（桌面端）
const imageBaseHeight = ref<number>(500); // 基准图片高度
const totalWidth = ref<number>(0);
const totalHeight = ref<number>(0);
const imageDatas = ref<ImageData[]>([]);

const originalImages = ref<HTMLImageElement[]>([]); // 存储原始图片引用，用于 resize 时重新缩放

const animationFrameId = ref<number | null>(null); // 添加 animationFrameId 引用来存储 requestAnimationFrame 的 ID

const isLoaded = ref<boolean>(false); // 加载状态

// 物理模型参数
const isDragging = ref<boolean>(false);
const velocityX = ref<number>(0);
const velocityY = ref<number>(0);
const acceleration = ref<number>(0.1); // 加速度系数
const friction = ref<number>(0.98); // 摩擦力系数（越小减速越快，越大滑动越久）
// 0.98 — 约 2.5 倍滑动时间
// 0.99 — 约 5 倍滑动时间
// 0.995 — 约 10 倍滑动时间
const mouseSensitivity = ref<number>(0.5); // 鼠标灵敏度

// 全局偏移量（如果需要无限滚动的话）
const offsetX = ref<number>(0);
const offsetY = ref<number>(0);
// 触摸事件跟踪
const lastTouchX = ref<number>(0);
const lastTouchY = ref<number>(0);

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

const handleTouchStart = (e: TouchEvent) => {
	if (!isLoaded.value || !e.touches[0]) return;
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

/**
 * 根据屏幕宽度计算图片尺寸和间距
 */
const calculateImageSize = () => {
	const screenWidth = window.innerWidth;
	const baseWidth = imageBaseWidth.value;
	const baseHeight = imageBaseHeight.value;

	// 小屏幕（手机）
	if (screenWidth < 768) {
		const scale = 0.5;
		return {
			width: Math.floor(baseWidth * scale),
			height: Math.floor(baseHeight * scale),
			margin: 40,
		};
	}
	// 中等屏幕（平板）
	if (screenWidth < 1024) {
		const scale = 0.7;
		return {
			width: Math.floor(baseWidth * scale),
			height: Math.floor(baseHeight * scale),
			margin: 100,
		};
	}
	// 大屏幕（桌面）
	return {
		width: baseWidth,
		height: baseHeight,
		margin: imageMargin.value,
	};
};

/**
 * 创建带圆角和边框的缩略图
 */
const createThumbnail = (img: HTMLImageElement, w: number, h: number): HTMLCanvasElement => {
	const offscreen = document.createElement("canvas");
	offscreen.width = w;
	offscreen.height = h;
	const ctx = offscreen.getContext("2d")!;
	const r = imageBorderRadius.value;

	// 绘制圆角路径
	ctx.beginPath();
	ctx.moveTo(r, 0);
	ctx.lineTo(w - r, 0);
	ctx.arcTo(w, 0, w, r, r);
	ctx.lineTo(w, h - r);
	ctx.arcTo(w, h, w - r, h, r);
	ctx.lineTo(r, h);
	ctx.arcTo(0, h, 0, h - r, r);
	ctx.lineTo(0, r);
	ctx.arcTo(0, 0, r, 0, r);
	ctx.closePath();

	// 裁剪并绘制图片
	ctx.save();
	ctx.clip();
	ctx.drawImage(img, 0, 0, w, h);
	ctx.restore();

	return offscreen;
};

const createImgDatas = async () => {
	imageDatas.value = [];
	originalImages.value = [];
	const loadPromises: Promise<void>[] = [];
	const { width: w, height: h, margin } = calculateImageSize();

	// 更新当前图片尺寸和间距
	imageWidth.value = w;
	imageHeight.value = h;
	imageMargin.value = margin;

	// 计算画布尺寸
	const canvasWidth = rowMax.value * (w + margin) - margin;
	const canvasHeight = lineMax.value * (h + margin) - margin;

	for (let i = 0; i < imageTotal.value; i++) {
		const img = new window.Image();
		const colIndex = i % rowMax.value;
		const lineIndex = Math.floor(i / rowMax.value);
		// 奇数列垂直偏移半个间距，实现交错效果
		const offsetY = colIndex % 2 === 1 ? (h + margin) / 2 : 0;
		const x = colIndex * (w + margin);
		const y = lineIndex * (h + margin) + offsetY;

		const loadPromise = new Promise<void>(resolve => {
			img.onload = () => {
				originalImages.value[i] = img;

				// 创建缩略图
				const thumbnail = createThumbnail(img, w, h);

				imageDatas.value[i] = {
					img: thumbnail,
					x,
					y,
					targetX: x,
					targetY: y,
					animation: null,
				};
				resolve();
			};
			img.onerror = () => {
				console.error(`Failed to load image: ${allImagePath.value[i]}`);
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
	if (!canvasRef.value || !content.value) return;
	const rect = canvasRef.value.getBoundingClientRect();
	content.value.clearRect(0, 0, rect.width, rect.height);

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
	if (Math.abs(velocityX.value) > 5 || Math.abs(velocityY.value) > 5) return;
	let img = imageDatas.value.find(
		img =>
			x >= img.x && x < img.x + imageWidth.value && y >= img.y && y < img.y + imageHeight.value,
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
			if (isLoaded.value && originalImages.value.length > 0) {
				const { width: w, height: h, margin } = calculateImageSize();
				const oldW = imageWidth.value;
				const oldH = imageHeight.value;
				const oldMargin = imageMargin.value;

				// 只有当图片尺寸或间距需要改变时才重新生成
				if (w !== oldW || h !== oldH || margin !== oldMargin) {
					imageWidth.value = w;
					imageHeight.value = h;
					imageMargin.value = margin;

					// 重新计算布局和图片位置
					totalWidth.value = rowMax.value * (w + imageMargin.value) - imageMargin.value;
					totalHeight.value = lineMax.value * (h + imageMargin.value) - imageMargin.value;

					// 重新生成所有缩略图
					for (let i = 0; i < originalImages.value.length; i++) {
						const img = originalImages.value[i];
						if (!img) continue;

						const colIndex = i % rowMax.value;
						const lineIndex = Math.floor(i / rowMax.value);
						const offsetY = colIndex % 2 === 1 ? (h + imageMargin.value) / 2 : 0;
						const x = colIndex * (w + imageMargin.value);
						const y = lineIndex * (h + imageMargin.value) + offsetY;

						const thumbnail = createThumbnail(img, w, h);

						imageDatas.value[i] = {
							img: thumbnail,
							x,
							y,
							targetX: x,
							targetY: y,
							animation: null,
						};
					}

					// 重置偏移量
					offsetX.value = 0;
					offsetY.value = 0;
					velocityX.value = 0;
					velocityY.value = 0;
				}

				// 重新渲染
				renderStatic();
			}
		}
	}
};

const renderStatic = () => {
	if (!canvasRef.value || !content.value) return;
	const rect = canvasRef.value.getBoundingClientRect();
	content.value.clearRect(0, 0, rect.width, rect.height);
	imageDatas.value.forEach(img => {
		content.value?.drawImage(img.img, img.x, img.y, imageWidth.value, imageHeight.value);
	});
};

onMounted(async () => {
	allImagePath.value = getAllImages();

	// 等待 DOM 布局和渲染完成后再获取 canvas 尺寸
	await nextTick();
	await new Promise(resolve => requestAnimationFrame(resolve));

	const dpr = window.devicePixelRatio || 1;
	const rect = canvasRef.value!.getBoundingClientRect();

	canvasRef.value!.width = rect.width * dpr;
	canvasRef.value!.height = rect.height * dpr;

	content.value = canvasRef.value!.getContext("2d");
	if (content.value) {
		content.value.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	// 等待所有图片加载完成
	await createImgDatas();

	// 计算总尺寸
	totalWidth.value = rowMax.value * (imageWidth.value + imageMargin.value) - imageMargin.value;
	totalHeight.value = lineMax.value * (imageHeight.value + imageMargin.value) - imageMargin.value;

	// 标记为已加载
	isLoaded.value = true;

	// 等待一帧确保布局完成后再渲染
	await new Promise(resolve => requestAnimationFrame(resolve));

	// 给图片一个初始偏移，使内容居中显示在视口中
	if (canvasRef.value) {
		const rect = canvasRef.value.getBoundingClientRect();
		offsetX.value = (rect.width - totalWidth.value) / 2;
		offsetY.value = (rect.height - totalHeight.value) / 2;

		// 应用偏移到所有图片
		imageDatas.value.forEach(img => {
			img.x += offsetX.value;
			img.y += offsetY.value;
		});
	}

	// 初始渲染
	renderStatic();

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
			@mousemove="handleMouseMove"
			@mouseup="handleMouseup"
			@mouseleave="handleMouseLeave"
			@dragstart.prevent
			@touchstart="handleTouchStart"
			@touchmove.prevent="handleTouchMove"
			@touchend="handleTouchEnd"
			@touchcancel="handleTouchCancel"
		></canvas>
		<div v-if="!isLoaded" class="loading_indicator">加载中...</div>
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
