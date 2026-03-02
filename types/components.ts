export interface BlogProviderParams {
	slug: string;
}

export interface RouterProviderParams {
	children: React.ReactNode;
}

export interface ThemeProviderParams {
	children: React.ReactNode;
}

export interface ButtonParams {
	text: string;
	icon: React.ReactNode;
	size: "small" | "medium" | "large";
	onClick: () => void;
	style?: React.CSSProperties;
}

export interface LoadingParams {
	ref: HTMLDivElement | null;
}
