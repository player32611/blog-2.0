import { generateBlogComponents } from "@/lib/blogs";
import type { MDXComponents } from "mdx/types";

const components = {
	...generateBlogComponents(),
	// h1: ({ children }) => <h1 style={{ color: "red", fontSize: "32px" }}>{children}</h1>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}
