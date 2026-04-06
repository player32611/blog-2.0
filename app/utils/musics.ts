import type { MusicInfo } from "~/types/store";

const folderData: string[] = ["東方幕華祭 红月篇 OST", "東方幕華祭 春雪篇 OST"];

const musicsData: MusicInfo[] = [
	{
		name: "散落的烛光　～ Candlelight",
		path: "sounds/musics/東方幕華祭 红月篇 OST/01 散落的烛光　～ Candlelight.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "黑暗少女　～ Dark girl",
		path: "sounds/musics/東方幕華祭 红月篇 OST/02 黑暗少女　～ Dark girl.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "湖面的冰之曲　～ The rhythm of ice",
		path: "sounds/musics/東方幕華祭 红月篇 OST/03 湖面的冰之曲　～ The rhythm of ice.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "妖精背水一战　～ A dare",
		path: "sounds/musics/東方幕華祭 红月篇 OST/04 妖精背水一战　～ A dare.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "东方梦之馆　～ East castle",
		path: "sounds/musics/東方幕華祭 红月篇 OST/05 东方梦之馆　～ East castle.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "风卷残云　～ Kongfu storm",
		path: "sounds/musics/東方幕華祭 红月篇 OST/06 风卷残云　～ Kongfu storm.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "沉睡中的大图书馆　～ The library in silence",
		path: "sounds/musics/東方幕華祭 红月篇 OST/07 沉睡中的大图书馆　～ The library in silence.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "华丽的恶魔之舞　～ The little devil dance",
		path: "sounds/musics/東方幕華祭 红月篇 OST/08 华丽的恶魔之舞　～ The little devil dance.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "时钟走廊　～ Flowing time",
		path: "sounds/musics/東方幕華祭 红月篇 OST/09 时钟走廊　～ Flowing time.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "钟楼战场　～ Bell tower",
		path: "sounds/musics/東方幕華祭 红月篇 OST/10 钟楼战场　～ Bell tower.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "绯月之主　～ The master of red moon",
		path: "sounds/musics/東方幕華祭 红月篇 OST/11 绯月之主　～ The master of red moon.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "无尽的命运　～ Endless fate",
		path: "sounds/musics/東方幕華祭 红月篇 OST/12 无尽的命运　～ Endless fate.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "幕华祭　～红月篇～",
		path: "sounds/musics/東方幕華祭 红月篇 OST/13 幕华祭　～红月篇～.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "百年少女怪谈　～ The mystery",
		path: "sounds/musics/東方幕華祭 红月篇 OST/14 百年少女怪谈　～ The mystery.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "淋满鲜血的还有谁呢　～ Who cares",
		path: "sounds/musics/東方幕華祭 红月篇 OST/15 淋满鲜血的还有谁呢　～ Who cares.mp3",
		folder: "東方幕華祭 红月篇 OST",
	},
	{
		name: "常世之乡",
		path: "sounds/musics/東方幕華祭 春雪篇 OST/01.mp3",
		folder: "東方幕華祭 春雪篇 OST",
	},
	{
		name: "无穷无尽的白色",
		path: "sounds/musics/東方幕華祭 春雪篇 OST/02.mp3",
		folder: "東方幕華祭 春雪篇 OST",
	},
];

/**
 * 获取所有音频文件列表
 *
 * 该函数返回 public/sounds/musics 目录下所有音频文件的信息列表。
 * 支持的音频格式：mp3, ogg, wav。
 *
 * @returns {MusicInfo[]} 包含所有音频文件信息的数组
 */
export function getAllMusics(): MusicInfo[] {
	return musicsData;
}
export function getAllFolder(): string[] {
	return folderData;
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
	return musicsData.filter(music => music.folder === folder);
}
