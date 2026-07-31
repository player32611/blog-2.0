import type { BlogCollections } from "~/types/config";
import type { ImageInfo, MainLinkConfig, MusicInfo } from "~/types/common";
import type { DetailWorkBlogCardParams } from "~/types/components";

export const BLOG_COLLECTIONS: BlogCollections[] = [
	"front_end",
	"back_end",
	"gms2",
	"algorithm",
	"deep_learning",
];

export const DETAIL_NAME = "一颗没梦想的苹果";

export const DETAIL_JOB = "还是学生";

export const DETAIL_HOBBY = "大概是 coding...";

export const DETAIL_STATE = "摸鱼中...";

export const DETAIL_SKILLS = [
	"html",
	"css",
	"javascript",
	"ts",
	"vue",
	"java",
	"c++",
	"gml",
	"jsx",
];

export const DETAIL_TARGET = "致力于动画，交互与视觉体验";

export const DETAIL_EMPTY = "一般你看不到的";

export const DETAIL_WORK_BLOG_DATA: DetailWorkBlogCardParams[] = [
	{
		title: "image",
		subtitle: "图集",
		icon: "&#xe997;",
		content: "保留美丽的部分",
		previewImage: "/images/components/imagePreview.png",
		backgroundImage: "/images/components/imagePreview.png",
	},
	{
		title: "item",
		subtitle: "沙盒",
		icon: "&#xe994;",
		content: "尝试实现新鲜想法",
		previewImage: "/images/components/itemPreview.png",
		backgroundImage: "/images/components/itemBackground.png",
	},
	{
		title: "music",
		subtitle: "音乐",
		icon: "&#xe99a;",
		content: "静静欣赏音乐",
		previewImage: "/images/components/musicPreview.png",
		backgroundImage: "/images/components/musicPreview.png",
	},
	{
		title: "blog",
		subtitle: "笔记",
		icon: "&#xe99c;",
		content: "记录一些必要信息",
		previewImage: "/images/components/blogPreview.png",
		backgroundImage: "/images/components/blogBackground.png",
	},
	{
		title: "main",
		subtitle: "主页",
		icon: "&#xe7e8;",
		content: "从这里开始探索",
		previewImage: "/images/components/mainPreview.png",
		backgroundImage: "/images/components/mainPreview.png",
	},
];
export const LOADING_TIPS: string[] = ["这里没有提示", "主页里有些隐蔽的链接"];

export const IMAGE_DATAS: ImageInfo[] = [
	{
		name: "铃仙（undertale 特供版）",
		author: "一颗没梦想的苹果",
		path: "/images/collections/c629be96-7085-4bcf-950f-dffc6dd36aaf.png",
		option: {
			pixel: true,
			themeColor: "#ffffff",
			border: true,
		},
	},
	{
		name: "",
		author: "",
		path: "/images/collections/140786992_p0.jpg",
	},
	{
		name: "UJ!LB“Bullet Train - Death Station”",
		author: "BiBimusim2",
		path: "/images/collections/IMG_1324.png",
		link: "https://www.bilibili.com/video/BV1QDKB65EZK?spm_id_from=333.788.recommend_more_video.1&trackid=web_related_0.router-related-2479604-d9wfs.1785476852511.207&vd_source=3dbf6d9842ae113ffd236f9c65349d24",
		option: {
			themeColor: "#ffffff",
			border: true,
		},
	},
	{
		name: "UJ!“Insanity Duo”",
		author: "BiBimusim2",
		path: "/images/collections/IMG_1326.webp",
		link: "https://www.bilibili.com/video/BV1QDKB65EZK?spm_id_from=333.788.recommend_more_video.1&trackid=web_related_0.router-related-2479604-d9wfs.1785476852511.207&vd_source=3dbf6d9842ae113ffd236f9c65349d24",
		option: {
			themeColor: "#800080",
			border: true,
		},
	},
	{
		name: "[K.V.M - Unjustice] Phase 2",
		author: "BiBimusim2",
		path: "/images/collections/IMG_1323.webp",
		link: "https://www.bilibili.com/video/BV1QDKB65EZK?spm_id_from=333.788.recommend_more_video.1&trackid=web_related_0.router-related-2479604-d9wfs.1785476852511.207&vd_source=3dbf6d9842ae113ffd236f9c65349d24",
		option: {
			themeColor: "#ffffff",
			border: true,
		},
	},
	{
		name: "MB!TouhouTale",
		author: "タングステン",
		path: "/images/collections/illust_130516251_20250522_000220.jpg",
		link: "https://www.pixiv.net/artworks/130516251",
		option: {
			themeColor: "#ffff00",
			border: true,
		},
	},
	{
		name: "ハルトマンの妖怪少女",
		author: "syuri22",
		path: "/images/collections/135953151_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/135953151",
	},
	{
		name: "ナイトメアサンズ",
		author: "ゲストコ@マシュマロ募集",
		path: "/images/collections/143126606_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/143126606",
	},
	{
		name: "てなちと会って1年なう！",
		author: "マトリ💎つくね",
		path: "/images/collections/146892453_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/146892453",
	},
	{
		name: "freedom leitmotif",
		author: "ミロ",
		path: "/images/collections/146859889_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/146859889",
	},
	{
		name: "ターコかわいい💙",
		author: "いろせ氏",
		path: "/images/collections/146796662_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/146796662",
	},
	{
		name: "フラウリィ",
		author: "うゆは",
		path: "/images/collections/147351302_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/147351302",
	},
	{
		name: "吃了没，没吃吃我一炮",
		author: "KOML",
		path: "/images/collections/145165590_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/145165590",
	},
	{
		name: "少女",
		author: "くれ〜ぷ",
		path: "/images/collections/88078117_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/88078117",
	},
	{
		name: "Collapse",
		author: "이로다_Yiroda",
		path: "/images/collections/145842324_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/145842324",
	},
	{
		name: "dust horror🧣❤️🪓",
		author: "阿娇",
		path: "/images/collections/143665655_p0_master1200.jpg",
		link: "https://www.pixiv.net/artworks/143665655",
	},
];

export const IMAGE_EMPTY = "未知";

export const LONG_PRESS_TIME = 500;

export const MAIN_NAME = "FRISK";

export const MAIN_LV = 19;

export const MAIN_HP = 92;

export const MAIN_LINKS: MainLinkConfig[] = [
	{
		pos: { x: 720, y: 760 },
		size: { width: 50, height: 90 },
		themeColor: "#ffd500",
		content: "前端基础入门",
		target: "/blogs/html",
	},
	{
		pos: { x: 1810, y: 860 },
		size: { width: 40, height: 90 },
		themeColor: "#00a300",
		content: "后端进阶框架",
		target: "/blogs/springboot",
	},
	{
		pos: { x: 150, y: 280 },
		size: { width: 50, height: 90 },
		themeColor: "#000dff",
		content: "算法练习题",
		target: "/blogs/algorithm_consolidation",
	},
	{
		pos: { x: 1700, y: 400 },
		size: { width: 40, height: 80 },
		themeColor: "#d829ff",
		content: "GML 函数参考",
		target: "/blogs/common_functions",
	},
];

export const MAIN_EMPTY = "暂无信息";

export const MUSIC_DATAS: MusicInfo[] = [
	{
		name: "sans.",
		cover: "/images/cover/AlbumArtwork.png",
		artist: "Toby Fox",
		path: "/sounds/musics/UNDERTALE Soundtrack/toby fox - UNDERTALE Soundtrack - 15 sans..mp3",
		folder: "UNDERTALE Soundtrack",
	},
];
