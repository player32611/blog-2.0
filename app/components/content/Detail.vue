<script setup lang="ts">
import { gsap } from "gsap/gsap-core";

const arrowRef = ref<SVGAElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const isActive = ref<boolean>(false);

const handleClick = () => {
	isActive.value = isActive.value === true ? false : true;
	if (isActive.value) {
		gsap.to(arrowRef.value, { duration: 0.5, rotate: 90, ease: "power2.out" });
		gsap.to(contentRef.value, {
			duration: 0.5,
			height: "auto",
			padding: "10px",
			ease: "power2.out",
		});
	} else {
		gsap.to(arrowRef.value, { duration: 0.5, rotate: 0, ease: "power2.out" });
		gsap.to(contentRef.value, { duration: 0.5, height: 0, padding: "0 10px", ease: "power2.out" });
	}
};
</script>

<template>
	<div class="custom-block detail">
		<div class="title" @click="handleClick">
			<svg class="selecter_arrow" width="20" height="20" viewBox="0 0 100 100" ref="arrowRef">
				<polygon points="20,20 80,50 20,80" fill="#FFFFFF" />
			</svg>
			<slot name="title" mdc-unwrap="p" />
		</div>
		<div class="content" ref="contentRef">
			<slot ref="contentRef" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.custom-block.detail {
	margin: 20px 0;
	height: auto;
	border: 2.5px solid #ffffff;
	overflow: hidden;

	.title {
		display: flex;
		align-items: center;
		padding: 10px;
		height: 20px;
		cursor: pointer;
	}

	.content {
		padding: 0 10px;
		height: 0px;

		:deep(:first-child) {
			margin-top: 0 !important;
		}

		:deep(:last-child) {
			margin-bottom: 0 !important;
		}
	}
}
</style>
