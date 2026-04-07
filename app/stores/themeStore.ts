import { defineStore } from "pinia";
import type { Theme } from "~/types/config";
import type { ThemeState, ThemeGetter, ThemeActions } from "@/types/store";

export const useThemeStore = defineStore("theme", (): ThemeState & ThemeGetter & ThemeActions => {
	const theme = ref<Theme>("undertale");

	/**
	 * 设置当前主题
	 * @param newTheme - 新的主题，可选值为 "undertale" 或 "touhou"
	 */
	function setTheme(newTheme: Theme) {
		theme.value = newTheme;
	}
	return { theme, setTheme };
});
