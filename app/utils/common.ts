import gsap from "gsap";
import type { DayTime, Point, RGBColor } from "~/types/common";
import type { NetworkLoadingState } from "~/types/config";

/**
 * 将秒数格式化为 MM:SS 格式的时间字符串
 * @param seconds - 输入的秒数
 * @returns 格式化后的时间字符串，格式为 "分钟:秒数"，其中秒数始终为两位数（不足两位时前面补零）
 */
export const formatTime = (seconds: number): string => {
	if (Number.isNaN(seconds)) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

/**
 * 将时间戳格式化为包含年、月、日、时、分、秒的对象
 *
 * @param timestamp - 输入的时间戳（毫秒）
 * @returns 包含格式化后日期时间信息的对象，其中年份为数字类型，
 *          月、日、时、分、秒均为两位数字符串（不足两位时前面补零）
 */
export const formatDateTime = (timestamp: number): DayTime => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return {
		year,
		month,
		day,
		hour: hours,
		minute: minutes,
		second: seconds,
	};
};

/**
 * 提取URL或路径的路径部分，用于比较是否指向同一资源
 * @param urlOrPath - 完整URL或相对路径
 * @returns 路径部分（以/开头的字符串）
 */
export const extractPathPart = (urlOrPath: string): string => {
	let path: string;
	if (urlOrPath.startsWith("http")) {
		// 对于完整URL，提取pathname
		try {
			path = new URL(urlOrPath).pathname;
			// 对URL进行解码，处理中文和特殊字符
			path = decodeURIComponent(path);
		} catch (error) {
			console.warn("Invalid URL:", urlOrPath, error);
			path = urlOrPath;
		}
	} else {
		// 对于相对路径，确保以/开头
		path = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
	}

	const baseURL = "/blog-2.0";
	if (path.startsWith(baseURL)) {
		path = path.substring(baseURL.length);
	}

	return path;
};

/**
 * 防抖函数，用于限制函数的执行频率。
 * 防抖函数会在指定的延迟时间后执行传入的函数，
 * 如果在延迟时间内再次调用防抖函数，则会重置计时器。
 *
 * @param func - 需要防抖处理的原始函数
 * @param delay - 延迟时间（毫秒），在该时间间隔内若无新的调用才会执行原始函数
 * @returns 返回一个新的函数，该函数具有防抖功能
 */
export const debounce = (func: Function, delay: number): Function => {
	let timeoutId: number | null = null;

	return (...args: any[]) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = window.setTimeout(() => {
			func.apply(this, args);
			timeoutId = null;
		}, delay);
	};
};

/**
 * 节流函数 - 保证在指定时间内只执行一次
 * @param func - 要执行的函数
 * @param delay - 节流延迟时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = (func: Function, delay: number): Function => {
	let lastExecTime = 0;
	let timeoutId: number | null = null;

	return (...args: any[]) => {
		const currentTime = Date.now();

		// 如果之前有定时器，清除它
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// 如果距离上次执行时间超过delay，则立即执行
		if (currentTime - lastExecTime >= delay) {
			func.apply(this, args);
			lastExecTime = currentTime;
		} else {
			// 否则设置定时器，在剩余时间后执行
			timeoutId = window.setTimeout(
				() => {
					func.apply(this, args);
					lastExecTime = Date.now();
					timeoutId = null;
				},
				delay - (currentTime - lastExecTime),
			);
		}
	};
};

/**
 * 检测当前设备是否为移动设备
 * @returns 如果用户代理字符串匹配移动设备标识则返回 true，否则返回 false
 */
export const isMobile = (): boolean => {
	if (import.meta.server) return false;
	return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
};

/**
 * 将角度制转换为弧度制
 * @param {number} degrees - 角度值
 * @returns {number} 弧度值
 */
export const degreesToRadians = (degrees: number): number => {
	return (degrees * Math.PI) / 180;
};

/**
 * 随机生成 1 或 -1
 * @returns {number} 结果
 */
export const randomSign = (): number => {
	return Math.random() < 0.5 ? -1 : 1;
};

/**
 * 在给定的范围内随机生成整数
 * @param {number} min - 范围下界
 * @param {number} max - 范围上界
 * @returns {number} 随机整数
 */
export const randomInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 在给定的范围内随机生成浮点数
 * @param {number} min - 范围下界
 * @param {number} max - 范围上界
 * @returns {number} 随机浮点数/
 */
export const randomFloat = (min: number, max: number): number => {
	return Math.random() * (max - min) + min;
};

/**
 * 根据传入的 img 节点，返回加载 Promise
 * @returns {Promise<NetworkLoadingState>} 加载 Promise
 */
export const onImageLoading = (img: HTMLImageElement): Promise<NetworkLoadingState> => {
	return new Promise(
		(
			resolve: (value: NetworkLoadingState) => void,
			reject: (value: NetworkLoadingState) => void,
		) => {
			if (img.complete && img.naturalWidth > 0) {
				resolve("success");
				return;
			}

			img.addEventListener("load", () => resolve("success"), { once: true });
			img.addEventListener("error", () => reject("error"), { once: true });
		},
	);
};

/**
 * 调用此函数，浏览器将会下载对应 url 的文件
 * @param {string} url - 文件路径
 * @param {string} fileName - 文件名称，默认为文件路径
 */
export const downloadFile = (url: string, fileName?: string): void => {
	const a = document.createElement("a");
	a.href = url;
	if (fileName) a.download = fileName;
	else a.download = url;
	a.click();
};

/**
 * 将 RGB 格式的颜色转换为 hex 格式（十六进制字符串）（不含 #）
 * @param {RGBColor} color - RGB 格式的颜色
 * @returns {string} hex 格式的颜色
 */
export const rgbColorToHexColor = (color: RGBColor): string => {
	return [color.r, color.g, color.b].map(c => c.toString(16).padStart(2, "0")).join("");
};

/**
 * 在指定范围内随机生成颜色
 * @param {Object} options 配置参数
 * @param {number} options.minBrightness 最小亮度 (0-255)，默认 50
 * @param {number} options.maxBrightness 最大亮度 (0-255)，默认 205
 * @param {number} options.minSaturation 最小饱和度 (0-100)，默认 30
 * @param {number} options.maxSaturation 最大饱和度 (0-100)，默认 100
 * @param {string} options.format 输出格式：'hex' | 'rgb' | 'hsl'，默认 'hex'
 * @param {number} options.alpha 透明度 (0-1)，默认 1
 * @param {string[]} options.exclude 排除的颜色数组（十六进制格式）
 * @param {string[]} options.include 只包含的颜色数组（十六进制格式）
 * @returns {string} 随机生成的颜色字符串
 */
export const randomColor = ({
	minBrightness = 50,
	maxBrightness = 205,
	minSaturation = 30,
	maxSaturation = 100,
	format = "hex",
	alpha = 1,
	exclude = [],
	include = [],
}: {
	minBrightness?: number;
	maxBrightness?: number;
	minSaturation?: number;
	maxSaturation?: number;
	format?: "hex" | "rgb" | "hsl";
	alpha?: number;
	exclude?: string[];
	include?: string[];
}): string => {
	// 参数验证
	if (minBrightness < 0 || maxBrightness > 255 || minBrightness > maxBrightness)
		throw new Error("亮度参数无效，范围应在 0-255 之间，且最小值不能大于最大值");

	if (minSaturation < 0 || maxSaturation > 100 || minSaturation > maxSaturation)
		throw new Error("饱和度参数无效，范围应在 0-100 之间，且最小值不能大于最大值");

	if (alpha < 0 || alpha > 1) throw new Error("透明度参数无效，范围应在 0-1 之间");

	// 检查是否在排除列表中
	const isExcluded = (hex: string) => {
		return exclude.some(ex => ex.toLowerCase() === hex.toLowerCase());
	};

	// 检查是否在包含列表中
	const isIncluded = (hex: string) => {
		if (include.length === 0) return true;
		return include.some(inc => inc.toLowerCase() === hex.toLowerCase());
	};

	// 生成颜色
	let attempts = 0;
	const maxAttempts = 100;
	let r, g, b, hex, saturation;

	do {
		// 在 RGB 空间中生成颜色
		r = randomInt(minBrightness, maxBrightness);
		g = randomInt(minBrightness, maxBrightness);
		b = randomInt(minBrightness, maxBrightness);

		// 计算饱和度（简化版）
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		saturation = max === 0 ? 0 : ((max - min) / max) * 100;

		hex = rgbColorToHexColor({ r, g, b });

		attempts++;
		if (attempts > maxAttempts) {
			// 如果尝试次数过多，返回最接近的参数组合
			break;
		}
	} while (
		saturation < minSaturation ||
		saturation > maxSaturation ||
		isExcluded(hex) ||
		!isIncluded(hex)
	);

	// 根据指定格式返回
	switch (format.toLowerCase()) {
		case "rgb":
			return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
		case "hsl": {
			// 将 RGB 转换为 HSL
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const delta = max - min;
			let h = 0;
			if (delta !== 0) {
				if (max === r) h = ((g - b) / delta) % 6;
				else if (max === g) h = (b - r) / delta + 2;
				else h = (r - g) / delta + 4;
				h = Math.round(h * 60);
				if (h < 0) h += 360;
			}
			const l = Math.round(((max + min) / 255) * 50);
			const s = max === 0 ? 0 : Math.round((delta / max) * 100);
			return alpha < 1 ? `hsla(${h}, ${s}%, ${l}%, ${alpha})` : `hsl(${h}, ${s}%, ${l}%)`;
		}
		case "hex":
		default:
			return alpha < 1
				? `#${hex}${Math.round(alpha * 255)
						.toString(16)
						.padStart(2, "0")}`
				: `#${hex}`;
	}
};

/**
 * 计算两点之间的距离
 * @param {Point} p1 点 1
 * @param {Point} p2 点 2
 * @returns {number} 距离
 */
export const calculateDistance = (p1: Point, p2: Point): number => {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * 计算两点连线与起始角度的角度差
 * @param {Point} start 起点 x
 * @param {Point} end 终点 x
 * @param {Point} startAngle 起始角度（单位：°）
 * @returns {Point} 角度差（单位：°, 范围：[-180, 180]）
 */
export const calculateAngleDifference = (start: Point, end: Point, startAngle: number): number => {
	// 当前连线角度
	const angleDeg = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;

	// 计算最小角度差
	let diff = angleDeg - startAngle;

	while (diff > 180) diff -= 360;
	while (diff < -180) diff += 360;

	return diff;
};

/**
 * 计算元素在 gsap 上的坐标
 * @param {Element} element 指定 DOM 元素
 * @returns {Point} gsap 坐标
 */
export const getGSAPPoint = (element: Element): Point => {
	return {
		x: gsap.getProperty(element, "x") as number,
		y: gsap.getProperty(element, "y") as number,
	};
};

/**
 * 计算从起点到终点连线方向上，超出终点屏幕外指定距离的点，确保点真正在屏幕外，如果延伸距离不够则继续延伸
 * @param {Point} start - 起点坐标 {x, y}
 * @param {Point} end - 终点坐标 {x, y}
 * @param {number} minDistance - 最小超出距离（像素）
 * @param {number} screenWidth - 屏幕宽度
 * @param {number} screenHeight - 屏幕高度
 * @param {number} maxIterations - 最大迭代次数，防止死循环
 * @returns {Point|null} 屏幕外的点 {x, y}
 */
export const calculatePointBeyondWindow = (
	start: Point,
	end: Point,
	minDistance: number,
	screenWidth: number = window.innerWidth,
	screenHeight: number = window.innerHeight,
	maxIterations: number = 100,
): Point | null => {
	const dx = end.x - start.x;
	const dy = end.y - start.y;
	const length = Math.sqrt(dx * dx + dy * dy);

	if (length === 0) return null;

	const unitX = dx / length;
	const unitY = dy / length;

	// 从较小距离开始尝试，逐渐增加直到点在屏幕外
	let currentDistance = minDistance;
	let iterations = 0;

	while (iterations < maxIterations) {
		const point = {
			x: end.x + unitX * currentDistance,
			y: end.y + unitY * currentDistance,
		};

		// 检查点是否在屏幕外
		const isOutside =
			point.x < -minDistance ||
			point.x > screenWidth + minDistance ||
			point.y < -minDistance ||
			point.y > screenHeight + minDistance;

		if (isOutside) return point;

		// 如果还在屏幕内，增加距离
		currentDistance += minDistance;
		iterations++;
	}

	// 如果超出最大迭代次数，返回最后的点
	return {
		x: end.x + unitX * currentDistance,
		y: end.y + unitY * currentDistance,
	};
};

/**
 * 判断给定数字是否在一定范围内
 * @param {number} target - 目标数字
 * @param {number} base - 范围基准数字
 * @param {number} range - 范围大小
 * @returns {boolean} 是否在范围内
 */
export const isInRange = (target: number, base: number, range: number): boolean => {
	return base - range <= target && target <= base + range;
};

/**
 * 判断给定坐标是否在屏幕（或增加一定距离）内
 * @param {Point} target - 目标坐标
 * @param {number} distance - 格外距离，默认为 0
 * @returns {boolean} 是否在范围内
 */
export const isOutWindow = (target: Point, distance: number = 0): boolean => {
	return (
		target.x < -distance ||
		target.x > window.innerWidth + distance ||
		target.y < -distance ||
		target.y > window.innerHeight + distance
	);
};

/**
 * 随机生成 ID
 * @returns {string} 随机 ID
 */
export const generateId = (): string => {
	return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
};

/**
 * 从给定的一系列值中随机选取一个
 */
export const randomChoose = <T>(...values: T[]): T | undefined => {
	if (values.length === 0) return undefined;
	return values[Math.floor(Math.random() * values.length)];
};
