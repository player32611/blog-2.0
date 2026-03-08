import type { BlogCollections } from "~/types/store";

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
