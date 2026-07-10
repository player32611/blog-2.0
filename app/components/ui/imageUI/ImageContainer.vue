<script setup lang="ts">
const imageStore = useImageStore();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const currentImageWidth = ref<number>(0);
const currentImageHeight = ref<number>(0);
const currentImageMargin = ref<number>(0);
const animationFrameId = ref<number | null>(null);
const { drawImage, drawPlaceholder } = useCanvasDrawing(canvasRef);

// 物理模型参数
const isDragging = ref<boolean>(false);
const velocityX = ref<number>(0);
const velocityY = ref<number>(0);
const acceleration: number = 0.1; // 加速度系数
const friction: number = 0.98; // 摩擦力系数（越小减速越快，越大滑动越久）
const mouseSensitivity: number = 0.5; // 鼠标灵敏度
// 触摸事件跟踪
const lastTouchX = ref<number>(0);
const lastTouchY = ref<number>(0);
const interactVelocity: number = 2; // 允许交互的速度阈值

const handleMouseDown = () => {
	isDragging.value = true;
	velocityX.value = 0;
	velocityY.value = 0;
	imageStore.setHoverImageData(null);
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
	imageStore.setHoverImageData(null);
	if (animationFrameId.value === null) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	}
};

const handleMouseMove = (e: MouseEvent) => {
	if (isDragging.value) {
		// 鼠标移动时给予加速度
		velocityX.value += e.movementX * mouseSensitivity * acceleration;
		velocityY.value += e.movementY * mouseSensitivity * acceleration;

		// 如果动画循环未运行，启动它
		if (animationFrameId.value === null) {
			animationFrameId.value = requestAnimationFrame(drawFrame);
		}
	} else if (
		Math.abs(velocityX.value) < interactVelocity &&
		Math.abs(velocityY.value) < interactVelocity
	) {
		let img = imageStore.allImagePosData.find(
			img =>
				e.x >= img.x &&
				e.x < img.x + currentImageWidth.value &&
				e.y >= img.y &&
				e.y < img.y + currentImageHeight.value,
		);
		if (img) {
			imageStore.setHoverImageData({
				width: currentImageWidth.value,
				height: currentImageHeight.value,
				center: {
					x: (2 * img.x + currentImageWidth.value) / 2,
					y: (2 * img.y + currentImageHeight.value) / 2,
				},
			});
		} else {
			imageStore.setHoverImageData(null);
		}
	}
};

const handleTouchMove = (e: TouchEvent) => {
	if (!e.touches[0] || !isDragging.value) return;

	const touch = e.touches[0];
	const deltaX = touch.clientX - lastTouchX.value;
	const deltaY = touch.clientY - lastTouchY.value;

	velocityX.value += deltaX * mouseSensitivity * acceleration;
	velocityY.value += deltaY * mouseSensitivity * acceleration;

	lastTouchX.value = touch.clientX;
	lastTouchY.value = touch.clientY;
};

const handleMouseup = (e: MouseEvent) => {
	isDragging.value = false;
	checkImg(e.x, e.y);
};

const handleTouchEnd = (e: TouchEvent) => {
	isDragging.value = false;
	if (!e.touches[0]) return;
	checkImg(e.touches[0].clientX, e.touches[0].clientY);
};

const handleMouseLeave = () => {
	isDragging.value = false;
};

const handleTouchCancel = () => {
	isDragging.value = false;
};

const createImgDatas = () => {
	const { rowMax } = imageStore.getLayoutAttribute();

	imageStore.setAllImagePosData([]);
	const loadPromises: Promise<void>[] = [];
	const { imageWidth, imageHeight, imageMargin } = imageStore.getLayoutAttribute();
	currentImageWidth.value = imageWidth;
	currentImageHeight.value = imageHeight;
	currentImageMargin.value = imageMargin;

	IMAGE_DATAS.forEach((data, index) => {
		const img = new window.Image();
		const colIndex = index % rowMax;
		const lineIndex = Math.floor(index / rowMax);
		// 奇数列垂直偏移半个间距，实现交错效果
		const offsetY = colIndex % 2 === 1 ? (imageHeight + imageMargin) / 2 : 0;
		const x = colIndex * (imageWidth + imageMargin);
		const y = lineIndex * (imageHeight + imageMargin) + offsetY;

		imageStore.setAllImagePosData([
			...imageStore.allImagePosData,
			{
				name: data.name,
				author: data.author,
				path: data.path,
				img: null,
				x,
				y,
				targetX: x,
				targetY: y,
				animation: null,
			},
		]);

		const loadPromise = new Promise<void>(resolve => {
			img.onload = () => {
				const currentAllImage = imageStore.allImagePosData;
				if (!currentAllImage[index]) return;
				currentAllImage[index]!.img = img;
				imageStore.setAllImagePosData(currentAllImage);
				drawFrame();
				resolve();
			};
			img.onerror = () => {
				const currentAllImage = imageStore.allImagePosData;
				if (!currentAllImage[index]) return;
				currentAllImage[index].img = null;
				imageStore.setAllImagePosData(currentAllImage);
				resolve();
			};
		});

		img.src = `/blog-2.0${data.path}`;
		loadPromises.push(loadPromise);
	});

	Promise.all(loadPromises);
};

const updatePosition = () => {
	// 应用摩擦力
	if (!isDragging.value) {
		velocityX.value *= friction;
		velocityY.value *= friction;
		if (Math.abs(velocityX.value) < 0.1) velocityX.value = 0;
		if (Math.abs(velocityY.value) < 0.1) velocityY.value = 0;
	}
	const { totalWidth, totalHeight } = imageStore.getLayoutAttribute();
	// 更新所有图片位置
	imageStore.allImagePosData.forEach(img => {
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
	if (!canvasRef.value) return;
	const ctx = canvasRef.value.getContext("2d");
	if (!ctx) return;
	const { imageBorderRadius, imagePlaceHolderColor } = imageStore.getLayoutAttribute();

	const rect = canvasRef.value.getBoundingClientRect();
	ctx.clearRect(0, 0, rect.width, rect.height);

	updatePosition();

	imageStore.allImagePosData.forEach(img => {
		if (img.img) {
			drawImage(
				img.x,
				img.y,
				img.img,
				currentImageWidth.value,
				currentImageHeight.value,
				imageBorderRadius,
			);
		} else {
			drawPlaceholder(
				img.x,
				img.y,
				currentImageWidth.value,
				currentImageHeight.value,
				imageBorderRadius,
				imagePlaceHolderColor,
			);
		}
	});

	// 只在有速度或正在拖动时继续动画循环
	if (isDragging.value || Math.abs(velocityX.value) > 0 || Math.abs(velocityY.value) > 0) {
		animationFrameId.value = requestAnimationFrame(drawFrame);
	} else {
		animationFrameId.value = null;
	}
};

const checkImg = (x: number, y: number) => {
	if (
		imageStore.currentMountAnim ||
		Math.abs(velocityX.value) > interactVelocity ||
		Math.abs(velocityY.value) > interactVelocity
	)
		return;

	let img = imageStore.allImagePosData.find(
		img =>
			x >= img.x &&
			x < img.x + currentImageWidth.value &&
			y >= img.y &&
			y < img.y + currentImageHeight.value,
	);
	if (img) imageStore.setActiveImageData(img);
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
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			// 只有当图片尺寸或间距需要改变时才重新生成
			if (imageStore.getLayoutAttribute().imageWidth !== currentImageWidth.value) {
				createImgDatas();
			}
		}
	}
	drawFrame();
};

onMounted(() => {
	resize();
	createImgDatas();
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
	overflow: hidden;
	overscroll-behavior: none;
	cursor: pointer;

	.image_container {
		position: absolute;
		width: 100%;
		height: 100%;
	}
}
</style>
