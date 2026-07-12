/**
 * 创建并管理音效播放的组合式函数
 *
 * 该函数提供了一个可重用的音效播放器，支持播放控制、音量调节和播放状态跟踪。
 * 使用 HTML5 Audio API 实现音效播放功能，并与全局音效音量设置集成。
 *
 * @param audioSrc - 音频文件的源路径（URL 或本地路径）
 * @returns 包含以下属性的对象：
 *   - isPlaying: Ref<boolean> - 表示当前是否正在播放音效
 *   - play: () => void - 播放音效的方法
 *   - effectsVolume: Ref<number> - 当前音效音量值（0-1）
 *   - setEffectsVolume: (volume: number) => void - 设置音效音量的方法
 */
export const useSoundEffect = (audioSrc: string) => {
	const { effectsVolume, setEffectsVolume } = useSoundStore();
	const isPlaying = ref<boolean>(false);
	const isInitialized = ref<boolean>(false);
	const audioRef = ref<HTMLAudioElement | null>(null);

	onMounted(() => {
		audioRef.value = new Audio(audioSrc);
		audioRef.value.volume = effectsVolume;
	});

	/**
	 * 播放音效
	 *
	 * 该方法负责播放已初始化的音频元素。它首先检查音频元素是否已正确初始化，
	 * 然后将音频时间重置到开始位置并尝试播放。播放成功后会更新播放状态并添加
	 * 一次性结束事件监听器来跟踪播放完成状态。
	 *
	 * 执行流程：
	 * 1. 验证音频引用和初始化状态，如任一条件不满足则直接返回
	 * 2. 重置音频当前时间为 0（确保从头开始播放）
	 * 3. 调用 play() 方法开始播放
	 * 4. 播放成功时：
	 *    - 设置 isPlaying 状态为 true
	 *    - 添加一次性 "ended" 事件监听器，在音频播放结束时将 isPlaying 设为 false
	 * 5. 播放失败时捕获错误并记录到控制台
	 *
	 * @returns {void} 无返回值
	 */
	const play = (): void => {
		if (!audioRef.value || !isInitialized || !effectsVolume) return;
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
