"use client";

import { useLoading } from "@/hooks/useLoading";
import { useEffect, useRef } from "react";
import "./index.scss";

export default function Loading() {
	const loadingRef = useRef<SVGSVGElement>(null);
	const { loadingInit } = useLoading();

	useEffect(() => {
		loadingInit(loadingRef.current!);
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
