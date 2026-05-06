<script setup lang="ts">
import gsap from "gsap";

const imageStore = useImageStore();
const viewboxRef = ref<HTMLDivElement | null>(null);
const animationRef = ref<GSAPAnimation | null>(null);
const isShowingBox = ref<boolean>(false);

const handleAnimShow = () => {
	if (!imageStore.activeImageData) return;
	if (animationRef.value) animationRef.value.totalProgress(1).kill();
	animationRef.value = gsap.to(viewboxRef.value, {
		backgroundColor: "#000000af",
		opacity: 1,
		duration: 0.3,
		onStart: () => {
			isShowingBox.value = true;
			gsap.set(viewboxRef.value, { pointerEvents: "all" });
		},
	});
};

const handleAnimHide = () => {
	if (!imageStore.activeImageData || !isShowingBox) return;
	if (animationRef.value) animationRef.value.totalProgress(1).kill();
	animationRef.value = gsap.to(viewboxRef.value, {
		backgroundColor: "#00000000",
		opacity: 0,
		duration: 0.3,
		onStart: () => {
			gsap.set(viewboxRef.value, { pointerEvents: "none" });
		},
		onComplete: () => {
			isShowingBox.value = false;
			imageStore.setActiveImage(null);
		},
	});
};

const handleClickOutside = throttle(() => {
	handleAnimHide();
}, 1000);

const handleClickImage = (event: MouseEvent) => {
	event.stopPropagation();
};

watch(
	() => imageStore.activeImageData,
	newData => {
		if (newData) {
			handleAnimShow();
		}
	},
);
</script>

<template>
	<div class="image_viewbox" ref="viewboxRef">
		<div class="viewbox_container" v-if="isShowingBox" @click="handleClickOutside">
			<img
				class="image_shadow"
				:src="imageStore.activeImageData?.path"
				alt="加载失败"
				:width="imageStore.getLayoutAttribute().imageWidth * 1.1"
				:height="imageStore.getLayoutAttribute().imageHeight * 1.1"
			/>
			<img
				class="active_image"
				alt="加载失败"
				ref="imageRef"
				@click="handleClickImage"
				:src="imageStore.activeImageData?.path"
				:width="imageStore.getLayoutAttribute().imageWidth"
				:height="imageStore.getLayoutAttribute().imageHeight"
			/>
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
			filter: blur(4rem);
		}

		.active_image {
			position: absolute;
			cursor: pointer;
		}
	}
}
</style>
