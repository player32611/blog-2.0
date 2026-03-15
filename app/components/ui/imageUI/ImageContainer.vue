<script setup lang='ts'>
import type { ImageData } from '~/types/components';

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

// 物理模型参数
const isDragging = ref<boolean>(false);
const velocityX = ref<number>(0);
const velocityY = ref<number>(0);
const acceleration = ref<number>(0.1); // 加速度系数
const friction = ref<number>(0.95); // 摩擦力系数
const mouseSensitivity = ref<number>(0.5); // 鼠标灵敏度

const handleMouseDown = () => {
  isDragging.value = true;
  velocityX.value = 0;
  velocityY.value = 0;
}

const handleMouseup = (e: MouseEvent) => {
  isDragging.value = false;
  checkImg(e.x, e.y);
}

const handleMouseLeave = () => {
  isDragging.value = false;
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return;

  // 鼠标移动时给予加速度
  velocityX.value += e.movementX * mouseSensitivity.value * acceleration.value;
  velocityY.value += e.movementY * mouseSensitivity.value * acceleration.value;
}

const createImgDatas = () => {
  imageDatas.value = [];
  for (let i = 0; i < imageTotal.value; i++) {
    let img = new window.Image();
    img.src = allImagePath.value[i]!;
    img.onload = () => {
      let colIndex = i % rowMax.value;
      let lineIndex = Math.floor(i / rowMax.value);
      let x = colIndex * (imageWidth.value + imageMargin.value);
      let y = lineIndex * (imageHeight.value + imageMargin.value);
      imageDatas.value.push({
        img,
        x,
        y,
        targetX: x,
        targetY: y,
        animation: null
      });
      content.value?.drawImage(img, x, y, imageWidth.value, imageHeight.value)
    }
  }
}

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
}

const drawFrame = () => {
  if (canvasRef.value) {
    content.value?.clearRect(0, 0, canvasRef.value?.width, canvasRef.value?.height);
  }

  updatePosition();

  imageDatas.value.forEach(img => {
    content.value?.drawImage(img.img, img.x, img.y, imageWidth.value, imageHeight.value)
  })

  // 继续动画循环
  requestAnimationFrame(drawFrame);
}

const checkImg = (x: number, y: number) => {
  let img = imageDatas.value.find(img =>
    x >= img.x &&
    x < img.x + imageWidth.value &&
    y >= img.y &&
    y < img.y + imageHeight.value
  )
  if (img) console.log(img, img.img)
}

const resize = () => {
  if (!canvasRef.value) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvasRef.value.getBoundingClientRect();

  canvasRef.value.width = rect.width * dpr;
  canvasRef.value.height = rect.height * dpr;

  const ctx = canvasRef.value.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
    content.value = ctx;
  }
};

onMounted(() => {
  content.value = canvasRef.value?.getContext('2d');
  totalWidth.value = rowMax.value * (imageWidth.value + imageMargin.value) - imageMargin.value;
  totalHeight.value = lineMax.value * (imageHeight.value + imageMargin.value) - imageMargin.value;
  allImagePath.value = getAllImages();
  resize();
  createImgDatas();

  // 开始动画循环
  drawFrame();
  window.addEventListener('resize', resize);
})

onUnmounted(() => {
  window.removeEventListener('resize', resize);
})

</script>

<template>
  <canvas class="image_container" ref="canvasRef" @mousedown="handleMouseDown" @mouseup="handleMouseup"
    @mouseleave="handleMouseLeave" @mousemove="handleMouseMove"></canvas>
</template>

<style scoped lang='scss'>
.image_container {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>