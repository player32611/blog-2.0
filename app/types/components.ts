import type { BlogCollections, BlogContent } from "./store";

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

export interface ImageData {
	img: CanvasImageSource;
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	animation: GSAPAnimation | null;
}

export interface ItemParams {
	x: number;
	y: number;
	angle: number;
}

export interface ButtonParams {
	text: string;
	icon?: any;
	size: "small" | "medium" | "large";
	onClick: () => void;
	style?: Record<string, string | number>;
}

export interface LoadingParams {
	checkLoading?: () => void;
}

export interface LoadingInstance {
	loadingIn: (next: () => void) => void;
	loadingOut: () => void;
}
