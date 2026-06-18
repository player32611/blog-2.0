export type RGBColor = { r: number; g: number; b: number; a?: number };

/**
 * 表示日期时间信息的数据结构类型。
 *
 * @property year - 年份，以数字形式表示（例如：2023）。
 * @property month - 月份，以字符串形式表示（例如："01" 表示一月）。
 * @property day - 日期，以字符串形式表示（例如："05" 表示5号）。
 * @property hour - 小时，以字符串形式表示（24小时制，例如："14" 表示下午2点）。
 * @property minute - 分钟，以字符串形式表示（例如："30"）。
 * @property second - 秒数，以字符串形式表示（例如："45"）。
 */
export type DayTime = {
	year: number;
	month: string;
	day: string;
	hour: string;
	minute: string;
	second: string;
};

/**
 * 博客内容类型，表示博客文章的文本内容
 */
export type BlogContent = string;

/**
 * 图片悬停数据类型
 * 包含图片的尺寸信息和中心点坐标
 */
export type ImageHoverData = {
	width: number;
	height: number;
	center: Point;
};

/**
 * 图像布局状态类型，用于描述图像在画布上的布局参数
 *
 * @property rowMax - 每行最大图像数量
 * @property lineMax - 最大行数
 * @property imageWidth - 单个图像的宽度
 * @property imageHeight - 单个图像的高度
 * @property imageMargin - 图像之间的间距
 * @property imageBorderRadius - 图像的圆角半径
 * @property totalWidth - 整体布局的总宽度
 * @property totalHeight - 整体布局的总高度
 */
export type ImageLayoutData = {
	rowMax: number;
	lineMax: number;
	imageWidth: number;
	imageHeight: number;
	imageMargin: number;
	imageBorderRadius: number;
	imagePlaceHolderColor: string;
	totalWidth: number;
	totalHeight: number;
};

/**
 * 图像位置数据接口，用于描述画布上图像的位置、目标位置及动画信息
 *
 * @property img - Canvas 图像源对象或 null
 * @property path - 图像文件路径
 * @property x - 当前 x 坐标位置
 * @property y - 当前 y 坐标位置
 * @property targetX - 目标 x 坐标位置
 * @property targetY - 目标 y 坐标位置
 * @property animation - GSAP 动画实例或 null
 */
export interface ImagePosData extends Point {
	img: HTMLImageElement | null;
	path: string;
	targetX: number;
	targetY: number;
	animation: GSAPAnimation | null;
}

/**
 * 音乐信息接口，用于描述音乐文件的基本元数据
 *
 * @property name - 音乐名称
 * @property cover - 音乐封面路径
 * @property artist - 音乐作者
 * @property path - 音乐文件路径
 * @property folder - 音乐所属专辑
 */
export interface MusicInfo {
	name: string;
	cover: string;
	artist: string;
	path: string;
	folder: string;
}

export type Point = {
	x: number;
	y: number;
};
