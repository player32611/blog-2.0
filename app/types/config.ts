import type {
	AlgorithmCollectionItem,
	BackEndCollectionItem,
	DeepLearningCollectionItem,
	FrontEndCollectionItem,
	Gms2CollectionItem,
} from "@nuxt/content";

export type BlogCollections = "front_end" | "back_end" | "gms2" | "algorithm" | "deep_learning";

export type BlogCollectionItems =
	| FrontEndCollectionItem
	| BackEndCollectionItem
	| Gms2CollectionItem
	| AlgorithmCollectionItem
	| DeepLearningCollectionItem;

/**
 * 音乐播放模式类型定义
 * - RepeatSingle: 单曲循环
 * - RepeatAll: 列表循环
 * - RandomAll: 随机播放
 * - OrderAll: 顺序播放
 */
export type MusicPlayingMode = "RepeatSingle" | "RepeatAll" | "RandomAll" | "OrderAll";

export type NetworkLoadingState = "loading" | "success" | "error";

export type PageType = "main" | "blog" | "music" | "item" | "image" | "detail";
