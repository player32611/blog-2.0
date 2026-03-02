import { useSoundStore } from "@/stores/soundStore";
import { ref } from "vue";

export const useSoundEffect = (audioSrc: string) => {
	let isPlaying = ref(false);
	let isInitialized = ref(false);
	const audioRef = ref<HTMLAudioElement | null>(null);
	const { effectsVolume, setEffectsVolume } = useSoundStore();

	onMounted(() => {
		audioRef.value = new Audio(audioSrc);
		audioRef.value.volume = effectsVolume;
	});

	// watch(audioSrc, (newAudioSrc: any) => {
	// 	audioRef.value = new Audio(newAudioSrc);
	// 	try {
	// 		audioRef.value.load();
	// 		isInitialized.value = true;
	// 	} catch (error) {
	// 		console.warn("音频初始化失败:", error);
	// 	}
	// });

	// watch(effectsVolume, (newEffectsVolume: any) => {
	// 	if (audioRef.value) audioRef.value.volume = newEffectsVolume;
	// });

	const play = () => {
		if (!audioRef.value || !isInitialized) return;
		audioRef.value.currentTime = 0;
		audioRef.value
			.play()
			.then(() => {
				isPlaying.value = true;
				audioRef.value?.addEventListener(
					"ended",
					() => {
						isPlaying.value = false;
					},
					{ once: true },
				);
			})
			.catch(error => {
				console.error("播放音效失败:", error);
			});
	};

	return {
		isPlaying,
		play,
		effectsVolume,
		setEffectsVolume,
	};
};
