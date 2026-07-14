import type { Body } from "matter-js";
import type { BlogCollectionItems, BlogCollections, PageType } from "./config";
import type { MusicInfo } from "./common";

export interface Arrow1Params {
	direction: "left" | "right" | "up" | "down" | null;
}

export interface ButtonParams {
	text: string;
	icon?: any;
	size: "small" | "medium" | "large";
	onClick: () => void;
	classList?: string;
	style?: Record<string, string | number>;
	iconStyle?: Record<string, string | number>;
}

export interface FaultTextParams {
	text: string;
	style?: Record<string, string | number>;
}

export interface VialParams {
	color: string;
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
	contentPath: string;
	contentTitle?: string;
}

export interface BlogNavigationParams {
	page: BlogCollectionItems | null;
}

export interface BlogNavigationInstance {
	handleScroll: () => void;
}

export interface DetailBottomMoreInstance {
	triggerAnim: () => void;
}

export interface DetailIntroduceSkillContainerInstance {
	resume: () => void;
	pause: () => void;
}

export interface DetailIntroduceSkillItemParams extends ItemParams {
	skill: string;
}

export interface DetailWorkBlogCardParams {
	title: PageType;
	subtitle: string;
	icon: string;
	content: string;
	image: string;
}

export interface DetailWorkFloatContainerParams {
	activeIndex: number;
}

export interface DetailWorkFloatContainerInstance {
	startFloating: () => void;
	stopFloating: () => void;
}

export interface DetailWorkTransitionInstance {
	transitionAnim: (inOptions?: gsap.TweenVars, outOptions?: gsap.TweenVars) => void;
}

export interface DetailPartitionParams {
	text: string;
	direction: "left" | "right";
}

export interface DetailMaskInstance {
	maskIn: (options?: gsap.TweenVars) => void;
	maskOut: (options?: gsap.TweenVars) => void;
}

export interface ItemParams {
	x: number;
	y: number;
	angle: number;
	visible?: boolean;
}

export interface ItemInstance {
	createItem: (x: number, y: number, angle: number) => Body | null;
}

export interface ItemGuideContentParams {
	title?: string;
	content?: string;
}

export interface MainColorVialParams extends ItemParams {
	color: string;
}

export interface MusicFolderParams {
	name: string;
}

export interface MusicItemParams {
	info: MusicInfo;
}

export interface LoadingParams {
	checkLoading?: () => void;
}

export interface LoadingInstance {
	loadingIn: (next: () => void) => void;
	loadingOut: () => void;
}
