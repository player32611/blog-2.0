import type { MusicInfo } from "../types/store";

/**
 * 音乐播放 Composable
 *
 * 提供音乐播放器的核心功能，包括播放、暂停、切换音乐等
 */
export const useSoundMusic = () => {
	const soundStore = useSoundStore();
	const musicCurrentRef = computed(() => soundStore.musicCurrent);
	const isPlaying = computed(() => soundStore.isPlaying);

	const musicListRef = ref<MusicInfo[]>([]);
	const musicListCurrentRef = ref<MusicInfo[] | null>(null);
	const audio = ref<HTMLAudioElement | null>(null);
	// 初始化音频对象
	const initAudio = (path: string) => {
		if (!audio.value) {
			audio.value = new Audio(path);
			audio.value.volume = soundStore.musicVolume;
		} else if (extractPathPart(audio.value.src) !== path) {
			audio.value.src = path;
			audio.value.load();
		}
	};

	// 播放音乐
	const play = async (musicPath: MusicInfo) => {
		initAudio(musicPath.path);

		if (audio.value) {
			if (soundStore.musicCurrent !== musicPath) {
				soundStore.setMusicCurrent(musicPath);
			}
			audio.value.play();
			soundStore.setIsPlaying(true);
		}
	};

	// 暂停音乐
	const pause = () => {
		if (audio.value) {
			audio.value.pause();
			soundStore.setIsPlaying(false);
		}
	};

	// 切换播放/暂停
	const toggle = () => {
		if (!soundStore.musicCurrent) return;
		if (soundStore.isPlaying) {
			pause();
		} else {
			play(soundStore.musicCurrent);
		}
	};

	// 上一首
	const previous = () => {
		soundStore.previousMusic();
		if (soundStore.musicCurrent) {
			initAudio(soundStore.musicCurrent.path);
			if (isPlaying.value) audio.value?.play();
		}
	};

	// 下一首
	const next = () => {
		soundStore.nextMusic();
		if (soundStore.musicCurrent) {
			initAudio(soundStore.musicCurrent.path);
			if (isPlaying.value) audio.value?.play();
		}
	};

	// 设置音量
	const setVolume = (volume: number) => {
		soundStore.setMusicVolume(volume);
		if (audio.value) {
			audio.value.volume = volume;
		}
	};

	onMounted(() => {
		// 获取所有音乐文件
		musicListRef.value = getAllMusics();
		// 设置音乐列表到 store
		soundStore.setMusicList(musicListRef.value);
		musicListCurrentRef.value = musicListRef.value;
		// 如果没有当前音乐，设置为第一首
		if (!soundStore.musicCurrent && musicListRef.value.length > 0) {
			soundStore.setMusicCurrent(musicListRef.value[0]!);
		}
	});

	// 组件卸载时清理音频资源
	onUnmounted(() => {
		if (audio.value) {
			audio.value.pause();
			audio.value = null;
		}
	});

	return {
		musicCurrentRef,
		musicListCurrentRef,
		isPlaying,
		play,
		pause,
		toggle,
		previous,
		next,
		setVolume,
	};
};
