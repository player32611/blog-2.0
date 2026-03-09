<script setup lang='ts'>
import { gsap } from 'gsap';
import type { BlogNavigationParams } from '~/types/components';

const { page } = defineProps<BlogNavigationParams>();
const boxRef = ref<HTMLDivElement | null>(null);
const time = ref<number>(1);
const headings = ref<Array<{ id: string; text: string }>>([])


const handleMouseEnter = () => {
  gsap.to(boxRef.value, {
    right: "0px",
    duration: time.value,
    ease: 'power2.out'
  });
}

const handleMouseLeave = () => {
  gsap.to(boxRef.value, {
    right: "-300px",
    duration: time.value,
    ease: 'power2.out'
  });
}

const handleClick = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    handleMouseLeave() // 点击后自动收起导航
  }
}
const getHeadings = () => {
  headings.value = []
  const h2Elements = document.querySelectorAll('h2[id]')
  h2Elements.forEach((el) => {
    const id = el.getAttribute('id')
    const text = el.textContent || ''
    if (id && text) {
      headings.value.push({ id, text })
    }
  })
}

onMounted(() => {
  getHeadings()
  watch(() => page, () => {
    setTimeout(() => {
      getHeadings()
    }, 100)
  })
})

</script>

<template>
  <div class="blog_navigation_box" ref='boxRef' @mouseenter='handleMouseEnter' @mouseleave='handleMouseLeave'>
    <div class="navigation_title">在此页面上</div>
    <div class="navigation_links" v-if="headings.length > 0">
      <div v-for="heading in headings" :key="heading.id" class="navigation_link" @click="handleClick(heading.id)">
        {{ heading.text }}
      </div>
    </div>
    <div v-else class="no_headings">
      无二级标题
    </div>
  </div>
</template>

<style scoped lang='scss'>
.blog_navigation_box {
  position: fixed;
  right: -300px;
  margin: 10dvh 0;
  padding: 50px 40px;
  height: calc(80dvh - 50px*2 - 5px*2);
  width: 240px;
  color: #FFFFFF;
  background-color: #000000;
  border: 5px solid #FFFFFF;
  font-family: "方正基础像素体";

  .navigation_title {
    font-weight: 600;
  }

  .navigation_link {
    margin: 10px 0;
    cursor: pointer;
  }
}
</style>