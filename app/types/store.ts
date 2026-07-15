import type { ImageHoverData, ImageLayoutData, ImagePosData, MusicInfo, Point } from "./common";
import type { BlogCollections, BlogCollectionItems, MusicPlayingMode } from "./config";
import type {
	BlogMaskInstance,
	BlogMenuInstance,
	DetailBottomMoreInstance,
	DetailMaskInstance,
	DetailWorkBlogCardParams,
	LoadingInstance,
} from "./components";

export type BlogState = {
	maskInstance: Ref<BlogMaskInstance | null>;
	menuInstance: Ref<BlogMenuInstance | null>;
};

export type BlogGetter = {};

export type BlogActions = {
	useBlogContent: (content: BlogCollections) => Promise<BlogCollectionItems | null>;
	setBlogInstance: (mask: BlogMaskInstance | null, menu: BlogMenuInstance | null) => void;
	changeBlogMenuState: () => void;
};

export type DetailState = {
	workGameCurrentHp: Ref<number>;
	workBlogCurrentCard: Ref<DetailWorkBlogCardParams | null>;
	bottomMoreInstance: Ref<DetailBottomMoreInstance | null>;
	maskInstance: Ref<DetailMaskInstance | null>;
	shaderType: Ref<"none" | "VCR distortion">;
};

export type DetailGetter = {};

export type DetailActions = {
	setWorkGameCurrentHp: (hp: number) => void;
	setWorkBlogCurrentCard: (params: DetailWorkBlogCardParams | null) => void;
	damageWorkGameHp: (damage: number) => void;
	setBottomMoreInstance: (instance: DetailBottomMoreInstance | null) => void;
	setMaskInstance: (mask: DetailMaskInstance | null) => void;
	setShaderType: (type: "none" | "VCR distortion") => void;
};

export type ImageState = {
	allImagePosData: Ref<ImagePosData[]>;
	activeImageData: Ref<ImagePosData | null>;
	hoverImageData: Ref<ImageHoverData | null>;
	currentMountAnim: Ref<GSAPAnimation | null>;
};

export type ImageGetter = {};

export type ImageActions = {
	getLayoutAttribute: () => ImageLayoutData;
	setAllImagePosData: (data: ImagePosData[]) => void;
	setActiveImageData: (data: ImagePosData | null) => void;
	setHoverImageData: (data: ImageHoverData | null) => void;
	setCurrentMountAnim: (anim: GSAPAnimation | null) => void;
};

export type ItemState = {
	backgroundTheme: Ref<"light" | "dark">;
	showingCommandBar: Ref<boolean>;
	showingGuide: Ref<boolean>;
	currentCommand: Ref<string>;
};

export type ItemGetter = {};

export type ItemActions = {
	setBackgroundTheme: (theme: "light" | "dark") => void;
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
	loadingNavigate: (target: string | number) => void;
};

export type MainState = {
	isDragging: Ref<boolean>;
	backgroundTransform: Ref<Point>;
};

export type MainGetter = {};

export type MainActions = {
	setIsDragging: (state: boolean) => void;
	setBackgroundTransform: (transform: Point) => void;
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
