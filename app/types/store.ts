import type { BlogCollections, MusicPlayingMode } from "./config";
import type { BlogMaskInstance, BlogMenuInstance, LoadingInstance } from "./components";

export type BlogContent = string;

export type BlogState = {
	activeBlogCollection: Ref<BlogCollections>;
	activeBlogContent: Ref<BlogContent>;
	maskInstance: Ref<BlogMaskInstance | null>;
	menuInstance: Ref<BlogMenuInstance | null>;
};

export type BlogGetter = {
	activePath: ComputedRef<string>;
};

export type BlogActions = {
	setActiveBlogCollection: (newCollection: BlogCollections) => void;
	setActiveBlogContent: (newContent: BlogContent) => void;
	useBlogContent: () => Ref<any>;
	setBlogInstance: (mask: BlogMaskInstance | null, menu: BlogMenuInstance | null) => void;
	changeBlogMenuState: () => void;
};

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

export type ImageState = {
	allImageDatas: Ref<ImageData[]>;
	activeImageData: Ref<ImageData | null>;
};

export type ImageGetter = {};

export type ImageActions = {
	getLayoutAttribute: () => ImageLayoutState;
};

export type LoadingState = {
	loadingRef: Ref<LoadingInstance | null>;
	isLoading: Ref<boolean>;
};

export type LoadingGetter = {};

export type LoadingActions = {
	initLoadingRef: (loading: LoadingInstance) => void;
	setIsLoading: (state: boolean) => void;
	loadingIn: (next: () => void) => void;
	loadingOut: () => void;
	loadingNavigate: (target: string) => void;
};

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

export type SoundState = {
	effectsVolume: Ref<number>;
	musicAudio: Ref<HTMLAudioElement | null>;
	musicCurrent: Ref<MusicInfo | null>;
	musicCurrentTime: Ref<number>;
	musicListCurrent: Ref<MusicInfo[]>;
	musicListNameCurrent: Ref<string | null>;
	musicPlayingMode: Ref<MusicPlayingMode>;
	musicVolume: Ref<number>;
	playingMusic: Ref<boolean>;
	seekTime: Ref<number>;
	musicCardVisible: Ref<boolean>;
};

export type SoundGetter = {};

export type SoundActions = {
	setEffectsVolume: (volume: number) => void;
	setMusicVolume: (volume: number) => void;
	setMusicCurrentTime: (time: number) => void;
	setSeekTime: (time: number) => void;
	setMusicCardVisible: (visible: boolean) => void;
	initAudio: (music: MusicInfo) => void;
	play: (music: MusicInfo) => void;
	pause: () => void;
	toggle: () => void;
	previous: () => void;
	next: () => void;
	seek: (time: number) => void;
	nextPlayingMode: () => void;
};
