import { defineStore } from "pinia";
import type { MusicInfo } from "@/types/store";
import type { SoundState, SoundGetter, SoundActions } from "@/types/store";

export const useSoundStore = defineStore("sound", (): SoundState & SoundGetter & SoundActions => {
	// 状态
	const effectsVolume = ref<number>(0.7);
	const musicVolume = ref<number>(0.7);
	const musicCurrent = ref<MusicInfo | null>(null);
	const musicList = ref<MusicInfo[]>([]);
	const isPlaying = ref<boolean>(false);

	// 设置方法
	function setEffectsVolume(volume: number) {
		effectsVolume.value = Math.max(0, Math.min(1, volume));
	}

	function setMusicVolume(volume: number) {
		musicVolume.value = Math.max(0, Math.min(1, volume));
	}

	function setMusicCurrent(music: MusicInfo) {
		musicCurrent.value = music;
	}

	function setMusicList(list: MusicInfo[]) {
		musicList.value = list;
	}

	function setIsPlaying(playing: boolean) {
		isPlaying.value = playing;
	}

	function previousMusic() {
		if (musicList.value.length === 0) return;

		const index = musicList.value.indexOf(musicCurrent.value!);
		if (index === -1 && musicList.value.length > 0) {
			musicCurrent.value = musicList.value[0]!;
		} else {
			musicCurrent.value =
				musicList.value[(index - 1 + musicList.value.length) % musicList.value.length]!;
		}
	}

	function nextMusic() {
		if (musicList.value.length === 0) return;

		const index = musicList.value.indexOf(musicCurrent.value!);
		if (index === -1) {
			musicCurrent.value = musicList.value[0]!;
		} else {
			musicCurrent.value = musicList.value[(index + 1) % musicList.value.length]!;
		}
	}

	return {
		// 状态
		effectsVolume,
		musicVolume,
		musicCurrent,
		musicList,
		isPlaying,

		// 方法
		setEffectsVolume,
		setMusicVolume,
		setMusicCurrent,
		setMusicList,
		setIsPlaying,
		previousMusic,
		nextMusic,
	};
});
