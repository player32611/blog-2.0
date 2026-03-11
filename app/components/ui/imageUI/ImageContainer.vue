<script setup lang='ts'>
import { gsap } from 'gsap';
import type { ImageData } from '~/types/components';

import Image from '../Image.vue';

const containerRef = ref<HTMLDivElement | null>(null)
const containerWidth = ref<number>(0)
const containerHeight = ref<number>(0)
const imageDatas = ref<ImageData[]>([])
const imageWidth = ref<number>(0)
const imageHeight = ref<number>(0)
const ifMovable = ref<boolean>(false)
const mouseX = ref<number>(0)
const mouseY = ref<number>(0)
const standardWidth = ref<number>(1440)
const scalesNums = ref<number>(1)
const lines = ref<number>(7)
const perLine = ref<number>(7)

const handleMouseDown = (e: MouseEvent) => {
  console.log('handleMouseDown')
  ifMovable.value = true
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const handleMouseup = () => {
  ifMovable.value = false
}

const handleMouseMove = (e: MouseEvent) => {
  if (!ifMovable.value || !containerRef.value) return
  console.log('handleMouseMove')
  const x = e.clientX
  const y = e.clientY
  let dx = (x - mouseX.value) / scalesNums.value
  let dy = (y - mouseY.value) / scalesNums.value
  imageDatas.value.forEach((imageData) => {
    let duration = 1
    imageData.mov_x += dx
    if (imageData.x + imageData.mov_x > containerWidth.value) {
      imageData.mov_x -= containerWidth.value
      duration = 0
    }
    if (imageData.x + imageData.mov_x < -imageWidth.value) {
      imageData.mov_x += containerWidth.value
      duration = 0
    }
    imageData.mov_y += dy
    if (imageData.y + imageData.mov_y > containerHeight.value) {
      imageData.mov_y -= containerHeight.value
      duration = 0
    }
    if (imageData.y + imageData.mov_y < -imageHeight.value) {
      imageData.mov_y += containerHeight.value
      duration = 0
    }
    if (imageData.ani) imageData.ani.kill()
    imageData.ani = gsap.to(imageData.node, {
      transform: `translate(${imageData.mov_x}px,${imageData.mov_y}px)`,
      duration: duration,
      ease: "power4.out",
    })
  })
  mouseX.value = x
  mouseY.value = y
}

const resize = () => {
  let imgs: HTMLElement[] | null = null;
  if (containerRef.value) {
    imgs = Array.from(containerRef.value.querySelectorAll(".image")) as HTMLElement[];
    containerWidth.value = containerRef.value.offsetWidth
    containerHeight.value = containerRef.value.offsetHeight
    scalesNums.value = document.body.offsetWidth / standardWidth.value
    containerRef.value.style.transform = `scale(${scalesNums.value})`
  }

  if (imgs && imgs[0]) {
    imageWidth.value = imgs[0].offsetWidth
    imageHeight.value = imgs[0].offsetHeight
    gsap.to(imgs, {
      transform: "translate(0, 0)",
      duration: 0,
      ease: "power4.out",
    })
    imageDatas.value = []
    imgs.forEach(img => {
      imageDatas.value.push({
        node: img,
        x: img.offsetLeft,
        y: img.offsetTop,
        mov_x: 0,
        mov_y: 0,
        ani: null,
      })
    })
  }
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize);
})

</script>

<template>
  <div class="image_container" ref="containerRef" @mousedown="handleMouseDown" @mouseup="handleMouseup"
    @mouseleave="handleMouseup" @mousemove="handleMouseMove">
    <div class="image_line" v-for="i in lines">
      <Image v-for="j in perLine" :key="`${i}-${j}`" />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.image_container {
  position: absolute;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;

  .image_line {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    height: auto;
    font-size: 1px;
  }
}

@media screen and (max-aspect-ratio: 1.5/1) {
  .image_line {
    font-size: 2px;
  }
}

@media screen and (min-aspect-ratio: 0.8/1) {
  .image_line {
    font-size: 2.8px;
  }
}
</style>