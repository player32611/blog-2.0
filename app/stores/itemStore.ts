import type { ItemState, ItemGetter, ItemActions } from "~/types/store";

export const useItemStore = defineStore("item", (): ItemState & ItemGetter & ItemActions => {
	const backgroundTheme = ref<"light" | "dark">("dark");
	const showingCommandBar = ref<boolean>(false);
	const showingGuide = ref<boolean>(false);
	const currentCommand = ref<string>("");

	const setBackgroundTheme = (theme: "light" | "dark") => {
		backgroundTheme.value = theme;
	};

	const setCurrentCommand = (command: string) => {
		currentCommand.value = command;
	};

	const toggleShowingCommandBar = () => {
		showingCommandBar.value = !showingCommandBar.value;
	};

	const toggleShowingGuide = () => {
		showingGuide.value = !showingGuide.value;
	};

	return {
		backgroundTheme,
		showingCommandBar,
		showingGuide,
		currentCommand,
		setBackgroundTheme,
		setCurrentCommand,
		toggleShowingCommandBar,
		toggleShowingGuide,
	};
});
