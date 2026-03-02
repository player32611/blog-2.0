import { defineStore } from "pinia";
import type { SoundState, SoundGetter, SoundActions } from "@/types/store";

export const useSoundStore = defineStore("sound", (): SoundState & SoundGetter & SoundActions => {
	const effectsVolume = ref<number>(0.7);
	const musicVolume = ref<number>(0.7);
	function setEffectsVolume(volume: number) {
		effectsVolume.value = Math.max(0, Math.min(1, volume));
	}
	function setMusicVolume(volume: number) {
		musicVolume.value = Math.max(0, Math.min(1, volume));
	}
	return { effectsVolume, musicVolume, setEffectsVolume, setMusicVolume };
});
