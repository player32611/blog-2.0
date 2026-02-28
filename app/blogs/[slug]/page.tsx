export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const { default: Blog } = await import(`@/app/blogs/${slug}.md`);

	return <Blog />;
}

export function generateStaticParams() {
	return [{ slug: "html" }, { slug: "css" }];
}

export const dynamicParams = false;
