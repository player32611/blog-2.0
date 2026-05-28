import type {
	BlogContent,
	ImageHoverData,
	ImageLayoutData,
	ImagePosData,
	MusicInfo,
} from "./common";
import type { BlogCollections, MusicPlayingMode } from "./config";
import type { BlogMaskInstance, BlogMenuInstance, LoadingInstance } from "./components";

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

export type ImageState = {
	allImagePosData: Ref<ImagePosData[]>;
	activeImageData: Ref<ImagePosData | null>;
	hoverImageData: Ref<ImageHoverData | null>;
};

export type ImageGetter = {};

export type ImageActions = {
	getLayoutAttribute: () => ImageLayoutData;
	setAllImagePosData: (data: ImagePosData[]) => void;
	setActiveImage: (data: ImagePosData | null) => void;
	setHoverImage: (data: ImageHoverData | null) => void;
};

export type ItemState = {
	showingCommandBar: Ref<boolean>;
	showingGuide: Ref<boolean>;
	currentCommand: Ref<string>;
};

export type ItemGetter = {};

export type ItemActions = {
	toggleShowingCommandBar: () => void;
	toggleShowingGuide: () => void;
	setCurrentCommand: (command: string) => void;
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

export type MainState = {
	isDragging: Ref<boolean>;
};

export type MainGetter = {};

export type MainActions = {
	setIsDragging: (state: boolean) => void;
};

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
