"use client";

import { useLoading } from "@/hooks/useLoading";
import { useEffect, useRef } from "react";
import "./index.scss";

export default function Loading() {
	const row = useRef<number>(22);
	const line = useRef<number>(15);
	const loadingRef = useRef<SVGSVGElement>(null);
	const blocksRef = useRef<SVGUseElement[]>([]);
	const { loadingInit } = useLoading();

	const createBlocks = () => {
		for (let l = 0; l < line.current; l++) {
			const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			for (let r = 0; r < row.current; r++) {
				const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
				use.setAttribute("class", "loading_block");
				use.setAttribute("href", "#loading_hexagon");
				use.setAttribute("x", `${(l % 2 ? 86.5 * r : 86.5 * r + 43.3) - 420}`);
				use.setAttribute("y", `${74.5 * l}`);
				use.setAttribute("transform-origin", "50 50");
				g.appendChild(use);
				blocksRef.current.push(use);
			}
			loadingRef.current!.appendChild(g);
		}
	};

	useEffect(() => {
		loadingInit(loadingRef.current!, blocksRef.current!);
		createBlocks();
	}, [loadingInit]);

	return (
		<svg className="loading" viewBox="0 0 1000 1000" ref={loadingRef}>
			<defs>
				<polygon
					id="loading_hexagon"
					points="0,-50 43.3,-25 43.3,25 0,50 -43.3,25 -43.3,-25"
					fill="#171717"
				/>
			</defs>
		</svg>
	);
}
