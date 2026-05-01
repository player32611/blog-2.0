import { defineStore } from "pinia";
import type { MusicPlayingMode } from "~/types/config";
import type { MusicInfo } from "@/types/store";
import type { SoundState, SoundGetter, SoundActions } from "@/types/store";

/**
  创建并返回一个用于管理音效与背景音乐状态的 Pinia store。
  该 store 提供了对音效音量、背景音乐播放器实例、当前播放的音乐信息、
  音乐播放列表及其名称、音乐音量以及播放状态的响应式管理能力。
  @returns 包含音效状态（SoundState）、获取器（SoundGetter）和操作方法（SoundActions）的对象 
**/
export const useSoundStore = defineStore("sound", (): SoundState & SoundGetter & SoundActions => {
	const effectsVolume = ref<number>(0.7); // 音效音量
	const musicAudio = ref<HTMLAudioElement | null>(null); // 音乐播放器
	const musicCurrent = ref<MusicInfo | null>(null); // 当前音乐信息
	const musicCurrentTime = ref<number>(0); // 当前音乐播放位置
	const musicListCurrent = ref<MusicInfo[]>([]); // 当前音乐播放列表
	const musicListNameCurrent = ref<string | null>(null); // 当前音乐播放列表名称
	const musicPlayingMode = ref<MusicPlayingMode>("OrderAll");
	const musicVolume = ref<number>(0.7); // 音乐音量
	const playingMusic = ref<boolean>(false); // 音乐播放状态
	const seekTime = ref<number>(5); // 快进快退时间

	/**
    设置音效音量。
    @param volume - 音效音量值，将被限制在 [0, 1] 范围内。0 表示静音，1 表示最大音量。
  **/
	function setEffectsVolume(volume: number) {
		effectsVolume.value = Math.max(0, Math.min(1, volume));
	}

	/**
    设置背景音乐的音量。
    该函数将音量值限制在 [0, 1] 范围内，并同步更新全局音乐音量状态和音频元素的音量（如果存在）。
    @param volume - 目标音量值，预期范围为 0（静音）到 1（最大音量）。超出范围的值将被自动裁剪。 
  **/
	function setMusicVolume(volume: number) {
		musicVolume.value = Math.max(0, Math.min(1, volume));
		if (musicAudio.value) musicAudio.value.volume = volume;
	}

	function setMusicCurrentTime(time: number) {
		if (!musicAudio.value || time < 0 || time > musicAudio.value.duration) return;
		musicAudio.value.currentTime = time;
	}

	function setSeekTime(time: number) {
		seekTime.value = time;
	}

	const handleCanPlay = () => {
		if (playingMusic.value && musicAudio.value) {
			musicAudio.value.play();
		}
	};

	const handleTimeUpdate = () => {
		if (musicAudio.value) {
			musicCurrentTime.value = musicAudio.value.currentTime;
		}
	};

	const handleMusicEnded = () => {
		if (!musicAudio.value) return;
		musicAudio.value.removeEventListener("ended", handleMusicEnded);
		if (musicPlayingMode.value === "RepeatSingle") {
			musicAudio.value.currentTime = 0;
			if (playingMusic.value) musicAudio.value.play();
			else {
				playingMusic.value = false;
			}
		} else if (musicPlayingMode.value === "RepeatAll" || musicPlayingMode.value === "RandomAll") {
			next();
		} else if (musicPlayingMode.value === "OrderAll") {
			const index = musicListCurrent.value.indexOf(musicCurrent.value!);
			if (index === -1 || index === musicListCurrent.value.length - 1) {
				playingMusic.value = false;
			} else {
				next();
			}
		}
	};

	function initAudio(music: MusicInfo) {
		if (!musicAudio.value) {
			musicAudio.value = new Audio(music.path);
			musicAudio.value.volume = musicVolume.value;
			musicAudio.value.addEventListener("canplay", handleCanPlay);
			musicAudio.value.addEventListener("timeupdate", handleTimeUpdate);
			musicAudio.value.addEventListener("ended", handleMusicEnded);
		} else if (extractPathPart(musicAudio.value.src) !== extractPathPart(music.path)) {
			musicAudio.value.pause();
			musicAudio.value.removeEventListener("canplay", handleCanPlay);
			musicAudio.value.removeEventListener("timeupdate", handleTimeUpdate);
			musicAudio.value.removeEventListener("ended", handleMusicEnded);
			musicAudio.value.src = music.path;
			musicAudio.value.load();
			musicAudio.value.addEventListener("canplay", handleCanPlay);
			musicAudio.value.addEventListener("timeupdate", handleTimeUpdate);
			musicAudio.value.addEventListener("ended", handleMusicEnded);
		}

		if (musicListNameCurrent.value !== music.folder) {
			musicListNameCurrent.value = music.folder;
			musicListCurrent.value = getMusicsByFolder(music.folder);
		}
	}

	function play(music: MusicInfo) {
		playingMusic.value = true;
		initAudio(music);

		if (musicAudio.value) {
			if (musicCurrent.value !== music) {
				musicCurrent.value = music;
			}
			musicAudio.value.play();
		}
	}

	function pause() {
		if (musicAudio.value) {
			musicAudio.value.pause();
			playingMusic.value = false;
		}
	}

	function toggle() {
		if (!musicCurrent.value || !musicAudio.value) return;
		if (playingMusic.value) {
			pause();
		} else {
			play(musicCurrent.value);
		}
	}

	function previous() {
		if (musicListCurrent.value.length === 0) return;
		if (!musicCurrent.value) return;
		if (
			musicPlayingMode.value === "RepeatSingle" ||
			musicPlayingMode.value === "RepeatAll" ||
			musicPlayingMode.value === "OrderAll"
		) {
			const index = musicListCurrent.value.indexOf(musicCurrent.value);
			if (index === -1 && musicListCurrent.value.length > 0 && musicListCurrent.value[0]) {
				musicCurrent.value = musicListCurrent.value[0];
			} else {
				musicCurrent.value =
					musicListCurrent.value[
						(index - 1 + musicListCurrent.value.length) % musicListCurrent.value.length
					]!;
			}
		} else if (musicPlayingMode.value === "RandomAll") {
			const index = musicListCurrent.value.indexOf(musicCurrent.value!);
			let nextIndex = Math.floor(Math.random() * musicListCurrent.value.length);
			while (index === nextIndex) {
				nextIndex = Math.floor(Math.random() * musicListCurrent.value.length);
			}
			musicCurrent.value = musicListCurrent.value[nextIndex]!;
		}
		if (musicCurrent.value) {
			initAudio(musicCurrent.value);
			if (playingMusic.value && musicAudio.value) musicAudio.value.play();
		}
	}

	function next() {
		if (musicListCurrent.value.length === 0) return;
		if (!musicCurrent.value) return;
		if (
			musicPlayingMode.value === "RepeatSingle" ||
			musicPlayingMode.value === "RepeatAll" ||
			musicPlayingMode.value === "OrderAll"
		) {
			const index = musicListCurrent.value.indexOf(musicCurrent.value!);
			if (index === -1 && musicListCurrent.value.length > 0 && musicListCurrent.value[0]) {
				musicCurrent.value = musicListCurrent.value[0];
			} else {
				musicCurrent.value = musicListCurrent.value[(index + 1) % musicListCurrent.value.length]!;
			}
		} else if (musicPlayingMode.value === "RandomAll") {
			const index = musicListCurrent.value.indexOf(musicCurrent.value!);
			let nextIndex = Math.floor(Math.random() * musicListCurrent.value.length);
			while (index === nextIndex) {
				nextIndex = Math.floor(Math.random() * musicListCurrent.value.length);
			}
			musicCurrent.value = musicListCurrent.value[nextIndex]!;
		}
		if (musicCurrent.value) {
			initAudio(musicCurrent.value);
			if (playingMusic.value && musicAudio.value) musicAudio.value.play();
		}
	}

	function seek(time: number) {
		if (!musicAudio.value) return;
		const newTime = musicAudio.value.currentTime + time;
		if (newTime < 0) musicAudio.value.currentTime = 0;
		else if (newTime > musicAudio.value.duration)
			musicAudio.value.currentTime = musicAudio.value.duration;
		else musicAudio.value.currentTime = newTime;
	}

	function nextPlayingMode() {
		switch (musicPlayingMode.value) {
			case "OrderAll":
				musicPlayingMode.value = "RepeatSingle";
				break;
			case "RepeatSingle":
				musicPlayingMode.value = "RepeatAll";
				break;
			case "RepeatAll":
				musicPlayingMode.value = "RandomAll";
				break;
			case "RandomAll":
				musicPlayingMode.value = "OrderAll";
		}
		if (musicAudio.value) {
			musicAudio.value.removeEventListener("ended", handleMusicEnded);
			musicAudio.value.addEventListener("ended", handleMusicEnded);
		}
	}

	return {
		effectsVolume,
		musicAudio,
		musicCurrent,
		musicCurrentTime,
		musicListCurrent,
		musicListNameCurrent,
		musicPlayingMode,
		musicVolume,
		playingMusic,
		seekTime,
		setEffectsVolume,
		setMusicVolume,
		setMusicCurrentTime,
		setSeekTime,
		initAudio,
		play,
		pause,
		toggle,
		previous,
		next,
		seek,
		nextPlayingMode,
	};
});
