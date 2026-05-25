import type { BlogCollections } from "~/types/config";

/**
 * 根据博客集合标识获取对应的中文标题
 *
 * @param collection - 博客集合标识，类型为 BlogCollections
 * @returns 对应的中文标题字符串，如果未找到匹配项则返回原始的 collection 值
 */
export const getCollectionTitle = (collection: BlogCollections) => {
	const collectionTitleMap: Record<string, string> = {
		front_end: "前端开发",
		back_end: "后端开发",
		gms2: "GameMaker Studio 2",
		algorithm: "算法与数据结构",
		deep_learning: "深度学习",
	};
	return collectionTitleMap[collection] || collection;
};

/**
 * 根据编程语言获取对应的图标 Unicode 字符
 *
 * @param language - 编程语言名称，类型为 string
 * @returns 对应语言的图标 Unicode 字符，如果未找到匹配项则返回 undefined
 */
export const getLangIcon = (language: string) => {
	switch (language) {
		case "bash":
			return "&#xe693;";
		case "css":
			return "&#xe61e;";
		case "c++":
		case "C++":
		case "cpp":
			return "&#xe61a;";
		case "gamemaker":
		case "GameMaker":
		case "gml":
			return "&#xeba7;";
		case "htm":
		case "html":
		case "HTML":
			return "&#xe632;";
		case "java":
		case "Java":
			return "&#xe639;";
		case "js":
		case "JS":
		case "javascript":
		case "JavaScript":
			return "&#xe63b;";
		case "jsx":
			return "&#xe63c;";
		case "json":
		case "JSON":
			return "&#xe63a;";
		case "properties":
			return "&#xe74f;";
		case "py":
		case "python":
		case "Python":
			return "&#xe653;";
		case "sql":
		case "SQL":
			return "&#xe65b;";
		case "ts":
		case "TS":
		case "typescript":
		case "TypeScript":
			return "&#xe664;";
		case "vue":
			return "&#xe799;";
		case "xml":
		case "XML":
			return "&#xe67b;";
		case "yml":
		case "yaml":
			return "&#xe680;";
	}
};

/**
 * 根据编程语言获取对应的颜色值
 *
 * @param language - 编程语言名称，类型为 string
 * @returns 对应语言的颜色十六进制值，如果未找到匹配项则返回 undefined
 */
export const getLangIconColor = (language: string) => {
	switch (language) {
		case "bash":
			return "#BABABA";
		case "css":
			return "#2196F3";
		case "c++":
		case "C++":
		case "cpp":
			return "#1D88E5";
		case "gamemaker":
		case "GameMaker":
		case "gml":
			return "#FFFFFF";
		case "htm":
		case "html":
		case "HTML":
			return "#FC490B";
		case "java":
		case "Java":
			return "#FF0000";
		case "js":
		case "JS":
		case "javascript":
		case "JavaScript":
			return "#F4DE51";
		case "jsx":
			return "#5DD4FA";
		case "json":
		case "JSON":
			return "#BABABA";
		case "properties":
			return "#1177D7";
		case "py":
		case "python":
		case "Python":
			return "#BABABA";
		case "sql":
		case "SQL":
			return "#00CCFF";
		case "ts":
		case "TS":
		case "typescript":
		case "TypeScript":
			return "#0090E0";
		case "vue":
			return "#41B883";
		case "xml":
		case "XML":
			return "#BABABA";
		case "yml":
		case "yaml":
			return "#FFFF05";
	}
};
