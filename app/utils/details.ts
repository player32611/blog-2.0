const names = ["昵称1", "昵称2", "昵称3"];

const hobby = "大概是 coding";

const skills = ["html", "css", "javascript"];

export const getDetailName = (index: number) => {
	if (!names[index]) return "null";
	return names[index];
};

export const getDetailHobby = () => {
	return hobby;
};

export const getDetailSkills = () => {
	return skills;
};
