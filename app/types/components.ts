import type { Body } from "matter-js";
import type { BlogCollections } from "./config";
import type { BlogContent, MusicInfo } from "./common";

export interface Arrow1Params {
	direction: "left" | "right" | "up" | "down" | null;
}

export interface ButtonParams {
	text: string;
	icon?: any;
	size: "small" | "medium" | "large";
	onClick: () => void;
	style?: Record<string, string | number>;
}

export interface FaultTextParams {
	text: string;
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

export interface DetailIntroduceSkillContainerInstance {
	resume: () => void;
	pause: () => void;
}

export interface DetailIntroduceSkillItemParams extends ItemParams {
	skill: string;
}

export interface DetailWorkFloatInstance {
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
