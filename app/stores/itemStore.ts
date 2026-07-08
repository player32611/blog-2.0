import type { ItemState, ItemGetter, ItemActions } from "~/types/store";

export const useItemStore = defineStore("item", (): ItemState & ItemGetter & ItemActions => {
	const backgroundTheme = ref<"light" | "dark">("dark");
	const showingCommandBar = ref<boolean>(false);
	const showingGuide = ref<boolean>(false);
	const currentCommand = ref<string>("");

	function setBackgroundTheme(theme: "light" | "dark") {
		backgroundTheme.value = theme;
	}

	function setCurrentCommand(command: string) {
		currentCommand.value = command;
	}

	function toggleShowingCommandBar() {
		showingCommandBar.value = !showingCommandBar.value;
	}

	function toggleShowingGuide() {
		showingGuide.value = !showingGuide.value;
	}

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
