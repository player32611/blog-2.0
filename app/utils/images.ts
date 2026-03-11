export function getAllImages() {
	const imageModules = import.meta.glob("~/assets/*.{png,jpg,jpeg,webp,gif}", {
		eager: true, // 立即导入所有模块，而不是返回异步函数
		import: "default", // 只导入默认导出（即图片的 URL 字符串）
	});
	const images = Object.values(imageModules) as string[];
	return images;
}
