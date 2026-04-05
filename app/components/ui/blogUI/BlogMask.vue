<script setup lang="ts">
import gsap from "gsap";

const maskRef = ref<HTMLDivElement | null>(null);
const maskState = ref<"in" | "out">("in");
const time = ref<number>(0.8);

const maskIn = () => {
	gsap.timeline().to(maskRef.value, {
		top: "100%",
		duration: time.value,
		ease: "power1.inOut",
	});
};

const maskOut = () => {
	gsap.to(maskRef.value, {
		top: "-100px",
		duration: time.value,
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
			transform: "scaleY(300%)",
			duration: time.value / 4,
			ease: "power2.out",
		})
		.to(maskRef.value, {
			transform: "scaleY(-100%)",
			duration: (time.value * 3) / 4,
			ease: "power2.in",
		});
	maskState.value = maskState.value === "in" ? "out" : "in";
};

defineExpose({
	changeMask,
});
</script>

<template>
	<div class="blog_mask" ref="maskRef"></div>
</template>

<style scoped lang="scss">
.blog_mask {
	position: fixed;
	top: -100px;
	height: 100px;
	width: 100%;
	background-color: blue;
	transform: scaleY(0%);
}
</style>
