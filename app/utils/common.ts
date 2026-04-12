/**
 * 将秒数格式化为 MM:SS 格式的时间字符串
 * @param seconds - 输入的秒数
 * @returns 格式化后的时间字符串，格式为 "分钟:秒数"，其中秒数始终为两位数（不足两位时前面补零）
 */
export const formatTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
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
