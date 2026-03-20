import type { MusicInfo } from "~/types/store";

/**
 * 获取所有音频文件列表
 *
 * 该函数返回 public/sounds/musics 目录下所有音频文件的信息列表。
 * 支持的音频格式：mp3, ogg, wav。
 *
 * @returns {MusicInfo[]} 包含所有音频文件信息的数组
 */
export function getAllMusics(): MusicInfo[] {
	return [
		{
			name: "散落的烛光 ～ Candlelight",
			path: "/sounds/musics/01.mp3",
		},
		{
			name: "黑暗少女 ～ Dark girl",
			path: "/sounds/musics/02.mp3",
		},
		{
			name: "Traveler at Sunset",
			path: "/sounds/musics/03.ogg",
		},
	];
}
