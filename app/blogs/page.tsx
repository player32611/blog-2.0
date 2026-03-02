"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import BlogProvider from "@/components/provider/BlogProvider";
import "./index.scss";

export default function Page() {
	const router = useRouter();
	return (
		<div className="blogs">
			<div>blogs</div>
			<Button
				text="back"
				icon={<span className="icon">&#xeaf1;</span>}
				size="small"
				onClick={() => {
					router.push("/");
				}}
				style={{
					position: "fixed",
					left: "20px",
					top: "20px",
				}}
			></Button>
			<Button
				text="menu"
				icon={<span className="icon">&#xeaf1;</span>}
				size="small"
				onClick={() => {}}
				style={{
					position: "fixed",
					right: "20px",
					top: "20px",
				}}
			></Button>
			<BlogProvider slug="front-end/html"></BlogProvider>
		</div>
	);
}
