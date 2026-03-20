/**
 * 获取所有静态资源目录下的图片文件 URL 列表
 *
 * 该函数使用 Vite 的 import.meta.glob API 批量导入 ~/assets/ 目录下
 * 所有指定格式（png, jpg, jpeg, webp, gif）的图片资源，并返回其 URL 字符串数组。
 *
 * @returns {string[]} 包含所有匹配图片资源 URL 的字符串数组
 */
export const getAllImages = (): string[] => {
	const imageModules = import.meta.glob("~/assets/*.{png,jpg,jpeg,webp,gif}", {
		eager: true, // 立即导入所有模块，而不是返回异步函数
		import: "default", // 只导入默认导出（即图片的 URL 字符串）
	});
	const images = Object.values(imageModules) as string[];
	return images;
};
