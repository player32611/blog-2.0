<script setup lang='ts'>
import { gsap } from 'gsap';
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
const ifMovable = ref<boolean>(false);

const handleMouseDown = () => {
  ifMovable.value = true;
}

const handleMouseup = (e: MouseEvent) => {
  ifMovable.value = false;
  checkImg(e.x, e.y);
}

const handleMouseLeave = () => {
  ifMovable.value = false;
}

const handleMouseMove = (e: MouseEvent) => {
  if (!ifMovable.value) return;
  moveImgs(e.movementX, e.movementY);
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

const drawFrame = () => {
  if (canvasRef.value) content.value?.clearRect(0, 0, canvasRef.value?.width, canvasRef.value?.height);
  imageDatas.value.forEach(img => {
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
    content.value?.drawImage(img.img, img.x, img.y, imageWidth.value, imageHeight.value)
  })
}


const moveImgs = (x: number, y: number) => {
  imageDatas.value.forEach(img => {
    img.targetX = img.x + x * 20;
    img.targetY = img.y + y * 20;
    if (img.animation) img.animation.kill();
    img.animation = gsap.to(img, {
      x: img.targetX,
      y: img.targetY,
      duration: 1,
      ease: 'power4.out',
    })
  })
  gsap.ticker.add(drawFrame)
}

const checkImg = (x: number, y: number) => {
  let img = imageDatas.value.find(img => x >= img.x && x < img.x + imageWidth.value && y >= img.y && y < img.y + imageHeight.value)
  if (img) console.log(img, img.img)
}
const resize = () => {
  if (!canvasRef.value) return;

  // 高清屏适配
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasRef.value.getBoundingClientRect();

  canvasRef.value.width = rect.width * dpr;
  canvasRef.value.height = rect.height * dpr;

  // 缩放 Context 以匹配 CSS 像素
  const ctx = canvasRef.value.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
    content.value = ctx;
  }

  // 重新计算布局（如果需要响应式重排）
  // 这里简单起见，只重绘，不重排网格，因为网格大小是固定的
  drawFrame();
};

onMounted(() => {
  content.value = canvasRef.value?.getContext('2d');
  totalWidth.value = rowMax.value * (imageWidth.value + imageMargin.value) - imageMargin.value;
  totalHeight.value = lineMax.value * (imageHeight.value + imageMargin.value) - imageMargin.value;
  allImagePath.value = getAllImages();
  resize();
  window.addEventListener('resize', resize);
  createImgDatas();
})

onUnmounted(() => {
  gsap.ticker.remove(drawFrame);
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