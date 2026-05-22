const names = ["昵称1", "昵称2", "昵称3"];

export const getDetailName = (index: number) => {
	if (!names[index]) return "null";
	return names[index];
};
