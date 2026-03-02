<script setup lang='ts'>
import { ref, } from "vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import type { LoadingParams } from "~/types/components";

const row = 15;
const line = 15;
const loadingRef = ref<SVGSVGElement | null>(null);
const blocks = ref<SVGUseElement[]>([]);
const props = defineProps<LoadingParams>();

const createBlocks = () => {
  if (!loadingRef.value) return;

  for (let l = 0; l < line; l++) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    for (let r = 0; r < row; r++) {
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("class", "loading_block");
      use.setAttribute("href", "#loading_hexagon");
      use.setAttribute("x", `${(l % 2 ? 86.5 * r : 86.5 * r + 43.3)}`);
      use.setAttribute("y", `${74.5 * l}`);
      use.setAttribute("transform-origin", "50 50");
      g.appendChild(use);
      blocks.value.push(use);
    }
    loadingRef.value.appendChild(g);
  }
}

const loadingIn = (next: () => void) => {
  console.log("loadingIn");
  gsap
    .timeline()
    .set(blocks.value, {
      "stroke-dashoffset": () => {
        return "random(-100, 100)";
      },
    }, 0)
    .to(blocks.value, {
      "stroke-dashoffset": 1,
      "stroke-opacity": 1,
      duration: 0.5,
      ease: "power4.out",
      stagger: {
        from: "random",
        each: 0.0015,
      },
    })
    .to(blocks.value, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: {
        from: "center",
        each: 0.003,
      },
    });
  setTimeout(() => {
    next();
    props.checkLoading?.();
  }, 2000);
};

const loadingOut = () => {
  gsap
    .timeline()
    // .set(blocks.value, {
    //   "stroke-dashoffset": () => {
    //     return Math.random() > 0.5 ? -100 : 100;
    //   },
    // })
    .to(blocks.value, {
      "stroke-dashoffset": 0,
      "stroke-opacity": 1,
      duration: 0.5,
      ease: "power4.out",
      stagger: {
        from: "random",
        each: 0.002,
      },
    })
    .to(blocks.value, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: {
        from: "center",
        each: 0.004,
      },
    });
};

onMounted(() => {
  createBlocks();
  setTimeout(() => {
    loadingOut();
  }, 1000);
});

defineExpose({
  loadingIn,
  loadingOut
});
</script>

<template>
  <svg class="loading_blocks" viewBox="0 0 1000 1000" ref="loadingRef">
    <defs>
      <polygon id="loading_hexagon" points="0,-50 43.3,-25 43.3,25 0,50 -43.3,25 -43.3,-25" fill="#171717" />
    </defs>
  </svg>
</template>

<style lang='scss'>
.loading_blocks {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;

  .loading_block {
    stroke: #17f700;
    stroke-width: 0.8;
    stroke-dasharray: 100;
    stroke-opacity: 0;
  }
}
</style>