// export interface BlogProviderParams {
// 	slug: string;
// }

// export interface RouterProviderParams {
// 	children: any;
// }

// export interface ThemeProviderParams {
// 	children: any;
// }

export interface ButtonParams {
	text: string;
	icon?: any;
	size: "small" | "medium" | "large";
	onClick: () => void;
	style?: Record<string, string | number>;
}

export interface LoadingParams {
	checkLoading?: () => void;
}

export interface LoadingInstance {
	loadingIn: (next: () => void) => void;
	loadingOut: () => void;
}

export interface BlogMaskInstance {
	changeMask: () => void;
}

export interface BlogMenuInstance {
	changeMenu: () => void;
}
