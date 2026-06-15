import type { ImageHoverData, ImageLayoutData, ImagePosData } from "~/types/common";
import type { ImageState, ImageGetter, ImageActions } from "~/types/store";

export const useImageStore = defineStore("image", (): ImageState & ImageGetter & ImageActions => {
	const allImagePosData = ref<ImagePosData[]>([]);
	const activeImageData = ref<ImagePosData | null>(null);
	const hoverImageData = ref<ImageHoverData | null>(null);

	const getLayoutAttribute = (): ImageLayoutData => {
		const rowMax = 4;
		const lineMax = 4;
		let imageWidth = 350;
		let imageHeight = 500;
		let imageMargin = 200;
		const imageBorderRadius = 16;
		const imagePlaceHolderColor = "#ffffff";
		const screenWidth = window.innerWidth;
		// 小屏幕（手机）
		if (screenWidth < 768) {
			const scale = 0.5;
			imageWidth = Math.floor(imageWidth * scale);
			imageHeight = Math.floor(imageHeight * scale);
			imageMargin = Math.floor(imageMargin * scale);
		} else if (screenWidth < 1024) {
			const scale = 0.7;
			imageWidth = Math.floor(imageWidth * scale);
			imageHeight = Math.floor(imageHeight * scale);
			imageMargin = Math.floor(imageMargin * scale);
		}
		// 大屏幕（桌面）
		return {
			rowMax,
			lineMax,
			imageWidth,
			imageHeight,
			imageMargin,
			imageBorderRadius,
			imagePlaceHolderColor,
			totalWidth: imageWidth * rowMax + imageMargin * (rowMax - 1),
			totalHeight: imageHeight * lineMax + imageMargin * (lineMax - 1),
		};
	};

	const setAllImagePosData = (data: ImagePosData[]) => {
		allImagePosData.value = data;
	};
	const setActiveImage = (data: ImagePosData | null) => {
		activeImageData.value = data;
	};

	const setHoverImage = (data: ImageHoverData | null) => {
		hoverImageData.value = data;
	};

	return {
		allImagePosData,
		activeImageData,
		hoverImageData,
		getLayoutAttribute,
		setAllImagePosData,
		setActiveImage,
		setHoverImage,
	};
});
