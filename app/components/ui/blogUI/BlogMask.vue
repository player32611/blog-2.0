<script setup lang="ts">
import gsap from "gsap";

import DinoGame from "~/components/exhibit/DinoGame.vue";

const maskRef = ref<HTMLDivElement | null>(null);
const maskState = ref<"in" | "out">("in");

const easeTime: number = 0.75;

const maskIn = () => {
	gsap.timeline().to(maskRef.value, {
		top: "100%",
		duration: easeTime,
		ease: "power1.inOut",
	});
};

const maskOut = () => {
	gsap.to(maskRef.value, {
		top: "-110px",
		duration: easeTime,
		ease: "power1.inOut",
	});
};

const changeMask = () => {
	switch (maskState.value) {
		case "in":
			maskIn();
			break;
		case "out":
			maskOut();
			break;
	}
	gsap
		.timeline()
		.to(maskRef.value, {
			height: 300,
			duration: easeTime / 4,
			ease: "power1.out",
		})
		.to(maskRef.value, {
			height: 100,
			duration: (easeTime * 3) / 4,
			ease: "power1.in",
		});
	maskState.value = maskState.value === "in" ? "out" : "in";
};

defineExpose({
	changeMask,
});
</script>

<template>
	<div class="blog_mask" ref="maskRef">
		<DinoGame />
	</div>
</template>

<style scoped lang="scss">
.blog_mask {
	position: fixed;
	top: -110px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 5px solid #000000;
	height: 100px;
	width: calc(100% - 10px);
	overflow: hidden;
	background-color: #212121;
}
</style>
