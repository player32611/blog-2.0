// import type { MusicInfo } from "../types/store";

// /**
//  * 音乐播放 Composable
//  *
//  * 提供音乐播放器的核心功能，包括播放、暂停、切换音乐等
//  */
// export const useSoundMusic = () => {
// 	const soundStore = useSoundStore();
// 	const musicAudioRef = computed(() => soundStore.musicAudio);
// 	const musicCurrentRef = computed(() => soundStore.musicCurrent);
// 	const playingMusic = computed(() => soundStore.isPlaying);

// 	const musicListRef = ref<MusicInfo[]>([]);
// 	const musicListCurrentRef = ref<MusicInfo[] | null>(null);
// 	// 初始化音频对象
// 	const initAudio = (path: string) => {
// 		console.log("initAudio", path);
// 		if (musicAudioRef.value) console.log("initAudio", extractPathPart(musicAudioRef.value.src));
// 		if (!musicAudioRef.value) {
// 			soundStore.setMusicAudio(new Audio(path));
// 			soundStore.setMusicVolume(soundStore.musicVolume);
// 		} else if (extractPathPart(musicAudioRef.value.src) !== path) {
// 			soundStore.setMusicAudioSrc(path);
// 			musicAudioRef.value.load();
// 		}
// 	};

// 	// 播放音乐
// 	const play = async (musicPath: MusicInfo) => {
// 		initAudio(musicPath.path);

// 		if (musicAudioRef.value) {
// 			if (soundStore.musicCurrent !== musicPath) {
// 				soundStore.setMusicCurrent(musicPath);
// 			}
// 			musicAudioRef.value.play();
// 			soundStore.setIsPlaying(true);
// 		}
// 	};

// 	// 暂停音乐
// 	const pause = () => {
// 		if (musicAudioRef.value) {
// 			musicAudioRef.value.pause();
// 			soundStore.setIsPlaying(false);
// 		}
// 	};

// 	// 切换播放/暂停
// 	const toggle = () => {
// 		if (!soundStore.musicCurrent) return;
// 		if (soundStore.isPlaying) {
// 			pause();
// 		} else {
// 			play(soundStore.musicCurrent);
// 		}
// 	};

// 	// 上一首
// 	const previous = () => {
// 		soundStore.previousMusic();
// 		if (soundStore.musicCurrent) {
// 			initAudio(soundStore.musicCurrent.path);
// 			if (isPlaying.value) musicAudioRef.value?.play();
// 		}
// 	};

// 	// 下一首
// 	const next = () => {
// 		soundStore.nextMusic();
// 		if (soundStore.musicCurrent) {
// 			initAudio(soundStore.musicCurrent.path);
// 			if (isPlaying.value) musicAudioRef.value?.play();
// 		}
// 	};

// 	// 设置音量
// 	const setVolume = (volume: number) => {
// 		soundStore.setMusicVolume(volume);
// 		if (musicAudioRef.value) {
// 			musicAudioRef.value.volume = volume;
// 		}
// 	};

// 	onMounted(() => {
// 		// 获取所有音乐文件
// 		musicListRef.value = getAllMusics();
// 		// 设置音乐列表到 store
// 		soundStore.setMusicList(musicListRef.value);
// 		musicListCurrentRef.value = musicListRef.value;
// 		// 如果没有当前音乐，设置为第一首
// 		if (!soundStore.musicCurrent && musicListRef.value.length > 0) {
// 			soundStore.setMusicCurrent(musicListRef.value[0]!);
// 		}
// 	});

// 	// 组件卸载时清理音频资源
// 	onUnmounted(() => {
// 		if (musicAudioRef.value) {
// 			musicAudioRef.value.pause();
// 			soundStore.setMusicAudio(null);
// 		}
// 	});

// 	return {
// 		musicCurrentRef,
// 		musicListCurrentRef,
// 		isPlaying,
// 		play,
// 		pause,
// 		toggle,
// 		previous,
// 		next,
// 		setVolume,
// 	};
// };
