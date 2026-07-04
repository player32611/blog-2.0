import type { MusicInfo } from "~/types/common";

/**
 * 获取所有音乐文件夹列表
 *
 * 该函数从音频数据中自动提取所有唯一的音乐文件夹名称数组。
 * 这些文件夹对应于不同专辑或音乐分类。
 *
 * @returns {string[]} 包含所有音乐文件夹名称的字符串数组
 */
export function getAllFolder(): string[] {
	return [...new Set(MUSIC_DATAS.map(music => music.folder))];
}

/**
 * 根据文件夹名称获取音频文件列表
 *
 * 该函数从预定义的音频数据中筛选出指定文件夹下的所有音频文件。
 *
 * @param folder - 要筛选的文件夹名称
 * @returns {MusicInfo[]} 包含指定文件夹下所有音频文件信息的数组
 */
export function getMusicsByFolder(folder: string): MusicInfo[] {
	return MUSIC_DATAS.filter(music => music.folder === folder);
}
