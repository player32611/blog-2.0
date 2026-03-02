import { defineStore } from "pinia";
import type { Theme, ThemeState, ThemeGetter, ThemeActions } from "@/types/store";

export const useThemeStore = defineStore("theme", (): ThemeState & ThemeGetter & ThemeActions => {
	const theme = ref<Theme>("undertale");
	function setTheme(newTheme: Theme) {
		theme.value = newTheme;
	}
	return { theme, setTheme };
});
