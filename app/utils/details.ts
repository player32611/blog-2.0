const names = ["一颗没梦想的苹果", "酷酷苹果炮", "player32611"];

const job = "还是学生";

const hobby = "大概是 coding...";

const skills = ["html", "css", "javascript", "ts", "vue", "java", "c++", "gml"];

export const getDetailName = (index: number) => {
	if (!names[index]) return "null";
	return names[index];
};

export const getDetailJob = () => {
	return job;
};
export const getDetailHobby = () => {
	return hobby;
};

export const getDetailSkills = () => {
	return skills;
};
