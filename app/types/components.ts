import type { BlogCollections } from "./config";
import type { BlogContent, MusicInfo } from "./store";

export interface Arrow1Params {
	direction: "left" | "right" | "up" | "down" | null;
}

export interface BlogMaskInstance {
	changeMask: () => void;
}

export interface BlogMenuInstance {
	changeMenu: () => void;
}

export interface BlogMenuSelecterParams {
	collections: BlogCollections;
}

export interface BlogMenuSelectionParams {
	collections: BlogCollections;
	contentPath: BlogContent;
	contentTitle?: string;
}

export interface BlogNavigationParams {
	page: globalThis.Ref<any, any>;
}

export interface ImagePosData {
	img: CanvasImageSource | null;
	path: string;
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	animation: GSAPAnimation | null;
}

export interface ImageViewboxInstance {
	setImageData: (data: ImageData | null) => void;
}

export interface ItemParams {
	x: number;
	y: number;
	angle: number;
}

export interface MusicFolderParams {
	name: string;
}

export interface MusicItemParams {
	info: MusicInfo;
}

export interface ButtonParams {
	text: string;
	icon?: any;
	size: "small" | "medium" | "large";
	onClick: () => void;
	style?: Record<string, string | number>;
}

export interface TooltipInstance {
	width: ComputedRef<number>;
	height: ComputedRef<number>;
}

export interface TooltipParams {
	style?: Record<string, string | number>;
	text?: string;
	visable: boolean;
	onClick?: () => void;
}

export interface LoadingParams {
	checkLoading?: () => void;
}

export interface LoadingInstance {
	loadingIn: (next: () => void) => void;
	loadingOut: () => void;
}
