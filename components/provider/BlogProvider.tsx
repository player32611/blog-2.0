import type { BlogProviderParams } from "@/types/components";

import { Suspense } from "react";
import { Result, Skeleton } from "antd";
export default function BlogProvider({ slug }: BlogProviderParams) {
	const get = async () => {
		try {
			const { default: BlogContent } = await import(`@/app/blogs/${slug}/page.md`);
			return <BlogContent />;
		} catch {
			return <Result status="404" title="404" subTitle="页面不存在" />;
		}
	};

	return <Suspense fallback={<Skeleton active />}>{get()}</Suspense>;
}
