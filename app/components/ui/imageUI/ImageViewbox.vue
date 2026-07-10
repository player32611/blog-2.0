<script setup lang="ts">
import gsap from "gsap";
import type { NetworkLoadingState } from "~/types/config";
import type { ImagePosData } from "~/types/common";

import ImageLoading from "~/components/exhibit/ImageLoading.vue";
import ProgressLoading from "~/components/exhibit/ProgressLoading.vue";

const imageStore = useImageStore();
const viewboxRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const animationRef = ref<GSAPAnimation | null>(null);
const loadingState = ref<NetworkLoadingState>("loading");
const currentImageData = ref<ImagePosData | null>(null);
const isShowingBox = ref<boolean>(false);

const handleAnimShow = () => {
	if (!imageStore.activeImageData || animationRef.value) return;
	animationRef.value = gsap.to(viewboxRef.value, {
		backgroundColor: "#000000af",
		opacity: 1,
		duration: 0.3,
		onStart: () => {
			isShowingBox.value = true;
			currentImageData.value = imageStore.activeImageData;
			gsap.set(viewboxRef.value, { pointerEvents: "all" });
		},
		onComplete: () => {
			animationRef.value = null;
			imageStore.setCurrentMountAnim(null);
		},
	});
	imageStore.setCurrentMountAnim(animationRef.value);
};

const handleAnimHide = () => {
	if (
		!imageStore.activeImageData ||
		!isShowingBox.value ||
		imageStore.currentMountAnim ||
		animationRef.value
	)
		return;
	animationRef.value = gsap.to(viewboxRef.value, {
		backgroundColor: "#00000000",
		opacity: 0,
		duration: 0.3,
		onStart: () => {
			imageStore.setActiveImageData(null);
			gsap.set(viewboxRef.value, { pointerEvents: "none" });
		},
		onComplete: () => {
			currentImageData.value = null;
			isShowingBox.value = false;
			animationRef.value = null;
			imageStore.setCurrentMountAnim(null);
		},
	});
	imageStore.setCurrentMountAnim(animationRef.value);
};

const handleClickOutside = () => {
	handleAnimHide();
};

const handleClickImage = (event: MouseEvent) => {
	event.stopPropagation();
};

const handleMouseEnter = () => {
	if (!imageStore.activeImageData || !imageRef.value) return;
	imageStore.setHoverImageData({
		width: imageRef.value.offsetWidth,
		height: imageRef.value.offsetHeight,
		center: {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		},
	});
};

const handleMouseLeave = () => {
	imageStore.setHoverImageData(null);
};

const handleLoad = () => {
	loadingState.value = "success";
};

const handleError = () => {
	loadingState.value = "error";
};

watch(
	() => imageStore.activeImageData,
	newData => {
		if (newData) {
			handleAnimShow();
			loadingState.value = "loading";
		}
	},
);
</script>

<template>
	<div class="image_viewbox" ref="viewboxRef">
		<div class="viewbox_container" v-if="isShowingBox" @click="handleClickOutside">
			<img
				class="image_shadow"
				:src="currentImageData?.path"
				alt="加载失败"
				:width="imageStore.getLayoutAttribute().imageWidth + 10"
				:height="imageStore.getLayoutAttribute().imageHeight + 10"
			/>
			<img
				class="active_image"
				alt="加载失败"
				ref="imageRef"
				v-if="loadingState !== 'error'"
				:src="currentImageData?.path"
				:class="{ loading: loadingState === 'loading' }"
				:width="imageStore.getLayoutAttribute().imageWidth"
				:height="imageStore.getLayoutAttribute().imageHeight"
				@click="handleClickImage"
				@mouseenter="handleMouseEnter"
				@mouseleave="handleMouseLeave"
				@load="handleLoad"
				@error="handleError"
			/>
			<div class="loading_container" v-if="loadingState === 'loading'">
				<ImageLoading />
				<ProgressLoading />
				加载中
			</div>
			<div class="error_container" v-if="loadingState === 'error'">
				<span class="icon">&#xe7f3;</span>
				加载失败
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.image_viewbox {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #000000;
	pointer-events: none;
	opacity: 0;

	.viewbox_container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		.image_shadow {
			position: absolute;
			border-radius: 1rem;
			filter: blur(20px);
		}

		.active_image {
			position: absolute;
			cursor: pointer;

			&.loading {
				display: none;
			}
		}

		.loading_container {
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20px;
			color: #0071e2;
		}

		.error_container {
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #ff0000;
			font-family: "方正基础像素体";

			.icon {
				font-size: 3rem;
			}
		}
	}
}
</style>
