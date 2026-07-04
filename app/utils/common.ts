import type { DayTime } from "~/types/common";
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
export const debounce = (func: Function, delay: number) => {
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
export const throttle = (func: Function, delay: number) => {
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
	if (import.meta.server) {
		return false;
	}

	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
