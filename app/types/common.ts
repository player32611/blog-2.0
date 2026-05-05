export type BlogContent = string;

export type ImageLayoutState = {
	rowMax: number;
	lineMax: number;
	imageWidth: number;
	imageHeight: number;
	imageMargin: number;
	imageBorderRadius: number;
	totalWidth: number;
	totalHeight: number;
};

export interface ImagePosData {
	img: CanvasImageSource | null;
	path: string;
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	animation: GSAPAnimation | null;
}

/**
 * 音乐信息接口，用于描述音乐文件的基本元数据
 */
export interface MusicInfo {
	name: string;
	cover: string;
	artist: string;
	path: string;
	folder: string;
}
