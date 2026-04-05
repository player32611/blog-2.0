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
