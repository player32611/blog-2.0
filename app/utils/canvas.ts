import type { Point } from "@/types/common";

export const getDistance = (p1: Point, p2: Point): number => {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};
